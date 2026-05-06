'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  buildQuoteSchema,
  type QuoteFormValues,
  type QuoteMessages,
} from '@/lib/validation';
import { maskPhone, capitalizeName } from '@/lib/masks';
import { Modal } from '@/components/Modal';
import { AddressFields } from './AddressFields';
import { SubmitQuoteForm } from '@/src/core/use-cases/SubmitQuoteForm';


const NORMAL_INPUT =
  'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500';

const PHONE_FIELDS = [
  'residential_phone',
  'commercial_phone',
  'mobile_phone',
] as const;

export function QuoteForm() {
  const t = useTranslations('quote_page');
  const tFields = useTranslations('quote_page.fields');
  const tSections = useTranslations('quote_page.sections');
  const tValidation = useTranslations('quote_page.validation');
  const tSuccess = useTranslations('quote_page.success');
  const tError = useTranslations('quote_page.error');

  const messages: QuoteMessages = {
    type: tValidation('type'),
    name: tValidation('name'),
    email_required: tValidation('email_required'),
    email_invalid: tValidation('email_invalid'),
    mobile_phone: tValidation('mobile_phone'),
    origin_zipcode_required: tValidation('origin_zipcode_required'),
    origin_zipcode_regex: tValidation('origin_zipcode_regex'),
    origin_street: tValidation('origin_street'),
    origin_district: tValidation('origin_district'),
    origin_city: tValidation('origin_city'),
    origin_state: tValidation('origin_state'),
    origin_type: tValidation('origin_type'),
    origin_elevator: tValidation('origin_elevator'),
    destination_zipcode_required: tValidation('destination_zipcode_required'),
    destination_zipcode_regex: tValidation('destination_zipcode_regex'),
    destination_street: tValidation('destination_street'),
    destination_district: tValidation('destination_district'),
    destination_city: tValidation('destination_city'),
    destination_state: tValidation('destination_state'),
    destination_type: tValidation('destination_type'),
    destination_elevator: tValidation('destination_elevator'),
  };

  const schema = buildQuoteSchema(messages);

  const methods = useForm<QuoteFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: undefined,
      name: '',
      residential_phone: '',
      commercial_phone: '',
      mobile_phone: '',
      email: '',
      origin: {
        zipcode: '',
        street: '',
        number: '',
        district: '',
        city: '',
        state: '',
        property_type: undefined,
        elevator: undefined,
        floor: '',
      },
      destination: {
        zipcode: '',
        street: '',
        number: '',
        district: '',
        city: '',
        state: '',
        property_type: undefined,
        elevator: undefined,
        floor: '',
      },
      observations: '',
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const onSubmit = async (data: QuoteFormValues) => {
    try {
      const useCase = new SubmitQuoteForm();
      await useCase.execute(data);
      setShowSuccess(true);
      reset();
    } catch {
      setShowError(true);
    }
  };


  const onInvalid = () => setShowError(true);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="space-y-6"
        noValidate
      >
        {/* Bloco de contato */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {tSections('contact')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tFields('type')} <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="residencial"
                    {...register('type')}
                    className="mr-2"
                  />
                  <span>{tFields('residential')}</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="comercial"
                    {...register('type')}
                    className="mr-2"
                  />
                  <span>{tFields('commercial')}</span>
                </label>
              </div>
              {errors.type && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {tFields('name')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  onBlur: (e) =>
                    setValue('name', capitalizeName(e.target.value)),
                })}
                className={NORMAL_INPUT}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {PHONE_FIELDS.map((fieldName) => {
              const labelKey =
                fieldName === 'residential_phone'
                  ? 'res_phone'
                  : fieldName === 'commercial_phone'
                    ? 'com_phone'
                    : 'mob_phone';
              const required = fieldName === 'mobile_phone';
              return (
                <div key={fieldName}>
                  <label
                    htmlFor={fieldName}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {tFields(labelKey)}
                    {required && <span className="text-red-500"> *</span>}
                  </label>
                  <input
                    type="text"
                    id={fieldName}
                    maxLength={15}
                    placeholder={tFields('phone_placeholder')}
                    {...register(fieldName, {
                      onChange: (e) =>
                        setValue(fieldName, maskPhone(e.target.value)),
                    })}
                    className={NORMAL_INPUT}
                  />
                  {errors[fieldName] && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[fieldName]?.message}
                    </p>
                  )}
                </div>
              );
            })}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {tFields('email')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={NORMAL_INPUT}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Endereço de origem */}
        <AddressFields kind="origin" sectionTitle={tSections('origin')} />

        {/* Endereço de destino */}
        <AddressFields
          kind="destination"
          sectionTitle={tSections('destination')}
        />

        {/* Observações */}
        <div className="bg-white p-6 rounded-lg shadow">
          <label
            htmlFor="observations"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {tFields('observations')}
          </label>
          <textarea
            id="observations"
            rows={4}
            placeholder={tFields('observations_placeholder')}
            {...register('observations')}
            className={NORMAL_INPUT}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition disabled:opacity-60"
          >
            {t('submit')}
          </button>
        </div>
      </form>

      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        variant="success"
        title={tSuccess('title')}
        message={tSuccess('message')}
        details={
          <>
            <strong>{tSuccess('details_heading')}</strong>
            <br />• {tSuccess('details_l1')}
            <br />• {tSuccess('details_l2')}
            <br />• {tSuccess('details_l3')}
          </>
        }
      />

      <Modal
        open={showError}
        onClose={() => setShowError(false)}
        variant="error"
        title={tError('title')}
        message={tError('message')}
        details={
          <>
            <strong>{tError('details_heading')}</strong>
            <br />• {tError('details_l1')}
            <br />• {tError('details_l2')}
            <br />• {tError('details_l3')}
          </>
        }
      />
    </FormProvider>
  );
}
