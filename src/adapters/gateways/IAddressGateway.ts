import { Address } from '../../core/entities/Address';

export interface IAddressGateway {
  fetchByCep(cep: string): Promise<Address | null>;
}
