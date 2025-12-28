import { ArrowUpRight, ArrowDownLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface BalanceCardProps {
  balance: number;
  currency?: string;
}

export function BalanceCard({ balance, currency = 'R$' }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="text-blue-100">Saldo disponível</span>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
        >
          {showBalance ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="mb-6">
        {showBalance ? (
          <span>{formatCurrency(balance)}</span>
        ) : (
          <span>••••••</span>
        )}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-white text-blue-700 py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors min-h-[44px]">
          <ArrowUpRight className="w-5 h-5" />
          <span>Sacar</span>
        </button>
        <button className="flex-1 bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/30 transition-colors min-h-[44px]">
          <ArrowDownLeft className="w-5 h-5" />
          <span>Depositar</span>
        </button>
      </div>
    </div>
  );
}