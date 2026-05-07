'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/company', key: 'company' },
  { href: '/service', key: 'services' },
  { href: '/quote', key: 'quote' },
  { href: '/contact', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-row items-center justify-between md:flex-row md:items-center md:space-x-6">
        <Link href="/" className="flex items-center space-x-4 transition hover:opacity-80 shrink-0">
          <img
            src="https://i.imgur.com/eP2y6gB.jpeg"
            alt="Logo FDS"
            className="h-10 md:h-12 lg:h-14 w-auto object-contain"
          />
          <span className="text-base md:text-xl lg:text-2xl font-bold text-black tracking-tight">
            FDS Logística e Terceirização
          </span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-6">
          <ul className="flex space-x-6 text-base font-semibold text-green-700">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition ${
                    isActive(item.href) ? 'border-b-2 border-green-700' : ''
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher current={locale} />
        </nav>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden text-green-700 focus:outline-none"
          aria-label="Abrir menu"
          aria-expanded={isOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 ${
          isOpen ? 'block' : 'hidden'
        }`}
      />

      <nav
        aria-label="Menu de navegação"
        className={`lg:hidden fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white transition-transform duration-300 z-50 rounded-l-lg ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col space-y-6 text-base font-semibold text-green-700 p-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className={`transition ${
                  isActive(item.href) ? 'border-b-2 border-green-700' : ''
                }`}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <div className="flex justify-center space-x-4">
              <LanguageSwitcher current={locale} large />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
