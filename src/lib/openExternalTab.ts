/** Abre URL en pestaña nueva sin exponer `window.opener` al sitio destino. */
export function openExternalTab(url: string): void {
	const win = window.open(url, '_blank')
	if (win) win.opener = null
}
