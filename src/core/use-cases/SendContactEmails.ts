import 'server-only';
import type { IMailGateway } from '../../adapters/gateways/IMailGateway';
import type { Contact } from '../entities/Contact';
import { contactCompanyHtml } from '../../infra/mail/templates/contactCompany';
import { contactUserHtml } from '../../infra/mail/templates/contactUser';

export class SendContactEmails {
  constructor(private mail: IMailGateway) {}

  async execute(data: Contact, adminAddress: string): Promise<void> {
    await this.mail.send({
      to: adminAddress,
      subject: `Nova Mensagem de Contato - ${data.subject}`,
      html: contactCompanyHtml(data),
      replyTo: data.email,
      replyToName: data.name,
    });

    await this.mail.send({
      to: data.email,
      subject: 'Confirmação - Mensagem Recebida - FDS Logística',
      html: contactUserHtml(data),
    });
  }
}
