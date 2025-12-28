import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, Wallet, FileText, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';

const tourSteps = [
  {
    id: 1,
    icon: FileText,
    title: 'Encontre Projetos Perfeitos',
    description: 'Use nossa busca inteligente com IA para descobrir projetos que combinam perfeitamente com suas habilidades',
    visual: (
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border-2 border-dashed border-blue-300 dark:border-blue-700">
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
              <span className="text-green-600 dark:text-green-400">95%</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-1/3"></div>
              </div>
              <span className="text-blue-600 dark:text-blue-400">82%</span>
            </div>
          </div>
        </div>
      </div>
    ),
    tips: [
      'IA analisa seu perfil e ranqueia projetos',
      'Veja seu score de compatibilidade',
      'Propostas sugeridas para você'
    ]
  },
  {
    id: 2,
    icon: Sparkles,
    title: 'Propostas Profissionais com IA',
    description: 'Gere propostas impressionantes em segundos. Nossa IA entende o projeto e destaca suas qualificações',
    visual: (
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border-2 border-dashed border-purple-300 dark:border-purple-700">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-400">IA gerando...</span>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-purple-200 dark:bg-purple-900/50 rounded w-full"></div>
            <div className="h-3 bg-purple-200 dark:bg-purple-900/50 rounded w-5/6"></div>
            <div className="h-3 bg-purple-200 dark:bg-purple-900/50 rounded w-4/6"></div>
            <div className="h-3 bg-purple-200 dark:bg-purple-900/50 rounded w-3/6"></div>
          </div>
          <div className="mt-4 flex gap-2">
            <div className="flex-1 h-8 bg-purple-600 rounded-lg"></div>
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    ),
    tips: [
      'Cole a descrição do projeto',
      'IA gera proposta personalizada',
      'Edite e envie em 1 clique'
    ]
  },
  {
    id: 3,
    icon: Wallet,
    title: 'Pagamentos Seguros',
    description: 'Sistema de escrow protege ambos os lados. O dinheiro fica bloqueado até a entrega ser aprovada',
    visual: (
      <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border-2 border-dashed border-green-300 dark:border-green-700">
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Saldo Disponível</p>
            <div className="text-3xl text-green-600 dark:text-green-400 mb-1">R$ 5.420</div>
            <div className="text-gray-500 dark:text-gray-500">+R$ 2.500 pendente</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-600 text-white rounded-xl p-3 text-center">
              <Wallet className="w-6 h-6 mx-auto mb-1" />
              <span>Receber</span>
            </div>
            <div className="bg-blue-600 text-white rounded-xl p-3 text-center">
              <ChevronRight className="w-6 h-6 mx-auto mb-1" />
              <span>Sacar</span>
            </div>
          </div>
        </div>
      </div>
    ),
    tips: [
      'Dinheiro bloqueado até aprovação',
      'Saque via PIX instantâneo',
      'Zero taxas escondidas'
    ]
  }
];

export function Tour() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    localStorage.setItem('nomadhub-tour-completed', 'true');
    navigate('/');
  };

  const CurrentIcon = tourSteps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-8 pb-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex gap-2 max-w-md">
            {tourSteps.map((step, idx) => (
              <div
                key={step.id}
                className={`h-1 flex-1 rounded-full transition-all ${
                  idx <= currentStep
                    ? 'bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
        <button
          onClick={handleFinish}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-md mx-auto py-8"
          >
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <CurrentIcon className="w-10 h-10 text-white" />
            </div>

            {/* Title & Description */}
            <h2 className="text-gray-900 dark:text-white text-center mb-3">
              {tourSteps[currentStep].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              {tourSteps[currentStep].description}
            </p>

            {/* Visual */}
            <div className="mb-8">
              {tourSteps[currentStep].visual}
            </div>

            {/* Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                💡 Dicas rápidas
              </h3>
              <ul className="space-y-3">
                {tourSteps[currentStep].tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="p-4 pb-8">
        <div className="max-w-md mx-auto space-y-3">
          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl min-h-[56px]"
          >
            {currentStep < tourSteps.length - 1 ? (
              <>
                Próximo
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Começar a usar
                <Check className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          <div className="text-center">
            <button
              onClick={handleFinish}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Pular tutorial ({currentStep + 1}/{tourSteps.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
