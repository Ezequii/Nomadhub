import { Search, Wallet, Trophy, Sparkles, BarChart3, MessageSquare, Heart, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  onSearch?: () => void;
  onWithdraw?: () => void;
  onRanking?: () => void;
  onAI?: () => void;
}

export function QuickActions({ onSearch, onWithdraw, onRanking, onAI }: QuickActionsProps) {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'search',
      label: 'Buscar',
      icon: Search,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
      onClick: onSearch
    },
    {
      id: 'favorites',
      label: 'Favoritos',
      icon: Heart,
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400',
      onClick: () => navigate('/favorites')
    },
    {
      id: 'achievements',
      label: 'Conquistas',
      icon: Trophy,
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400',
      onClick: () => navigate('/achievements')
    },
    {
      id: 'referral',
      label: 'Indicar',
      icon: Users,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
      onClick: () => navigate('/referral')
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
      onClick: () => navigate('/analytics')
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageSquare,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
      onClick: () => navigate('/chat/1')
    },
    {
      id: 'ai',
      label: 'IA',
      icon: Sparkles,
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
      onClick: onAI
    },
    {
      id: 'withdraw',
      label: 'Sacar',
      icon: Wallet,
      color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400',
      onClick: onWithdraw
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">{action.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}