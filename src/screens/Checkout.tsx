import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Check, Sparkles } from 'lucide-react';

type PaymentMethod = 'credit_card' | 'pix' | 'boleto';

interface CheckoutState {
  plan: 'pro';
  period: 'monthly' | 'yearly';
}

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CheckoutState;
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cpf, setCpf] = useState('');

  const pricing = {
    monthly: 49.90,
    yearly: 39.90
  };

  const period = state?.period || 'monthly';
  const monthlyPrice = pricing[period];
  const totalPrice = period === 'yearly' ? monthlyPrice * 12 : monthlyPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Redirect to success page
    navigate('/checkout-success', { 
      state: { 
        plan: 'pro', 
        period,
        paymentMethod,
        amount: totalPrice
      } 
    });
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const formatCpf = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <h1 className="text-gray-900 dark:text-white">Finalizar assinatura</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Payment Method Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <h3 className="text-gray-900 dark:text-white mb-4">Forma de pagamento</h3>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left min-h-[44px] ${
                      paymentMethod === 'credit_card'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className={`w-6 h-6 ${
                        paymentMethod === 'credit_card' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <div className={`${
                          paymentMethod === 'credit_card' ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                        }`}>
                          Cartão de crédito
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Cobrança recorrente automática
                        </div>
                      </div>
                      {paymentMethod === 'credit_card' && (
                        <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left min-h-[44px] ${
                      paymentMethod === 'pix'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${
                        paymentMethod === 'pix' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        PIX
                      </div>
                      <div className="flex-1">
                        <div className={`${
                          paymentMethod === 'pix' ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                        }`}>
                          Pix
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Pagamento instantâneo
                        </div>
                      </div>
                      {paymentMethod === 'pix' && (
                        <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('boleto')}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left min-h-[44px] ${
                      paymentMethod === 'boleto'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 flex items-center justify-center ${
                        paymentMethod === 'boleto' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        📄
                      </div>
                      <div className="flex-1">
                        <div className={`${
                          paymentMethod === 'boleto' ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                        }`}>
                          Boleto bancário
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Compensação em até 2 dias úteis
                        </div>
                      </div>
                      {paymentMethod === 'boleto' && (
                        <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Details */}
              {paymentMethod === 'credit_card' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
                  <h3 className="text-gray-900 dark:text-white mb-4">Dados do cartão</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Número do cartão
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Nome no cartão
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="NOME COMPLETO"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Validade
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/AA"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                          placeholder="123"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        CPF
                      </label>
                      <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(formatCpf(e.target.value))}
                        placeholder="000.000.000-00"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'pix' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
                  <h3 className="text-gray-900 dark:text-white mb-4">Pagamento via Pix</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Ao confirmar, você receberá um QR Code para realizar o pagamento instantaneamente.
                  </p>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      CPF
                    </label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(formatCpf(e.target.value))}
                      placeholder="000.000.000-00"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'boleto' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
                  <h3 className="text-gray-900 dark:text-white mb-4">Boleto bancário</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    O boleto será gerado após a confirmação e enviado para seu email. O prazo de compensação é de até 2 dias úteis.
                  </p>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      CPF
                    </label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(formatCpf(e.target.value))}
                      placeholder="000.000.000-00"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Confirmar assinatura
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                Pagamento 100% seguro e criptografado
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <h3 className="text-gray-900 dark:text-white mb-4">Resumo do pedido</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 dark:text-white">
                      Plano Pro
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Cobrança {period === 'monthly' ? 'mensal' : 'anual'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-4">
                <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                {period === 'yearly' && (
                  <div className="flex items-center justify-between text-green-600 dark:text-green-400">
                    <span>Desconto anual</span>
                    <span>-20%</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-gray-900 dark:text-white mb-6">
                <span>Total</span>
                <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-blue-900 dark:text-blue-100 mb-1">
                      Garantia de 7 dias
                    </div>
                    <div className="text-blue-700 dark:text-blue-300">
                      Não satisfeito? Reembolso total em até 7 dias
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
