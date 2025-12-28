import { useState } from 'react';
import { Crown, TrendingDown, Info } from 'lucide-react';

interface FeeCalculatorProps {
  amount: number;
  isPro?: boolean;
}

export function FeeCalculator({ amount, isPro = false }: FeeCalculatorProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Regras de taxa regressiva
  const calculateFee = (value: number, isProUser: boolean) => {
    if (value <= 500) {
      return isProUser ? 6 : 9;
    } else if (value <= 2000) {
      return isProUser ? 5 : 7;
    } else {
      return isProUser ? 3 : 5;
    }
  };

  const feePercentage = calculateFee(amount, isPro);
  const feeAmount = (amount * feePercentage) / 100;
  const netAmount = amount - feeAmount;

  const freeTierPercentage = calculateFee(amount, false);
  const savingsPercentage = freeTierPercentage - feePercentage;
  const savingsAmount = (amount * savingsPercentage) / 100;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-gray-900 dark:text-white flex items-center gap-2">
          Transparência de Taxas
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative"
          >
            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            {showTooltip && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg z-10">
                Nossa taxa diminui conforme o valor do projeto aumenta. Usuários Pro economizam ainda mais!
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                </div>
              </div>
            )}
          </button>
        </h4>
        {isPro && (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs">
            <Crown className="w-3 h-3" />
            Plano Pro
          </span>
        )}
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <span className="text-gray-600 dark:text-gray-400">Valor do projeto</span>
          <span className="text-gray-900 dark:text-white">
            R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            Taxa da plataforma
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
              {feePercentage}%
            </span>
          </span>
          <span className="text-red-600 dark:text-red-400">
            - R$ {feeAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-gray-900 dark:text-white">Você recebe</span>
          <span className="text-xl text-green-600 dark:text-green-400">
            R$ {netAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Savings Alert (if not Pro) */}
      {!isPro && savingsAmount > 0 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start gap-2">
            <TrendingDown className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white mb-1">
                Economize <strong>R$ {savingsAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> com o Plano Pro
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Taxas reduzidas em todas as transações
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fee Table */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Tabela de taxas:</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>Até R$ 500</span>
            <span>
              <span className="text-gray-500 dark:text-gray-500 line-through mr-2">9%</span>
              <span className="text-yellow-600 dark:text-yellow-400">6% Pro</span>
            </span>
          </div>
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>R$ 501 - R$ 2.000</span>
            <span>
              <span className="text-gray-500 dark:text-gray-500 line-through mr-2">7%</span>
              <span className="text-yellow-600 dark:text-yellow-400">5% Pro</span>
            </span>
          </div>
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>Acima de R$ 2.000</span>
            <span>
              <span className="text-gray-500 dark:text-gray-500 line-through mr-2">5%</span>
              <span className="text-yellow-600 dark:text-yellow-400">3% Pro</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
