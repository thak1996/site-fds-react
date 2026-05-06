import 'server-only';
import { z } from 'zod';

const ZIP_REGEX = /^\d{5}-?\d{3}$/;

export const contactServerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(1).max(20),
  subject: z.string().trim().min(1).max(255),
  message: z.string().trim().min(1).max(2000),
});

const addressServerSchema = z.object({
  zipcode: z.string().trim().regex(ZIP_REGEX),
  street: z.string().trim().min(1),
  number: z.string().nullable().optional(),
  district: z.string().trim().min(1),
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
  property_type: z.enum(['house', 'apartment']),
  elevator: z.string().nullable().optional(),
  floor: z.string().nullable().optional(),
});

export const quoteServerSchema = z.object({
  type: z.enum(['residencial', 'comercial']),
  name: z.string().trim().min(1).max(255),
  residential_phone: z.string().nullable().optional(),
  commercial_phone: z.string().nullable().optional(),
  mobile_phone: z.string().trim().min(1).max(25),
  email: z.string().trim().email().max(255),
  origin: addressServerSchema,
  destination: addressServerSchema,
  observations: z.string().nullable().optional(),
});
