import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { FeatureCard } from '@/components/FeatureCard';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <section
        style={{
          background: 'linear-gradient(to right, #ebf8ff, #d1fae5)',
        }}
        className="py-10 md:py-16 flex-1"
      >
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16 max-w-6xl h-full">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
              {t('hero_title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              {t('hero_subtitle')}
            </p>
            <Link
              href="/quote"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition"
            >
              {t('quote_button')}
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="https://i.imgur.com/Yeuto4V.jpeg"
              alt={t('hero_title')}
              width={600}
              height={400}
              unoptimized
              priority
              className="rounded-lg shadow-lg w-full max-w-md h-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-6">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            {t('value_proposition')}
          </h2>
        </div>
      </section>

      <section
        id="empresa"
        style={{
          background: 'linear-gradient(to right, #bfdbfe, #bbf7d0)',
        }}
        className="py-12"
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          <FeatureCard
            title={t('cards.company.title')}
            text={t('cards.company.text')}
            href="/company"
            button={t('cards.company.button')}
          />
          <FeatureCard
            title={t('cards.services.title')}
            text={t('cards.services.text')}
            href="/quote"
            button={t('cards.services.button')}
          />
          <FeatureCard
            title={t('cards.contact.title')}
            text={t('cards.contact.text')}
            href="/contact"
            button={t('cards.contact.button')}
          />
        </div>
      </section>
    </>
  );
}
