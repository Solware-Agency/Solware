import React, { useState, useEffect, useRef } from 'react'
import { X, Send } from 'lucide-react'
import { FaEnvelope, FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa'
import RobotTraking from './RobotTraking'
import RobotTrackingChat from './RoboTrakChat'
import { useTranslation } from 'react-i18next'
import { ExternalSiteLink } from './ExternalSiteLink'
import { useRequestExternalNavigate } from '../context/ExternalNavigateContext'

interface Message {
	id: number
	text: string
	isBot: boolean
	timestamp: Date
	options?: (string | { text: string; icon: JSX.Element })[] // Updated to accept both strings and objects
	details?: string[] // Agregamos detalles para mensajes con múltiples líneas
}

// Definimos las respuestas del bot por categorías

interface ChatBotProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, setIsOpen }) => {
	const { t } = useTranslation()
	const requestNavigate = useRequestExternalNavigate()
	const botResponses = {
		initial: {
			text: t('chatbot.responses.initial.text'),
			options: [
				t('chatbot.responses.initial.options.servicios'),
				t('chatbot.responses.initial.options.precios'),
				t('chatbot.responses.initial.options.proceso'),
				t('chatbot.responses.initial.options.contacto'),
			],
		},
		servicios: {
			text: t('chatbot.responses.services.text'),
			options: [
				t('chatbot.responses.services.options.automatizacion'),
				t('chatbot.responses.services.options.desarrollo'),
				t('chatbot.responses.services.options.marketing'),
				t('chatbot.responses.services.options.consultoria'),
			],
			responses: {
				[t('chatbot.responses.services.automatizacion.title')]: t('chatbot.responses.services.automatizacion.text'),
				[t('chatbot.responses.services.desarrollo.title')]: t('chatbot.responses.services.desarrollo.text'),
				[t('chatbot.responses.services.marketing.title')]: t('chatbot.responses.services.marketing.text'),
				[t('chatbot.responses.services.consultoria.title')]: t('chatbot.responses.services.consultoria.text'),
			},
		},
		precios: {
			text: t('chatbot.responses.pricing.text'),
			options: t('chatbot.responses.pricing.options', { returnObjects: true }) as string[],
		},
		proceso: {
			text: t('chatbot.responses.process.text'),
			details: t('chatbot.responses.process.details', { returnObjects: true }) as string[],
			options: t('chatbot.responses.process.options', { returnObjects: true }) as string[],
		},
		contacto: {
			text: t('chatbot.responses.contact.text'),
			options: [
				{ text: t('chatbot.responses.contact.options.enviar_email'), icon: <FaEnvelope /> },
				{ text: t('chatbot.responses.contact.options.abrir_whatsapp'), icon: <FaWhatsapp /> },
				{ text: t('chatbot.responses.contact.options.abrir_instagram'), icon: <FaInstagram /> },
				{ text: t('chatbot.responses.contact.options.abrir_linkedin'), icon: <FaLinkedin /> },
			],
		},
	}

