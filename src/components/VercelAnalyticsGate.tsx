import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { CONSENT_CHANGE_EVENT, getCookieConsent } from '../lib/cookieConsent'

/** Carga Vercel Analytics solo si el usuario aceptó cookies de medición (misma categoría que GA). */
export default function VercelAnalyticsGate() {
	const [enabled, setEnabled] = useState(() => getCookieConsent() === 'accepted')

	useEffect(() => {
		const sync = () => setEnabled(getCookieConsent() === 'accepted')
		window.addEventListener(CONSENT_CHANGE_EVENT, sync)
		return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync)
	}, [])

	return enabled ? <Analytics debug={false} /> : null
}
