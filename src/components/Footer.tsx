import { memo } from 'react'
import { Phone, Mail, Instagram, Shield, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ExternalSiteLink } from './ExternalSiteLink'

const Footer = memo(() => {
	const { t } = useTranslation()
	return (
		<footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-12 transition-colors duration-300">
			<div className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-5">
					<div className="flex items-center">
						<Link
							to="/privacy"
							className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 
                dark:hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 
                dark:hover:bg-blue-900/30 rounded-lg"
						>
							<Shield className="h-5 w-5 mr-2" />
							<span>{t('footer.privacy')}</span>
						</Link>
					</div>

					<div className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300 w-2/4 text-center">
						{t('footer.copyright', { year: new Date().getFullYear() })}
					</div>

					<div className="flex items-center gap-4 justify-center">
						<a
							href="tel:+584129974533"
							className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full"
							aria-label="Llamar"
						>
							<Phone className="h-5 w-5" />
						</a>

						<a
							href="mailto:ventas@solware.agency"
							className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full"
							aria-label="Enviar correo"
						>
							<Mail className="h-5 w-5" />
						</a>

						<ExternalSiteLink
							href="https://www.instagram.com/solware_?igsh=MTg4OTdwM3k3d2o4cA=="
							className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full"
							aria-label="Instagram"
						>
							<Instagram className="h-5 w-5" />
						</ExternalSiteLink>

						<ExternalSiteLink
							href="https://www.linkedin.com/company/agencia-solware/"
							className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full mr-4"
							aria-label="LinkedIn"
						>
							<Linkedin className="h-5 w-5" />
						</ExternalSiteLink>
					</div>
				</div>
			</div>
		</footer>
	)
})

export default Footer
