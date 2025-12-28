import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MessageSquare, Search, Star, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      icon: MessageSquare,
      label: 'Chat',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => navigate('/chat/1')
    },
    {
      icon: Search,
      label: 'Buscar',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => navigate('/projects')
    },
    {
      icon: Star,
      label: 'Avaliações',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      onClick: () => navigate('/reviews')
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => navigate('/analytics')
    }
  ];

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 20, y: 20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className={`${action.color} text-white rounded-full p-3 shadow-lg flex items-center gap-3 whitespace-nowrap group`}
                >
                  <Icon className="w-5 h-5" />
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {action.label}
                  </motion.span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </div>
  );
}
