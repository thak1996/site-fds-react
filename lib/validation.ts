import { z } from 'zod';

export type QuoteMessages = {
  type: string;
  name: string;
  email_required: string;
  email_invalid: string;
  mobile_phone: string;
  origin_zipcode_required: string;
  origin_zipcode_regex: string;
  origin_street: string;
  origin_district: string;
  origin_city: string;
  origin_state: string;
  origin_type: string;
  origin_elevator: string;
  destination_zipcode_required: string;
  destination_zipcode_regex: string;
  destination_street: string;
  destination_district: string;
  destination_city: string;
  destination_state: string;
  destination_type: string;
  destination_elevator: string;
};

export type ContactMessages = {
  name: string;
  email_required: string;
  email_invalid: string;
  phone: string;
  subject: string;
  message: string;
};

const ZIP_REGEX = /^\d{5}-?\d{3}$/;

export function buildContactSchema(m: ContactMessages) {
  return z.object({
    name: z.string().trim().min(1, m.name),
    email: z.string().trim().min(1, m.email_required).email(m.email_invalid),
    phone: z.string().trim().min(1, m.phone),
    subject: z.string().trim().min(1, m.subject),
    message: z.string().trim().min(1, m.message),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof buildContactSchema>>;

export function buildQuoteSchema(m: QuoteMessages) {
  const addressBlock = (kind: 'origin' | 'destination') => {
    const isOrigin = kind === 'origin';
    return z
      .object({
        zipcode: z
          .string()
          .trim()
          .min(1, isOrigin ? m.origin_zipcode_required : m.destination_zipcode_required)
          .regex(ZIP_REGEX, isOrigin ? m.origin_zipcode_regex : m.destination_zipcode_regex),
        street: z
          .string()
          .trim()
          .min(1, isOrigin ? m.origin_street : m.destination_street),
        number: z.string().nullable().optional(),
        district: z
          .string()
          .trim()
          .min(1, isOrigin ? m.origin_district : m.destination_district),
        city: z
          .string()
          .trim()
          .min(1, isOrigin ? m.origin_city : m.destination_city),
        state: z
          .string()
          .trim()
          .min(1, isOrigin ? m.origin_state : m.destination_state),
        property_type: z.enum(['house', 'apartment'], {
          message: isOrigin ? m.origin_type : m.destination_type,
        }),
        elevator: z.string().nullable().optional(),
        floor: z.string().nullable().optional(),
      })
      .superRefine((val, ctx) => {
        if (val.property_type === 'apartment' && val.elevator !== 'sim' && val.elevator !== 'nao') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['elevator'],
            message: isOrigin ? m.origin_elevator : m.destination_elevator,
          });
        }
      });
  };

  return z.object({
    type: z.enum(['residencial', 'comercial'], {
      message: m.type,
    }),
    name: z.string().trim().min(1, m.name),
    residential_phone: z.string().nullable().optional(),
    commercial_phone: z.string().nullable().optional(),
    mobile_phone: z.string().trim().min(1, m.mobile_phone),
    email: z.string().trim().min(1, m.email_required).email(m.email_invalid),
    origin: addressBlock('origin'),
    destination: addressBlock('destination'),
    observations: z.string().nullable().optional(),
  });
}

export type QuoteFormValues = z.infer<ReturnType<typeof buildQuoteSchema>>;
