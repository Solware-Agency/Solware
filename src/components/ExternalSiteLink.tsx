import { useContext, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { ExternalNavigateContext } from '../context/ExternalNavigateContext'

export type ExternalSiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
	href: string
}

/**
 * Enlace http(s): intercepta el clic y pide confirmación vía {@link ExternalNavigateProvider}.
 * No modifica el texto visible de los hijos.
 */
export function ExternalSiteLink({ href, children, onClick, ...rest }: ExternalSiteLinkProps) {
	const ctx = useContext(ExternalNavigateContext)
	if (!ctx) {
		throw new Error('ExternalSiteLink requiere ExternalNavigateProvider (envolver la app en main.tsx).')
	}

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		onClick?.(e)
		ctx.requestNavigate(href)
	}

	return (
		<a href={href} rel="noopener noreferrer" {...rest} onClick={handleClick}>
			{children}
		</a>
	)
}
