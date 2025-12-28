import { motion } from 'motion/react';
import { 
  Inbox, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Sparkles 
} from 'lucide-react';
import { Button } from './ui/button';
import { useUserRole } from '../contexts/UserRoleContext';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  const { role } = useUserRole();
  
  const gradientClass = role === 'freelancer'
    ? 'from-blue-600 to-purple-600'
    : 'from-green-600 to-emerald-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className={`w-20 h-20 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center mb-4 opacity-20`}>
        {icon || <Inbox className="w-10 h-10 text-white" />}
      </div>
      <h3 className="text-xl text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <Button
          onClick={action.onClick}
          className={`bg-gradient-to-r ${gradientClass} hover:opacity-90 text-white`}
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Carregando...' }: LoadingStateProps) {
  const { role } = useUserRole();
  
  const spinnerColor = role === 'freelancer'
    ? 'border-blue-600'
    : 'border-green-600';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <Loader2 className={`w-12 h-12 ${spinnerColor} animate-spin mb-4`} />
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </motion.div>
  );
}

interface SuccessStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function SuccessState({ title, description, action }: SuccessStateProps) {
  const { role } = useUserRole();
  
  const iconColor = role === 'freelancer'
    ? 'text-blue-600 dark:text-blue-400'
    : 'text-green-600 dark:text-green-400';

  const bgColor = role === 'freelancer'
    ? 'bg-blue-100 dark:bg-blue-900/20'
    : 'bg-green-100 dark:bg-green-900/20';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className={`w-20 h-20 ${bgColor} rounded-full flex items-center justify-center mb-4`}>
        <CheckCircle2 className={`w-10 h-10 ${iconColor}`} />
      </div>
      <h3 className="text-xl text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <Button
          onClick={action.onClick}
          className={role === 'freelancer' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}

interface ErrorStateProps {
  title?: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function ErrorState({ 
  title = 'Algo deu errado', 
  description, 
  action 
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-xl text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <Button
          onClick={action.onClick}
          variant="outline"
          className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}

interface AISuggestionProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function AISuggestion({ message, action }: AISuggestionProps) {
  const { role } = useUserRole();
  
  const gradientClass = role === 'freelancer'
    ? 'from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
    : 'from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20';

  const borderClass = role === 'freelancer'
    ? 'border-purple-200 dark:border-purple-800'
    : 'border-emerald-200 dark:border-emerald-800';

  const iconClass = role === 'freelancer'
    ? 'text-purple-600 dark:text-purple-400'
    : 'text-emerald-600 dark:text-emerald-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r ${gradientClass} rounded-xl p-4 border ${borderClass}`}
    >
      <div className="flex items-start gap-3">
        <Sparkles className={`w-5 h-5 ${iconClass} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className="text-gray-900 dark:text-white mb-2">
            {message}
          </p>
          {action && (
            <Button
              onClick={action.onClick}
              variant="outline"
              size="sm"
              className={`${borderClass} ${iconClass} hover:bg-white/50 dark:hover:bg-gray-900/50`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
