import { Shield, TrendingUp } from 'lucide-react';

interface TrustScoreProps {
  score: number;
  trend?: 'up' | 'down' | 'stable';
  size?: 'sm' | 'md' | 'lg';
}

export function TrustScore({ score, trend = 'stable', size = 'md' }: TrustScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-blue-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const sizes = {
    sm: { container: 'w-12 h-12', icon: 'w-4 h-4' },
    md: { container: 'w-16 h-16', icon: 'w-5 h-5' },
    lg: { container: 'w-20 h-20', icon: 'w-6 h-6' }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizes[size].container} ${getScoreBg(score)} rounded-full flex items-center justify-center relative`}>
        <Shield className={`${sizes[size].icon} ${getScoreColor(score)} absolute top-1 right-1`} />
        <span className={getScoreColor(score)}>{score}</span>
      </div>
      {trend === 'up' && (
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="w-3 h-3" />
          <span>+5</span>
        </div>
      )}
    </div>
  );
}