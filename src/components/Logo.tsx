import { Globe } from 'lucide-react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: {
      icon: 'w-6 h-6',
      text: 'text-lg',
      container: 'w-8 h-8'
    },
    md: {
      icon: 'w-8 h-8',
      text: 'text-xl',
      container: 'w-12 h-12'
    },
    lg: {
      icon: 'w-10 h-10',
      text: 'text-2xl',
      container: 'w-16 h-16'
    },
    xl: {
      icon: 'w-12 h-12',
      text: 'text-3xl',
      container: 'w-20 h-20'
    }
  };

  const sizeConfig = sizes[size];

  // Icon only variant
  if (variant === 'icon') {
    return (
      <div className={`${sizeConfig.container} bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg ${className}`}>
        <Globe className={`${sizeConfig.icon} text-white`} />
      </div>
    );
  }

  // Minimal variant (just text)
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className={`${sizeConfig.text} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
          NomadHub
        </span>
      </div>
    );
  }

  // Full variant (icon + text)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeConfig.container} bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
        <Globe className={`${sizeConfig.icon} text-white`} />
      </div>
      <div className="flex flex-col">
        <span className={`${sizeConfig.text} font-bold text-gray-900 dark:text-white leading-none`}>
          NomadHub
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-0.5">
          Trabalho remoto
        </span>
      </div>
    </div>
  );
}
