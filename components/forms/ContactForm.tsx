'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  buildContactSchema,
  type ContactFormValues,
  type ContactMessages,
} from '@/lib/validation';
import { maskPhone, capitalizeName } from '@/lib/masks';
import { Modal } from '@/components/Modal';
import { SubmitContactForm } from '@/src/core/use-cases/SubmitContactForm';


export function ContactForm() {
  const t = useTranslations('contact_page');
  const tFields = useTranslations('contact_page.fields');
  const tValidation = useTranslations('contact_page.validation');
  const tSuccess = useTranslations('contact_page.success');
  const tError = useTranslations('contact_page.error');

  const messages: ContactMessages = {
    name: tValidation('name'),
    email_required: tValidation('email_required'),
    email_invalid: tValidation('email_invalid'),
    phone: tValidation('phone'),
    subject: tValidation('subject'),
    message: tValidation('message'),
  };

  const schema = buildContactSchema(messages);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const useCase = new SubmitContactForm();
      await useCase.execute(data);
      setShowSuccess(true);
      reset();
    } catch {
      setShowError(true);
    }
  };


  const onInvalid = () => {
    setShowError(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="space-y-6"
        noValidate
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {t('form_title')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                onBlur: (e) => setValue('name', capitalizeName(e.target.value)),
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {tFields('phone')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              maxLength={15}
              placeholder={tFields('phone_placeholder')}
              {...register('phone', {
                onChange: (e) => setValue('phone', maskPhone(e.target.value)),
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {tFields('subject')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              placeholder={tFields('subject_placeholder')}
              {...register('subject')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.subject && (
              <p className="text-sm text-red-500 mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {tFields('message')} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder={tFields('message_placeholder')}
            {...register('message')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.message && (
            <p className="text-sm text-red-500 mt-1">
              {errors.message.message}
            </p>
          )}
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
    </>
  );
}
