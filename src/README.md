# 🌍 NomadHub

> Plataforma web mobile-first que conecta freelancers nômades digitais com projetos remotos ao redor do mundo.

![NomadHub](https://img.shields.io/badge/version-1.0.0--mvp-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)

---

## 🎯 Projeto Pronto para Deploy!

**👉 COMECE AQUI:** [00_LEIA_PRIMEIRO.md](./00_LEIA_PRIMEIRO.md)

Este projeto está **100% configurado** e **organizado** para exportar e fazer deploy em produção!

---

## 🚀 Guias de Deploy

- ⭐ **[00_LEIA_PRIMEIRO.md](./00_LEIA_PRIMEIRO.md)** - **COMECE AQUI!**
- 🚀 **[START_HERE.md](./START_HERE.md)** - Deploy em 3 passos (15-30 min)
- 📖 **[EXPORT_AND_DEPLOY.md](./EXPORT_AND_DEPLOY.md)** - Guia completo
- 📸 **[VISUAL_GUIDE.md](./VISUAL_GUIDE.md)** - Guia visual com diagramas
- ✅ **[DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)** - Checklist

## 📚 Documentação Técnica

- 📡 **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - 30+ endpoints
- 🐙 **[GITHUB_QUICK_GUIDE.md](./GITHUB_QUICK_GUIDE.md)** - Comandos Git
- 📦 **[EXPORT_SUMMARY.md](./EXPORT_SUMMARY.md)** - Resumo técnico
- 🔗 **[PROJECT_LINKS.md](./PROJECT_LINKS.md)** - Template de links
- 📚 **[DOCS_INDEX.md](./DOCS_INDEX.md)** - Índice completo

---

## ✨ Features

### MVP Completo
- 🎯 **5 Telas Principais** - Home, Projetos, Nômade, Carteira, Perfil
- 🤖 **Proposta com IA** - Geração automática de escopo, cronograma e preço
- 🔐 **Sistema de Escrow** - Pagamentos seguros via Pix, PayPal e Cripto
- ⚖️ **Resolução de Disputas** - Mediação com SLA de 72h
- ✅ **Checklist de Entregas** - Acompanhamento de progresso
- 💬 **Chat Integrado** - Comunicação em tempo real
- 🏆 **Trust Score & Badges** - Sistema de reputação gamificado
- 📊 **Relatórios Fiscais** - Exportação para BR/PT
- 👑 **Painel Admin** - Monitoramento em tempo real

### Tecnologias

#### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Lucide Icons** - Icon system

#### Backend (NestJS)
- **NestJS** - Framework Node.js
- **Prisma** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Ethers.js** - Blockchain integration

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nomadhub.git
cd nomadhub

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

**📖 Para instruções de deploy e produção**, veja [EXPORT_AND_DEPLOY.md](./EXPORT_AND_DEPLOY.md)

## 📱 Screenshots

### Tela Inicial
Dashboard com estatísticas, projetos recomendados e ações rápidas.

### Projetos
Busca e filtros avançados para encontrar projetos remotos.

### Proposta com IA
Geração inteligente de propostas baseada em histórico e mercado.

### Sistema de Escrow
Fluxo completo de pagamento seguro com múltiplos métodos.

### Painel Admin
Monitoramento em tempo real de contratos, webhooks e disputas.

## 🏗️ Arquitetura

### Estrutura de Pastas

```
nomadhub/
├── api/                    # Cliente HTTP
│   └── client.ts          # Funções de API
├── components/            # Componentes reutilizáveis
│   ├── AIProposalGenerator.tsx
│   ├── Badge.tsx
│   ├── BottomTabs.tsx
│   ├── ChatMessage.tsx
│   ├── DeliveryChecklist.tsx
│   ├── DisputeForm.tsx
│   ├── EscrowFlow.tsx
│   ├── FeedCard.tsx
│   ├── FinancialChart.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── ProjectCard.tsx
│   ├── QuickActions.tsx
│   └── TrustScore.tsx
├── screens/               # Páginas da aplicação
│   ├── AdminDashboard.tsx
│   ├── ContractManagement.tsx
│   ├── Home.tsx
│   ├── Nomad.tsx
│   ├── Profile.tsx
│   ├── ProjectDetail.tsx
│   ├── Projects.tsx
│   ├── ProposalCreate.tsx
│   └── Wallet.tsx
├── styles/               # Estilos globais
│   └── globals.css
├── types/                # Tipos TypeScript
│   └── index.ts
├── App.tsx              # App principal
├── router.tsx           # Configuração de rotas
└── main.tsx            # Entry point
```

## 🔌 API Integration

### Endpoints Principais

```typescript
// Autenticação
POST /auth/register
POST /auth/login
GET  /auth/me

// Projetos
GET  /projects
POST /projects
GET  /projects/:id

// Propostas (com IA)
POST /projects/:id/proposals/ai
POST /projects/:id/proposals

// Contratos (Escrow)
POST /contracts/:id/fund
POST /contracts/:id/release
POST /contracts/:id/refund

// Disputas
POST /contracts/:id/disputes

// Admin
GET  /admin/contracts
GET  /admin/webhooks/logs
```

**📖 Documentação completa**: [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)

## 🎨 Design System

### Cores Principais

```css
--blue-600: #2563eb    /* Primary */
--purple-600: #7c3aed  /* Secondary */
--green-600: #10b981   /* Success */
--red-600: #ef4444     /* Danger */
--yellow-600: #f59e0b  /* Warning */
```

### Componentes

- **TrustScore** - Indicador de reputação
- **Badge** - Conquistas gamificadas
- **EscrowFlow** - Fluxo de pagamento
- **AIProposalGenerator** - Interface de IA
- **FinancialChart** - Gráficos financeiros

## 🧪 Testes

```bash
# Executar testes
npm run test

# Cobertura
npm run test:coverage

# E2E
npm run test:e2e
```

## 📦 Build

```bash
# Build para produção
npm run build

# Preview da build
npm run preview

# Type checking
npm run type-check
```

## 🚢 Deploy

### ⚡ Quick Deploy no Vercel

**🎯 [PASSOS_FINAIS_DEFINITIVO.md](./PASSOS_FINAIS_DEFINITIVO.md)** - Execute AGORA! Configuração definitiva ← **COMECE AQUI!**

**📖 [DEPLOY_VERCEL_DEFINITIVO.md](./DEPLOY_VERCEL_DEFINITIVO.md)** - Guia profissional completo

**✅ [CHECKLIST_DEPLOY.md](./CHECKLIST_DEPLOY.md)** - Checklist de validação

**⚡ [EXECUTE_AGORA.md](./EXECUTE_AGORA.md)** - Resumo executivo 5 minutos

```bash
# Método 1: Dashboard (RECOMENDADO)
1. Acesse https://vercel.com/new
2. Conecte o repositório GitHub
3. Configure:
   - Framework: Vite
   - Build Command: npm run build
   - Output Directory: dist
4. Deploy!

# Método 2: CLI
npm i -g vercel
vercel --prod
```

### Opção 2: Netlify

```bash
# Instale a CLI da Netlify
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### ✅ Arquivos já configurados:
- ✅ `/.vercelignore` - Otimização de deploy
- ✅ `/vite.config.ts` - Build configurado
- ✅ `/netlify.toml` - Configuração do Netlify
- ✅ `package.json` - Build script: `vite build`

**📖 Guia completo de deploy**: [EXPORT_AND_DEPLOY.md](./EXPORT_AND_DEPLOY.md)

### Variáveis de Ambiente

```env
# Frontend
VITE_API_URL=https://api.nomadhub.com
VITE_ENV=production

# Opcional
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT=true
```

Veja `.env.example` para todas as variáveis disponíveis.

## 🔐 Segurança

- ✅ Autenticação JWT
- ✅ Proteção CSRF
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection
- ✅ HTTPS only
- ✅ Webhook signature verification

## 📊 Fluxos Principais

### 1. Proposta com IA

```
Freelancer acessa projeto
  → Clica "Gerar com IA"
  → IA analisa: projeto + perfil + mercado
  → Gera: escopo + cronograma + preço
  → Freelancer revisa e edita
  → Envia proposta
```

### 2. Escrow e Pagamento

```
Cliente aceita proposta
  → Cria contrato
  → Financia escrow (Pix/PayPal/Cripto)
  → Freelancer entrega
  → Cliente aprova OU prazo expira
  → Liberação automática
  �� Payout instantâneo
```

### 3. Disputa

```
Parte insatisfeita
  → Abre disputa com evidências
  → Mediação (SLA 72h)
  → Análise imparcial
  → Resolução: release/refund parcial ou total
  → Atualiza Trust Score
```

## 🗺️ Roadmap

### v1.1 (Q1 2026)
- [ ] Notificações push
- [ ] Chat em tempo real (WebSocket)
- [ ] Integração com calendário
- [ ] Sistema de reviews

### v1.2 (Q2 2026)
- [ ] Vídeo chamadas (mentoria)
- [ ] Marketplace de serviços
- [ ] API pública
- [ ] Mobile app (React Native)

### v2.0 (Q3 2026)
- [ ] IA avançada (recomendações)
- [ ] Blockchain para contratos
- [ ] DAOs para governança
- [ ] Multi-moeda (50+ países)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Time

- **Frontend** - React + TypeScript
- **Backend** - NestJS + Prisma
- **Design** - Mobile-first UX
- **Blockchain** - Escrow smart contracts

## 📞 Contato

- **Website**: https://nomadhub.com
- **Email**: hello@nomadhub.com
- **Discord**: https://discord.gg/nomadhub
- **Twitter**: @nomadhub

## 🙏 Agradecimentos

- Comunidade de nômades digitais
- Open source contributors
- Beta testers

---

**Desenvolvido com ❤️ para nômades digitais ao redor do mundo** 🌍