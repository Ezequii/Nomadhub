import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, CheckCircle, XCircle, DollarSign, Calendar, Eye, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface Proposal {
  id: string;
  projectTitle: string;
  clientName: string;
  amount: number;
  deadline: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  submittedAt: string;
  message: string;
}

export function ProposalHistory() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const mockProposals: Proposal[] = [
    {
      id: '1',
      projectTitle: 'Desenvolvimento de Dashboard Analytics',
      clientName: 'TechCorp Brasil',
      amount: 4500,
      deadline: '30 dias',
      status: 'accepted',
      submittedAt: '2024-12-20T10:00:00',
      message: 'Proposta aceita! O cliente iniciou o contrato.'
    },
    {
      id: '2',
      projectTitle: 'App Mobile de Delivery',
      clientName: 'FoodTech Ltda',
      amount: 10000,
      deadline: '60 dias',
      status: 'pending',
      submittedAt: '2024-12-25T14:30:00',
      message: 'Aguardando resposta do cliente'
    },
    {
      id: '3',
      projectTitle: 'Redesign de E-commerce',
      clientName: 'Fashion Store',
      amount: 5500,
      deadline: '45 dias',
      status: 'rejected',
      submittedAt: '2024-12-18T09:15:00',
      message: 'O cliente escolheu outro freelancer'
    },
    {
      id: '4',
      projectTitle: 'Landing Page para Startup',
      clientName: 'StartupHub',
      amount: 2000,
      deadline: '15 dias',
      status: 'pending',
      submittedAt: '2024-12-26T16:45:00',
      message: 'Aguardando resposta do cliente'
    }
  ];

  const filteredProposals = mockProposals.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const getStatusInfo = (status: Proposal['status']) => {
    switch (status) {
      case 'accepted':
        return {
          icon: CheckCircle,
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-100 dark:bg-green-900/30',
          label: 'Aceita'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600 dark:text-yellow-400',
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          label: 'Pendente'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-100 dark:bg-red-900/30',
          label: 'Recusada'
        };
      default:
        return {
          icon: FileText,
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-100 dark:bg-gray-900/30',
          label: 'Retirada'
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const stats = {
    total: mockProposals.length,
    pending: mockProposals.filter(p => p.status === 'pending').length,
    accepted: mockProposals.filter(p => p.status === 'accepted').length,
    rejected: mockProposals.filter(p => p.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 dark:text-white">Histórico de Propostas</h1>
            <p className="text-gray-600 dark:text-gray-400">{stats.total} propostas enviadas</p>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-xl text-gray-900 dark:text-white mb-1">{stats.total}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-xl text-yellow-600 dark:text-yellow-400 mb-1">{stats.pending}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Pendentes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-xl text-green-600 dark:text-green-400 mb-1">{stats.accepted}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Aceitas</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-xl text-red-600 dark:text-red-400 mb-1">{stats.rejected}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Recusadas</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Todas' },
            { value: 'pending', label: 'Pendentes' },
            { value: 'accepted', label: 'Aceitas' },
            { value: 'rejected', label: 'Recusadas' }
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Proposals List */}
        <div className="space-y-3">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => {
              const statusInfo = getStatusInfo(proposal.status);
              const StatusIcon = statusInfo.icon;

              return (
                <motion.div
                  key={proposal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full ${statusInfo.bg} ${statusInfo.color} flex items-center gap-2`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusInfo.label}
                    </span>
                    <span className="text-gray-500 dark:text-gray-500">
                      {formatDate(proposal.submittedAt)}
                    </span>
                  </div>

                  {/* Project Info */}
                  <h3 className="text-gray-900 dark:text-white mb-2">{proposal.projectTitle}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Cliente: {proposal.clientName}</p>

                  {/* Details */}
                  <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      R$ {proposal.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {proposal.deadline}
                    </div>
                  </div>

                  {/* Message */}
                  <div className={`rounded-lg p-3 ${
                    proposal.status === 'accepted' ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800' :
                    proposal.status === 'rejected' ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800' :
                    'bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800'
                  }`}>
                    <p className={
                      proposal.status === 'accepted' ? 'text-green-700 dark:text-green-300' :
                      proposal.status === 'rejected' ? 'text-red-700 dark:text-red-300' :
                      'text-yellow-700 dark:text-yellow-300'
                    }>
                      {proposal.message}
                    </p>
                  </div>

                  {/* Action */}
                  {proposal.status === 'accepted' && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/contracts/${proposal.id}`);
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Ver Contrato
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-gray-900 dark:text-white mb-2">Nenhuma proposta encontrada</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filter === 'all' 
                  ? 'Você ainda não enviou nenhuma proposta'
                  : `Nenhuma proposta ${filter === 'pending' ? 'pendente' : filter === 'accepted' ? 'aceita' : 'recusada'}`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
