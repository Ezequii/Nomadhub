import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle, Clock, FileText, Shield, User, DollarSign } from 'lucide-react';
import { DisputeForm } from '../components/DisputeForm';
import type { Dispute, Contract } from '../types';

export function Disputes() {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState<Contract | null>(null);
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadContractAndDispute();
  }, [contractId]);

  const loadContractAndDispute = async () => {
    setLoading(true);
    try {
      // Mock data - substituir pela chamada real da API
      const mockContract: Contract = {
        id: contractId || '1',
        proposalId: 'prop-1',
        proposal: {
          id: 'prop-1',
          projectId: 'proj-1',
          project: {
            id: 'proj-1',
            clientId: 'client-1',
            client: {
              id: 'client-1',
              name: 'João Silva',
              email: 'joao@example.com',
              role: 'client' as const,
              trustScore: 92,
              verified: true,
              createdAt: new Date().toISOString(),
            },
            title: 'Website Institucional React',
            description: 'Desenvolvimento de website institucional',
            currency: 'BRL',
            status: 'in_progress' as const,
            createdAt: new Date().toISOString(),
          },
          freelancerId: 'freelancer-1',
          amount: 5000,
          currency: 'BRL',
          timeline: '30 dias',
          status: 'accepted' as const,
          createdAt: new Date().toISOString(),
        },
        escrowStatus: 'funded' as const,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      };

      // Verificar se existe disputa para este contrato
      const mockDispute: Dispute | null = null; // Pode simular uma disputa existente aqui

      setContract(mockContract);
      setDispute(mockDispute);
    } catch (error) {
      console.error('Error loading contract and dispute:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDispute = async (reason: string, evidence: { url: string; note?: string }[]) => {
    try {
      // Mock - substituir pela chamada real da API
      const newDispute: Dispute = {
        id: `dispute-${Date.now()}`,
        contractId: contract?.id || '',
        openedBy: 'user-1', // ID do usuário atual
        reason,
        evidence,
        status: 'open',
        createdAt: new Date().toISOString(),
      };

      setDispute(newDispute);
      setShowForm(false);

      // Notificar sucesso
      alert('Disputa aberta com sucesso!');
    } catch (error) {
      console.error('Error creating dispute:', error);
      throw error;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusConfig = (status: Dispute['status']) => {
    const configs = {
      open: {
        label: 'Disputa Aberta',
        icon: AlertCircle,
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200'
      },
      in_review: {
        label: 'Em Análise',
        icon: Clock,
        className: 'bg-blue-100 text-blue-700 border-blue-200'
      },
      resolved: {
        label: 'Resolvida',
        icon: CheckCircle,
        className: 'bg-green-100 text-green-700 border-green-200'
      }
    };
    return configs[status];
  };

  const getTimeline = () => {
    if (!dispute) return [];

    const timeline = [
      {
        status: 'Disputa Aberta',
        date: dispute.createdAt,
        completed: true,
        icon: AlertCircle
      },
      {
        status: 'Análise do Admin',
        date: dispute.status !== 'open' ? new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() : '',
        completed: dispute.status !== 'open',
        icon: Shield
      },
      {
        status: 'Decisão Final',
        date: dispute.status === 'resolved' ? new Date().toISOString() : '',
        completed: dispute.status === 'resolved',
        icon: CheckCircle
      }
    ];

    return timeline;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-gray-900 dark:text-white mb-2">Contrato não encontrado</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Não foi possível carregar as informações do contrato.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-screen-xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-gray-900 dark:text-white">Disputas</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Contract Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white mb-2">
                {contract.proposal?.project?.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <User className="w-4 h-4" />
                <span>{contract.proposal?.project?.client?.name}</span>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
              {contract.escrowStatus === 'funded' ? 'Escrow Ativo' : 'Pendente'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Valor</span>
              </div>
              <p className="text-gray-900 dark:text-white">
                {formatCurrency(contract.proposal?.amount || 0)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>Prazo</span>
              </div>
              <p className="text-gray-900 dark:text-white">
                {contract.proposal?.timeline || 'Não definido'}
              </p>
            </div>
          </div>
        </div>

        {/* Dispute Status or Form */}
        {dispute ? (
          <>
            {/* Dispute Status Card */}
            <div className={`rounded-2xl border p-6 ${getStatusConfig(dispute.status).className}`}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full">
                  {(() => {
                    const Icon = getStatusConfig(dispute.status).icon;
                    return <Icon className="w-6 h-6" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">{getStatusConfig(dispute.status).label}</h3>
                  <p className="text-sm opacity-90">
                    {dispute.status === 'open' && 'Sua disputa foi registrada e está aguardando análise da nossa equipe.'}
                    {dispute.status === 'in_review' && 'Nossa equipe está analisando sua disputa. Em breve você receberá uma resposta.'}
                    {dispute.status === 'resolved' && 'A disputa foi resolvida. Confira a decisão final abaixo.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-gray-900 dark:text-white mb-6">Linha do Tempo</h3>
              <div className="space-y-6">
                {getTimeline().map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`relative ${index !== getTimeline().length - 1 ? 'after:absolute after:top-12 after:left-1/2 after:-translate-x-1/2 after:w-0.5 after:h-12 after:bg-gray-200 dark:after:bg-gray-700' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.completed
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className={`text-sm mb-1 ${
                          item.completed
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {item.status}
                        </h4>
                        {item.date && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(item.date)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dispute Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Detalhes da Disputa</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Motivo</label>
                  <p className="text-gray-900 dark:text-white">{dispute.reason}</p>
                </div>

                {dispute.evidence && dispute.evidence.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Evidências</label>
                    <div className="space-y-2">
                      {dispute.evidence.map((evidence, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">
                              Evidência {index + 1}
                            </p>
                            {evidence.note && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {evidence.note}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {dispute.resolution && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Decisão Final</label>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <p className="text-gray-900 dark:text-white">{dispute.resolution}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* No Dispute - Show Form or Button */}
            {!showForm ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-gray-900 dark:text-white mb-2">Nenhuma disputa aberta</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Se houver algum problema com este contrato, você pode abrir uma disputa para análise administrativa.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Abrir Disputa
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <DisputeForm
                  contractId={contract.id}
                  onSubmit={handleSubmitDispute}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}
          </>
        )}

        {/* Help Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-900 dark:text-blue-300 text-sm mb-1">Sistema de Proteção</h4>
              <p className="text-blue-800 dark:text-blue-400 text-sm">
                Todas as disputas são analisadas por nossa equipe de mediação em até 72 horas. 
                O valor está seguro no escrow durante todo o processo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
