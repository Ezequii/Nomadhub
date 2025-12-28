import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { 
  Star, 
  Clock, 
  DollarSign, 
  MessageCircle, 
  CheckCircle2,
  TrendingUp,
  Shield,
  Award,
  Eye,
  Filter
} from 'lucide-react';

interface Proposal {
  id: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  trustScore: number;
  rating: number;
  completedProjects: number;
  proposedBudget: number;
  proposedDeadline: number;
  coverLetter: string;
  skills: string[];
  responseTime: string;
  badges: string[];
}

export function ProposalsReceived() {
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.state?.projectId || 'project-123';

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'trustScore' | 'budget' | 'deadline'>('trustScore');

  useEffect(() => {
    // Mock: carregar propostas
    setTimeout(() => {
      setProposals([
        {
          id: 'prop-1',
          freelancerId: 'user-1',
          freelancerName: 'Maria Silva',
          freelancerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
          trustScore: 95,
          rating: 4.9,
          completedProjects: 47,
          proposedBudget: 4500,
          proposedDeadline: 25,
          coverLetter: 'Olá! Tenho 5 anos de experiência em desenvolvimento web e já trabalhei em projetos similares. Posso entregar uma solução moderna e responsiva.',
          skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
          responseTime: '1h',
          badges: ['Top Rated', 'Fast Response']
        },
        {
          id: 'prop-2',
          freelancerId: 'user-2',
          freelancerName: 'João Santos',
          freelancerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
          trustScore: 88,
          rating: 4.7,
          completedProjects: 32,
          proposedBudget: 5200,
          proposedDeadline: 20,
          coverLetter: 'Especialista em React e Next.js. Posso começar imediatamente e entregar antes do prazo.',
          skills: ['React', 'Next.js', 'CSS', 'APIs'],
          responseTime: '30min',
          badges: ['Fast Response']
        },
        {
          id: 'prop-3',
          freelancerId: 'user-3',
          freelancerName: 'Ana Costa',
          freelancerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
          trustScore: 92,
          rating: 5.0,
          completedProjects: 68,
          proposedBudget: 4800,
          proposedDeadline: 30,
          coverLetter: 'Com mais de 60 projetos entregues, garanto qualidade e comunicação constante durante todo o processo.',
          skills: ['React', 'TypeScript', 'UI/UX', 'Figma'],
          responseTime: '2h',
          badges: ['Top Rated', 'Verified']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [projectId]);

  const sortedProposals = [...proposals].sort((a, b) => {
    if (sortBy === 'trustScore') return b.trustScore - a.trustScore;
    if (sortBy === 'budget') return a.proposedBudget - b.proposedBudget;
    if (sortBy === 'deadline') return a.proposedDeadline - b.proposedDeadline;
    return 0;
  });

  const handleAccept = (proposalId: string) => {
    navigate(`/contracts/new`, { 
      state: { 
        projectId, 
        proposalId,
        action: 'accept'
      } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <div className="text-gray-600 dark:text-gray-400">Carregando propostas...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <Header 
        title="Propostas Recebidas" 
        showBack 
        onBack={() => navigate(-1)}
      />

      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-2xl text-gray-900 dark:text-white mb-1">{proposals.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Propostas</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-2xl text-gray-900 dark:text-white mb-1">
              R$ {Math.min(...proposals.map(p => p.proposedBudget))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Menor valor</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-2xl text-gray-900 dark:text-white mb-1">
              {Math.min(...proposals.map(p => p.proposedDeadline))}d
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Menor prazo</div>
          </div>
        </motion.div>

        {/* Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-4"
        >
          <h3 className="text-gray-900 dark:text-white">
            Comparar Propostas
          </h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="trustScore">Maior Trust Score</option>
              <option value="budget">Menor Preço</option>
              <option value="deadline">Menor Prazo</option>
            </select>
          </div>
        </motion.div>

        {/* Proposals List */}
        <div className="space-y-4">
          {sortedProposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-4">
                  <img
                    src={proposal.freelancerAvatar}
                    alt={proposal.freelancerName}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg text-gray-900 dark:text-white">
                        {proposal.freelancerName}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                          <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-blue-600 dark:text-blue-400">
                            {proposal.trustScore}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {proposal.badges.map((badge) => (
                        <span
                          key={badge}
                          className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs"
                        >
                          <Award className="w-3 h-3" />
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{proposal.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>{proposal.completedProjects} projetos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Responde em {proposal.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proposal Details */}
              <div className="p-6">
                {/* Budget & Deadline */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Valor proposto</span>
                    </div>
                    <p className="text-2xl text-gray-900 dark:text-white">
                      R$ {proposal.proposedBudget.toLocaleString()}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Prazo proposto</span>
                    </div>
                    <p className="text-2xl text-gray-900 dark:text-white">
                      {proposal.proposedDeadline} dias
                    </p>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Carta de apresentação</p>
                  <p className="text-gray-900 dark:text-white">
                    {selectedProposal === proposal.id 
                      ? proposal.coverLetter 
                      : `${proposal.coverLetter.slice(0, 120)}...`}
                  </p>
                  {selectedProposal !== proposal.id && (
                    <button
                      onClick={() => setSelectedProposal(proposal.id)}
                      className="text-blue-600 dark:text-blue-400 text-sm mt-2 hover:underline"
                    >
                      Ler mais
                    </button>
                  )}
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Habilidades</p>
                  <div className="flex flex-wrap gap-2">
                    {proposal.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => navigate(`/profile/${proposal.freelancerId}`)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Perfil
                  </Button>
                  <Button
                    onClick={() => navigate(`/chat/${proposal.freelancerId}`)}
                    variant="outline"
                    className="flex-1"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                  <Button
                    onClick={() => handleAccept(proposal.id)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Aceitar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {proposals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 dark:text-white mb-2">
              Nenhuma proposta ainda
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Freelancers começarão a enviar propostas em breve
            </p>
            <Button onClick={() => navigate('/projects')}>
              Ver Outros Projetos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
