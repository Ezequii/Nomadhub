import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, CreditCard, QrCode, Copy, Check, AlertCircle, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/Toast';

export function Deposit() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [step, setStep] = useState<'amount' | 'payment'>('amount');
  const [pixCode, setPixCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleContinue = () => {
    if (!amount || parseFloat(amount) < 10) {
      toast({ title: 'Valor mínimo: R$ 10,00', variant: 'destructive' });
      return;
    }
    
    // Generate mock PIX code
    if (method === 'pix') {
      setPixCode('00020126580014br.gov.bcb.pix0136' + Math.random().toString(36).substring(2, 15) + '52040000530398654' + amount.replace('.', '') + '5802BR5913NomadHub6009SAO PAULO62410503***50300017BR.GOV.BCB.BRCODE01051.0.06304');
    }
    
    setStep('payment');
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Código copiado!', variant: 'success' });
  };

  const handlePaymentComplete = () => {
    toast({ 
      title: 'Depósito confirmado!', 
      description: `R$ ${amount} será creditado em breve`,
      variant: 'success' 
    });
    navigate('/wallet');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => step === 'payment' ? setStep('amount') : navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 dark:text-white">Adicionar Saldo</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {step === 'amount' ? 'Escolha o valor' : 'Finalize o pagamento'}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        <AnimatePresence mode="wait">
          {step === 'amount' && (
            <motion.div
              key="amount"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Amount Input */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <label className="text-gray-900 dark:text-white mb-3 block">Quanto deseja adicionar?</label>
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
                  {[50, 100, 200, 500].map(preset => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset.toString())}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      R$ {preset}
                    </button>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Valor mínimo: R$ 10,00
                </p>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <label className="text-gray-900 dark:text-white block px-1">Método de Pagamento</label>
                
                <button
                  onClick={() => setMethod('pix')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    method === 'pix'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 dark:text-white">PIX</h3>
                      <p className="text-gray-600 dark:text-gray-400">Aprovação instantânea • Sem taxa</p>
                    </div>
                    {method === 'pix' && <Check className="w-6 h-6 text-blue-600" />}
                  </div>
                </button>

                <button
                  onClick={() => setMethod('card')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    method === 'card'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 dark:text-white">Cartão de Crédito</h3>
                      <p className="text-gray-600 dark:text-gray-400">Aprovação imediata • Taxa 2,5%</p>
                    </div>
                    {method === 'card' && <Check className="w-6 h-6 text-purple-600" />}
                  </div>
                </button>

                <button
                  onClick={() => setMethod('boleto')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    method === 'boleto'
                      ? 'border-green-600 bg-green-50 dark:bg-green-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 dark:text-white">Boleto Bancário</h3>
                      <p className="text-gray-600 dark:text-gray-400">Aprovação em 1-2 dias • Sem taxa</p>
                    </div>
                    {method === 'boleto' && <Check className="w-6 h-6 text-green-600" />}
                  </div>
                </button>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!amount || parseFloat(amount) < 10}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
              >
                Continuar
              </Button>
            </motion.div>
          )}

          {step === 'payment' && method === 'pix' && (
            <motion.div
              key="pix-payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* QR Code */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-6">
                  <h3 className="text-gray-900 dark:text-white mb-2">Escaneie o QR Code</h3>
                  <p className="text-gray-600 dark:text-gray-400">Abra o app do seu banco e escaneie</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl border-4 border-dashed border-gray-300 dark:border-gray-600 mb-6">
                  <div className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-white" />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-400 text-center">Ou copie o código PIX:</p>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl break-all text-gray-900 dark:text-white font-mono">
                    {pixCode.substring(0, 50)}...
                  </div>
                  <Button
                    onClick={handleCopyPix}
                    className="w-full"
                    variant="outline"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar código PIX
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Valor</span>
                  <span className="text-gray-900 dark:text-white">R$ {amount}</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Taxa</span>
                  <span className="text-green-600">R$ 0,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">R$ {amount}</span>
                </div>
              </div>

              {/* Alert */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-700 dark:text-blue-300">
                      O saldo será creditado automaticamente após a confirmação do pagamento.
                      Isso geralmente leva apenas alguns segundos.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePaymentComplete}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl min-h-[56px]"
              >
                Já realizei o pagamento
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
