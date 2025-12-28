import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  Activity,
  DollarSign,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  TrendingUp,
  FileText,
  Zap,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { api } from '../api/client';
import type { Contract, Dispute } from '../types';

interface ContractWithDetails extends Contract {
  proposal?: {
    amount: number;
    currency: string;
    project?: {
      title: string;
    };
    freelancer?: {
      name: string;
    };
  };
}

interface WebhookLog {
  id: string;
  type: 'payout' | 'refund' | 'deposit' | 'error';
  status: 'success' | 'failed' | 'pending';
  amount?: number;
  currency?: string;
  message: string;
  createdAt: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<ContractWithDetails[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'contracts' | 'disputes' | 'webhooks'>('contracts');

  useEffect(() => {
    loadData();
    // Polling para atualizar logs em tempo real
    const interval = setInterval(() => {
      if (activeTab === 'webhooks') {
        loadWebhooks();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadContracts(),
        loadDisputes(),
        loadWebhooks()
      ]);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadContracts = async () => {
    try {
      const data = await api.getContracts();
      setContracts(data as ContractWithDetails[]);
    } catch (error) {
      console.error('Error loading contracts:', error);
      // Mock data para desenvolvimento
      const mockContracts: ContractWithDetails[] = [
        {
          id: '1',
          proposalId: '1',
          escrowStatus: 'funded',
          createdAt: '2025-12-27T10:00:00Z',
          proposal: {
            amount: 8500,
            currency: 'BRL',
            project: { title: 'Design UI/UX para SaaS' },
            freelancer: { name: 'João Silva' }
          }
        },
        {
          id: '2',
          proposalId: '2',
          escrowStatus: 'pending',
          createdAt: '2025-12-26T15:30:00Z',
          proposal: {
            amount: 5200,
            currency: 'BRL',
            project: { title: 'Desenvolvimento Mobile' },
            freelancer: { name: 'Maria Santos' }
          }
        },
        {
          id: '3',
          proposalId: '3',
          escrowStatus: 'released',
          createdAt: '2025-12-25T09:15:00Z',
          proposal: {
            amount: 3800,
            currency: 'BRL',
            project: { title: 'Consultoria Marketing' },
            freelancer: { name: 'Pedro Costa' }
          }
        }
      ];
      setContracts(mockContracts);
    }
  };

  const loadDisputes = async () => {
    try {
      const data = await api.getDisputes();
      setDisputes(data);
    } catch (error) {
      console.error('Error loading disputes:', error);
      // Mock data para desenvolvimento
      const mockDisputes: Dispute[] = [
        {
          id: '1',
          contractId: '1',
          status: 'open',
          reason: 'Entrega não conforme especificações',
          createdAt: '2025-12-27T14:30:00Z',
          createdBy: '1'
        },
        {
          id: '2',
          contractId: '2',
          status: 'in_review',
          reason: 'Cliente não respondeu às solicitações',
          createdAt: '2025-12-26T11:20:00Z',
          createdBy: '2'
        },
        {
          id: '3',
          contractId: '3',
          status: 'resolved',
          reason: 'Atraso na entrega',
          resolution: 'Acordo entre as partes',
          createdAt: '2025-12-25T16:45:00Z',
          resolvedAt: '2025-12-26T10:00:00Z',
          createdBy: '3'
        }
      ];
      setDisputes(mockDisputes);
    }
  };

  const loadWebhooks = async () => {
    try {
      // Mock data para desenvolvimento
      const mockLogs: WebhookLog[] = [
        {
          id: '1',
          type: 'payout',
          status: 'success',
          amount: 8500,
          currency: 'BRL',
          message: 'Pagamento processado para contrato #12345',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'refund',
          status: 'success',
          amount: 2500,
          currency: 'BRL',
          message: 'Estorno realizado para contrato #12346',
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '3',
          type: 'error',
          status: 'failed',
          message: 'Falha na comunicação com gateway de pagamento',
          createdAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: '4',
          type: 'deposit',
          status: 'success',
          amount: 5000,
          currency: 'BRL',
          message: 'Depósito recebido - Stripe',
          createdAt: new Date(Date.now() - 10800000).toISOString()
        }
      ];
      setWebhookLogs(mockLogs);
    } catch (error) {
      console.error('Error loading webhooks:', error);
    }
  };

  const handleReleasePayment = async (contractId: string) => {
    if (!confirm('Deseja realmente liberar o pagamento deste contrato?')) return;
    
    try {
      await api.releasePayment(contractId);
      alert('Pagamento liberado com sucesso!');
      loadContracts();
    } catch (error) {
      console.error('Error releasing payment:', error);
      alert('Erro ao liberar pagamento');
    }
  };

  const handleRefund = async (contractId: string) => {
    if (!confirm('Deseja realmente estornar este contrato?')) return;
    
    try {
      await api.refundContract(contractId);
      alert('Estorno realizado com sucesso!');
      loadContracts();
    } catch (error) {
      console.error('Error refunding:', error);
      alert('Erro ao realizar estorno');
    }
  };

  const handleResolveDispute = async (disputeId: string) => {
    const resolution = prompt('Insira a resolução da disputa:');
    if (!resolution) return;

    try {
      await api.resolveDispute(disputeId, { resolution });
      alert('Disputa encerrada com sucesso!');
      loadDisputes();
    } catch (error) {
      console.error('Error resolving dispute:', error);
      alert('Erro ao encerrar disputa');
    }
  };

  const formatCurrency = (value: number, currency: string = 'BRL') => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'funded':
      case 'in_review':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'released':
      case 'resolved':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'refunded':
      case 'open':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendente',
      funded: 'Ativo',
      released: 'Encerrado',
      refunded: 'Estornado',
      open: 'Aberta',
      in_review: 'Em Análise',
      resolved: 'Resolvida'
    };
    return labels[status] || status;
  };

  const stats = {
    totalContracts: contracts.length,
    activeContracts: contracts.filter(c => c.escrowStatus === 'funded').length,
    openDisputes: disputes.filter(d => d.status === 'open' || d.status === 'in_review').length,
    totalVolume: contracts.reduce((sum, c) => sum + (c.proposal?.amount || 0), 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando painel admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white">Painel Admin</h1>
              <p className="text-gray-600 dark:text-gray-400">Gerenciamento da plataforma</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-gray-600 dark:text-gray-400">Contratos</span>
            </div>
            <div className="text-gray-900 dark:text-white">{stats.totalContracts}</div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{stats.activeContracts} ativos</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              <span className="text-gray-600 dark:text-gray-400">Disputas</span>
            </div>
            <div className="text-gray-900 dark:text-white">{disputes.length}</div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{stats.openDisputes} abertas</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-gray-600 dark:text-gray-400">Volume</span>
            </div>
            <div className="text-gray-900 dark:text-white">{formatCurrency(stats.totalVolume)}</div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Total</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-600 dark:text-gray-400">Webhooks</span>
            </div>
            <div className="text-gray-900 dark:text-white">{webhookLogs.length}</div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Logs recentes</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('contracts')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
              activeTab === 'contracts'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Contratos ({contracts.length})
          </button>
          <button
            onClick={() => setActiveTab('disputes')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
              activeTab === 'disputes'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Disputas ({disputes.length})
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
              activeTab === 'webhooks'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Webhooks
          </button>
        </div>

        {/* Contracts List */}
        {activeTab === 'contracts' && (
          <div className="space-y-3">
            {contracts.length > 0 ? (
              contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-400 text-sm">#{contract.id.slice(0, 8)}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(contract.escrowStatus)}`}>
                          {getStatusLabel(contract.escrowStatus)}
                        </span>
                      </div>
                      <h3 className="text-white mb-1">
                        {contract.proposal?.project?.title || 'Sem título'}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Freelancer: {contract.proposal?.freelancer?.name || 'Não especificado'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl text-white">
                        {contract.proposal ? formatCurrency(contract.proposal.amount, contract.proposal.currency) : '-'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(contract.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/contracts/${contract.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalhes
                    </button>
                    {contract.escrowStatus === 'funded' && (
                      <>
                        <button
                          onClick={() => handleReleasePayment(contract.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Liberar
                        </button>
                        <button
                          onClick={() => handleRefund(contract.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Estornar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Nenhum contrato encontrado</p>
              </div>
            )}
          </div>
        )}

        {/* Disputes List */}
        {activeTab === 'disputes' && (
          <div className="space-y-3">
            {disputes.length > 0 ? (
              disputes.map((dispute) => (
                <div
                  key={dispute.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400 text-sm">Disputa #{dispute.id.slice(0, 8)}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(dispute.status)}`}>
                          {getStatusLabel(dispute.status)}
                        </span>
                      </div>
                      <p className="text-white mb-1">{dispute.reason}</p>
                      {dispute.resolution && (
                        <p className="text-sm text-green-400 mb-2">
                          Resolução: {dispute.resolution}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Contrato: #{dispute.contractId.slice(0, 8)} • {formatDate(dispute.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/contracts/${dispute.contractId}/dispute`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Analisar
                    </button>
                    {(dispute.status === 'open' || dispute.status === 'in_review') && (
                      <button
                        onClick={() => handleResolveDispute(dispute.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Encerrar
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
                <AlertTriangle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Nenhuma disputa encontrada</p>
              </div>
            )}
          </div>
        )}

        {/* Webhooks Logs */}
        {activeTab === 'webhooks' && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white">Logs de Webhooks</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Tempo real</span>
              </div>
            </div>

            <div className="divide-y divide-gray-700 max-h-[500px] overflow-y-auto">
              {webhookLogs.length > 0 ? (
                webhookLogs.map((log) => {
                  const getLogIcon = () => {
                    switch (log.type) {
                      case 'payout': return <TrendingUp className="w-5 h-5 text-green-400" />;
                      case 'refund': return <Activity className="w-5 h-5 text-red-400" />;
                      case 'deposit': return <DollarSign className="w-5 h-5 text-blue-400" />;
                      case 'error': return <AlertCircle className="w-5 h-5 text-orange-400" />;
                      default: return <Activity className="w-5 h-5 text-gray-400" />;
                    }
                  };

                  const getStatusIcon = () => {
                    switch (log.status) {
                      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
                      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
                      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
                      default: return null;
                    }
                  };

                  return (
                    <div key={log.id} className="p-4 hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getLogIcon()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white text-sm capitalize">{log.type}</span>
                                {getStatusIcon()}
                              </div>
                              <p className="text-gray-400 text-sm">{log.message}</p>
                            </div>
                            {log.amount && (
                              <p className="text-white text-sm whitespace-nowrap">
                                {formatCurrency(log.amount, log.currency)}
                              </p>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{formatDate(log.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center">
                  <Zap className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Nenhum log de webhook encontrado</p>
                  <p className="text-xs text-gray-500 mt-1">Os logs aparecerão em tempo real</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}