# site-fds-react

Site institucional da **FDS Logística e Terceirização** (mudanças residenciais, comerciais, transporte de equipamentos sensíveis, armazenagem e terceirização de mão de obra) em Next.js + TypeScript com **Clean Architecture**.

## Stack

- **Next.js 16** (App Router, SSG por locale, Turbopack)
- **TypeScript** strict
- **Tailwind CSS v4**
- **Clean Architecture** (Core/Entities, Core/Use-Cases, Adapters/Gateways, Infra)
- **next-intl** para i18n (PT-BR padrão, EN secundário)
- **react-hook-form + Zod** para formulários (validação no cliente E no servidor)
- **ViaCEP** para auto-preenchimento de endereço
- **Nodemailer** para envio de e-mails via SMTP

## Estrutura

```
app/
  [locale]/          # rotas localizadas: /, /company, /service, /quote, /contact, /no-access
  api/               # route handlers server-side (POST /api/contact, /api/quote)
components/          # Header, Footer, FeatureCard, Modal, LanguageSwitcher
components/forms/    # ContactForm, QuoteForm, AddressFields
src/
  core/
    entities/        # Address, Contact, Quote
    use-cases/       # SubmitContactForm, SubmitQuoteForm (client → fetch),
                     # SendContactEmails, SendQuoteEmails (server),
                     # GetAddressByCep
  adapters/
    gateways/        # IAddressGateway, IMailGateway
  infra/
    external/        # ViaCepGateway
    mail/            # NodemailerMailGateway, server-schemas, templates/
lib/                 # masks, validation
i18n/                # routing, request, navigation (next-intl)
messages/            # pt-BR.json, en.json
proxy.ts             # roteamento por locale (convenção Next 16)
```

## Requisitos

- Node.js 22+ (ver [.nvmrc](.nvmrc))
- npm 10+
- Docker 24+ (opcional)

## Variáveis de ambiente

Copie [`.env.example`](.env.example) para `.env` (Docker) ou `.env.local` (dev local). As variáveis SMTP usam **os mesmos nomes do Laravel** (`MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_ENCRYPTION`, `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME`, `MAIL_COPY_ADDRESS`), basta migrar.

## Desenvolvimento

```bash
npm install
npm run dev
```

Servidor em http://localhost:3000 com hot reload nativo do Turbopack.

## Produção (Docker)

```bash
docker compose up -d --build
```

Imagem multi-stage com Next standalone (~312MB), user não-root, healthcheck. Lê `.env` automaticamente via `env_file`. Serve em http://localhost:3000 (mude com `APP_PORT=8080 docker compose up`).

## Scripts

| Comando               | Ação                                    |
| --------------------- | --------------------------------------- |
| `npm run dev`         | Dev server (Turbopack, hot reload)      |
| `npm run build`       | Build de produção (12 páginas SSG)      |
| `npm run start`       | Inicia o build de produção              |
| `npm run lint`        | ESLint                                  |
| `npm run typecheck`   | TypeScript sem emitir                   |
| `npm run format`      | Prettier (escreve)                      |
| `npm run format:check`| Prettier (apenas check)                 |

## Internacionalização

Textos em `messages/pt-BR.json` (default) e `messages/en.json`. Toggle PT/EN no header reescreve a URL para `/en/...` ou `/`.

## Camada de envio (SMTP via Nodemailer)

Cada submissão dispara **dois e-mails**, espelhando o padrão do Laravel:

| Origem | Destino admin (`MAIL_COPY_ADDRESS`) | Destino usuário |
|---|---|---|
| `/api/contact` | "Nova Mensagem de Contato - {assunto}" com `Reply-To` do cliente | "Confirmação - Mensagem Recebida - FDS Logística" |
| `/api/quote`   | "NOVO ORÇAMENTO NO SITE - {nome}" com `Reply-To` do cliente | "Recebemos sua solicitação - FDS Logística" |

Fluxo:

```
Form (client)
  → SubmitContactForm.execute()    [src/core/use-cases]
    → fetch('/api/contact')        [HTTP]
      → contactServerSchema.parse  [revalida no servidor — defesa em profundidade]
      → SendContactEmails.execute  [src/core/use-cases]
        → NodemailerMailGateway.send  [src/infra/mail — SMTP]
```

Templates HTML em [`src/infra/mail/templates/`](src/infra/mail/templates/) com a paleta verde do site (`#16a085`).

### Testando localmente com Mailpit

O projeto já inclui o **Mailpit** integrado ao `docker-compose.yml`. Para testar o envio de e-mails:

1. Suba o ambiente: `docker compose up -d`
2. Configure as variáveis no seu `.env` ou `.env.local`:
   - Se o site estiver rodando **dentro do Docker**: `MAIL_HOST=mailpit`
   - Se o site estiver rodando **fora do Docker** (npm run dev): `MAIL_HOST=localhost`
   - Porta: `1025`
3. Acesse a interface do Mailpit em [http://localhost:8025](http://localhost:8025) para ver os e-mails capturados.
