import { motion, AnimatePresence } from 'motion/react';
import { X, Crown, Sparkles, Zap, Check, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProUpgradeModal({ isOpen, onClose }: ProUpgradeModalProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate('/pricing');
  };

  const handleTrial = () => {
    onClose();
    navigate('/checkout?plan=pro&trial=true');
  };

  const proFeatures = [
    { icon: Sparkles, text: 'Propostas ilimitadas com IA' },
    { icon: Zap, text: 'Geração automática de entregas' },
    { icon: Crown, text: 'Templates premium exclusivos' },
    { icon: Check, text: 'Suporte prioritário 24/7' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto"
            >
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white overflow-hidden">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                />
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                    <Crown className="w-8 h-8" />
                  </div>
                  <h2 className="text-white mb-2">Gostou da IA? 🚀</h2>
                  <p className="text-white/90 leading-relaxed">
                    No plano <strong>Pro</strong> você desbloqueia todo o potencial do NomadHub
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="p-6 space-y-4">
                {proFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{feature.text}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Trial Banner */}
              <div className="mx-6 mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-900 dark:text-green-100">
                    <strong>7 dias grátis</strong>
                  </span>
                </div>
                <p className="text-green-700 dark:text-green-300">
                  Experimente sem compromisso. Cancele quando quiser.
                </p>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 space-y-3">
                <Button
                  onClick={handleTrial}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 shadow-lg"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Experimentar grátis por 7 dias
                </Button>

                <Button
                  onClick={handleUpgrade}
                  variant="outline"
                  className="w-full py-6"
                >
                  Ver planos e preços
                </Button>

                <button
                  onClick={onClose}
                  className="w-full text-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors min-h-[44px]"
                >
                  Talvez depois
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
