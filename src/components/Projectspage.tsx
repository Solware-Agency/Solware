import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Particles from './Particles'
import Header from './Header'
import WhatsAppButton from './WhatsAppButton'
import ButtonMessageBot from './ButtonMessageBot'
import ProjectCard from './ProjectCard'

const PROJECT_IDS = ['0', '1']

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation()
  const viewDetailsLabel = t('projects.viewDetails')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 w-full">
      <Particles />
      <Header />

      <main className="relative min-h-screen w-full max-w-full pb-16 md:pb-14">
        {/* Hero */}
        <section className="min-h-[50vh] flex flex-col justify-center py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              {t('projects.title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-10">
              {t('projects.subtitle')}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              {t('projects.backToHome')}
            </Link>
          </div>
        </section>

        {/* Listado de proyectos */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PROJECT_IDS.map((id) => (
              <ProjectCard
                key={id}
                title={t(`projects.list.${id}.title`)}
                description={t(`projects.list.${id}.description`)}
                category={t(`projects.list.${id}.category`)}
                viewDetailsLabel={viewDetailsLabel}
              />
            ))}
          </div>
        </section>
      </main>

      <WhatsAppButton />
      <ButtonMessageBot />
    </div>
  )
}

export default ProjectsPage
