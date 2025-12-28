// Types based on Prisma schema

export enum Role {
  freelancer = 'freelancer',
  client = 'client'
}

export enum ProjectStatus {
  open = 'open',
  in_progress = 'in_progress',
  delivered = 'delivered',
  disputed = 'disputed',
  closed = 'closed'
}

export enum ProposalStatus {
  sent = 'sent',
  accepted = 'accepted',
  rejected = 'rejected',
  withdrawn = 'withdrawn'
}

export enum EscrowStatus {
  pending = 'pending',
  funded = 'funded',
  released = 'released',
  refunded = 'refunded'
}

export enum TransactionType {
  deposit = 'deposit',
  payout = 'payout',
  withdraw = 'withdraw',
  fee = 'fee'
}

export enum CommunityType {
  event = 'event',
  mentor = 'mentor',
  update = 'update'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  country?: string;
  trustScore: number;
  verified: boolean;
  createdAt: string;
  rating?: number;
  completedProjects?: number;
  balance?: number;
}

export interface Project {
  id: string;
  clientId: string;
  client?: User;
  title: string;
  description: string;
  budgetMin?: number;
  budgetMax?: number;
  currency: string;
  status: ProjectStatus;
  createdAt: string;
  proposals?: Proposal[];
}

export interface Proposal {
  id: string;
  projectId: string;
  project?: Project;
  freelancerId: string;
  freelancer?: User;
  amount: number;
  currency: string;
  timeline?: string;
  scope?: string;
  status: ProposalStatus;
  createdAt: string;
  contract?: Contract;
}

export interface Contract {
  id: string;
  proposalId: string;
  proposal?: Proposal;
  escrowTxHash?: string;
  escrowStatus: EscrowStatus;
  dueDate?: string;
  createdAt: string;
  deliveries?: Delivery[];
}

export interface Delivery {
  id: string;
  contractId: string;
  contract?: Contract;
  checklist?: Record<string, boolean>;
  files?: { url: string; name: string }[];
  notes?: string;
  accepted: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  user?: User;
  type: TransactionType;
  amount: number;
  currency: string;
  meta?: Record<string, any>;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  author?: User;
  type: CommunityType;
  title: string;
  content: string;
  startsAt?: string;
  createdAt: string;
}

export interface Dispute {
  id: string;
  contractId: string;
  openedBy: string;
  reason: string;
  evidence?: { url: string; note?: string }[];
  status: 'open' | 'in_review' | 'resolved';
  resolution?: string;
  createdAt: string;
}

// DTOs
export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  role: Role;
  country?: string;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  budgetMin?: number;
  budgetMax?: number;
  currency?: string;
}

export interface CreateProposalDto {
  freelancerId: string;
  amount: number;
  currency?: string;
  scope?: string;
  timeline?: string;
}

export interface FundEscrowDto {
  clientId: string;
  amount: number;
  currency?: string;
  paymentMethod: 'pix' | 'paypal' | 'crypto';
}

export interface ReleaseEscrowDto {
  clientAccept?: boolean;
  autoReleaseAt?: string;
}

export interface CreateDeliveryDto {
  checklist?: Record<string, boolean>;
  files?: { url: string; name: string }[];
  notes?: string;
}

export interface PayoutDto {
  userId: string;
  amount: number;
  currency?: string;
  method: 'pix' | 'paypal' | 'crypto';
  meta?: Record<string, any>;
}

export interface WithdrawDto {
  userId: string;
  amount: number;
  method: 'pix' | 'paypal' | 'crypto';
  destination: string;
}

export interface CreateDisputeDto {
  openedBy: string;
  reason: string;
  evidence?: { url: string; note?: string }[];
}

export interface FiscalReportDto {
  userId: string;
  country: 'BR' | 'PT';
  from: string;
  to: string;
  format?: 'pdf' | 'csv';
}

export interface AIProposalResponse {
  scope: string;
  timeline: string;
  amount: number;
  currency: string;
  justification: string;
}