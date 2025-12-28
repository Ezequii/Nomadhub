import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Sparkles, 
  Filter, 
  TrendingUp, 
  Star, 
  DollarSign,
  Clock,
  MapPin,
  Zap,
  Target,
  Brain,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: { min: number; max: number };
  deadline: string;
  skills: string[];
  client: {
    name: string;
    rating: number;
    location: string;
  };
  matchScore?: number;
  aiRecommendation?: string;
}

interface UserProfile {
  skills: string[];
  experience: string[];
  completedProjects: number;
  rating: number;
}

export function ProjectSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [aiMode, setAiMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState({
    minBudget: '',
    maxBudget: '',
    skills: [] as string[],
    deadline: 'any',
    matchThreshold: 70
  });

  // Mock user profile
  const userProfile: UserProfile = {
    skills: ['React', 'TypeScript', 'Node.js', 'UI/UX Design'],
    experience: ['E-commerce', 'SaaS', 'Mobile Apps'],
    completedProjects: 42,
    rating: 4.8
  };

  // Mock projects with AI matching
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Desenvolvimento de Dashboard Analytics com React',
      description: 'Preciso de um dashboard interativo com gráficos em tempo real, integração com APIs REST e design responsivo. O projeto deve ser desenvolvido em React com TypeScript.',
      budget: { min: 3000, max: 5000 },
      deadline: '30 dias',
      skills: ['React', 'TypeScript', 'Charts', 'API Integration'],
      client: {
        name: 'TechCorp Brasil',
        rating: 4.9,
        location: 'São Paulo, BR'
      },
      matchScore: 95,
      aiRecommendation: '🎯 Perfeito para seu perfil! Você tem 100% das skills necessárias e experiência em projetos similares.'
    },
    {
      id: '2',
      title: 'App Mobile de Delivery com React Native',
      description: 'Desenvolvimento completo de aplicativo de delivery incluindo painel admin, app do cliente e motorista. Stack: React Native, Node.js, MongoDB.',
      budget: { min: 8000, max: 12000 },
      deadline: '60 dias',
      skills: ['React Native', 'Node.js', 'MongoDB', 'Real-time'],
      client: {
        name: 'FoodTech Ltda',
        rating: 4.7,
        location: 'Rio de Janeiro, BR'
      },
      matchScore: 85,
      aiRecommendation: '✨ Ótima oportunidade! Seu conhecimento em React se transfere bem para React Native.'
    },
    {
      id: '3',
      title: 'Redesign de E-commerce com foco em UX',
      description: 'Melhorar a experiência do usuário do nosso e-commerce, incluindo redesign completo da interface, otimização de conversão e implementação de novo checkout.',
      budget: { min: 4500, max: 7000 },
      deadline: '45 dias',
      skills: ['UI/UX Design', 'Figma', 'React', 'Conversion Optimization'],
      client: {
        name: 'Fashion Store',
        rating: 4.8,
        location: 'Belo Horizonte, BR'
      },
      matchScore: 92,
      aiRecommendation: '🚀 Altamente recomendado! Sua experiência em E-commerce é um diferencial importante.'
    },
    {
      id: '4',
      title: 'Sistema de Gestão Empresarial (ERP)',
      description: 'Desenvolvimento de ERP customizado com módulos financeiro, estoque, vendas e RH. Backend em Node.js e frontend em React.',
      budget: { min: 15000, max: 25000 },
      deadline: '90 dias',
      skills: ['React', 'Node.js', 'PostgreSQL', 'System Architecture'],
      client: {
        name: 'Indústria XYZ',
        rating: 4.6,
        location: 'Curitiba, BR'
      },
      matchScore: 78,
      aiRecommendation: '💼 Projeto de alto valor! Considere destacar sua experiência em SaaS na proposta.'
    },
    {
      id: '5',
      title: 'Landing Page de Alta Conversão para Startup',
      description: 'Criar landing page moderna e responsiva com animações suaves, formulários otimizados e integração com ferramentas de marketing.',
      budget: { min: 1500, max: 2500 },
      deadline: '15 dias',
      skills: ['React', 'UI/UX Design', 'Animation', 'SEO'],
      client: {
        name: 'StartupHub',
        rating: 4.5,
        location: 'Florianópolis, BR'
      },
      matchScore: 88,
      aiRecommendation: '⚡ Prazo curto, projeto rápido! Perfeito para aumentar seu portfólio.'
    }
  ];

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filtered = mockProjects;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by budget
    if (filters.minBudget) {
      filtered = filtered.filter(p => p.budget.max >= parseInt(filters.minBudget));
    }
    if (filters.maxBudget) {
      filtered = filtered.filter(p => p.budget.min <= parseInt(filters.maxBudget));
    }

    // Filter by match score in AI mode
    if (aiMode) {
      filtered = filtered.filter(p => (p.matchScore || 0) >= filters.matchThreshold);
      filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }

    setProjects(filtered);
    setLoading(false);
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 75) return 'text-blue-600 dark:text-blue-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getMatchBadge = (score: number) => {
    if (score >= 90) return { label: 'Perfeito', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' };
    if (score >= 75) return { label: 'Ótimo', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' };
    if (score >= 60) return { label: 'Bom', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' };
    return { label: 'OK', color: 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400' };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-gray-900 dark:text-white">Buscar Projetos</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {aiMode ? '🤖 Busca Inteligente Ativada' : 'Busca Manual'}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Buscar por título, descrição ou skills..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            <Button
              onClick={() => setAiMode(!aiMode)}
              variant={aiMode ? 'default' : 'outline'}
              className={aiMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
            >
              {aiMode ? <Sparkles className="w-4 h-4 mr-2" /> : <Brain className="w-4 h-4 mr-2" />}
              {aiMode ? 'IA Ativa' : 'Ativar IA'}
            </Button>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button
              onClick={handleSearch}
              variant="outline"
            >
              Buscar
            </Button>
          </div>
        </div>
      </header>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="max-w-screen-xl mx-auto px-4 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-700 dark:text-gray-300 mb-2 block">Orçamento Mín.</label>
                  <input
                    type="number"
                    value={filters.minBudget}
                    onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                    placeholder="R$ 0"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-700 dark:text-gray-300 mb-2 block">Orçamento Máx.</label>
                  <input
                    type="number"
                    value={filters.maxBudget}
                    onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                    placeholder="R$ 999999"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {aiMode && (
                <div>
                  <label className="text-gray-700 dark:text-gray-300 mb-2 block">
                    Match Mínimo: {filters.matchThreshold}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={filters.matchThreshold}
                    onChange={(e) => setFilters({ ...filters, matchThreshold: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* AI Insights */}
        {aiMode && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl p-4">
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-purple-900 dark:text-purple-100 mb-2">🎯 Insights da IA</h3>
                <ul className="text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• Encontramos {projects.length} projetos ideais para seu perfil</li>
                  <li>• Suas skills em React e TypeScript estão em alta demanda</li>
                  <li>• Projetos de alta compatibilidade aumentam em 3x suas chances</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              {aiMode ? 'IA analisando projetos para você...' : 'Buscando projetos...'}
            </p>
          </div>
        )}

        {/* Projects List */}
        {!loading && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-gray-900 dark:text-white">
                {projects.length} projeto{projects.length !== 1 ? 's' : ''} encontrado{projects.length !== 1 ? 's' : ''}
              </h2>
              {aiMode && (
                <span className="text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  Ordenado por compatibilidade
                </span>
              )}
            </div>

            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                {/* Match Score (AI Mode) */}
                {aiMode && project.matchScore && (
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center gap-2 ${getMatchColor(project.matchScore)}`}>
                      <Target className="w-5 h-5" />
                      <span className="font-semibold">{project.matchScore}% Match</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${getMatchBadge(project.matchScore).color}`}>
                      {getMatchBadge(project.matchScore).label}
                    </span>
                  </div>
                )}

                {/* AI Recommendation */}
                {aiMode && project.aiRecommendation && (
                  <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-3 mb-4">
                    <p className="text-purple-700 dark:text-purple-300">
                      {project.aiRecommendation}
                    </p>
                  </div>
                )}

                <h3 className="text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs ${
                        userProfile.skills.includes(skill)
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {skill}
                      {userProfile.skills.includes(skill) && ' ✓'}
                    </span>
                  ))}
                </div>

                {/* Project Info */}
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    R$ {project.budget.min.toLocaleString()} - {project.budget.max.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {project.deadline}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {project.client.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.client.location}
                  </div>
                </div>

                {/* Quick Action */}
                {aiMode && project.matchScore && project.matchScore >= 85 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${project.id}/proposal`);
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Enviar Proposta Rápida
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white mb-2">Nenhum projeto encontrado</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tente ajustar seus filtros ou termos de busca
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setFilters({ minBudget: '', maxBudget: '', skills: [], deadline: 'any', matchThreshold: 70 });
                handleSearch();
              }}
              variant="outline"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
