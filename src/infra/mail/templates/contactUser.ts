import type { Contact } from '../../../core/entities/Contact';
import { BASE_STYLES, escapeHtml } from './shared';

export function contactUserHtml(data: Contact): string {
  const e = escapeHtml;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Confirmação - Mensagem Recebida</title>
<style>${BASE_STYLES}</style></head>
<body>
  <div class="header"><h1>Mensagem Recebida com Sucesso!</h1></div>
  <div class="content">
    <div class="section">
      <p>Olá <strong>${e(data.name)}</strong>,</p>
      <div class="highlight-box">
        <h3 style="color:#16a085;margin-top:0;">Sua mensagem foi recebida!</h3>
        <p>Recebemos sua mensagem sobre "<strong>${e(data.subject)}</strong>" e nossa equipe entrará em contato em breve.</p>
      </div>
      <p>Agradecemos seu interesse em nossos serviços de logística e terceirização. Nossa equipe irá analisar sua mensagem e retornar o contato o mais rápido possível.</p>
    </div>
    <div class="section">
      <h3 style="color:#16a085;">Próximos Passos:</h3>
      <ul>
        <li>Nossa equipe analisará sua mensagem</li>
        <li>Entraremos em contato por telefone ou e-mail</li>
        <li>Forneceremos todas as informações solicitadas</li>
      </ul>
    </div>
    <div class="contact-info">
      <h4 style="color:#16a085;margin-top:0;">Informações de Contato:</h4>
      <p>
        <strong>Telefone:</strong> (11) 9 8217-0520<br>
        <strong>E-mail:</strong> contato@fdslogistica.com.br<br>
        <strong>Endereço:</strong> Rua Palhoça, 398 - Parque Industrial Cumbica - Guarulhos/SP
      </p>
    </div>
    <div class="section">
      <p>Atenciosamente,</p>
      <p><strong>Equipe FDS Logística e Terceirização</strong></p>
    </div>
  </div>
</body>
</html>`;
}
