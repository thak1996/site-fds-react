'use client';

import { useState } from 'react';
import { useFormContext, type FieldErrors, type Path } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { GetAddressByCep } from '@/src/core/use-cases/GetAddressByCep';
import { ViaCepGateway } from '@/src/infra/external/ViaCepGateway';
import { maskCep } from '@/lib/masks';

import type { QuoteFormValues } from '@/lib/validation';

type Kind = 'origin' | 'destination';

const READONLY_INPUT =
  'w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed';
const NORMAL_INPUT =
  'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500';

export function AddressFields({
  kind,
  sectionTitle,
}: {
  kind: Kind;
  sectionTitle: string;
}) {
  const t = useTranslations('quote_page.fields');
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  const [loading, setLoading] = useState(false);
  const [cepError, setCepError] = useState(false);

  const propertyType = watch(`${kind}.property_type` as const);
  const isApartment = propertyType === 'apartment';
  const blockErrors = (errors[kind] ?? {}) as FieldErrors<
    QuoteFormValues[Kind]
  >;

  const handleZipBlur = async (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    if (digits.length !== 8) return;
    setLoading(true);
    setCepError(false);
    try {
      const gateway = new ViaCepGateway();
      const useCase = new GetAddressByCep(gateway);
      const result = await useCase.execute(digits);

      if (!result) {
        setCepError(true);
        return;
      }
      setValue(`${kind}.street` as Path<QuoteFormValues>, result.street, {
        shouldValidate: true,
      });
      setValue(`${kind}.district` as Path<QuoteFormValues>, result.district, {
        shouldValidate: true,
      });
      setValue(`${kind}.city` as Path<QuoteFormValues>, result.city, {
        shouldValidate: true,
      });
      setValue(`${kind}.state` as Path<QuoteFormValues>, result.state, {
        shouldValidate: true,
      });
    } catch {
      setCepError(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white p-6 lg:p-8 rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{sectionTitle}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('zipcode')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            maxLength={9}
            placeholder={t('zipcode_placeholder')}
            {...register(`${kind}.zipcode` as const, {
              onChange: (e) => {
                setValue(
                  `${kind}.zipcode` as Path<QuoteFormValues>,
                  maskCep(e.target.value),
                );
                setCepError(false);
              },
              onBlur: (e) => handleZipBlur(e.target.value),
            })}
            className={NORMAL_INPUT}
          />
          {loading && (
            <div className="text-sm text-gray-500 mt-1">
              {t('zipcode_loading')}
            </div>
          )}
          {cepError && (
            <div className="text-sm text-red-500 mt-1">
              {t('zipcode_error')}
            </div>
          )}
          {blockErrors.zipcode && (
            <p className="text-sm text-red-500 mt-1">
              {blockErrors.zipcode.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('street')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            readOnly
            placeholder={t('street_placeholder')}
            {...register(`${kind}.street` as const)}
            className={READONLY_INPUT}
          />
          {blockErrors.street && (
            <p className="text-sm text-red-500 mt-1">
              {blockErrors.street.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('number')}
          </label>
          <input
            type="text"
            placeholder={t('number_placeholder')}
            {...register(`${kind}.number` as const)}
            className={NORMAL_INPUT}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('district')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            readOnly
            placeholder={t('street_placeholder')}
            {...register(`${kind}.district` as const)}
            className={READONLY_INPUT}
          />
          {blockErrors.district && (
            <p className="text-sm text-red-500 mt-1">
              {blockErrors.district.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('city')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            readOnly
            placeholder={t('street_placeholder')}
            {...register(`${kind}.city` as const)}
            className={READONLY_INPUT}
          />
          {blockErrors.city && (
            <p className="text-sm text-red-500 mt-1">
              {blockErrors.city.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('state')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            readOnly
            placeholder={t('street_placeholder')}
            {...register(`${kind}.state` as const)}
            className={READONLY_INPUT}
          />
          {blockErrors.state && (
            <p className="text-sm text-red-500 mt-1">
              {blockErrors.state.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('property_type')} <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="house"
                {...register(`${kind}.property_type` as const)}
                className="mr-2"
              />
              <span>{t('house')}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="apartment"
                {...register(`${kind}.property_type` as const)}
                className="mr-2"
              />
              <span>{t('apartment')}</span>
            </label>
          </div>
          {blockErrors.property_type && (
            <p className="text-sm text-red-500 -mt-2 mb-2">
              {blockErrors.property_type.message}
            </p>
          )}

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
              isApartment ? '' : 'hidden'
            }`}
          >
            <div>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-sm font-medium text-gray-700">
                  {t('elevator')} <span className="text-red-500">*</span>:
                </span>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="sim"
                    {...register(`${kind}.elevator` as const)}
                    className="mr-2"
                  />
                  <span>{t('yes')}</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="nao"
                    {...register(`${kind}.elevator` as const)}
                    className="mr-2"
                  />
                  <span>{t('no')}</span>
                </label>
              </div>
              {blockErrors.elevator && (
                <p className="text-sm text-red-500 mt-1">
                  {blockErrors.elevator.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('floor')}
              </label>
              <input
                type="text"
                placeholder={t('floor_placeholder')}
                {...register(`${kind}.floor` as const)}
                className={NORMAL_INPUT}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
