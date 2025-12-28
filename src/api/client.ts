// API Client for NomadHub
import type {
  User,
  Project,
  Proposal,
  Contract,
  Delivery,
  Transaction,
  CommunityPost,
  Dispute,
  CreateProjectDto,
  CreateProposalDto,
  FundEscrowDto,
  ReleaseEscrowDto,
  CreateDeliveryDto,
  PayoutDto,
  WithdrawDto,
  CreateDisputeDto,
  FiscalReportDto,
  AIProposalResponse,
  RegisterDto,
  Role,
  ProjectStatus,
  ProposalStatus,
  EscrowStatus,
  TransactionType
} from '../types';

const API_BASE_URL = typeof window !== 'undefined' 
  ? (window as any).ENV?.API_URL || 'https://api.nomadhub.com'
  : 'https://api.nomadhub.com';

// Mock data for demonstration
const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@exemplo.com',
  role: 'freelancer' as Role,
  country: 'BR',
  trustScore: 92,
  verified: true,
  createdAt: '2024-01-15T10:00:00Z',
  rating: 4.8,
  completedProjects: 47,
  balance: 12500
};

const mockProjects: Project[] = [
  {
    id: '1',
    clientId: '2',
    title: 'Desenvolvimento de App Mobile',
    description: 'App de delivery com integração de pagamento completo',
    budgetMin: 7000,
    budgetMax: 10000,
    currency: 'BRL',
    status: 'open' as ProjectStatus,
    createdAt: '2025-12-20T10:00:00Z'
  },
  {
    id: '2',
    clientId: '3',
    title: 'Design de Interface UI/UX',
    description: 'Redesign completo de plataforma SaaS',
    budgetMin: 4000,
    budgetMax: 6000,
    currency: 'BRL',
    status: 'in_progress' as ProjectStatus,
    createdAt: '2025-12-15T14:30:00Z'
  },
  {
    id: '3',
    clientId: '4',
    title: 'Consultoria em Marketing Digital',
    description: 'Estratégia de crescimento para startup',
    budgetMin: 3000,
    budgetMax: 5000,
    currency: 'BRL',
    status: 'open' as ProjectStatus,
    createdAt: '2025-12-10T09:15:00Z'
  }
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'payout' as TransactionType,
    amount: 8500,
    currency: 'BRL',
    createdAt: '2025-12-20T10:00:00Z',
    meta: { description: 'Pagamento - Projeto App E-commerce' }
  },
  {
    id: '2',
    userId: '1',
    type: 'withdraw' as TransactionType,
    amount: -2500,
    currency: 'BRL',
    createdAt: '2025-12-18T15:30:00Z',
    meta: { description: 'Saque Pix', method: 'pix' }
  },
  {
    id: '3',
    userId: '1',
    type: 'payout' as TransactionType,
    amount: 5200,
    currency: 'BRL',
    createdAt: '2025-12-15T11:20:00Z',
    meta: { description: 'Pagamento - Design UI/UX' }
  },
  {
    id: '4',
    userId: '1',
    type: 'fee' as TransactionType,
    amount: -150,
    currency: 'BRL',
    createdAt: '2025-12-10T16:45:00Z',
    meta: { description: 'Taxa de plataforma (10%)' }
  }
];

