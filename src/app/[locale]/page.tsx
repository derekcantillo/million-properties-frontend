import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('meta.site_name')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            {t('meta.site_description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              {t('property.types.apartment')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('search.placeholder')}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              {t('property.types.house')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('search.placeholder')}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              {t('property.types.commercial')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('search.placeholder')}
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8">
            {t('search.title')}
          </button>
          <button className="rounded-full border border-solid border-blue-600 transition-colors flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8">
            {t('navigation.properties')}
          </button>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <span>{t('navigation.about')}</span>
        <span>{t('navigation.contact')}</span>
        <span>{t('navigation.settings')}</span>
      </footer>
    </div>
  );
}
