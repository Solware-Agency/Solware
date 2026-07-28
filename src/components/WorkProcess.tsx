import React, { useState, useEffect, useRef } from 'react'
import { X, Target, Route, Lightbulb, Cog, ClipboardList } from 'lucide-react'
import BlurText from './effectsComponents/BlurText'
import { useTranslation } from 'react-i18next'

const WorkProcess: React.FC = () => {
	const { t } = useTranslation()
	const steps = [
		{
			number: '1',
			title: t('workProcess.steps.1.title'),
			bgColor: 'bg-blue-500 dark:bg-blue-900/30',
			icon: Target,
			iconColor: 'text-white dark:text-blue-400',
			description: t('workProcess.steps.1.description'),
			details: [
				t('workProcess.steps.1.details.0'),
				t('workProcess.steps.1.details.1'),
				t('workProcess.steps.1.details.2'),
				t('workProcess.steps.1.details.3'),
				t('workProcess.steps.1.details.4'),
			],
		},
		{
			number: '2',
			title: t('workProcess.steps.2.title'),
			wLimit: 'w-none lg:w-28',
			bgColor: 'bg-green-500 dark:bg-green-900/30',
			icon: Route,
			iconColor: 'text-white dark:text-green-400',
			description: t('workProcess.steps.2.description'),
			details: [
				t('workProcess.steps.2.details.0'),
				t('workProcess.steps.2.details.1'),
				t('workProcess.steps.2.details.2'),
				t('workProcess.steps.2.details.3'),
				t('workProcess.steps.2.details.4'),
			],
		},
		{
			number: '3',
			title: t('workProcess.steps.3.title'),
			bgColor: 'bg-yellow-500 dark:bg-yellow-900/30',
			icon: Lightbulb,
			iconColor: 'text-white dark:text-yellow-400',
			description: t('workProcess.steps.3.description'),
			details: [
				t('workProcess.steps.3.details.0'),
				t('workProcess.steps.3.details.1'),
				t('workProcess.steps.3.details.2'),
				t('workProcess.steps.3.details.3'),
				t('workProcess.steps.3.details.4'),
			],
		},
		{
			number: '4',
			title: t('workProcess.steps.4.title'),
			bgColor: 'bg-pink-500 dark:bg-pink-900/30',
			icon: Cog,
			iconColor: 'text-white dark:text-pink-400',
			description: t('workProcess.steps.4.description'),
			details: [
				t('workProcess.steps.4.details.0'),
				t('workProcess.steps.4.details.1'),
				t('workProcess.steps.4.details.2'),
				t('workProcess.steps.4.details.3'),
				t('workProcess.steps.4.details.4'),
			],
		},
		{
			number: '5',
			title: t('workProcess.steps.5.title'),
			wLimit: 'w-none lg:w-28',
			bgColor: 'bg-purple-500 dark:bg-purple-900/30',
			icon: ClipboardList,
			iconColor: 'text-white dark:text-purple-400',
			description: t('workProcess.steps.5.description'),
			details: [
				t('workProcess.steps.5.details.0'),
				t('workProcess.steps.5.details.1'),
				t('workProcess.steps.5.details.2'),
				t('workProcess.steps.5.details.3'),
				t('workProcess.steps.5.details.4'),
			],
		},
	]
	const [selectedStep, setSelectedStep] = useState<number | null>(null)
	const [isVisible, setIsVisible] = useState(false)
	const [key, setKey] = useState(0)
	const sectionRef = useRef<HTMLElement>(null)
	const stepRefs = useRef<(HTMLDivElement | null)[]>([])

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					setKey((prev) => prev + 1)
				} else {
					setIsVisible(false)
				}
			},
			{
				threshold: 0.3,
				rootMargin: '-50px',
			},
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current)
			}
		}
	}, [])

	useEffect(() => {
		// Reinicia la animación cada 5 segundos
		const interval = setInterval(() => {
			setKey((prev) => prev + 1)
		}, 7000)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (selectedStep !== null) {
			document.body.classList.add('overflow-hidden')
		} else {
			document.body.classList.remove('overflow-hidden')
		}
		return () => {
			document.body.classList.remove('overflow-hidden')
		}
	}, [selectedStep])

	useEffect(() => {
		if (selectedStep !== null && stepRefs.current[selectedStep]) {
			stepRefs.current[selectedStep]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}, [selectedStep])

	const handleStepClick = (index: number) => {
		setSelectedStep(selectedStep === index ? null : index)
	}

	return (
		<section ref={sectionRef} className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="proceso" aria-labelledby="workprocess-heading">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16 relative">
					<BlurText
						as="h2"
						id="workprocess-heading"
						text={t('workProcess.title')}
						delay={150}
						animateBy="words"
						direction="top"
						className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
					/>
					<BlurText
						text={t('workProcess.subtitle')}
						delay={200}
						animateBy="words"
						direction="bottom"
						className="text-xl text-gray-600 dark:text-gray-300"
					/>
				</div>

				<div className="relative pt-32 pb-40">
					{/* Líneas conectoras - Desktop */}
					<div className="hidden lg:block absolute inset-0 pointer-events-none">
						<svg
							key={key}
							className="w-full h-full"
							viewBox="0 0 1200 600"
							preserveAspectRatio="xMidYMid meet"
							xmlns="http://www.w3.org/2000/svg"
						>
							<defs>
								<linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" stopColor="#3B82F6">
										<animate
											attributeName="stop-color"
											values="#3B82F6; #10B981; #F59E0B; #EC4899; #8B5CF6"
											dur="4s"
											repeatCount="infinite"
										/>
									</stop>
									<stop offset="100%" stopColor="#8B5CF6">
										<animate
											attributeName="stop-color"
											values="#8B5CF6; #EC4899; #F59E0B; #10B981; #3B82F6"
											dur="4s"
											repeatCount="infinite"
										/>
									</stop>
								</linearGradient>

								<filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
									<feGaussianBlur stdDeviation="4" result="coloredBlur" />
									<feMerge>
										<feMergeNode in="coloredBlur" />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
								</filter>
							</defs>

							<path
								d="m 89.96,196.29 c 0,0 103.25,300.56 261.71,301.59 158.46,1.02 90.99,-296.47 256.6,-296.47 144.15,0 54.17,302.11 235.13,302.61 142.18,0.39 264.78,-303.63 264.78,-303.63"
								stroke="url(#gradientLine)"
								strokeWidth="4"
								fill="none"
								strokeLinecap="round"
								filter="url(#glow)"
								className="desktop-path-animation"
								style={{
									animationDelay: '0.5s',
									animationPlayState: isVisible ? 'running' : 'paused',
								}}
							/>
						</svg>
					</div>

					{/* Líneas conectoras - Mobile */}
					<div
						className="md:hidden absolute inset-0 pointer-events-none"
						style={{
							height: '2100px',
							width: '100%',
							zIndex: 1,
						}}
					>
						<svg
							key={`mobile-${key}`}
							className="w-full h-full"
							viewBox="0 0 150 800"
							preserveAspectRatio="none"
							xmlns="http://www.w3.org/2000/svg"
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '2100px',
							}}
						>
							<defs>
								<linearGradient id="gradientLineMobile" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stopColor="#3B82F6">
										<animate
											attributeName="stop-color"
											values="#3B82F6; #10B981; #F59E0B; #EC4899; #8B5CF6"
											dur="4s"
											repeatCount="infinite"
										/>
									</stop>
									<stop offset="100%" stopColor="#8B5CF6">
										<animate
											attributeName="stop-color"
											values="#8B5CF6; #EC4899; #F59E0B; #10B981; #3B82F6"
											dur="4s"
											repeatCount="infinite"
										/>
									</stop>
								</linearGradient>

								<filter id="glowMobile" x="-20%" y="-20%" width="140%" height="140%">
									<feGaussianBlur stdDeviation="4" result="coloredBlur" />
									<feMerge>
										<feMergeNode in="coloredBlur" />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
								</filter>
							</defs>

							<path
								d="m 75.963856,119.39759 c 0,0 24.365654,14.69372 25.060244,49.15663 1.08387,53.77764 -53.827579,48.21148 -52.048197,107.9518 1.694272,56.88285 57.005597,58.79872 56.867457,109.87953 -0.16421,60.72561 -62.514568,67.47362 -61.686733,109.87952 0.550265,28.1874 33.73494,45.3012 33.73494,45.3012"
								stroke="url(#gradientLineMobile)"
								strokeWidth="2"
								fill="none"
								strokeLinecap="round"
								filter="url(#glowMobile)"
								className="mobile-path-animation"
								style={{
									animationDelay: '0.5s',
									strokeDasharray: 1700,
									strokeDashoffset: 1700,
								}}
							/>
						</svg>
					</div>

					<style>{`
						@keyframes drawLineDesktop {
							0% {
								stroke-dasharray: 3000;
								stroke-dashoffset: 3000;
							}
							100% {
								stroke-dasharray: 3000;
								stroke-dashoffset: 0;
							}
						}

						@keyframes drawLineMobile {
							0% {
								stroke-dasharray: 1700;
								stroke-dashoffset: 1700;
							}
							100% {
								stroke-dasharray: 1700;
								stroke-dashoffset: 0;
							}
						}

						.desktop-path-animation {
							animation: drawLineDesktop 3s cubic-bezier(0.5, 0, 0.2, 1) forwards;
						}

						.mobile-path-animation {
							animation: drawLineMobile 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
						}

						@keyframes pulse {
							0% {
								transform: scale(1);
								box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
							}
							70% {
								transform: scale(1.05);
								box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
							}
							100% {
								transform: scale(1);
								box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
							}
						}

						@keyframes iconPulse {
							0% {
								transform: scale(1);
							}
							50% {
								transform: scale(1.1) rotate(5deg);
							}
							100% {
								transform: scale(1);
							}
						}

						@keyframes boxPulse {
							0% {
								transform: translateY(0);
							}
							50% {
								transform: translateY(-5px);
							}
							100% {
								transform: translateY(0);
							}
						}

						.animate-pulse {
							animation: pulse 2s infinite;
						}

						.animate-icon-pulse {
							animation: iconPulse 2s infinite;
						}

						.animate-box-pulse {
							animation: boxPulse 2s infinite;
						}
					`}</style>

					{/* Steps grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
						{steps.map((step, index) => (
							<div
								key={index}
								className={`relative flex flex-col items-center ${index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-72'}`}
							>
								{/* Step number and circle */}
								<button
									onClick={() => handleStepClick(index)}
									className={`relative w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mb-8 
                    transform transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-110 cursor-pointer
                    shadow-md group z-20
                    ${selectedStep === index ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}
                    ${isVisible ? 'animate-pulse' : ''}`}
									style={{
										animationDelay: `${index * 0.3}s`,
										animationPlayState: isVisible ? 'running' : 'paused',
									}}
									aria-expanded={selectedStep === index}
								>
									<span className="text-2xl font-bold text-white dark:text-white group-hover:scale-110 transition-transform">
										{step.number}
									</span>
									<div
										className="absolute inset-0 rounded-full bg-white/50 dark:bg-white/10 blur-md -z-10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"
									></div>
								</button>

								{/* Icon */}
								<div
									className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center mb-6 
                    transform transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-110
                    opacity-0 invisible
                    ${isVisible ? 'animate-icon-pulse' : ''}`}
									style={{
										animationDelay: `${index * 0.3 + 0.1}s`,
										animationPlayState: isVisible ? 'running' : 'paused',
									}}
								>
									<step.icon className={`h-6 w-6 ${step.iconColor}`} />
								</div>

								{/* Title */}
								<div
									className={`bg-blue-700/70 dark:bg-blue-400/30 backdrop-blur-md rounded-xl p-3 shadow-lg transform 
                    transition-all duration-300 hover:bg-blue-800/80 hover:dark:bg-blue-400/40 hover:shadow-xl hover:shadow-blue-500/20 max-w-[200px] cursor-pointer
                    border border-blue-200/50 dark:border-blue-600/50 hover:border-blue-300/70 hover:dark:border-blue-500/70
                    ${isVisible ? 'animate-box-pulse' : ''}`}
									style={{
										animationDelay: `${index * 0.3 + 0.1}s`,
										animationPlayState: isVisible ? 'running' : 'paused',
									}}
									onClick={() => handleStepClick(index)}
								>
									<h3
										className={`text-center text-lg font-semibold text-white whitespace-normal transition-colors duration-300 ${step.wLimit}`}
									>
										{step.title}
									</h3>
								</div>

								{/* Modal con detalles */}
								{selectedStep === index && (
									<div
										className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
										onClick={(e) => {
											if (e.target === e.currentTarget) setSelectedStep(null)
										}}
										ref={(el) => (stepRefs.current[index] = el)}
									>
										<div
											className="bg-blue-800/80 dark:bg-blue-400/40 backdrop-blur-xl rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto
                      shadow-2xl transform transition-all duration-300 animate-fade-in
                      border border-blue-200/60 dark:border-blue-600/60"
										>
											<div className="flex justify-between items-start mb-4">
												<div className="flex items-center">
													<div
														className={`w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center mr-3`}
													>
														<span className="text-lg font-bold text-white">{step.number}</span>
													</div>
													<h3 className="text-xl font-bold text-white">{step.title}</h3>
												</div>
												<button
													onClick={() => setSelectedStep(null)}
													className="p-1 hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors backdrop-blur-sm"
												>
													<X className="h-6 w-6 text-white" />
												</button>
											</div>

											<p className="text-white/90 mb-6 ">{step.description}</p>

											<div className="space-y-4">
												{step.details.map((detail, detailIndex) => (
													<div key={detailIndex} className="flex items-start space-x-3 p-3 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-600/30">
														<div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-white"></div>
														<p className="text-white">{detail}</p>
													</div>
												))}
											</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default WorkProcess