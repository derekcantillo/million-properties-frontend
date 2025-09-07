import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  // Validate that the incoming `lang` parameter is valid
  if (!['en', 'es'].includes(lang)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
