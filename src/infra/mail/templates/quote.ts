import type { Quote, QuoteAddress } from '../../../core/entities/Quote';
import { BASE_STYLES, escapeHtml, fmtDateTimePtBR } from './shared';

const TYPE_LABEL: Record<Quote['type'], string> = {
  residencial: 'Residencial',
  comercial: 'Comercial',
};

const PROPERTY_LABEL: Record<QuoteAddress['property_type'], string> = {
  house: 'Casa',
  apartment: 'Apartamento',
};

const ELEVATOR_LABEL: Record<NonNullable<QuoteAddress['elevator']>, string> = {
  sim: 'Sim',
  nao: 'Não',
};

function addressBlock(title: string, addr: QuoteAddress): string {
  const e = escapeHtml;
  const elev = addr.elevator ? ELEVATOR_LABEL[addr.elevator] : '—';
  return `
    <div class="section">
      <h3>${e(title)}</h3>
      <div class="field"><strong>CEP:</strong> ${e(addr.zipcode)}</div>
      <div class="field"><strong>Endereço:</strong> ${e(addr.street)}</div>
      <div class="field"><strong>Número:</strong> ${e(addr.number || '—')}</div>
      <div class="field"><strong>Bairro:</strong> ${e(addr.district)}</div>
      <div class="field"><strong>Cidade:</strong> ${e(addr.city)}</div>
      <div class="field"><strong>Estado:</strong> ${e(addr.state)}</div>
      <div class="field"><strong>Tipo:</strong> ${e(PROPERTY_LABEL[addr.property_type])}</div>
      ${
        addr.property_type === 'apartment'
          ? `<div class="field"><strong>Elevador:</strong> ${e(elev)}</div>
             <div class="field"><strong>Andar:</strong> ${e(addr.floor || '—')}</div>`
          : ''
      }
    </div>`;
}

export function quoteHtml(data: Quote): string {
  const e = escapeHtml;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Nova Solicitação de Orçamento</title>
<style>${BASE_STYLES}</style></head>
<body>
  <div class="header"><h1>Nova Solicitação de Orçamento</h1></div>
  <div class="content">
    <div class="section">
      <h3>Dados do Cliente</h3>
      <div class="field"><strong>Nome:</strong> ${e(data.name)}</div>
      <div class="field"><strong>E-mail:</strong> ${e(data.email)}</div>
      <div class="field"><strong>Tipo de Mudança:</strong> ${e(TYPE_LABEL[data.type])}</div>
      ${data.residential_phone ? `<div class="field"><strong>Telefone Residencial:</strong> ${e(data.residential_phone)}</div>` : ''}
      ${data.commercial_phone ? `<div class="field"><strong>Telefone Comercial:</strong> ${e(data.commercial_phone)}</div>` : ''}
      <div class="field"><strong>Telefone Celular:</strong> ${e(data.mobile_phone)}</div>
    </div>
    ${addressBlock('Local de Origem', data.origin)}
    ${addressBlock('Local de Destino', data.destination)}
    ${
      data.observations
        ? `<div class="section">
             <h3>Observações</h3>
             <div class="message-box">${e(data.observations).replace(/\n/g, '<br>')}</div>
           </div>`
        : ''
    }
    <div class="section">
      <p><strong>Data da solicitação:</strong> ${fmtDateTimePtBR()}</p>
    </div>
  </div>
</body>
</html>`;
}

export function quoteUserConfirmHtml(data: Quote): string {
  const e = escapeHtml;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Recebemos sua solicitação - FDS Logística</title>
<style>${BASE_STYLES}</style></head>
<body>
  <div class="header"><h1>Solicitação Recebida com Sucesso!</h1></div>
  <div class="content">
    <div class="section">
      <p>Olá <strong>${e(data.name)}</strong>,</p>
      <div class="highlight-box">
        <h3 style="color:#16a085;margin-top:0;">Sua solicitação de orçamento foi recebida!</h3>
        <p>Nossa equipe entrará em contato em breve para fornecer todas as informações sobre sua mudança.</p>
      </div>
    </div>
    <div class="section">
      <h3 style="color:#16a085;">Próximos Passos:</h3>
      <ul>
        <li>Nossa equipe analisará sua solicitação</li>
        <li>Entraremos em contato por telefone ou e-mail</li>
        <li>Enviaremos uma proposta personalizada</li>
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
