import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { openExternalTab } from '../lib/openExternalTab'

type ExternalNavigateContextValue = {
	requestNavigate: (url: string) => void
}

export const ExternalNavigateContext = createContext<ExternalNavigateContextValue | null>(null)

export function useRequestExternalNavigate(): ExternalNavigateContextValue['requestNavigate'] {
	const ctx = useContext(ExternalNavigateContext)
	if (!ctx) {
		throw new Error('useRequestExternalNavigate debe usarse dentro de ExternalNavigateProvider')
	}
	return ctx.requestNavigate
}

export function ExternalNavigateProvider({ children }: { children: ReactNode }) {
	const { t } = useTranslation()
	const [pendingUrl, setPendingUrl] = useState<string | null>(null)

	const requestNavigate = useCallback((url: string) => {
		if (url.startsWith('mailto:') || url.startsWith('tel:')) {
			window.location.href = url
			return
		}
		if (/^https?:\/\//i.test(url)) {
			setPendingUrl(url)
			return
		}
		openExternalTab(url)
	}, [])

	const cancel = useCallback(() => setPendingUrl(null), [])

	const confirm = useCallback(() => {
		if (pendingUrl) {
			openExternalTab(pendingUrl)
			setPendingUrl(null)
		}
	}, [pendingUrl])

	useEffect(() => {
		if (!pendingUrl) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') cancel()
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [pendingUrl, cancel])

	return (
		<ExternalNavigateContext.Provider value={{ requestNavigate }}>
			{children}
			{pendingUrl &&
				createPortal(
					<div
						className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
						role="presentation"
						onClick={cancel}
					>
						<div
							role="dialog"
							aria-modal="true"
							aria-labelledby="external-nav-confirm-title"
							className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900"
							onClick={(e) => e.stopPropagation()}
						>
							<h2
								id="external-nav-confirm-title"
								className="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
							>
								{t('externalLinkConfirm.title')}
							</h2>
							<p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
								{t('externalLinkConfirm.description')}
							</p>
							<div className="flex justify-end gap-3">
								<button
									type="button"
									onClick={cancel}
									className="rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
								>
									{t('externalLinkConfirm.cancel')}
								</button>
								<button
									type="button"
									onClick={confirm}
									className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
								>
									{t('externalLinkConfirm.confirm')}
								</button>
							</div>
						</div>
					</div>,
					document.body,
				)}
		</ExternalNavigateContext.Provider>
	)
}
