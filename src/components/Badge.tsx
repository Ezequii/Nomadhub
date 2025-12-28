import { Award, Star, Zap, Trophy, Target, Heart } from 'lucide-react';

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: 'award' | 'star' | 'zap' | 'trophy' | 'target' | 'heart';
  color: string;
  earned: boolean;
  earnedDate?: string;
}

interface BadgeProps {
  badge: BadgeData;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export function Badge({ badge, size = 'md', showDetails = false }: BadgeProps) {
  const icons = {
    award: Award,
    star: Star,
    zap: Zap,
    trophy: Trophy,
    target: Target,
    heart: Heart
  };

  const Icon = icons[badge.icon];

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex ${showDetails ? 'flex-row items-center gap-3' : 'flex-col items-center gap-1'}`}>
      <div
        className={`${sizes[size]} rounded-full flex items-center justify-center ${
          badge.earned ? badge.color : 'bg-gray-200'
        }`}
      >
        <Icon className={`${iconSizes[size]} ${badge.earned ? 'text-white' : 'text-gray-400'}`} />
      </div>
      {showDetails && (
        <div className="flex-1">
          <h4 className={`${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>{badge.name}</h4>
          <p className="text-sm text-gray-600">{badge.description}</p>
          {badge.earned && badge.earnedDate && (
            <p className="text-xs text-gray-500 mt-1">Conquistado em {badge.earnedDate}</p>
          )}
        </div>
      )}
      {!showDetails && (
        <span className={`text-xs ${badge.earned ? 'text-gray-700' : 'text-gray-400'}`}>
          {badge.name}
        </span>
      )}
    </div>
  );
}
