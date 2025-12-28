import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, CreditCard, AlertCircle, Check, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/Toast';

export function Withdraw() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('pix');
  const [processing, setProcessing] = useState(false);

  const availableBalance = 5420.50;
  const minimumWithdraw = 50;
  const platformFee = 0.05; // 5%

  const paymentMethods = [
    { id: 'pix', name: 'PIX', fee: 0, time: 'Instantâneo', icon: '⚡' },
    { id: 'bank', name: 'Transferência Bancária', fee: 3.50, time: '1-2 dias úteis', icon: '🏦' },
    { id: 'card', name: 'Cartão de Débito', fee: 2, time: '2-3 dias úteis', icon: '💳' }
  ];

  const calculateTotal = () => {
    const value = parseFloat(amount) || 0;
    const method = paymentMethods.find(m => m.id === selectedMethod);
    const methodFee = method?.fee || 0;
    const percentageFee = value * platformFee;
    const total = value - percentageFee - methodFee;
    return { value, percentageFee, methodFee, total };
  };

  const handleWithdraw = async () => {
    const { value, total } = calculateTotal();
    
    if (value < minimumWithdraw) {
      toast({ title: `Valor mínimo: R$ ${minimumWithdraw}`, variant: 'destructive' });
      return;
    }

    if (value > availableBalance) {
      toast({ title: 'Saldo insuficiente', variant: 'destructive' });
      return;
    }

    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({ 
      title: 'Saque solicitado com sucesso!', 
      description: `R$ ${total.toFixed(2)} será creditado em breve`,
      variant: 'success' 
    });
    
    setProcessing(false);
    navigate('/wallet');
  };

  const { value, percentageFee, methodFee, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 dark:text-white">Sacar Saldo</h1>
            <p className="text-gray-600 dark:text-gray-400">Disponível: R$ {availableBalance.toFixed(2)}</p>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Available Balance Card */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="opacity-90">Saldo Disponível</p>
            <TrendingUp className="w-5 h-5 opacity-90" />
          </div>
          <h2 className="text-white mb-1">R$ {availableBalance.toFixed(2)}</h2>
          <p className="opacity-90">Você pode sacar agora</p>
        </div>

        {/* Amount Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <label className="text-gray-900 dark:text-white mb-3 block">Quanto deseja sacar?</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="w-full pl-12 pr-4 py-4 text-2xl rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 mt-3">
            {[100, 500, 1000].map(preset => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                R$ {preset}
              </button>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Valor mínimo: R$ {minimumWithdraw.toFixed(2)}
          </p>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <label className="text-gray-900 dark:text-white block px-1">Método de Recebimento</label>
          {paymentMethods.map(method => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                selectedMethod === method.id
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{method.icon}</div>
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white">{method.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {method.fee > 0 ? `Taxa: R$ ${method.fee.toFixed(2)}` : 'Sem taxa'} • {method.time}
                  </p>
                </div>
                {selectedMethod === method.id && (
                  <Check className="w-6 h-6 text-blue-600" />
                )}
              </div>
            </button>
          ))}
          
          <button
            onClick={() => navigate('/payment-methods')}
            className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-500 transition-colors"
          >
            + Adicionar novo método
          </button>
        </div>

        {/* Fee Breakdown */}
        {value > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 space-y-3"
          >
            <h3 className="text-gray-900 dark:text-white mb-4">Resumo do Saque</h3>
            
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Valor solicitado</span>
              <span>R$ {value.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Taxa da plataforma (5%)</span>
              <span className="text-red-600">- R$ {percentageFee.toFixed(2)}</span>
            </div>
            
            {methodFee > 0 && (
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Taxa do método</span>
                <span className="text-red-600">- R$ {methodFee.toFixed(2)}</span>
              </div>
            )}
            
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-900 dark:text-white">Você receberá</span>
                <span className="text-green-600 dark:text-green-400">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Info Alert */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-blue-900 dark:text-blue-100">Informações importantes</h3>
              <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Saques via PIX são processados instantaneamente</li>
                <li>• Transferências bancárias levam de 1-2 dias úteis</li>
                <li>• Você pode acompanhar o status na sua carteira</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleWithdraw}
          disabled={!amount || parseFloat(amount) < minimumWithdraw || processing}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
        >
          {processing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processando...
            </div>
          ) : (
            'Confirmar Saque'
          )}
        </Button>
      </div>
    </div>
  );
}
