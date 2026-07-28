export const COOKIE_CONSENT_STORAGE_KEY = 'solware_cookie_consent'
export const CONSENT_CHANGE_EVENT = 'solware-cookie-consent-change'

export type CookieConsentValue = 'accepted' | 'rejected'

export function getCookieConsent(): CookieConsentValue | null {
	if (typeof window === 'undefined') return null
	const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
	if (v === 'accepted' || v === 'rejected') return v
	return null
}

export function setCookieConsent(value: CookieConsentValue): void {
	localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value)
	window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }))
}

const GTM_ID = 'GTM-TWZNVPRP'
const GA_MEASUREMENT_ID = 'G-Z19PCWSH3F'

/**
 * Inserta GTM + gtag (GA4) solo tras consentimiento explícito. Idempotente.
 */
export function loadGoogleMarketingTags(): void {
	if (typeof document === 'undefined') return
	if (document.getElementById('solware-gtm-bootstrap')) return

	window.dataLayer = window.dataLayer || []

	const gtmBootstrap = document.createElement('script')
	gtmBootstrap.id = 'solware-gtm-bootstrap'
	gtmBootstrap.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`
	document.head.appendChild(gtmBootstrap)

	const gtagJs = document.createElement('script')
	gtagJs.id = 'solware-gtag-js'
	gtagJs.async = true
	gtagJs.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
	document.head.appendChild(gtagJs)

	const gtagConfig = document.createElement('script')
	gtagConfig.id = 'solware-gtag-config'
	gtagConfig.textContent = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`
	document.head.appendChild(gtagConfig)

	if (!document.getElementById('solware-gtm-noscript')) {
		const ns = document.createElement('noscript')
		ns.id = 'solware-gtm-noscript'
		const iframe = document.createElement('iframe')
		iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
		iframe.height = '0'
		iframe.width = '0'
		iframe.style.display = 'none'
		iframe.style.visibility = 'hidden'
		ns.appendChild(iframe)
		document.body.insertBefore(ns, document.body.firstChild)
	}
}
