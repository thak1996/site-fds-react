'use client';

import { useEffect, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';

type Variant = 'success' | 'error';

const VARIANTS: Record<
  Variant,
  {
    icon: ReactNode;
    iconBg: string;
    titleColor: string;
    button: string;
  }
> = {
  success: {
    icon: (
      <svg
        className="w-8 h-8 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    iconBg: 'bg-green-100',
    titleColor: 'text-green-700',
    button: 'bg-green-600 hover:bg-green-700',
  },
  error: {
    icon: (
      <svg
        className="w-8 h-8 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    iconBg: 'bg-red-100',
    titleColor: 'text-red-700',
    button: 'bg-red-600 hover:bg-red-700',
  },
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  variant: Variant;
  title: string;
  message: string;
  details?: ReactNode;
};

export function Modal({
  open,
  onClose,
  variant,
  title,
  message,
  details,
}: ModalProps) {
  const t = useTranslations('modals');
  const v = VARIANTS[variant];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6"
      >
        <div className="text-center">
          <div
            className={`mx-auto w-16 h-16 ${v.iconBg} rounded-full flex items-center justify-center mb-4`}
          >
            {v.icon}
          </div>
          <h3 className={`text-xl font-bold ${v.titleColor} mb-2`}>{title}</h3>
          <p className="text-gray-600 mb-4">{message}</p>
          {details && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-600 text-left">
              {details}
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className={`${v.button} text-white px-6 py-2 rounded-lg font-semibold transition`}
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
