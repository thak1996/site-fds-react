import 'server-only';
import type { IMailGateway } from '../../adapters/gateways/IMailGateway';
import type { Quote } from '../entities/Quote';
import {
  quoteHtml,
  quoteUserConfirmHtml,
} from '../../infra/mail/templates/quote';

export class SendQuoteEmails {
  constructor(private mail: IMailGateway) {}

  async execute(data: Quote, adminAddress: string): Promise<void> {
    await this.mail.send({
      to: adminAddress,
      subject: `NOVO ORÇAMENTO NO SITE - ${data.name}`,
      html: quoteHtml(data),
      replyTo: data.email,
      replyToName: data.name,
    });

    await this.mail.send({
      to: data.email,
      subject: 'Recebemos sua solicitação - FDS Logística',
      html: quoteUserConfirmHtml(data),
    });
  }
}
