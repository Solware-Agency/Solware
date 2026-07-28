import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import NotFound from './components/NotFound'
import PrivacyPolicy from './components/PrivacyPolicy'
import Demonstration from './components/Demonstration'
import ServicesPage from './components/ServicesPage'
import { ExternalNavigateProvider } from './context/ExternalNavigateContext'
import CookieConsentBanner from './components/CookieConsentBanner'
import VercelAnalyticsGate from './components/VercelAnalyticsGate'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
import './i18n'

// Inicializar el tema oscuro antes de renderizar
const savedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Configuración de future flags para React Router v7
const routerOptions = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter {...routerOptions}>
        <ExternalNavigateProvider>
          <CookieConsentBanner />
          <VercelAnalyticsGate />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/demo" element={<Demonstration />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ExternalNavigateProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)