import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'mudanças',
      'logística',
      'transporte',
      'mudanças residenciais',
      'mudanças comerciais',
      'armazenagem',
      'terceirização',
      'FDS',
      'São Paulo',
      'Guarulhos',
    ],
    authors: [{ name: 'FDS Logística e Terceirização' }],
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      title: t('title'),
      description: t('og_description'),
      locale: locale.replace('-', '_'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('og_description'),
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const tSchema = await getTranslations({ locale, namespace: 'schema' });
  const services = (tSchema.raw('services') as string[]) ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: 'FDS Logística e Terceirização',
    description: tSchema('description'),
    telephone: '+55-11-2358-9716',
    email: 'contato@fdslogistica.com.br',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Palhoça, 398',
      addressLocality: 'Guarulhos',
      addressRegion: 'SP',
      postalCode: '07241-010',
      addressCountry: 'BR',
    },
    areaServed: tSchema('area_served'),
    serviceType: services,
    openingHours: 'Mo-Fr 08:00-18:00, Sa 08:00-12:00',
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
