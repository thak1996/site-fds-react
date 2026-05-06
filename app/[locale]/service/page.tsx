import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

const SERVICE_KEYS = [
  'commercial',
  'residential',
  'sensitive',
  'art',
  'assembly',
  'internal',
  'storage',
  'logistics',
  'outsourcing',
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services_page' });
  return { title: `${t('title')} | FDS Logística e Terceirização` };
}

export default async function ServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services_page');

  return (
    <section
      style={{
        background: 'linear-gradient(to right, #ebf8ff, #d1fae5)',
        padding: '10px',
      }}
      className="flex-1 py-10 pb-20 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 max-w-5xl bg-gray-50 rounded-lg shadow p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center">
          {t('title')}
        </h1>

        <div className="space-y-6">
          {SERVICE_KEYS.map((key) => (
            <div key={key} className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {t(`${key}.title`)}
              </h3>
              <p className="text-gray-700">{t(`${key}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
