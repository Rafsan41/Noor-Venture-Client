// ── Enums ──────────────────────────────────────────────────────────────────────
export type Role = "ADMIN" | "BUSINESS_OWNER" | "INVESTOR";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "BANNED";
export type ProposalStatus =
  | "DRAFT" | "PENDING" | "APPROVED" | "REJECTED"
  | "ACTIVE" | "FUNDED" | "COMPLETED" | "CANCELLED";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type InvestmentStatus = "ACTIVE" | "COMPLETED" | "WITHDRAWN";
export type TransactionType =
  | "DEPOSIT" | "WITHDRAWAL" | "INVESTMENT" | "PROFIT" | "REFUND";
export type MilestoneStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DELAYED";

// ── User ───────────────────────────────────────────────────────────────────────
export interface User {
  id:             string;
  name:           string;
  email:          string;
  image?:         string | null;
  role:           Role;
  status:         UserStatus;
  phone?:         string | null;
  nidNumber?:     string | null;
  nidVerified:    boolean;
  bio?:           string | null;
  createdAt:      string;
  updatedAt:      string;
}

// ── Proposal ───────────────────────────────────────────────────────────────────
export interface Milestone {
  id:           string;
  proposalId:   string;
  title:        string;
  description?: string | null;
  dueDate?:     string | null;
  status:       MilestoneStatus;
  completedAt?: string | null;
}

export interface Proposal {
  id:                 string;
  ownerId:            string;
  owner?:             User;
  title:              string;
  slug:               string;
  description:        string;
  businessType:       string;
  category:           string;
  location:           string;
  fundingGoal:        number;
  minimumInvestment:  number;
  profitSharePercent: number;
  ownerSharePercent:  number;
  duration:           number;
  status:             ProposalStatus;
  riskLevel:          RiskLevel;
  aiScore?:           number | null;
  aiAnalysis?:        Record<string, unknown> | null;
  aiTags:             string[];
  deadline:           string;
  amountRaised:       number;
  totalInvestors:     number;
  expectedReturn?:    number | null;
  images:             string[];
  documents:          string[];
  milestones?:        Milestone[];
  investments?:       Investment[];
  _count?:            { investments: number };
  createdAt:          string;
  updatedAt:          string;
}

// ── Investment ─────────────────────────────────────────────────────────────────
export interface Investment {
  id:           string;
  investorId:   string;
  investor?:    User;
  proposalId:   string;
  proposal?:    Proposal;
  amount:       number;
  sharePercent: number;
  status:       InvestmentStatus;
  profitEarned: number;
  createdAt:    string;
  updatedAt:    string;
}

// ── Wallet ─────────────────────────────────────────────────────────────────────
export interface Wallet {
  id:            string;
  userId:        string;
  balance:       number;
  totalInvested: number;
  totalEarned:   number;
  createdAt:     string;
  updatedAt:     string;
}

export interface Transaction {
  id:          string;
  walletId:    string;
  type:        TransactionType;
  amount:      number;
  description: string;
  reference?:  string | null;
  createdAt:   string;
}

// ── Report ─────────────────────────────────────────────────────────────────────
export interface ProfitReport {
  id:             string;
  proposalId:     string;
  proposal?:      Pick<Proposal, "id" | "title" | "slug" | "profitSharePercent">;
  submittedById:  string;
  submittedBy?:   Pick<User, "id" | "name">;
  month:          number;
  year:           number;
  revenue:        number;
  expenses:       number;
  netProfit:      number;
  investorShare:  number;
  notes?:         string | null;
  aiInsights?:    Record<string, unknown> | null;
  createdAt:      string;
  updatedAt:      string;
}

// ── Stats ──────────────────────────────────────────────────────────────────────
export interface LiveStats {
  totalProposals:   number;
  totalInvestments: number;
  totalFunded:      number;
  totalInvestors:   number;
  totalCapital:     number;
  activeProposals:  number;
}

// ── AI Types ───────────────────────────────────────────────────────────────────
export interface ProposalAnalysis {
  riskScore:         number;
  riskLevel:         RiskLevel;
  viabilityScore:    number;
  strengths:         string[];
  weaknesses:        string[];
  suggestions:       string[];
  shariahCompliance: { compliant: boolean; notes: string };
}

export interface GeneratedProposal {
  title:        string;
  description:  string;
  keyPoints:    string[];
  revenueModel: string;
  tags:         string[];
}

export interface InvestorMatch {
  investorId:    string;
  name:          string;
  score:         number;
  reasoning:     string;
  riskTolerance: string;
}

export interface ReportAnalysis {
  trend:              string;
  healthScore:        number;
  insights:           string[];
  warnings:           string[];
  recommendations:    string[];
  projectedNextMonth: number;
}

// ── API Response ───────────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data:    T;
}

export interface PaginatedResponse<T = unknown> {
  success:    boolean;
  message:    string;
  data:       T[];
  pagination: {
    page:       number;
    limit:      number;
    total:      number;
    totalPages: number;
  };
}

// ── Admin ──────────────────────────────────────────────────────────────────────
export interface AdminStats {
  users:        { total: number; investors: number; owners: number };
  proposals:    { total: number; pending: number; active: number };
  investments:  { total: number; totalRaised: number; totalProfit: number };
  recentProposals: Proposal[];
  monthlyData:  { label: string; proposals: number; investments: number; raised: number }[];
}
