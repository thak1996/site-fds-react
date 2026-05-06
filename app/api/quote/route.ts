import 'server-only';
import { NextResponse } from 'next/server';
import { quoteServerSchema } from '@/src/infra/mail/server-schemas';
import { NodemailerMailGateway } from '@/src/infra/mail/NodemailerMailGateway';
import { SendQuoteEmails } from '@/src/core/use-cases/SendQuoteEmails';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = quoteServerSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation_failed', issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const adminAddress = process.env.MAIL_COPY_ADDRESS;
  if (!adminAddress) {
    console.error('MAIL_COPY_ADDRESS not set');
    return NextResponse.json({ error: 'misconfigured' }, { status: 500 });
  }

  try {
    const useCase = new SendQuoteEmails(new NodemailerMailGateway());
    await useCase.execute(parsed.data, adminAddress);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error sending quote emails', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
