import { IAddressGateway } from '../../adapters/gateways/IAddressGateway';
import { Address } from '../entities/Address';

export class GetAddressByCep {
  constructor(private addressGateway: IAddressGateway) {}

  async execute(cep: string): Promise<Address | null> {
    return this.addressGateway.fetchByCep(cep);
  }
}
