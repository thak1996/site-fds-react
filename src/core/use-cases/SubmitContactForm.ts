import type { Contact } from '../entities/Contact';

export class SubmitContactForm {
  async execute(contact: Contact): Promise<void> {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error(`contact submission failed (HTTP ${response.status})`);
    }
  }
}
