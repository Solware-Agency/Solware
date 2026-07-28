import React from 'react'
import { ExternalLink as LinkOutIcon } from 'lucide-react'
import { ExternalSiteLink } from './ExternalSiteLink'

export interface ProjectCardProps {
  title: string
  description: string
  category: string
  image?: string
  href?: string
  viewDetailsLabel: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  category,
  image,
  href,
  viewDetailsLabel,
}) => {
  const cardContent = (
    <>
      {image ? (
        <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-gray-200 dark:bg-gray-700">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-video w-full rounded-t-xl bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-dark-200 dark:to-indigo-900/40 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-400 dark:text-gray-500 select-none">
            {title.charAt(0)}
          </span>
        </div>
      )}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          {category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 flex-1">
          {description}
        </p>
        {href && viewDetailsLabel && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
            {viewDetailsLabel}
            <LinkOutIcon className="w-4 h-4 shrink-0" />
          </span>
        )}
      </div>
    </>
  )

  const className =
    'group flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark overflow-hidden shadow-sm hover:shadow-md dark:shadow-none hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300'

  if (href) {
    return (
      <ExternalSiteLink href={href} className={className}>
        {cardContent}
      </ExternalSiteLink>
    )
  }

  return <article className={className}>{cardContent}</article>
}

export default ProjectCard
