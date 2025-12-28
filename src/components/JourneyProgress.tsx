import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { useUserRole } from '../contexts/UserRoleContext';

interface JourneyStep {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming' | 'locked';
  path?: string;
}

interface JourneyProgressProps {
  currentStep: string;
  compact?: boolean;
}

const freelancerJourney: JourneyStep[] = [
  { id: 'onboarding', label: 'Onboarding', status: 'completed' },
  { id: 'home', label: 'Início', status: 'current', path: '/' },
  { id: 'projects', label: 'Projetos', status: 'upcoming', path: '/projects' },
  { id: 'proposal', label: 'Proposta (IA)', status: 'upcoming', path: '/ai-proposal' },
  { id: 'contract', label: 'Contrato', status: 'upcoming', path: '/contracts' },
  { id: 'delivery', label: 'Entrega', status: 'upcoming', path: '/deliveries' },
  { id: 'wallet', label: 'Carteira', status: 'upcoming', path: '/wallet' },
  { id: 'gamification', label: 'Gamificação', status: 'upcoming', path: '/nomad' },
  { id: 'upgrade', label: 'Upgrade Pro', status: 'upcoming', path: '/pricing' },
  { id: 'support', label: 'Suporte', status: 'upcoming', path: '/pro-support' },
];

const clientJourney: JourneyStep[] = [
  { id: 'onboarding', label: 'Onboarding', status: 'completed' },
  { id: 'home', label: 'Início', status: 'current', path: '/' },
  { id: 'publish', label: 'Publicar Projeto', status: 'upcoming', path: '/project-publish' },
  { id: 'proposals', label: 'Propostas', status: 'upcoming', path: '/proposals-received' },
  { id: 'contract', label: 'Contrato', status: 'upcoming', path: '/contracts' },
  { id: 'approve', label: 'Aprovar Entrega', status: 'upcoming', path: '/deliveries' },
  { id: 'payment', label: 'Pagamento', status: 'upcoming', path: '/wallet' },
  { id: 'corporate', label: 'Painel Corp', status: 'upcoming', path: '/corporate-dashboard' },
  { id: 'support', label: 'Suporte', status: 'upcoming', path: '/pro-support' },
];

export function JourneyProgress({ currentStep, compact = false }: JourneyProgressProps) {
  const { role } = useUserRole();
  const journey = role === 'freelancer' ? freelancerJourney : clientJourney;

  // Update journey statuses based on current step
  const currentIndex = journey.findIndex(step => step.id === currentStep);
  const updatedJourney = journey.map((step, index) => ({
    ...step,
    status: index < currentIndex 
      ? 'completed' as const
      : index === currentIndex 
      ? 'current' as const 
      : 'upcoming' as const
  }));

  const colorClasses = role === 'freelancer'
    ? {
        completed: 'bg-blue-600 border-blue-600',
        current: 'bg-blue-600 border-blue-600',
        upcoming: 'bg-gray-200 dark:bg-gray-700 border-gray-200 dark:border-gray-700',
        text: 'text-blue-600 dark:text-blue-400',
        arrow: 'text-blue-400 dark:text-blue-500'
      }
    : {
        completed: 'bg-green-600 border-green-600',
        current: 'bg-green-600 border-green-600',
        upcoming: 'bg-gray-200 dark:bg-gray-700 border-gray-200 dark:border-gray-700',
        text: 'text-green-600 dark:text-green-400',
        arrow: 'text-green-400 dark:text-green-500'
      };

  if (compact) {
    // Compact version - just show current step and neighbors
    const visibleSteps = updatedJourney.slice(
      Math.max(0, currentIndex - 1),
      Math.min(updatedJourney.length, currentIndex + 3)
    );

    return null;
  }

  // Full version
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 dark:text-white">
          {role === 'freelancer' ? 'Jornada do Freelancer' : 'Jornada do Contratante'}
        </h3>
        <span className={`text-sm ${colorClasses.text}`}>
          {currentIndex + 1}/{updatedJourney.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {updatedJourney.map((step, index) => (
          <div key={step.id}>
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  step.status === 'completed' || step.status === 'current'
                    ? colorClasses.completed
                    : colorClasses.upcoming
                }`}
              >
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <Circle className={`w-3 h-3 ${
                    step.status === 'current' ? 'text-white fill-white' : 'text-gray-400'
                  }`} />
                )}
              </div>
              <div className="flex-1">
                <span className={`${
                  step.status === 'current' 
                    ? colorClasses.text 
                    : step.status === 'completed'
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.label}
                </span>
                {step.status === 'current' && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">Em andamento</div>
                )}
              </div>
            </div>
            {index < updatedJourney.length - 1 && (
              <div className={`ml-4 h-6 w-0.5 ${
                step.status === 'completed' ? colorClasses.completed : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}