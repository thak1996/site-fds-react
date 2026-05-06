import type { Address } from './Address';

export interface QuoteAddress extends Address {
  number: string;
  zipcode: string;
  property_type: 'house' | 'apartment';
  elevator?: 'sim' | 'nao';
  floor: string;
}

export interface Quote {
  type: 'residencial' | 'comercial';
  name: string;
  residential_phone: string;
  commercial_phone: string;
  mobile_phone: string;
  email: string;
  origin: QuoteAddress;
  destination: QuoteAddress;
  observations: string;
}
