import { Address } from '../../core/entities/Address';
import { IAddressGateway } from '../../adapters/gateways/IAddressGateway';

type ViaCepResponse = {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean | string;
};

export class ViaCepGateway implements IAddressGateway {
  async fetchByCep(cep: string): Promise<Address | null> {
    const cleaned = cep.replace(/\D/g, '');
    if (cleaned.length !== 8) return null;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
      if (!response.ok) return null;

      const data = (await response.json()) as ViaCepResponse;
      if (data.erro) return null;

      return {
        street: data.logradouro ?? '',
        district: data.bairro ?? '',
        city: data.localidade ?? '',
        state: data.uf ?? '',
      };
    } catch (error) {
      console.error('Error fetching CEP:', error);
      return null;
    }
  }
}
