import type { Contact } from '../../../core/entities/Contact';
import { BASE_STYLES, escapeHtml, fmtDateTimePtBR } from './shared';

export function contactCompanyHtml(data: Contact): string {
  const e = escapeHtml;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Nova Mensagem de Contato</title>
<style>${BASE_STYLES}</style></head>
<body>
  <div class="header"><h1>Nova Mensagem de Contato</h1></div>
  <div class="content">
    <div class="section">
      <h3>Dados do Contato</h3>
      <div class="field"><strong>Nome:</strong> ${e(data.name)}</div>
      <div class="field"><strong>E-mail:</strong> ${e(data.email)}</div>
      <div class="field"><strong>Telefone:</strong> ${e(data.phone)}</div>
      <div class="field"><strong>Assunto:</strong> ${e(data.subject)}</div>
    </div>
    <div class="section">
      <h3>Mensagem</h3>
      <div class="message-box">${e(data.message).replace(/\n/g, '<br>')}</div>
    </div>
    <div class="section">
      <p><strong>Data da mensagem:</strong> ${fmtDateTimePtBR()}</p>
    </div>
  </div>
</body>
</html>`;
}
