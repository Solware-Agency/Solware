import Carousel from './Carousel';
import BlurText from './effectsComponents/BlurText'
import { useTranslation } from 'react-i18next'

const Automation = () => {
  const { t } = useTranslation()
  const automations = [
    {
      id: 1,
      title: t("automation.integracion.title"),
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/integ%20de%20sist.webp",
      description: t("automation.integracion.description")
    },
    {
      id: 3,
      title: t("automation.gestion.title"),
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/gestion%20documental.webp",
      description: t("automation.gestion.description")
    },
    {
      id: 4,
      title: t("automation.asistentes.title"),
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/asistentes%20virt.webp",
      description: t("automation.asistentes.description")
    },
    {
      id: 5,
      title: t("automation.analisis.title"),
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/analisis%20datos.webp",
      description: t("automation.analisis.description")
    },
    {
      id: 6,
      title: t("automation.tareas.title"),
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/prog%20tareas.webp",
      description: t("automation.tareas.description")
    }
  ];
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300" id="automatizacion" aria-labelledby="automation-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-16">
          <BlurText
            as="h2"
            id="automation-heading"
            text={t("automation.title")}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center w-full"
          />
          <BlurText
            text={t("automation.description")}
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-xl text-gray-600 dark:text-gray-300 text-center w-full"
          />
        </div>

        <div>
          <Carousel items={automations} />
        </div>
      </div>
    </section>
  );
};

export default Automation;