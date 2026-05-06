import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: `${t('company.title')} | FDS Logística e Terceirização` };
}

export default async function CompanyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('company');

  return (
    <section
      style={{
        background: 'linear-gradient(to right, #ebf8ff, #d1fae5)',
        padding: '10px',
      }}
      className="flex-1 py-6 md:py-10 pb-16 md:pb-20 flex items-center justify-center"
    >
      <div className="container mx-auto px-6 sm:px-8 max-w-4xl bg-gray-50 rounded-lg shadow p-6 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold text-green-700 mb-4 md:mb-6 text-center">
          {t('title')}
        </h1>
        <p className="mb-4 text-gray-800">{t('p1')}</p>
        <p className="mb-4 text-gray-800">{t('p2')}</p>
        <p className="mb-4 text-gray-800">{t('p3')}</p>
        <p className="mb-4 text-gray-800">{t('p4')}</p>
        <p className="mb-0 text-gray-800">{t('p5')}</p>
      </div>
    </section>
  );
}
