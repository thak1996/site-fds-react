import type { Quote } from '../entities/Quote';

export class SubmitQuoteForm {
  async execute(quote: Quote): Promise<void> {
    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote),
    });

    if (!response.ok) {
      throw new Error(`quote submission failed (HTTP ${response.status})`);
    }
  }
}
