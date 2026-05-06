'use client';

import { useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

const LABELS: Record<Locale, string> = {
  'pt-BR': 'PT',
  en: 'EN',
};

export function LanguageSwitcher({
  current,
  large = false,
}: {
  current: string;
  large?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const sizeClass = large ? 'text-lg' : 'text-sm';

  const switchTo = (locale: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <div className="flex space-x-2 items-center">
      {routing.locales.map((locale, idx) => (
        <span key={locale} className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => switchTo(locale)}
            className={`${sizeClass} font-bold ${
              current === locale ? 'text-green-700' : 'text-gray-500'
            }`}
          >
            {LABELS[locale]}
          </button>
          {idx === 0 && <span className={`${sizeClass} text-gray-300`}>|</span>}
        </span>
      ))}
    </div>
  );
}
