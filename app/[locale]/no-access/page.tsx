import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'no_access' });
  return { title: `${t('page_title')} | FDS Logística e Terceirização` };
}

export default async function NoAccessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('no_access');

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-red-50 p-3 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-950">{t('heading')}</h2>
            <p className="mt-1 text-sm text-gray-500">{t('message')}</p>
          </div>
          <p className="text-xs text-gray-400">
            {t('support_text')}{' '}
            <a href="#" className="text-green-700 hover:underline">
              {t('support_link')}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
