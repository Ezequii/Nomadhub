import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { FinancialChart } from '../components/FinancialChart';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock,
  CheckCircle,
  Target,
  Award,
  Lightbulb,
  Download,
  Calendar
} from 'lucide-react';
import { Button } from '../components/ui/button';

export function Insights() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock data
  const stats = {
    totalEarnings: 12450,
    earningsChange: 23.5,
    avgProjectValue: 2490,
    avgProjectValueChange: 12.3,
    successRate: 87,
    successRateChange: 5.2,
    avgDeliveryTime: 12,
    avgDeliveryTimeChange: -8.5, // negative is good
    completedProjects: 24,
    activeProjects: 3,
    totalProposals: 45,
    acceptanceRate: 53.3
  };

  const earningsData = [
    { name: 'Jan', value: 1200 },
    { name: 'Fev', value: 1800 },
    { name: 'Mar', value: 2100 },
    { name: 'Abr', value: 1600 },
    { name: 'Mai', value: 2400 },
    { name: 'Jun', value: 3350 }
  ];

  const projectsData = [
    { name: 'Jan', value: 3 },
    { name: 'Fev', value: 4 },
    { name: 'Mar', value: 5 },
    { name: 'Abr', value: 3 },
    { name: 'Mai', value: 6 },
    { name: 'Jun', value: 3 }
  ];

  const recommendations = [
    {
      icon: Target,
      title: 'Aumente suas propostas em Design',
      description: 'Projetos de design têm 73% de taxa de aceitação no seu perfil',
      action: 'Ver Projetos de Design'
    },
    {
      icon: DollarSign,
      title: 'Considere aumentar seus preços',
      description: 'Freelancers similares cobram em média 15% a mais',
      action: 'Ajustar Preços'
    },
    {
      icon: Clock,
      title: 'Otimize seu tempo de resposta',
      description: 'Responder em até 2h aumenta em 40% a chance de fechar',
      action: 'Ativar Notificações'
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getChangeColor = (value: number, invertLogic = false) => {
    const isPositive = invertLogic ? value < 0 : value > 0;
    return isPositive 
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400';
  };

  const getChangeIcon = (value: number, invertLogic = false) => {
    const isPositive = invertLogic ? value < 0 : value > 0;
    return isPositive ? TrendingUp : TrendingDown;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Insights & Relatórios" showBack />

      <div className="px-4 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Period Selector */}
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 dark:text-white">Visão Geral</h2>
          <div className="flex gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
            {[
              { value: '7d', label: '7d' },
              { value: '30d', label: '30d' },
              { value: '90d', label: '90d' },
              { value: '1y', label: '1a' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setPeriod(option.value as typeof period)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  period === option.value
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Earnings */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-500">Ganhos Totais</span>
              <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-gray-900 dark:text-white mb-1">{formatCurrency(stats.totalEarnings)}</p>
            <div className={`flex items-center gap-1 text-sm ${getChangeColor(stats.earningsChange)}`}>
              {getChangeIcon(stats.earningsChange) === TrendingUp ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(stats.earningsChange)}% vs mês anterior
            </div>
          </div>

          {/* Avg Project Value */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-500">Valor Médio</span>
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-gray-900 dark:text-white mb-1">{formatCurrency(stats.avgProjectValue)}</p>
            <div className={`flex items-center gap-1 text-sm ${getChangeColor(stats.avgProjectValueChange)}`}>
              {getChangeIcon(stats.avgProjectValueChange) === TrendingUp ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(stats.avgProjectValueChange)}% vs mês anterior
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-500">Taxa de Sucesso</span>
              <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-gray-900 dark:text-white mb-1">{stats.successRate}%</p>
            <div className={`flex items-center gap-1 text-sm ${getChangeColor(stats.successRateChange)}`}>
              {getChangeIcon(stats.successRateChange) === TrendingUp ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(stats.successRateChange)}% vs mês anterior
            </div>
          </div>

          {/* Avg Delivery Time */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-500">Tempo Médio</span>
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-gray-900 dark:text-white mb-1">{stats.avgDeliveryTime} dias</p>
            <div className={`flex items-center gap-1 text-sm ${getChangeColor(stats.avgDeliveryTimeChange, true)}`}>
              {getChangeIcon(stats.avgDeliveryTimeChange, true) === TrendingUp ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(stats.avgDeliveryTimeChange)}% mais rápido
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <FinancialChart
            data={earningsData}
            type="area"
            color="#10B981"
            title="Evolução de Ganhos"
          />
          <FinancialChart
            data={projectsData}
            type="bar"
            color="#3B82F6"
            title="Projetos Concluídos"
          />
        </div>

        {/* Performance Overview */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Resumo de Performance</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Projetos Concluídos</span>
                <span className="text-gray-900 dark:text-white">{stats.completedProjects}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-600 to-emerald-600"
                  style={{ width: `${(stats.completedProjects / 30) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Taxa de Aceitação</span>
                <span className="text-gray-900 dark:text-white">{stats.acceptanceRate}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                  style={{ width: `${stats.acceptanceRate}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Projetos Ativos</span>
                <span className="text-gray-900 dark:text-white">{stats.activeProjects}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-600 to-red-600"
                  style={{ width: `${(stats.activeProjects / 10) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Total de Propostas</span>
                <span className="text-gray-900 dark:text-white">{stats.totalProposals}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  style={{ width: `${(stats.totalProposals / 50) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-gray-900 dark:text-white">Recomendações da IA</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 dark:text-white mb-1">{rec.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {rec.description}
                      </p>
                      <Button size="sm" variant="outline">
                        {rec.action}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Report */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-center">
          <Award className="w-12 h-12 text-white mx-auto mb-3" />
          <h3 className="text-white mb-2">Relatório Completo</h3>
          <p className="text-blue-100 mb-4">
            Baixe seu relatório detalhado em PDF com todas as métricas e insights
          </p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>
    </div>
  );
}
