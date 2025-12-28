import { motion } from 'motion/react';
import { Trophy, Star, Target, Award, Zap, Crown, Shield, Flame } from 'lucide-react';
import { Progress } from './ui/progress';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconComponent: any;
  unlocked: boolean;
  progress: number;
  total: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Primeira Proposta',
    description: 'Envie sua primeira proposta',
    icon: '📝',
    iconComponent: Target,
    unlocked: true,
    progress: 1,
    total: 1,
    rarity: 'common',
    unlockedAt: '2025-01-15',
  },
  {
    id: '2',
    title: 'Projeto Concluído',
    description: 'Complete seu primeiro projeto',
    icon: '✅',
    iconComponent: Star,
    unlocked: true,
    progress: 1,
    total: 1,
    rarity: 'common',
    unlockedAt: '2025-02-01',
  },
  {
    id: '3',
    title: 'Streak de 7 Dias',
    description: 'Acesse a plataforma por 7 dias seguidos',
    icon: '🔥',
    iconComponent: Flame,
    unlocked: false,
    progress: 4,
    total: 7,
    rarity: 'rare',
  },
  {
    id: '4',
    title: 'Top 10%',
    description: 'Entre no top 10% de freelancers',
    icon: '🏆',
    iconComponent: Trophy,
    unlocked: false,
    progress: 87,
    total: 90,
    rarity: 'epic',
  },
  {
    id: '5',
    title: 'Guru',
    description: 'Complete 50 projetos com sucesso',
    icon: '👑',
    iconComponent: Crown,
    unlocked: false,
    progress: 12,
    total: 50,
    rarity: 'legendary',
  },
  {
    id: '6',
    title: 'Resposta Rápida',
    description: 'Responda 10 mensagens em menos de 5 minutos',
    icon: '⚡',
    iconComponent: Zap,
    unlocked: true,
    progress: 10,
    total: 10,
    rarity: 'rare',
    unlockedAt: '2025-02-10',
  },
  {
    id: '7',
    title: '5 Estrelas',
    description: 'Receba 10 avaliações de 5 estrelas',
    icon: '⭐',
    iconComponent: Award,
    unlocked: false,
    progress: 6,
    total: 10,
    rarity: 'epic',
  },
  {
    id: '8',
    title: 'Confiável',
    description: 'Alcance Trust Score de 95+',
    icon: '🛡️',
    iconComponent: Shield,
    unlocked: false,
    progress: 88,
    total: 95,
    rarity: 'epic',
  },
];

interface AchievementsProps {
  showAll?: boolean;
  limit?: number;
}

export function Achievements({ showAll = false, limit = 4 }: AchievementsProps) {
  const displayedAchievements = showAll ? achievements : achievements.slice(0, limit);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-500';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-400 to-purple-600';
      case 'legendary':
        return 'from-yellow-400 to-orange-600';
    }
  };

  const getRarityBorder = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 dark:border-gray-600';
      case 'rare':
        return 'border-blue-400 dark:border-blue-600';
      case 'epic':
        return 'border-purple-400 dark:border-purple-600';
      case 'legendary':
        return 'border-yellow-400 dark:border-orange-600';
    }
  };

  const getRarityText = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-600 dark:text-gray-400';
      case 'rare':
        return 'text-blue-600 dark:text-blue-400';
      case 'epic':
        return 'text-purple-600 dark:text-purple-400';
      case 'legendary':
        return 'text-yellow-600 dark:text-orange-400';
    }
  };

  return (
    <div>
      {showAll && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-blue-600 text-white p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-8 h-8" />
            <div>
              <h2>Conquistas</h2>
              <p className="text-blue-100">
                {unlockedCount} de {totalCount} desbloqueadas
              </p>
            </div>
          </div>
          <Progress value={(unlockedCount / totalCount) * 100} className="h-2 bg-white/20" />
        </motion.div>
      )}

      <div className={showAll ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-3'}>
        {displayedAchievements.map((achievement, index) => {
          const Icon = achievement.iconComponent;
          const isLocked = !achievement.unlocked;
          const progressPercentage = (achievement.progress / achievement.total) * 100;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border-2 ${
                isLocked ? 'opacity-60' : getRarityBorder(achievement.rarity)
              }`}
            >
              {/* Rarity Glow */}
              {!isLocked && (
                <div className="absolute inset-0 bg-blue-50 dark:bg-blue-950 opacity-30" />
              )}

              <div className="relative flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isLocked
                      ? 'bg-gray-200 dark:bg-gray-700'
                      : 'bg-blue-600'
                  }`}
                >
                  {isLocked ? (
                    <Icon className="w-7 h-7 text-gray-400" />
                  ) : (
                    <span>{achievement.icon}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`text-gray-900 dark:text-white ${isLocked ? 'text-gray-500 dark:text-gray-500' : ''}`}>
                      {achievement.title}
                    </h3>
                    <span className={`uppercase px-2 py-1 rounded-full ${getRarityText(achievement.rarity)} bg-current bg-opacity-10 whitespace-nowrap`}>
                      {achievement.rarity}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {achievement.description}
                  </p>

                  {/* Progress */}
                  {isLocked ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Progresso</span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-1.5" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Trophy className="w-3.5 h-3.5" />
                      Desbloqueado em {new Date(achievement.unlockedAt!).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>
              </div>

              {/* Unlocked Badge */}
              {!isLocked && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute top-3 right-3"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Trophy className="w-3.5 h-3.5 text-white" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {!showAll && achievements.length > limit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center"
        >
          <a
            href="/achievements"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Ver todas as {totalCount} conquistas →
          </a>
        </motion.div>
      )}
    </div>
  );
}