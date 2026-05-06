export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function fmtDateTimePtBR(date: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const d = pad(date.getDate());
  const m = pad(date.getMonth() + 1);
  const y = date.getFullYear();
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${d}/${m}/${y} ${h}:${min}`;
}

export const BASE_STYLES = `
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
  .header { background-color: #16a085; color: #fff; padding: 20px; text-align: center; }
  .content { padding: 30px; max-width: 800px; margin: 0 auto; }
  .section { margin-bottom: 30px; }
  .section h3 { color: #16a085; border-bottom: 2px solid #16a085; padding-bottom: 5px; margin-bottom: 15px; }
  .field { margin-bottom: 10px; }
  .field strong { color: #2c3e50; }
  .message-box { background-color: #f8f9fa; border-left: 4px solid #16a085; padding: 15px; margin: 15px 0; border-radius: 4px; }
  .highlight-box { background-color: #e8f5e8; border: 1px solid #16a085; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
  .contact-info { background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
`;
