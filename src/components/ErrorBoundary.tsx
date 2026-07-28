import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
	state: State = { error: null }

	static getDerivedStateFromError(error: Error): State {
		return { error }
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error('ErrorBoundary:', error, info.componentStack)
	}

	render() {
		if (this.state.error) {
			return (
				<div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-900 p-6 text-center">
					<h1 className="text-xl font-semibold text-gray-900 dark:text-white">
						No se pudo cargar la página
					</h1>
					<p className="max-w-md text-sm text-gray-600 dark:text-gray-300">
						{this.state.error.message}
					</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
					>
						Recargar
					</button>
				</div>
			)
		}
		return this.props.children
	}
}
