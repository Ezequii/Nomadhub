import { useState } from 'react';
import { Shield, Check, Clock, AlertCircle, CreditCard, QrCode, Wallet } from 'lucide-react';
import type { EscrowStatus } from '../types';

interface EscrowFlowProps {
  contractId: string;
  amount: number;
  currency?: string;
  currentStatus: EscrowStatus;
  onFund: (contractId: string, method: 'pix' | 'paypal' | 'crypto') => Promise<void>;
  onRelease: (contractId: string) => Promise<void>;
  onRefund: (contractId: string) => Promise<void>;
}

export function EscrowFlow({ 
  contractId, 
  amount, 
  currency = 'BRL',
  currentStatus, 
  onFund, 
  onRelease, 
  onRefund 
}: EscrowFlowProps) {
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'paypal' | 'crypto'>('pix');
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    }).format(value);
  };

  const handleFund = async () => {
    setLoading(true);
    try {
      await onFund(contractId, selectedMethod);
    } catch (error) {
      console.error('Error funding escrow:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRelease = async () => {
    setLoading(true);
    try {
      await onRelease(contractId);
    } catch (error) {
      console.error('Error releasing escrow:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async () => {
    setLoading(true);
    try {
      await onRefund(contractId);
    } catch (error) {
      console.error('Error refunding escrow:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      label: 'Aguardando Financiamento'
    },
    funded: {
      icon: Shield,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      label: 'Fundos em Escrow'
    },
    released: {
      icon: Check,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      label: 'Pagamento Liberado'
    },
    refunded: {
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      label: 'Reembolsado'
    }
  };

  const config = statusConfig[currentStatus];
  const StatusIcon = config.icon;

  return (
    <div className="space-y-4">
      {/* Status Header */}
      <div className={`${config.bg} ${config.border} border rounded-2xl p-6`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 ${config.bg} ${config.border} border-2 rounded-full flex items-center justify-center`}>
            <StatusIcon className={`w-6 h-6 ${config.color}`} />
          </div>
          <div className="flex-1">
            <h3 className={`${config.color} mb-1`}>{config.label}</h3>
            <div className="text-gray-900">{formatCurrency(amount)}</div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2">
          <div className={`flex-1 h-2 rounded-full ${
            ['funded', 'released', 'refunded'].includes(currentStatus) ? 'bg-green-600' : 'bg-gray-300'
          }`} />
          <div className={`flex-1 h-2 rounded-full ${
            ['released'].includes(currentStatus) ? 'bg-green-600' : 'bg-gray-300'
          }`} />
          <div className={`flex-1 h-2 rounded-full ${
            ['released', 'refunded'].includes(currentStatus) ? 'bg-green-600' : 'bg-gray-300'
          }`} />
        </div>
        <div className="flex items-center justify-between text-gray-600 mt-2">
          <span>Financiar</span>
          <span>Em Escrow</span>
          <span>Finalizar</span>
        </div>
      </div>

      {/* Pending State - Payment Methods */}
      {currentStatus === 'pending' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h4 className="text-gray-900 mb-4">Escolha o método de pagamento</h4>
          
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setSelectedMethod('pix')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all min-h-[72px] ${
                selectedMethod === 'pix'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <QrCode className="w-6 h-6 text-gray-600" />
              <div className="flex-1 text-left">
                <h5 className="text-gray-900">Pix</h5>
                <p className="text-gray-600">Confirmação instantânea</p>
              </div>
              {selectedMethod === 'pix' && <Check className="w-5 h-5 text-blue-600" />}
            </button>

            <button
              onClick={() => setSelectedMethod('paypal')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all min-h-[72px] ${
                selectedMethod === 'paypal'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="w-6 h-6 text-gray-600" />
              <div className="flex-1 text-left">
                <h5 className="text-gray-900">PayPal</h5>
                <p className="text-gray-600">Pagamento internacional</p>
              </div>
              {selectedMethod === 'paypal' && <Check className="w-5 h-5 text-blue-600" />}
            </button>

            <button
              onClick={() => setSelectedMethod('crypto')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all min-h-[72px] ${
                selectedMethod === 'crypto'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Wallet className="w-6 h-6 text-gray-600" />
              <div className="flex-1 text-left">
                <h5 className="text-gray-900">Criptomoeda (USDT)</h5>
                <p className="text-gray-600">Via smart contract na blockchain</p>
              </div>
              {selectedMethod === 'crypto' && <Check className="w-5 h-5 text-blue-600" />}
            </button>
          </div>

          <button
            onClick={handleFund}
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          >
            {loading ? 'Processando...' : `Financiar Escrow com ${selectedMethod.toUpperCase()}`}
          </button>

          <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-blue-900">
              Os fundos ficam seguros em escrow até a entrega ser aceita. Proteção total para ambas as partes.
            </p>
          </div>
        </div>
      )}

      {/* Funded State - Awaiting Delivery */}
      {currentStatus === 'funded' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-gray-900 mb-2">Fundos Seguros em Escrow</h4>
            <p className="text-gray-600">
              O pagamento está protegido e será liberado após a entrega e aprovação do projeto.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRelease}
              disabled={loading}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {loading ? 'Processando...' : 'Aprovar e Liberar Pagamento'}
            </button>
            <button
              onClick={handleRefund}
              disabled={loading}
              className="w-full px-6 py-3 bg-white border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {loading ? 'Processando...' : 'Solicitar Reembolso'}
            </button>
          </div>
        </div>
      )}

      {/* Released State */}
      {currentStatus === 'released' && (
        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-green-900 mb-2">Pagamento Concluído!</h4>
            <p className="text-green-700">
              Os fundos foram liberados com sucesso. O freelancer receberá o pagamento em breve.
            </p>
          </div>
        </div>
      )}

      {/* Refunded State */}
      {currentStatus === 'refunded' && (
        <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-red-900 mb-2">Reembolso Processado</h4>
            <p className="text-red-700">
              Os fundos foram devolvidos. O contrato foi encerrado.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}