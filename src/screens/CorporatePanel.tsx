import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  FileText, 
  DollarSign, 
  UserPlus,
  MoreVertical,
  Search,
  Filter,
  Crown,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'finance' | 'viewer';
  joinedAt: string;
}

interface CorporateContract {
  id: string;
  title: string;
  freelancer: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  value: number;
  startDate: string;
  endDate: string;
  progress: number;
}

export function CorporatePanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'contracts' | 'team'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [company] = useState({
    name: 'Tech Innovations Ltda',
    cnpj: '12.345.678/0001-90',
    country: 'Brasil',
    logo: '🏢'
  });

  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Carlos Silva',
      email: 'carlos@techinnovations.com',
      role: 'admin',
      joinedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Ana Santos',
      email: 'ana@techinnovations.com',
      role: 'manager',
      joinedAt: '2024-02-20'
    },
    {
      id: '3',
      name: 'Roberto Costa',
      email: 'roberto@techinnovations.com',
      role: 'finance',
      joinedAt: '2024-03-10'
    }
  ]);

  const [contracts, setContracts] = useState<CorporateContract[]>([
    {
      id: '1',
      title: 'Desenvolvimento de App Mobile',
      freelancer: 'Maria Silva',
      status: 'active',
      value: 15000,
      startDate: '2024-12-01',
      endDate: '2025-01-31',
      progress: 65
    },
    {
      id: '2',
      title: 'Design System Completo',
      freelancer: 'João Oliveira',
      status: 'active',
      value: 8000,
      startDate: '2024-12-15',
      endDate: '2025-01-15',
      progress: 40
    },
    {
      id: '3',
      title: 'API REST Backend',
      freelancer: 'Pedro Alves',
      status: 'pending',
      value: 12000,
      startDate: '2025-01-05',
      endDate: '2025-02-28',
      progress: 0
    }
  ]);

  const stats = {
    activeContracts: contracts.filter(c => c.status === 'active').length,
    totalInvested: contracts.reduce((acc, c) => acc + c.value, 0),
    teamMembers: team.length,
    completedProjects: 24
  };

  const getRoleName = (role: string) => {
    const roles = {
      admin: 'Administrador',
      manager: 'Gestor',
      finance: 'Financeiro',
      viewer: 'Visualizador'
    };
    return roles[role as keyof typeof roles] || role;
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      manager: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      finance: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      viewer: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
    };
    return colors[role as keyof typeof colors] || colors.viewer;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: 'Ativo',
      pending: 'Pendente',
      completed: 'Concluído',
      cancelled: 'Cancelado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-gray-900 dark:text-white">Painel Corporativo</h1>
              <p className="text-gray-600 dark:text-gray-400">{company.name}</p>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full">
              <Crown className="w-4 h-4" />
              <span className="text-sm">Enterprise</span>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-4xl">
                {company.logo}
              </div>
              <div className="flex-1">
                <h2 className="text-white mb-1">{company.name}</h2>
                <p className="text-blue-100">CNPJ: {company.cnpj} • {company.country}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('contracts')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
              activeTab === 'contracts'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Contratos
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
              activeTab === 'team'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Equipe
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="text-gray-900 dark:text-white mb-1">{stats.activeContracts}</div>
                <div className="text-gray-600 dark:text-gray-400">Contratos ativos</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="text-gray-900 dark:text-white mb-1">
                  R$ {(stats.totalInvested / 1000).toFixed(0)}k
                </div>
                <div className="text-gray-600 dark:text-gray-400">Investido</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="text-gray-900 dark:text-white mb-1">{stats.teamMembers}</div>
                <div className="text-gray-600 dark:text-gray-400">Membros</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="text-gray-900 dark:text-white mb-1">{stats.completedProjects}</div>
                <div className="text-gray-600 dark:text-gray-400">Concluídos</div>
              </div>
            </div>

            {/* Recent Contracts */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Contratos recentes</h3>
              <div className="space-y-3">
                {contracts.slice(0, 3).map(contract => (
                  <div
                    key={contract.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => navigate(`/contracts/${contract.id}`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(contract.status)}
                        <h4 className="text-gray-900 dark:text-white">{contract.title}</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{contract.freelancer}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900 dark:text-white mb-1">
                        R$ {contract.value.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">{contract.progress}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar contratos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Contracts List */}
            {contracts.map(contract => (
              <div
                key={contract.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(contract.status)}
                      <h3 className="text-gray-900 dark:text-white">{contract.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Freelancer: {contract.freelancer}</p>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                      <span>{new Date(contract.startDate).toLocaleDateString('pt-BR')} - {new Date(contract.endDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]">
                    <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                    <span>Progresso</span>
                    <span>{contract.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${contract.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="text-gray-900 dark:text-white">
                    R$ {contract.value.toLocaleString('pt-BR')}
                  </div>
                  <button
                    onClick={() => navigate(`/contracts/${contract.id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-4">
            {/* Invite Button */}
            <button
              onClick={() => alert('Funcionalidade de convite em desenvolvimento')}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Convidar membro
            </button>

            {/* Team List */}
            {team.map(member => (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 dark:text-white mb-1">{member.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{member.email}</p>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full ${getRoleBadgeColor(member.role)}`}>
                          {getRoleName(member.role)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          Desde {new Date(member.joinedAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]">
                    <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
