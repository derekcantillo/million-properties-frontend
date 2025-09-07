import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          {t('meta.site_name')}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('meta.site_description')}
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">{t('property.types.apartment')}</h3>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">{t('property.types.house')}</h3>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">{t('property.types.commercial')}</h3>
          </div>
        </div>
        <div className="mt-8 space-x-4">
          <a
            href="/en"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            English
          </a>
          <a
            href="/es"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Español
          </a>
        </div>
      </div>
    </div>
  );
}
