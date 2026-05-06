import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          © {year} FDS Logística e Terceirização. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
