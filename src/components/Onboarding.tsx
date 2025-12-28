import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Check, Briefcase, MapPin, CreditCard, Trophy, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface OnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface Step {
  id: number;
  icon: any;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: Briefcase,
    title: 'Encontre Projetos Remotos',
    description: 'Acesse milhares de projetos de empresas ao redor do mundo. Trabalhe de qualquer lugar, no seu ritmo.',
    image: '🚀',
  },
  {
    id: 2,
    icon: MapPin,
    title: 'Descubra Destinos',
    description: 'Explore os melhores lugares para nômades digitais com custo de vida, WiFi, comunidade e muito mais.',
    image: '🌍',
  },
  {
    id: 3,
    icon: CreditCard,
    title: 'Pagamentos Seguros',
    description: 'Sistema de escrow garante que você receba pelo seu trabalho. Suporte a Pix, PayPal e Cripto.',
    image: '💰',
  },
  {
    id: 4,
    icon: Trophy,
    title: 'Construa Reputação',
    description: 'Ganhe badges, aumente seu Trust Score e desbloqueie projetos exclusivos à medida que cresce.',
    image: '🏆',
  },
  {
    id: 5,
    icon: MessageSquare,
    title: 'Conecte-se com a Comunidade',
    description: 'Chat integrado, feed de comunidade e networking com outros nômades digitais globalmente.',
    image: '💬',
  },
];

export function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>{step.image}</div>
            <span className="text-gray-500 dark:text-gray-400">
              {currentStep + 1} de {steps.length}
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-800">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
                  <Icon className="w-10 h-10 text-white" />
                </div>
              </div>

              <h2 className="mb-4 text-center text-gray-900 dark:text-white">
                {step.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="flex gap-1.5">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-blue-600 w-6'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {isLastStep ? (
              <>
                Começar
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Próximo
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}