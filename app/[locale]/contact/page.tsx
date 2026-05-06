import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact_page' });
  return { title: `${t('title')} | FDS Logística e Terceirização` };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact_page');
  const tInfo = await getTranslations('contact_page.info');

  return (
    <section
      style={{ background: 'linear-gradient(to right, #ebf8ff, #d1fae5)' }}
      className="flex-1 py-10 pb-20 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center">
              {t('title')}
            </h1>
            <p
              className="text-gray-600 mb-6 text-center"
              dangerouslySetInnerHTML={{ __html: t.raw('subtitle') as string }}
            />
            <ContactForm />
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              FDS Logística
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {tInfo('phone_label')}
                </h3>
                <p className="text-gray-600">(11) 98217-0520</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {tInfo('email_label')}
                </h3>
                <a
                  href={`mailto:contato@fdslogistica.com.br?subject=${encodeURIComponent(t('mailto_subject'))}&body=${encodeURIComponent(t('mailto_body'))}`}
                  className="text-gray-600 hover:text-green-700 transition"
                >
                  contato@fdslogistica.com.br
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {tInfo('address_label')}
                </h3>
                <p className="text-gray-600">
                  Rua Palhoça, 398
                  <br />
                  Cumbica - Parque Industrial
                  <br />
                  Guarulhos/SP
                  <br />
                  CEP 07241-010
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {tInfo('hours_label')}
                </h3>
                <p className="text-gray-600">
                  {tInfo('hours_line1')}
                  <br />
                  {tInfo('hours_line2')}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {tInfo('location_label')}
              </h3>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center overflow-hidden">
                <iframe
                  title="Mapa FDS Logística"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.748982091781!2d-46.524928824982!3d-23.43567898473533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5c1f4b8b8a8f%3A0x8e2f9b8f8e2f9b8f!2sRua%20Palho%C3%A7a%2C%20398%20-%20Cumbica%2C%20Guarulhos%20-%20SP%2C%20CEP%2007241-010!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
