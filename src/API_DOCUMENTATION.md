# 📡 Documentação da API - NomadHub

Esta documentação descreve todos os endpoints mockados no arquivo `/api/client.ts`.

**Status Atual:** API Mockada (dados fictícios para desenvolvimento frontend)

**Próximo Passo:** Substituir mocks por chamadas reais à API NestJS

---

## 🔑 Base URL

```
Desenvolvimento: http://localhost:3000/api
Produção: https://api.nomadhub.com
```

---

## 📋 Índice

1. [Autenticação](#autenticação)
2. [Usuários](#usuários)
3. [Projetos](#projetos)
4. [Propostas](#propostas)
5. [Contratos](#contratos)
6. [Escrow](#escrow)
7. [Entregas](#entregas)
8. [Transações](#transações)
9. [Comunidade](#comunidade)
10. [Disputas](#disputas)
11. [IA](#ia)
12. [Relatórios](#relatórios)

---

## 🔐 Autenticação

### POST `/auth/register`
Registra um novo usuário.

**Request Body:**
```typescript
{
  name: string;
  email: string;
  password: string;
  role: 'freelancer' | 'client';
  country: string;
}
```

**Response:**
```typescript
{
  user: User;
  token: string;
}
```

**Mock:** Retorna usuário fictício + token

---

### POST `/auth/login`
Faz login de usuário existente.

**Request Body:**
```typescript
{
  email: string;
  password: string;
}
```

**Response:**
```typescript
{
  user: User;
  token: string;
}
```

**Mock:** Retorna usuário fictício + token

---

## 👤 Usuários

### GET `/users/me`
Retorna dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```typescript
User {
  id: string;
  name: string;
  email: string;
  role: 'freelancer' | 'client';
  country: string;
  trustScore: number;
  verified: boolean;
  createdAt: string;
  rating?: number;
  completedProjects?: number;
  balance?: number;
  bio?: string;
  skills?: string[];
  avatar?: string;
}
```

**Mock:** Retorna João Silva (freelancer BR, Trust Score 92)

---

### PATCH `/users/me`
Atualiza perfil do usuário.

**Request Body:** Partial<User>

**Response:** User atualizado

**Mock:** Retorna dados atualizados

---

### POST `/users/verify`
Inicia processo de verificação de identidade.

**Request Body:**
```typescript
{
  documentType: 'passport' | 'id' | 'driver_license';
  documentNumber: string;
  documentFile: File;
}
```

**Response:**
```typescript
{
  verificationId: string;
  status: 'pending' | 'approved' | 'rejected';
}
```

**Mock:** Retorna verificação aprovada

---

### GET `/users/:id`
Retorna perfil público de um usuário.

**Response:** User (dados públicos apenas)

**Mock:** Retorna usuário fictício

---

## 💼 Projetos

### GET `/projects`
Lista todos os projetos (com filtros opcionais).

**Query Parameters:**
```typescript
{
  status?: 'open' | 'in_progress' | 'completed' | 'disputed';
  category?: string;
  minBudget?: number;
  maxBudget?: number;
  search?: string;
  page?: number;
  limit?: number;
}
```

**Response:**
```typescript
{
  projects: Project[];
  total: number;
  page: number;
  pages: number;
}
```

**Mock:** Retorna 3 projetos fictícios

---

### GET `/projects/:id`
Retorna detalhes de um projeto específico.

**Response:**
```typescript
Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: ProjectStatus;
  clientId: string;
  category: string;
  skills: string[];
  deadline: string;
  createdAt: string;
  proposals?: number;
  applicants?: number;
}
```

**Mock:** Retorna projeto específico

---

### POST `/projects`
Cria um novo projeto (apenas clientes).

**Request Body:**
```typescript
{
  title: string;
  description: string;
  budget: number;
  category: string;
  skills: string[];
  deadline: string;
}
```

**Response:** Project criado

**Mock:** Retorna projeto criado com ID gerado

---

### PATCH `/projects/:id`
Atualiza um projeto existente.

**Request Body:** Partial<CreateProjectDto>

**Response:** Project atualizado

**Mock:** Retorna projeto atualizado

---

### DELETE `/projects/:id`
Deleta um projeto.

**Response:** `{ success: true }`

**Mock:** Retorna sucesso

---

## 📝 Propostas

### GET `/proposals`
Lista propostas (do usuário ou de um projeto).

**Query Parameters:**
```typescript
{
  projectId?: string;
  status?: 'pending' | 'accepted' | 'rejected';
}
```

**Response:**
```typescript
{
  proposals: Proposal[];
}
```

**Mock:** Retorna 2 propostas fictícias

---

### GET `/proposals/:id`
Retorna uma proposta específica.

**Response:**
```typescript
Proposal {
  id: string;
  projectId: string;
  freelancerId: string;
  amount: number;
  deliveryTime: number; // dias
  coverLetter: string;
  status: ProposalStatus;
  createdAt: string;
}
```

**Mock:** Retorna proposta específica

---

### POST `/proposals`
Cria uma nova proposta para um projeto.

**Request Body:**
```typescript
{
  projectId: string;
  amount: number;
  deliveryTime: number;
  coverLetter: string;
  aiGenerated?: boolean;
}
```

**Response:** Proposal criada

**Mock:** Retorna proposta criada

---

### PATCH `/proposals/:id/accept`
Aceita uma proposta (cliente).

**Response:** Proposal com status 'accepted' + Contract criado

**Mock:** Retorna proposta aceita

---

### PATCH `/proposals/:id/reject`
Rejeita uma proposta (cliente).

**Response:** Proposal com status 'rejected'

**Mock:** Retorna proposta rejeitada

---

## 📄 Contratos

### GET `/contracts`
Lista contratos do usuário.

**Query Parameters:**
```typescript
{
  status?: 'active' | 'completed' | 'disputed' | 'cancelled';
}
```

**Response:**
```typescript
{
  contracts: Contract[];
}
```

**Mock:** Retorna 2 contratos fictícios

---

### GET `/contracts/:id`
Retorna detalhes de um contrato.

**Response:**
```typescript
Contract {
  id: string;
  projectId: string;
  freelancerId: string;
  clientId: string;
  amount: number;
  escrowStatus: EscrowStatus;
  status: 'active' | 'completed' | 'disputed' | 'cancelled';
  startDate: string;
  deadline: string;
  deliveryChecklistItems?: ChecklistItem[];
}
```

**Mock:** Retorna contrato específico

---

### POST `/contracts/:id/cancel`
Cancela um contrato (requer acordo de ambas partes).

**Response:** Contract com status 'cancelled'

**Mock:** Retorna contrato cancelado

---

## 💰 Escrow

### POST `/escrow/fund`
Cliente deposita fundos no escrow.

**Request Body:**
```typescript
{
  contractId: string;
  amount: number;
  paymentMethod: 'card' | 'bank_transfer' | 'crypto';
}
```

**Response:**
```typescript
{
  escrowId: string;
  status: 'funded';
  amount: number;
}
```

**Mock:** Retorna escrow financiado

---

### POST `/escrow/release`
Libera fundos do escrow para o freelancer (cliente).

**Request Body:**
```typescript
{
  contractId: string;
  amount: number;
  deliveryId?: string;
}
```

**Response:**
```typescript
{
  escrowId: string;
  status: 'released';
  amount: number;
  transaction: Transaction;
}
```

**Mock:** Retorna escrow liberado + transação

---

### POST `/escrow/refund`
Reembolsa fundos do escrow para o cliente.

**Request Body:**
```typescript
{
  contractId: string;
  amount: number;
  reason: string;
}
```

**Response:** Escrow reembolsado + Transaction

**Mock:** Retorna escrow reembolsado

---

## 📦 Entregas

### POST `/deliveries`
Freelancer submete uma entrega.

**Request Body:**
```typescript
{
  contractId: string;
  description: string;
  files: string[]; // URLs
  checklistItems?: string[];
}
```

**Response:**
```typescript
Delivery {
  id: string;
  contractId: string;
  description: string;
  files: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}
```

**Mock:** Retorna entrega criada

---

### PATCH `/deliveries/:id/approve`
Cliente aprova uma entrega.

**Response:** Delivery aprovada + Escrow release automático

**Mock:** Retorna entrega aprovada

---

### PATCH `/deliveries/:id/reject`
Cliente rejeita uma entrega (com motivo).

**Request Body:**
```typescript
{
  reason: string;
  requestedChanges: string[];
}
```

**Response:** Delivery rejeitada

**Mock:** Retorna entrega rejeitada

---

## 💳 Transações

### GET `/transactions`
Lista transações do usuário.

**Query Parameters:**
```typescript
{
  type?: 'escrow_fund' | 'escrow_release' | 'refund' | 'withdrawal';
  startDate?: string;
  endDate?: string;
}
```

**Response:**
```typescript
{
  transactions: Transaction[];
  balance: number;
}
```

**Mock:** Retorna 5 transações fictícias

---

### POST `/transactions/payout`
Freelancer solicita saque.

**Request Body:**
```typescript
{
  amount: number;
  method: 'bank_transfer' | 'paypal' | 'crypto';
  accountDetails: object;
}
```

**Response:** Transaction de saque criada

**Mock:** Retorna transação de saque

---

### POST `/transactions/withdraw`
Realiza saque de fundos.

**Request Body:**
```typescript
{
  amount: number;
  destination: string;
}
```

**Response:** Transaction de saque processada

**Mock:** Retorna saque processado

---

## 🌍 Comunidade

### GET `/community/feed`
Retorna feed da comunidade.

**Query Parameters:**
```typescript
{
  page?: number;
  limit?: number;
}
```

**Response:**
```typescript
{
  posts: CommunityPost[];
  total: number;
}
```

**Mock:** Retorna 3 posts fictícios

---

### POST `/community/posts`
Cria um post na comunidade.

**Request Body:**
```typescript
{
  content: string;
  images?: string[];
  tags?: string[];
}
```

**Response:** CommunityPost criado

**Mock:** Retorna post criado

---

### POST `/community/posts/:id/like`
Curte um post.

**Response:** Post com likes atualizados

**Mock:** Retorna post com +1 like

---

### POST `/community/posts/:id/comment`
Comenta em um post.

**Request Body:**
```typescript
{
  content: string;
}
```

**Response:** Post com novo comentário

**Mock:** Retorna post com comentário adicionado

---

## ⚖️ Disputas

### POST `/disputes`
Abre uma disputa em um contrato.

**Request Body:**
```typescript
{
  contractId: string;
  reason: string;
  description: string;
  evidence: string[]; // URLs de arquivos
}
```

**Response:**
```typescript
Dispute {
  id: string;
  contractId: string;
  openedBy: string;
  reason: string;
  description: string;
  status: 'open' | 'under_review' | 'resolved';
  createdAt: string;
}
```

**Mock:** Retorna disputa criada

---

### PATCH `/disputes/:id/resolve`
Resolve uma disputa (admin).

**Request Body:**
```typescript
{
  resolution: string;
  fundsTo: 'freelancer' | 'client' | 'split';
  splitPercentage?: number; // se split
}
```

**Response:** Dispute resolvida

**Mock:** Retorna disputa resolvida

---

## 🤖 IA

### POST `/ai/generate-proposal`
Gera proposta automática usando IA.

**Request Body:**
```typescript
{
  projectId: string;
  userExperience: string;
  tone?: 'professional' | 'casual' | 'enthusiastic';
}
```

**Response:**
```typescript
{
  coverLetter: string;
  suggestedAmount: number;
  suggestedDeliveryTime: number;
  confidence: number;
}
```

**Mock:** Retorna proposta gerada

---

### POST `/ai/analyze-project`
Analisa um projeto e sugere melhorias.

**Request Body:**
```typescript
{
  projectDescription: string;
}
```

**Response:**
```typescript
{
  suggestions: string[];
  estimatedBudget: { min: number; max: number };
  estimatedDuration: number;
  skillsNeeded: string[];
}
```

**Mock:** Retorna análise do projeto

---

## 📊 Relatórios

### POST `/reports/fiscal`
Gera relatório fiscal.

**Request Body:**
```typescript
{
  startDate: string;
  endDate: string;
  format: 'pdf' | 'csv' | 'json';
}
```

**Response:**
```typescript
{
  reportId: string;
  downloadUrl: string;
  summary: {
    totalEarnings: number;
    totalWithdrawals: number;
    transactionCount: number;
  };
}
```

**Mock:** Retorna relatório gerado

---

### GET `/reports/analytics`
Retorna analytics do usuário.

**Query Parameters:**
```typescript
{
  period: 'week' | 'month' | 'year';
}
```

**Response:**
```typescript
{
  earnings: { date: string; value: number }[];
  projectsCompleted: number;
  averageRating: number;
  trustScoreHistory: { date: string; score: number }[];
}
```

**Mock:** Retorna dados de analytics

---

## 🔄 Integrando API Real

Para substituir os mocks por chamadas reais:

1. **Configure a Base URL**
   ```typescript
   // api/client.ts
   const API_BASE_URL = import.meta.env.VITE_API_URL;
   ```

2. **Implemente Axios/Fetch**
   ```typescript
   const api = axios.create({
     baseURL: API_BASE_URL,
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```

3. **Adicione Interceptors**
   ```typescript
   api.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   ```

4. **Substitua Funções Mock**
   ```typescript
   // Antes:
   export const getProjects = async (): Promise<Project[]> => {
     return mockProjects;
   };
   
   // Depois:
   export const getProjects = async (): Promise<Project[]> => {
     const { data } = await api.get('/projects');
     return data.projects;
   };
   ```

---

## 📞 Suporte

Para integração com backend real:
- Consulte a documentação Swagger da API NestJS
- Configure variáveis de ambiente em `.env.local`
- Teste endpoints com Postman/Insomnia antes de integrar

---

Feito com 💙 no NomadHub
