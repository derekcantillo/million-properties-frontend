import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeInitializer } from '@/components/ThemeInitializer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Million Properties - Real Estate Platform',
  description:
    'Find your dream property with our advanced real estate platform',
  keywords: ['real estate', 'properties', 'homes', 'apartments', 'rent', 'buy'],
  authors: [{ name: 'Million Properties Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeInitializer />
        {children}
      </QueryProvider>
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  );
}
