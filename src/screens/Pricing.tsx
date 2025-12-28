import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles, Zap, Crown, TrendingUp } from 'lucide-react';

type BillingPeriod = 'monthly' | 'yearly';

interface PlanFeature {
  name: string;
  free: boolean;
  pro: boolean | string;
}

const features: PlanFeature[] = [
  { name: 'Criar propostas', free: true, pro: true },
  { name: 'Propostas por mês', free: true, pro: 'Ilimitadas' },
  { name: 'Contratos simultâneos', free: true, pro: 'Ilimitados' },
  { name: 'Taxa da plataforma', free: true, pro: '5% (vs 15%)' },
  { name: 'Sistema de escrow', free: true, pro: true },
  { name: 'Chat básico', free: true, pro: true },
  { name: 'Trust Score', free: true, pro: true },
  { name: 'IA para propostas', free: false, pro: true },
  { name: 'IA para entregas', free: false, pro: true },
  { name: 'Templates exclusivos', free: false, pro: true },
  { name: 'Insights avançados', free: false, pro: true },
  { name: 'Analytics detalhado', free: false, pro: true },
  { name: 'Suporte prioritário', free: false, pro: true },
  { name: 'Onboarding personalizado', free: false, pro: true },
  { name: 'Badge Pro no perfil', free: false, pro: true },
  { name: 'Painel corporativo', free: false, pro: true }
];

export function Pricing() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  const pricing = {
    monthly: 49.90,
    yearly: 39.90
  };

  const yearlyDiscount = Math.round((1 - (pricing.yearly / pricing.monthly)) * 100);

  const handleUpgrade = () => {
    navigate('/checkout', { state: { plan: 'pro', period: billingPeriod } });
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
          <h1 className="text-gray-900 dark:text-white">Planos e Preços</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full mb-4">
            <Crown className="w-5 h-5" />
            <span>Turbine sua carreira freelance</span>
          </div>
          <h2 className="text-gray-900 dark:text-white mb-3">
            Escolha o plano ideal para você
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Acesse recursos avançados de IA, suporte prioritário e ferramentas exclusivas para impulsionar seus resultados
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-3 rounded-lg transition-all min-h-[44px] ${
              billingPeriod === 'monthly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-3 rounded-lg transition-all relative min-h-[44px] ${
              billingPeriod === 'yearly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Anual
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              -{yearlyDiscount}%
            </span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h3 className="text-gray-900 dark:text-white">Gratuito</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-gray-900 dark:text-white">R$ 0</span>
                <span className="text-gray-600 dark:text-gray-400">/mês</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Perfeito para começar sua jornada como freelancer
              </p>
            </div>

            <button
              disabled
              className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg min-h-[44px] cursor-not-allowed"
            >
              Plano atual
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-900 dark:text-white mb-4">Recursos inclusos:</p>
              <ul className="space-y-3">
                {features.filter(f => f.free).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {typeof feature.free === 'string' ? feature.free : feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl border-2 border-blue-600 p-6 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full flex items-center gap-1">
                <Crown className="w-4 h-4" />
                <span className="text-xs">Recomendado</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-white">Pro</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-white">
                  R$ {pricing[billingPeriod].toFixed(2).replace('.', ',')}
                </span>
                <span className="text-blue-100">/mês</span>
              </div>
              {billingPeriod === 'yearly' && (
                <p className="text-blue-100 text-sm mb-3">
                  Cobrado R$ {(pricing.yearly * 12).toFixed(2).replace('.', ',')} por ano
                </p>
              )}
              <p className="text-blue-100">
                Ferramentas profissionais para freelancers de alto desempenho
              </p>
            </div>

            <button
              onClick={handleUpgrade}
              className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px] shadow-lg"
            >
              Assinar agora
            </button>

            <div className="mt-6 pt-6 border-t border-blue-400">
              <p className="text-white mb-4">Tudo do Gratuito, mais:</p>
              <ul className="space-y-3">
                {features.filter(f => f.pro && !f.free).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white">
                      {typeof feature.pro === 'string' && feature.pro !== 'true' ? feature.pro : feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-gray-900 dark:text-white mb-6">Perguntas frequentes</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-gray-900 dark:text-white mb-2">Posso cancelar a qualquer momento?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem custos adicionais. Seus recursos Pro permanecerão ativos até o fim do período pago.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-gray-900 dark:text-white mb-2">Como funciona a cobrança?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                A cobrança é feita automaticamente via cartão de crédito no início de cada período (mensal ou anual). Você receberá um aviso por email antes de cada cobrança.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-gray-900 dark:text-white mb-2">Há garantia de reembolso?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Sim! Oferecemos garantia de 7 dias. Se não ficar satisfeito, devolvemos 100% do valor pago.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <TrendingUp className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-white mb-3">Pronto para aumentar seus resultados?</h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Junte-se a mais de 5.000 freelancers que já turbinaram suas carreiras com o NomadHub Pro
          </p>
          <button
            onClick={handleUpgrade}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]"
          >
            Começar agora
          </button>
        </div>
      </div>
    </div>
  );
}