	const contactoDetails = [
		{ icon: <FaEnvelope />, text: 'ventas@solware.agency', link: 'mailto:ventas@solware.agency' },
		{
			icon: <FaWhatsapp />,
			text: '+58 412-9974533',
			link: 'https://api.whatsapp.com/send/?phone=584129974533&text=Hola%2C+me+gustar%C3%ADa+obtener+m%C3%A1s+informaci%C3%B3n+sobre+sus+servicios.&type=phone_number&app_absent=0',
		},
		{ icon: <FaInstagram />, text: '@solware_', link: 'https://www.instagram.com/solware_?igsh=MTg4OTdwM3k3d2o4cA==' },
		{ icon: <FaLinkedin />, text: 'Agencia', link: 'https://www.linkedin.com/company/agencia-solware/' },
	]
	const [messages, setMessages] = useState<Message[]>([
		{
			id: 1,
			text: botResponses.initial.text,
			isBot: true,
			timestamp: new Date(),
			options: botResponses.initial.options,
		},
	])
	const [inputMessage, setInputMessage] = useState('')
	const messagesEndRef = useRef<HTMLDivElement | null>(null)
	const chatRef = useRef<HTMLDivElement | null>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	useEffect(() => {
		if (!isOpen) return

		const handleClickOutside = (event: MouseEvent) => {
			if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	const handleBotResponse = (userInput: string) => {
		const input = userInput.toLowerCase()
		let response: Message

		// Lógica para determinar la respuesta según el input del usuario
		if (
			input.includes(t('chatbot.userInputs.hola')) ||
			input.includes(t('chatbot.userInputs.saludos')) ||
			input.includes(t('chatbot.userInputs.como_estas')) ||
			input.includes(t('chatbot.userInputs.ayuda'))
		) {
			response = {
				id: messages.length + 2,
				text: botResponses.initial.text, // Respuesta de saludo
				isBot: true,
				timestamp: new Date(),
				options: botResponses.initial.options,
			}
		} else if (
			input === t('chatbot.responses.initial.options.servicios').toLowerCase() ||
			input.includes(t('chatbot.userInputs.servicio')) ||
			input.includes(t('chatbot.userInputs.web')) ||
			input.includes(t('chatbot.userInputs.marketing')) ||
			input.includes(t('chatbot.userInputs.aplicacion')) ||
			input.includes(t('chatbot.userInputs.movil')) ||
			input.includes(t('chatbot.userInputs.telefono')) ||
			input.includes(t('chatbot.userInputs.celular'))
		) {
			response = {
				id: messages.length + 2,
				text: botResponses.servicios.text,
				isBot: true,
				timestamp: new Date(),
				options: botResponses.servicios.options,
			}
		} else if (
			input === t('chatbot.responses.initial.options.precios').toLowerCase() ||
			input.includes(t('chatbot.userInputs.precio')) ||
			input.includes(t('chatbot.userInputs.costo')) ||
			input.includes(t('chatbot.userInputs.dinero')) ||
			input.includes(t('chatbot.userInputs.cuanto_cuesta'))
		) {
			response = {
				id: messages.length + 2,
				text: botResponses.precios.text,
				isBot: true,
				timestamp: new Date(),
				options: botResponses.precios.options,
			}
		} else if (
			input === t('chatbot.responses.initial.options.proceso').toLowerCase() ||
			input.includes(t('chatbot.userInputs.proceso')) ||
			input.includes(t('chatbot.userInputs.trabajo'))
		) {
			response = {
				id: messages.length + 2,
				text: botResponses.proceso.text + '\n\n' + (botResponses.proceso.details as string[]).join('\n'),
				isBot: true,
				timestamp: new Date(),
				options: botResponses.proceso.options,
			}
		} else if (
			input === t('chatbot.responses.initial.options.contacto').toLowerCase() ||
			input.includes(t('chatbot.userInputs.contacto'))
		) {
			response = {
				id: messages.length + 2,
				text: botResponses.contacto.text,
				isBot: true,
				timestamp: new Date(),
				options: botResponses.contacto.options,
			}
		} else if (
			// Opciones de servicios específicos
			input === t('chatbot.responses.services.options.automatizacion').toLowerCase() ||
			input === t('chatbot.responses.services.options.desarrollo').toLowerCase() ||
			input === t('chatbot.responses.services.options.marketing').toLowerCase() ||
			input === t('chatbot.responses.services.options.consultoria').toLowerCase()
		) {
			const serviceKey = Object.keys(botResponses.servicios.responses).find((key) => key.toLowerCase() === input)
			response = {
				id: messages.length + 2,
				text: serviceKey ? botResponses.servicios.responses[serviceKey] : t('chatbot.responses.default.text'),
				isBot: true,
				timestamp: new Date(),
				options: [
					t('chatbot.responses.services.options.automatizacion'),
					t('chatbot.responses.services.options.desarrollo'),
					t('chatbot.responses.services.options.marketing'),
					t('chatbot.responses.services.options.consultoria'),
					t('chatbot.responses.options.volver_al_menu'),
				],
			}
		} else {
			// Respuesta por defecto si no se reconoce el input
			response = {
				id: messages.length + 2,
				text: t('chatbot.responses.default.text'),
				isBot: true,
				timestamp: new Date(),
				options: botResponses.initial.options,
			}
		}

		return response
	}

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!inputMessage.trim()) return

		// Mensaje del usuario
		const userMessage: Message = {
			id: messages.length + 1,
			text: inputMessage,
			isBot: false,
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])
		setInputMessage('')

		// Respuesta del bot
		setTimeout(() => {
			const botResponse = handleBotResponse(userMessage.text)
			setMessages((prev) => [...prev, botResponse])
		}, 1000)
	}

	const handleOptionClick = (option: string) => {
		// Simular que el usuario escribió la opción
		const userMessage: Message = {
			id: messages.length + 1,
			text: option,
			isBot: false,
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])

