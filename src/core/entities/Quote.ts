import type { Address } from './Address';

export interface QuoteAddress extends Address {
  number?: string | null;
  zipcode: string;
  property_type: 'house' | 'apartment';
  elevator?: string | null;
  floor?: string | null;
}

export interface Quote {
  type: 'residencial' | 'comercial';
  name: string;
  residential_phone?: string | null;
  commercial_phone?: string | null;
  mobile_phone: string;
  email: string;
  origin: QuoteAddress;
  destination: QuoteAddress;
  observations?: string | null;
}
