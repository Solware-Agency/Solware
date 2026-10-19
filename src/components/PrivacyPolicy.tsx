import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-300 text-justify">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-8 inline-flex items-center text-gray-600 dark:text-gray-300 
            hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('privacyPolicy.back')}
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            {t('privacyPolicy.title')}
          </h1>
          
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              {t('privacyPolicy.paragraph1')}
            </p>

            <p className="text-lg leading-relaxed">
              {t('privacyPolicy.paragraph2')}
            </p>

            <p className="text-lg leading-relaxed">
              {t('privacyPolicy.paragraph3')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500 dark:text-gray-400">
              <p>{t('privacyPolicy.paragraph4')}</p>
              <p>{t('privacyPolicy.paragraph5')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacyPolicy.paragraph6')}
              </h2>
              <p className="mb-4">
                {t('privacyPolicy.paragraph7')}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">{t('privacyPolicy.infoRec.bold')}</span> {t('privacyPolicy.infoRec.paragraph1')}
                </li>
                <li>
                  <span className="font-medium">{t('privacyPolicy.infoRec2.bold')}</span> {t('privacyPolicy.infoRec2.paragraph1')}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacyPolicy.finality.title')}
              </h2>
              <p className="mb-4">{t('privacyPolicy.finality.paragraph1')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacyPolicy.finality.paragraph2')}</li>
                <li>{t('privacyPolicy.finality.paragraph3')}</li>
                <li>{t('privacyPolicy.finality.paragraph4')}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacyPolicy.protection.title')}
              </h2>
              <p>
                {t('privacyPolicy.protection.paragraph1')}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacyPolicy.rights.title')}
              </h2>
              <p className="mb-4">{t('privacyPolicy.rights.paragraph1')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacyPolicy.rights.paragraph2')}</li>
                <li>{t('privacyPolicy.rights.paragraph3')}</li>
                <li>{t('privacyPolicy.rights.paragraph4')}</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacyPolicy.contact.title')}
              </h2>
              <p className="mb-4">
                {t('privacyPolicy.contact.paragraph1')}
              </p>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">{t('privacyPolicy.contact.email')}:</span>{' '}
                  <a 
                    href="mailto:ventas@solware.agency"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    ventas@solware.agency
                  </a>
                </li>
                <li>
                  <span className="font-medium">{t('privacyPolicy.contact.phone')}:</span>{' '}
                  <a 
                    href="tel:+584226379644"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    +58 422-6379644
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;