		// Respuesta del bot
		setTimeout(() => {
			let botResponse: Message

			if (option === t('chatbot.responses.options.volver_al_menu')) {
				// Regresar al mensaje inicial de saludo
				botResponse = {
					id: messages.length + 2,
					text: botResponses.initial.text,
					isBot: true,
					timestamp: new Date(),
					options: botResponses.initial.options,
				}
			} else if (
				option === t('chatbot.responses.options.comenzar_proyecto') ||
				option === t('chatbot.responses.options.si_quiero_una_cotizacion')
			) {
				// Redirigir a la sección de contacto
				botResponse = {
					id: messages.length + 2,
					text: botResponses.contacto.text,
					isBot: true,
					timestamp: new Date(),
					options: botResponses.contacto.options,
				}
			} else if (option === t('chatbot.responses.contact.options.enviar_email')) {
				window.open('mailto:solwareve@gmail.com') // Abrir cliente de email
				return // Salir para no agregar un mensaje del bot
			} else if (option === t('chatbot.responses.contact.options.abrir_whatsapp')) {
				const message = encodeURIComponent('Hola, me gustaría obtener más información sobre sus servicios.')
				requestNavigate(`https://wa.me/584129974533?text=${message}`) // Abrir WhatsApp
				return // Salir para no agregar un mensaje del bot
			} else if (option === t('chatbot.responses.contact.options.abrir_instagram')) {
				requestNavigate('https://www.instagram.com/solware_?igsh=MTg4OTdwM3k3d2o4cA==') // Abrir Instagram
				return // Salir para no agregar un mensaje del bot
			} else if (option === t('chatbot.responses.contact.options.abrir_linkedin')) {
				requestNavigate('https://www.linkedin.com/company/agencia-solware/') // Abrir LinkedIn
				return // Salir para no agregar un mensaje del bot
			} else {
				botResponse = handleBotResponse(option)
			}

			setMessages((prev) => [...prev, botResponse])
		}, 1000)
	}

	return (
		<>
			{/* Botón flotante del chat */}
			<button
				onClick={() => setIsOpen(true)}
				className={`p-3 pl-0 text-white rounded-full transition-all duration-300 ${isOpen ? 'hidden' : ''}`}
				title="Chatbot"
			>
				<RobotTraking className={'size-16 md:size-24'} />
			</button>

			{/* Ventana del chat */}
			<div
				className={`fixed bottom-0 right-0 z-50 w-full sm:w-96 h-[600px] bg-white dark:bg-gray-800 
          shadow-[0_-8px_32px_rgba(0,0,0,0.15),_-5px_0_15px_rgba(0,0,0,0.1),_5px_0_15px_rgba(0,0,0,0.1)]
          dark:shadow-[0_-8px_32px_rgba(0,0,0,0.3),_-5px_0_15px_rgba(0,0,0,0.2),_5px_0_15px_rgba(0,0,0,0.2)]
          transition-transform duration-300 transform 
          sm:rounded-t-2xl
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
				ref={chatRef}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-4 bg-blue-600 text-white sm:rounded-t-2xl">
					<div className="flex items-center">
						<RobotTrackingChat className="size-10 md:size-12" />
						<h3 className="font-semibold ml-4">Solwy</h3>
					</div>
					<button onClick={() => setIsOpen(false)} className="p-1 hover:bg-blue-700 rounded-full transition-colors">
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Messages Container */}
				<div className="flex-1 p-4 h-[calc(600px-8rem)] overflow-y-auto">
					<div className="space-y-4">
						{messages.map((message) => (
							<div key={message.id}>
								<div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
									<div
										className={`max-w-[80%] p-3 rounded-lg ${
											message.isBot
												? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
												: 'bg-blue-600 text-white'
										}`}
									>
										<p className="text-sm whitespace-pre-line" dangerouslySetInnerHTML={{ __html: message.text }}></p>
										{message.isBot && message.details && (
											<div className="mt-2">
												{contactoDetails.map((detail, index) => (
													<div key={index} className="text-sm">
														<span className="link">
															{detail.icon}{' '}
															<ExternalSiteLink href={detail.link} className="underline">
																{detail.text}
															</ExternalSiteLink>
														</span>
													</div>
												))}
											</div>
										)}
										<span className="text-xs opacity-70 mt-1 block">
											{message.timestamp.toLocaleTimeString([], {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</span>
									</div>
								</div>
								{message.isBot && message.options && (
									<div className="mt-3 flex flex-wrap gap-2">
										{message.options.map((option, index) => (
											<button
												key={index}
												onClick={() => handleOptionClick(typeof option === 'string' ? option : option.text)}
												className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 
                          dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 
                          transition-colors"
											>
												{typeof option === 'string' ? (
													option
												) : (
													<span className="flex items-center gap-2">
														{option.icon} {option.text}
													</span>
												)}
											</button>
										))}
									</div>
								)}
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
				</div>

				{/* Input Form */}
				<form
					onSubmit={handleSendMessage}
					className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t 
            dark:border-gray-700"
				>
					<div className="flex items-center gap-2">
						<input
							type="text"
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							placeholder="Escribe tu mensaje..."
							className="flex-1 p-2 border dark:border-gray-600 rounded-lg bg-white 
                dark:bg-gray-700 text-gray-900 dark:text-gray-100"
						/>
						<button
							type="submit"
							className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors"
						>
							<Send className="h-5 w-5" />
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default ChatBot
