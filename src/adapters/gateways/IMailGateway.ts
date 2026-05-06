export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  replyToName?: string;
}

export interface IMailGateway {
  send(message: MailMessage): Promise<void>;
}