// Helper function for mock API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API Client functions
export const api = {
  // ============================================
  // AUTH
  // ============================================
  async register(data: RegisterDto): Promise<{ user: User; token: string }> {
    await delay();
    return {
      user: { ...mockUser, ...data, id: Date.now().toString(), createdAt: new Date().toISOString() },
      token: 'mock_jwt_token'
    };
  },

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await delay();
    return { user: mockUser, token: 'mock_jwt_token' };
  },

  async getMe(): Promise<User> {
    await delay();
    return mockUser;
  },

  // ============================================
  // USERS
  // ============================================
  async getUser(id?: string): Promise<User> {
    await delay();
    return mockUser;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    await delay();
    return { ...mockUser, ...data };
  },

  async verifyUser(id: string): Promise<User> {
    await delay();
    return { ...mockUser, verified: true };
  },

  // ============================================
  // PROJECTS
  // ============================================
  async getProjects(params?: { status?: ProjectStatus; search?: string }): Promise<Project[]> {
    await delay();
    let filtered = [...mockProjects];
    if (params?.status) {
      filtered = filtered.filter(p => p.status === params.status);
    }
    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }
    return filtered;
  },

  async getProject(id: string): Promise<Project> {
    await delay();
    const project = mockProjects.find(p => p.id === id);
    if (!project) throw new Error('Project not found');
    return project;
  },

  async createProject(data: CreateProjectDto): Promise<Project> {
    await delay();
    return {
      id: Date.now().toString(),
      clientId: mockUser.id,
      ...data,
      currency: data.currency || 'BRL',
      status: 'open' as ProjectStatus,
      createdAt: new Date().toISOString()
    };
  },

  async updateProject(id: string, data: Partial<CreateProjectDto>): Promise<Project> {
    await delay();
    const project = mockProjects.find(p => p.id === id);
    if (!project) throw new Error('Project not found');
    return { ...project, ...data };
  },

  // ============================================
  // PROPOSALS
  // ============================================
  async createProposal(projectId: string, data: CreateProposalDto): Promise<Proposal> {
    await delay();
    return {
      id: Date.now().toString(),
      projectId,
      ...data,
      currency: data.currency || 'BRL',
      status: 'sent' as ProposalStatus,
      createdAt: new Date().toISOString()
    };
  },

  async generateAIProposal(projectId: string, freelancerId: string): Promise<AIProposalResponse> {
    await delay(1500); // Simulate AI processing
    return {
      scope: `Desenvolvimento completo do aplicativo mobile conforme especificações:
- Autenticação de usuários (OAuth + JWT)
- Catálogo de produtos com filtros avançados
- Sistema de carrinho e checkout
- Integração com gateway de pagamento (Stripe/MercadoPago)
- Tracking de pedidos em tempo real
- Sistema de notificações push
- Painel administrativo web
      
Entregáveis:
- Código fonte completo (React Native + TypeScript)
- Documentação técnica
- Testes unitários e de integração
- Deploy em TestFlight/Google Play Console`,
      timeline: '8 semanas (2 meses)',
      amount: 8500,
      currency: 'BRL',
      justification: 'Valor calculado com base em: complexidade técnica (alta), experiência do freelancer (4.8⭐), prazo estimado (8 semanas) e mercado regional (Brasil). Inclui 3 revisões e suporte pós-entrega de 30 dias.'
    };
  },

  async getProposals(projectId: string): Promise<Proposal[]> {
    await delay();
    return [
      {
        id: '1',
        projectId,
        freelancerId: mockUser.id,
        amount: 8500,
        currency: 'BRL',
        scope: 'Desenvolvimento completo conforme especificações',
        timeline: '8 semanas',
        status: 'sent' as ProposalStatus,
        createdAt: '2025-12-25T10:00:00Z'
      }
    ];
  },

  async updateProposal(id: string, status: ProposalStatus): Promise<Proposal> {
    await delay();
    return {
      id,
      projectId: '1',
      freelancerId: mockUser.id,
      amount: 8500,
      currency: 'BRL',
      status,
      createdAt: '2025-12-25T10:00:00Z'
    };
  },

  async withdrawProposal(id: string): Promise<Proposal> {
    return this.updateProposal(id, 'withdrawn' as ProposalStatus);
  },

  // ============================================
  // CONTRACTS (Escrow)
  // ============================================
  async createContract(proposalId: string): Promise<Contract> {
    await delay();
    return {
      id: Date.now().toString(),
      proposalId,
      escrowStatus: 'pending' as EscrowStatus,
      createdAt: new Date().toISOString()
    };
  },

  async fundEscrow(contractId: string, data: FundEscrowDto): Promise<Contract> {
    await delay(2000); // Simulate payment processing
    return {
      id: contractId,
      proposalId: '1',
      escrowStatus: 'funded' as EscrowStatus,
      escrowTxHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      createdAt: new Date().toISOString()
    };
  },

  async releaseEscrow(contractId: string, data: ReleaseEscrowDto): Promise<Contract> {
    await delay(1500);
    return {
      id: contractId,
      proposalId: '1',
      escrowStatus: 'released' as EscrowStatus,
      escrowTxHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      createdAt: new Date().toISOString()
    };
  },

  async refundEscrow(contractId: string): Promise<Contract> {
    await delay(1500);
    return {
      id: contractId,
      proposalId: '1',
      escrowStatus: 'refunded' as EscrowStatus,
      escrowTxHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      createdAt: new Date().toISOString()
    };
  },

  // ============================================
  // DELIVERIES
  // ============================================
  async createDelivery(contractId: string, data: CreateDeliveryDto): Promise<Delivery> {
    await delay();
    return {
      id: Date.now().toString(),
      contractId,
      ...data,
      accepted: false,
      createdAt: new Date().toISOString()
    };
  },

  async getDeliveries(contractId: string): Promise<Delivery[]> {
    await delay();
    return [
      {
        id: '1',
        contractId,
        checklist: {
          wireframes: true,
          prototype: true,
          code: false,
          tests: false
        },
        files: [
          { url: 'https://example.com/wireframes.pdf', name: 'Wireframes.pdf' },
          { url: 'https://example.com/prototype.fig', name: 'Prototype.fig' }
        ],
        notes: 'Primeira entrega parcial conforme cronograma',
        accepted: false,
        createdAt: '2025-12-27T10:00:00Z'
      }
    ];
  },

  async acceptDelivery(id: string): Promise<Delivery> {
    await delay();
    return {
      id,
      contractId: '1',
      accepted: true,
      createdAt: '2025-12-27T10:00:00Z'
    };
  },

  // ============================================
  // PAYMENTS
  // ============================================
  async payout(data: PayoutDto): Promise<Transaction> {
    await delay(1500);
    return {
      id: Date.now().toString(),
      userId: data.userId,
      type: 'payout' as TransactionType,
      amount: data.amount,
      currency: data.currency || 'BRL',
      meta: { ...data.meta, method: data.method },
      createdAt: new Date().toISOString()
    };
  },

  async withdraw(data: WithdrawDto): Promise<Transaction> {
    await delay(1500);
    return {
      id: Date.now().toString(),
      userId: data.userId,
      type: 'withdraw' as TransactionType,
      amount: -Math.abs(data.amount),
      currency: 'BRL',
      meta: { method: data.method, destination: data.destination },
      createdAt: new Date().toISOString()
    };
  },

  async getBalance(userId?: string): Promise<number> {
    await delay();
    return 15420.50;
  },

  async getTransactions(userId?: string): Promise<Transaction[]> {
    await delay();
    return mockTransactions;
  },

  // ============================================
  // DISPUTES
  // ============================================
  async createDispute(contractId: string, data: CreateDisputeDto): Promise<Dispute> {
    await delay();
    return {
      id: Date.now().toString(),
      contractId,
      ...data,
      status: 'open',
      createdAt: new Date().toISOString()
    };
  },

  async getDisputes(contractId: string): Promise<Dispute[]> {
    await delay();
    return [];
  },

  async resolveDispute(id: string, resolution: string): Promise<Dispute> {
    await delay();
    return {
      id,
      contractId: '1',
      openedBy: mockUser.id,
      reason: 'Disputa de entrega',
      status: 'resolved',
      resolution,
      createdAt: '2025-12-28T10:00:00Z'
    };
  },

  // ============================================
  // FISCAL REPORTS
  // ============================================
  async generateFiscalReport(data: FiscalReportDto): Promise<Blob> {
    await delay(2000);
    // Mock PDF blob
    return new Blob(['Mock PDF content'], { type: 'application/pdf' });
  },

  async exportFiscalReport(data: FiscalReportDto): Promise<string> {
    await delay(2000);
    return 'https://example.com/reports/fiscal-2025-12.pdf';
  },

  // ============================================
  // COMMUNITY
  // ============================================
  async getCommunityPosts(type?: string): Promise<CommunityPost[]> {
    await delay();
    return [
      {
        id: '1',
        authorId: '2',
        type: 'event' as any,
        title: 'Meetup de Desenvolvedores em Lisboa',
        content: 'Encontro de nômades digitais focado em tecnologia',
        startsAt: '2025-01-05T19:00:00Z',
        createdAt: '2025-12-27T10:00:00Z'
      },
      {
        id: '2',
        authorId: '3',
        type: 'mentor' as any,
        title: 'Mentoria em UX/UI Design',
        content: 'Sessões gratuitas para iniciantes',
        createdAt: '2025-12-26T14:30:00Z'
      }
    ];
  },

  async createCommunityPost(data: Partial<CommunityPost>): Promise<CommunityPost> {
    await delay();
    return {
      id: Date.now().toString(),
      authorId: mockUser.id,
      type: data.type || 'update' as any,
      title: data.title || '',
      content: data.content || '',
      startsAt: data.startsAt,
      createdAt: new Date().toISOString()
    };
  }
};

// Legacy exports for backward compatibility
export type { User, Project, Transaction };