import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles, Shield, Zap, Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Logo } from '../components/Logo';

type UserType = 'freelancer' | 'client' | null;

const steps = [
  {
    id: 1,
    icon: Sparkles,
    title: 'Bem-vindo ao NomadHub',
    description: 'A plataforma que conecta talentos remotos com projetos ao redor do mundo',
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 2,
    icon: Shield,
    title: 'Trabalhe com Segurança',
    description: 'Sistema de escrow protege seus pagamentos. Você só libera o dinheiro quando ficar satisfeito',
    color: 'from-green-600 to-emerald-600'
  },
  {
    id: 3,
    icon: Zap,
    title: 'IA Que Acelera Seu Trabalho',
    description: 'Propostas profissionais em segundos, matching inteligente e insights personalizados',
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 4,
    icon: Globe,
    title: 'Comunidade Global',
    description: 'Conecte-se com nômades digitais, participe de eventos e cresça sua rede',
    color: 'from-orange-600 to-red-600'
  }
];

export function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<UserType>(null);
  const [showTypeSelection, setShowTypeSelection] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTypeSelection(true);
    }
  };

  const handleSkip = () => {
    setShowTypeSelection(true);
  };

  const handleSelectType = (type: UserType) => {
    setUserType(type);
    localStorage.setItem('nomadhub-user-type', type || '');
    
    // Navigate to appropriate registration
    if (type === 'freelancer') {
      navigate('/register/freelancer');
    } else {
      navigate('/register/client');
    }
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <AnimatePresence mode="wait">
        {!showTypeSelection ? (
          <motion.div
            key="steps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Progress Bar */}
            <div className="px-4 pt-8 pb-4">
              <div className="max-w-md mx-auto">
                <div className="flex gap-2">
                  {steps.map((step, idx) => (
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
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center px-4">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md w-full text-center"
              >
                <div className={`w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${steps[currentStep].color} flex items-center justify-center shadow-lg`}>
                  <CurrentIcon className="w-12 h-12 text-white" />
                </div>

                <h1 className="text-gray-900 dark:text-white mb-4">
                  {steps[currentStep].title}
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-8 px-4">
                  {steps[currentStep].description}
                </p>

                {/* Features */}
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3 mb-8"
                  >
                    {[
                      'Pagamentos seguros com escrow',
                      'IA para propostas e matching',
                      'Comunidade global de nômades'
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Actions */}
            <div className="p-4 pb-8">
              <div className="max-w-md mx-auto space-y-3">
                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl min-h-[56px]"
                >
                  {currentStep < steps.length - 1 ? 'Próximo' : 'Começar'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>

                <button
                  onClick={handleSkip}
                  className="w-full text-gray-600 dark:text-gray-400 py-3"
                >
                  Pular introdução
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="type-selection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <div className="max-w-md w-full">
              <h2 className="text-gray-900 dark:text-white text-center mb-2">
                Como você quer usar o NomadHub?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Escolha a opção que melhor se adequa ao seu perfil
              </p>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectType('freelancer')}
                  className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-left hover:border-blue-600 dark:hover:border-blue-500 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                      <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 dark:text-white mb-2">Sou Freelancer</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Quero encontrar projetos, enviar propostas e trabalhar remotamente
                      </p>
                      <ul className="space-y-1">
                        {[
                          'Busca inteligente de projetos',
                          'Propostas com IA',
                          'Receba pagamentos seguros'
                        ].map((item, idx) => (
                          <li key={idx} className="text-gray-500 dark:text-gray-500 flex items-center gap-2">
                            <Check className="w-3 h-3 text-green-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectType('client')}
                  className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-left hover:border-green-600 dark:hover:border-green-500 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                      <Shield className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 dark:text-white mb-2">Sou Contratante</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Quero publicar projetos e contratar os melhores freelancers
                      </p>
                      <ul className="space-y-1">
                        {[
                          'Publique projetos facilmente',
                          'Compare propostas',
                          'Pagamentos com escrow'
                        ].map((item, idx) => (
                          <li key={idx} className="text-gray-500 dark:text-gray-500 flex items-center gap-2">
                            <Check className="w-3 h-3 text-green-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                </motion.button>
              </div>

              <div className="mt-6">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-50 dark:bg-gray-900 text-gray-500">
                      Ou entre com
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      localStorage.setItem('nomadhub-auth-method', 'google');
                      navigate('/auth');
                    }}
                    className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      localStorage.setItem('nomadhub-auth-method', 'apple');
                      navigate('/auth');
                    }}
                    className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-800 dark:hover:border-gray-300 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      localStorage.setItem('nomadhub-auth-method', 'microsoft');
                      navigate('/auth');
                    }}
                    className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-700 dark:hover:border-blue-500 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#f25022" d="M1 1h10v10H1z"/>
                      <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                      <path fill="#7fba00" d="M1 13h10v10H1z"/>
                      <path fill="#ffb900" d="M13 13h10v10H13z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => navigate('/auth')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Já tenho uma conta
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}