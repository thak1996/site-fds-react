import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { QuoteForm } from '@/components/forms/QuoteForm';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quote_page' });
  return { title: `${t('title')} | FDS Logística e Terceirização` };
}

export default async function QuotePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('quote_page');

  return (
    <section
      style={{
        background: 'linear-gradient(to right, #ebf8ff, #d1fae5)',
        padding: '10px',
      }}
      className="flex-1 py-10 pb-20 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 max-w-4xl bg-gray-50 rounded-lg shadow p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center">
          {t('title')}
        </h1>
        <QuoteForm />
      </div>
    </section>
  );
}
