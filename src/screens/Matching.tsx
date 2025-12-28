import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { Sparkles, TrendingUp, Target, Zap, Brain, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

interface ProjectMatch {
  project: {
    id: string;
    title: string;
    description: string;
    budgetMin?: number;
    budgetMax?: number;
    currency: string;
    status: string;
    createdAt: string;
  };
  matchScore: number;
  reasons: string[];
  skillsMatched: string[];
  estimatedEarnings?: number;
}

export function Matching() {
  const [matches, setMatches] = useState<ProjectMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'excellent' | 'good' | 'potential'>('all');

  useEffect(() => {
    // Mock data - simula AI matching
    const mockMatches: ProjectMatch[] = [
      {
        project: {
          id: '1',
          title: 'Desenvolvimento de App Mobile para Delivery',
          description: 'Precisamos de um desenvolvedor React Native experiente para criar um app de delivery completo com pagamentos integrados.',
          budgetMin: 15000,
          budgetMax: 25000,
          currency: 'BRL',
          status: 'open',
          createdAt: new Date().toISOString()
        },
        matchScore: 95,
        reasons: [
          'Suas skills em React Native são altamente relevantes',
          'Seu Trust Score de 92 está acima da média do mercado',
          '5 projetos similares concluídos com sucesso',
          'Cliente está no mesmo timezone (GMT-3)'
        ],
        skillsMatched: ['React Native', 'TypeScript', 'API Integration', 'Payment Systems'],
        estimatedEarnings: 20000
      },
      {
        project: {
          id: '2',
          title: 'Dashboard Analytics com React + D3.js',
          description: 'Desenvolvimento de dashboard interativo para visualização de dados financeiros em tempo real.',
          budgetMin: 8000,
          budgetMax: 12000,
          currency: 'BRL',
          status: 'open',
          createdAt: new Date().toISOString()
        },
        matchScore: 88,
        reasons: [
          'Expertise em React e visualização de dados',
          '3 projetos de dashboard em seu portfolio',
          'Orçamento alinhado com sua taxa média',
          'Prazo flexível de 4-6 semanas'
        ],
        skillsMatched: ['React', 'TypeScript', 'Data Visualization', 'D3.js'],
        estimatedEarnings: 10000
      },
      {
        project: {
          id: '3',
          title: 'Sistema de Chat em Tempo Real',
          description: 'Implementação de sistema de chat com WebSockets para plataforma de educação.',
          budgetMin: 5000,
          budgetMax: 8000,
          currency: 'BRL',
          status: 'open',
          createdAt: new Date().toISOString()
        },
        matchScore: 82,
        reasons: [
          'Experiência com WebSockets e real-time',
          'Portfolio mostra projetos de comunicação',
          'Orçamento competitivo',
          'Tecnologias familiares (React + Node.js)'
        ],
        skillsMatched: ['React', 'WebSockets', 'Node.js', 'Real-time Systems'],
        estimatedEarnings: 6500
      },
      {
        project: {
          id: '4',
          title: 'E-commerce B2B com Next.js',
          description: 'Plataforma de e-commerce B2B com gestão de pedidos, catálogo e integrações de pagamento.',
          budgetMin: 18000,
          budgetMax: 28000,
          currency: 'BRL',
          status: 'open',
          createdAt: new Date().toISOString()
        },
        matchScore: 75,
        reasons: [
          'Skills em Next.js e e-commerce',
          'Experiência com sistemas de pagamento',
          'Cliente valoriza desenvolvedores verificados',
          'Projeto de longo prazo (3-4 meses)'
        ],
        skillsMatched: ['Next.js', 'React', 'E-commerce', 'Payment Integration'],
        estimatedEarnings: 23000
      },
      {
        project: {
          id: '5',
          title: 'Refatoração de Código Legacy React',
          description: 'Refatorar aplicação React antiga para TypeScript + hooks modernos + melhorias de performance.',
          budgetMin: 6000,
          budgetMax: 10000,
          currency: 'BRL',
          status: 'open',
          createdAt: new Date().toISOString()
        },
        matchScore: 70,
        reasons: [
          'Expertise em refatoração e best practices',
          'Conhecimento avançado de TypeScript',
          'Bom fit para projeto de curto prazo',
          'Cliente busca qualidade sobre velocidade'
        ],
        skillsMatched: ['React', 'TypeScript', 'Code Refactoring', 'Performance'],
        estimatedEarnings: 8000
      }
    ];

    setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMatches = matches.filter(match => {
    if (filter === 'excellent') return match.matchScore >= 85;
    if (filter === 'good') return match.matchScore >= 70 && match.matchScore < 85;
    if (filter === 'potential') return match.matchScore < 70;
    return true;
  });

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  const getMatchBadge = (score: number) => {
    if (score >= 85) return { text: 'Excelente Match', variant: 'default' as const };
    if (score >= 70) return { text: 'Bom Match', variant: 'secondary' as const };
    return { text: 'Match Potencial', variant: 'outline' as const };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center pb-20">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <div className="text-gray-600 dark:text-gray-400">Analisando projetos com IA...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <Header title="Matching Inteligente" />

      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-purple-600 rounded-2xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900 dark:text-white">Projetos Recomendados</h2>
              <p className="text-gray-600 dark:text-gray-400">
                IA analisou {matches.length} projetos perfeitos para você
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Target className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {matches.filter(m => m.matchScore >= 85).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Excelentes</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {matches.reduce((sum, m) => sum + (m.estimatedEarnings || 0), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Potencial</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {Math.round(matches.reduce((sum, m) => sum + m.matchScore, 0) / matches.length)}%
              </div>
              <div className="text-gray-600 dark:text-gray-400">Match Médio</div>
            </div>
          </Card>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="min-h-[44px]"
          >
            Todos ({matches.length})
          </Button>
          <Button
            variant={filter === 'excellent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('excellent')}
            className="min-h-[44px]"
          >
            Excelentes ({matches.filter(m => m.matchScore >= 85).length})
          </Button>
          <Button
            variant={filter === 'good' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('good')}
            className="min-h-[44px]"
          >
            Bons ({matches.filter(m => m.matchScore >= 70 && m.matchScore < 85).length})
          </Button>
          <Button
            variant={filter === 'potential' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('potential')}
            className="min-h-[44px]"
          >
            Potenciais ({matches.filter(m => m.matchScore < 70).length})
          </Button>
        </motion.div>

        {/* Matches List */}
        <div className="space-y-4">
          {filteredMatches.map((match, index) => (
            <motion.div
              key={match.project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow">
                {/* Match Score Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`${getMatchColor(match.matchScore)}`}>
                      {match.matchScore}%
                    </div>
                    <Badge variant={getMatchBadge(match.matchScore).variant}>
                      {getMatchBadge(match.matchScore).text}
                    </Badge>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Est. {match.estimatedEarnings?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                </div>

                {/* Progress Bar */}
                <Progress value={match.matchScore} className="mb-4 h-2" />

                {/* Project Info */}
                <h3 className="text-gray-900 dark:text-white mb-2">
                  {match.project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {match.project.description}
                </p>

                {/* Budget */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-gray-600 dark:text-gray-400">
                    Orçamento: <span className="text-gray-900 dark:text-white">
                      {match.project.budgetMin?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - {match.project.budgetMax?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                </div>

                {/* Skills Matched */}
                <div className="mb-4">
                  <div className="text-gray-600 dark:text-gray-400 mb-2">
                    Skills combinadas:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {match.skillsMatched.map((skill, i) => (
                      <Badge key={i} variant="secondary">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Reasons */}
                <div className="space-y-2 mb-4">
                  <div className="text-gray-600 dark:text-gray-400">
                    Por que esse match é bom:
                  </div>
                  {match.reasons.slice(0, 3).map((reason, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button className="w-full min-h-[44px]" size="lg">
                  Ver Projeto Completo
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Brain className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum projeto encontrado nessa categoria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}