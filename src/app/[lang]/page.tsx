import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Typography } from '@/components/ui/Typography';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const propertyT = useTranslations('Property');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Typography
            variant="h1"
            fontFamily="cinzel"
            textColor="primary"
            className="mb-4"
          >
            {t('title')}
          </Typography>
          <Typography
            variant="lead"
            fontFamily="cairo"
            textColor="muted"
            className="mb-8"
          >
            {t('description')}
          </Typography>
        </div>

        {/* Language Switcher */}
        <div className="mb-12 flex justify-center">
          <div className="bg-background border border-foreground/20 rounded-xl shadow-lg p-6 dark:shadow-foreground/10">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Property Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-background border border-foreground/20 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 dark:shadow-foreground/10">
            <Typography
              variant="h4"
              fontFamily="cairo"
              weight="semibold"
              className="mb-2"
            >
              {propertyT('types.apartment')}
            </Typography>
            <Typography variant="p" textColor="muted" size="sm">
              {propertyT('descriptions.apartment')}
            </Typography>
          </div>
          <div className="bg-background border border-foreground/20 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 dark:shadow-foreground/10">
            <Typography
              variant="h4"
              fontFamily="cairo"
              weight="semibold"
              className="mb-2"
            >
              {propertyT('types.house')}
            </Typography>
            <Typography variant="p" textColor="muted" size="sm">
              {propertyT('descriptions.house')}
            </Typography>
          </div>
          <div className="bg-background border border-foreground/20 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 dark:shadow-foreground/10">
            <Typography
              variant="h4"
              fontFamily="cairo"
              weight="semibold"
              className="mb-2"
            >
              {propertyT('types.commercial')}
            </Typography>
            <Typography variant="p" textColor="muted" size="sm">
              {propertyT('descriptions.commercial')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
