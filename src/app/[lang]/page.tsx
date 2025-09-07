import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const propertyT = useTranslations('Property');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-blue-600">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{t('description')}</p>
        </div>

        {/* Language Switcher */}
        <div className="mb-12 flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Property Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {propertyT('types.apartment')}
            </h3>
            <p className="text-gray-600">
              {propertyT('descriptions.apartment')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {propertyT('types.house')}
            </h3>
            <p className="text-gray-600">{propertyT('descriptions.house')}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {propertyT('types.commercial')}
            </h3>
            <p className="text-gray-600">
              {propertyT('descriptions.commercial')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
