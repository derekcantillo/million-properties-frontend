import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import {
  Typography,
  TypographyVariant,
  TypographyFontFamily,
  TypographyWeight,
  TypographyTextColor,
  TypographySize,
} from '@/components/ui/Typography';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const propertyT = useTranslations('Property');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Typography
            variant={TypographyVariant.H1}
            fontFamily={TypographyFontFamily.CINZEL}
            textColor={TypographyTextColor.PRIMARY}
            className="mb-4"
          >
            {t('title')}
          </Typography>
          <Typography
            variant={TypographyVariant.LEAD}
            fontFamily={TypographyFontFamily.CAIRO}
            textColor={TypographyTextColor.MUTED}
            className="mb-8"
          >
            {t('description')}
          </Typography>
        </div>

        {/* Theme and Language Switchers */}
        <div className="mb-12 flex justify-center gap-8">
          <div className="bg-background border border-foreground/20 rounded-xl shadow-lg p-6 dark:shadow-foreground/10">
            <ThemeSwitcher />
          </div>
          <div className="bg-background border border-foreground/20 rounded-xl shadow-lg p-6 dark:shadow-foreground/10">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Property Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-background border border-foreground/20 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 dark:shadow-foreground/10">
            <Typography
              variant={TypographyVariant.H4}
              fontFamily={TypographyFontFamily.CAIRO}
              weight={TypographyWeight.SEMI_BOLD}
              className="mb-2"
            >
              {propertyT('types.apartment')}
            </Typography>
            <Typography
              variant={TypographyVariant.PARAGRAPH}
              textColor={TypographyTextColor.MUTED}
              size={TypographySize.SM}
            >
              {propertyT('descriptions.apartment')}
            </Typography>
          </div>
          <div className="bg-background border border-foreground/20 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 dark:shadow-foreground/10">
            <Typography
              variant={TypographyVariant.H4}
              fontFamily={TypographyFontFamily.CAIRO}
              weight={TypographyWeight.SEMI_BOLD}
              className="mb-2"
            >
              {propertyT('types.house')}
            </Typography>
            <Typography
              variant={TypographyVariant.PARAGRAPH}
              textColor={TypographyTextColor.MUTED}
              size={TypographySize.SM}
            >
              {propertyT('descriptions.house')}
            </Typography>
          </div>
          <div className="bg-background border border-foreground/20 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 dark:shadow-foreground/10">
            <Typography
              variant={TypographyVariant.H4}
              fontFamily={TypographyFontFamily.CAIRO}
              weight={TypographyWeight.SEMI_BOLD}
              className="mb-2"
            >
              {propertyT('types.commercial')}
            </Typography>
            <Typography
              variant={TypographyVariant.PARAGRAPH}
              textColor={TypographyTextColor.MUTED}
              size={TypographySize.SM}
            >
              {propertyT('descriptions.commercial')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
