import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import type {
  IMailGateway,
  MailMessage,
} from '../../adapters/gateways/IMailGateway';

type Encryption = 'tls' | 'ssl' | '';

function readEnv() {
  const host = process.env.MAIL_HOST;
  const portRaw = process.env.MAIL_PORT;
  const username = process.env.MAIL_USERNAME ?? '';
  const password = process.env.MAIL_PASSWORD ?? '';
  const encryption = (
    process.env.MAIL_ENCRYPTION ?? ''
  ).toLowerCase() as Encryption;
  const fromAddress = process.env.MAIL_FROM_ADDRESS;
  const fromName =
    process.env.MAIL_FROM_NAME ?? 'FDS Logística e Terceirização';

  if (!host || !portRaw || !fromAddress) {
    throw new Error(
      'Missing SMTP env vars. Required: MAIL_HOST, MAIL_PORT, MAIL_FROM_ADDRESS.',
    );
  }

  const port = Number.parseInt(portRaw, 10);
  if (Number.isNaN(port)) {
    throw new Error(`MAIL_PORT must be a number, got "${portRaw}".`);
  }

  return { host, port, username, password, encryption, fromAddress, fromName };
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const { host, port, username, password, encryption } = readEnv();

  // ssl => port 465 with TLS at connect; tls => STARTTLS on 587; empty => plain (dev only)
  const secure = encryption === 'ssl';
  const auth = username || password ? { user: username, pass: password } : undefined;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth,
    requireTLS: encryption === 'tls',
  });

  return cachedTransporter;
}

export class NodemailerMailGateway implements IMailGateway {
  async send(message: MailMessage): Promise<void> {
    const { fromAddress, fromName } = readEnv();
    const transporter = getTransporter();

    await transporter.sendMail({
      from: { name: fromName, address: fromAddress },
      to: message.to,
      subject: message.subject,
      html: message.html,
      replyTo: message.replyTo
        ? message.replyToName
          ? { name: message.replyToName, address: message.replyTo }
          : message.replyTo
        : undefined,
    });
  }
}
