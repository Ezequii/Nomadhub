import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Users,
  Award,
  Target,
  Lightbulb,
  Star
} from 'lucide-react';

interface TrustScoreData {
  score: number;
  level: 'Iniciante' | 'Confiável' | 'Top Freelancer';
  metrics: {
    onTimeDelivery: number;
    noDisputes: number;
    avgRating: number;
    communityParticipation: number;
  };
  totalProjects: number;
  totalReviews: number;
}

export function TrustScore() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [trustData, setTrustData] = useState<TrustScoreData | null>(null);

  useEffect(() => {
    loadTrustScore();
  }, []);

  const loadTrustScore = async () => {
    setLoading(true);
    try {
      // Mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData: TrustScoreData = {
        score: 87,
        level: 'Confiável',
        metrics: {
          onTimeDelivery: 95,
          noDisputes: 100,
          avgRating: 4.8,
          communityParticipation: 72
        },
        totalProjects: 24,
        totalReviews: 22
      };
      
      setTrustData(mockData);
    } catch (error) {
      console.error('Error loading trust score:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelConfig = (level: string) => {
    const configs = {
      'Iniciante': {
        color: 'text-gray-700 dark:text-gray-300',
        bgColor: 'bg-gray-100 dark:bg-gray-700',
        borderColor: 'border-gray-300 dark:border-gray-600',
        icon: Shield,
        description: 'Continue trabalhando para evoluir'
      },
      'Confiável': {
        color: 'text-blue-700 dark:text-blue-300',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        borderColor: 'border-blue-300 dark:border-blue-700',
        icon: CheckCircle,
        description: 'Você é um profissional confiável'
      },
      'Top Freelancer': {
        color: 'text-yellow-700 dark:text-yellow-300',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        borderColor: 'border-yellow-300 dark:border-yellow-700',
        icon: Award,
        description: 'Parabéns! Você está no topo'
      }
    };
    return configs[level as keyof typeof configs];
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  const tips = [
    {
      icon: Clock,
      title: 'Entregue no prazo',
      description: 'Cumprir prazos aumenta sua confiabilidade em 15 pontos',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Users,
      title: 'Participe da comunidade',
      description: 'Compartilhe conhecimento e ajude outros membros',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Star,
      title: 'Peça avaliações',
      description: 'Avaliações 5 estrelas fortalecem sua reputação',
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: Target,
      title: 'Evite disputas',
      description: 'Mantenha boa comunicação com seus clientes',
      color: 'text-green-600 dark:text-green-400'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Carregando Trust Score...</p>
        </div>
      </div>
    );
  }

  if (!trustData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-gray-900 dark:text-white mb-2">Erro ao carregar dados</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors min-h-[48px]"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const levelConfig = getLevelConfig(trustData.level);
  const LevelIcon = levelConfig.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-gray-900 dark:text-white">Trust Score</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Score Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-4">
              <span className={`${getScoreColor(trustData.score)}`}>
                {trustData.score}
              </span>
            </div>
            <h2 className="text-gray-900 dark:text-white mb-2">
              Seu Trust Score
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Baseado em {trustData.totalProjects} projetos e {trustData.totalReviews} avaliações
            </p>
          </div>

          {/* Level Badge */}
          <div className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 ${levelConfig.borderColor} ${levelConfig.bgColor}`}>
            <LevelIcon className={`w-6 h-6 ${levelConfig.color}`} />
            <div className="text-center">
              <div className={`${levelConfig.color} mb-1`}>
                {trustData.level}
              </div>
              <p className={`${levelConfig.color}`}>
                {levelConfig.description}
              </p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">
            Indicadores de Desempenho
          </h3>

          <div className="space-y-4">
            {/* On-time Delivery */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">Entregas no prazo</span>
                </div>
                <span className="text-blue-600 dark:text-blue-400">
                  {trustData.metrics.onTimeDelivery}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${trustData.metrics.onTimeDelivery}%` }}
                  role="progressbar"
                  aria-valuenow={trustData.metrics.onTimeDelivery}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>

            {/* No Disputes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-900 dark:text-white">Contratos sem disputa</span>
                </div>
                <span className="text-green-600 dark:text-green-400">
                  {trustData.metrics.noDisputes}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${trustData.metrics.noDisputes}%` }}
                  role="progressbar"
                  aria-valuenow={trustData.metrics.noDisputes}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>

            {/* Average Rating */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-gray-900 dark:text-white">Média de avaliações</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-600 dark:text-yellow-400">
                    {trustData.metrics.avgRating.toFixed(1)}
                  </span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full transition-all"
                  style={{ width: `${(trustData.metrics.avgRating / 5) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={(trustData.metrics.avgRating / 5) * 100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>

            {/* Community Participation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-900 dark:text-white">Participação na comunidade</span>
                </div>
                <span className="text-purple-600 dark:text-purple-400">
                  {trustData.metrics.communityParticipation}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${trustData.metrics.communityParticipation}%` }}
                  role="progressbar"
                  aria-valuenow={trustData.metrics.communityParticipation}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tips to Improve */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-gray-900 dark:text-white">
              Como melhorar seu score
            </h3>
          </div>

          <div className="space-y-3">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${tip.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-white mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tip.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-900 dark:text-blue-300 mb-1">
                Trust Score em Evolução
              </h4>
              <p className="text-blue-800 dark:text-blue-400">
                Seu Trust Score é atualizado automaticamente a cada novo projeto concluído. 
                Mantenha a qualidade e veja sua reputação crescer!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
