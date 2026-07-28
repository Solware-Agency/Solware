import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getCookieConsent, loadGoogleMarketingTags, setCookieConsent } from '../lib/cookieConsent'

/** Alineado con App: preloader 3000 ms + fade opacity del contenido 500 ms */
const HOME_PRELOADER_REVEAL_MS = 3500

export default function CookieConsentBanner() {
	const { t } = useTranslation()
	const location = useLocation()
	const [postPreloader, setPostPreloader] = useState(() => location.pathname !== '/')
	const [hidden, setHidden] = useState(() => getCookieConsent() !== null)

	const accept = useCallback(() => {
		setCookieConsent('accepted')
		loadGoogleMarketingTags()
		setHidden(true)
	}, [])

	const reject = useCallback(() => {
		setCookieConsent('rejected')
		setHidden(true)
	}, [])

	useEffect(() => {
		if (getCookieConsent() === 'accepted') {
			loadGoogleMarketingTags()
		}
	}, [])

	useEffect(() => {
		if (location.pathname !== '/') {
			setPostPreloader(true)
			return
		}
		setPostPreloader(false)
		const timer = setTimeout(() => setPostPreloader(true), HOME_PRELOADER_REVEAL_MS)
		return () => clearTimeout(timer)
	}, [location.pathname])

	if (hidden) return null
	if (!postPreloader) return null

	return (
		<div
			className="fixed bottom-0 left-0 right-0 z-[10050] border-t border-gray-200 bg-white/95 p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/95"
			role="dialog"
			aria-modal="false"
			aria-labelledby="cookie-consent-title"
			aria-describedby="cookie-consent-desc"
		>
			<div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
				<div className="min-w-0 flex-1 text-sm text-gray-700 dark:text-gray-200">
					<p id="cookie-consent-title" className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
						{t('cookieConsent.title')}
					</p>
					<p id="cookie-consent-desc">{t('cookieConsent.description')}</p>
					<Link
						to="/privacy"
						className="mt-2 inline-block text-sm font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
					>
						{t('cookieConsent.privacy')}
					</Link>
				</div>
				<div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
					<button
						type="button"
						onClick={reject}
						className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
					>
						{t('cookieConsent.reject')}
					</button>
					<button
						type="button"
						onClick={accept}
						className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
					>
						{t('cookieConsent.accept')}
					</button>
				</div>
			</div>
		</div>
	)
}
