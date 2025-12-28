import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function CheckoutSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </motion.div>

          <h1 className="text-gray-900 dark:text-white mb-3">
            Bem-vindo ao NomadHub Pro! 🎉
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Sua assinatura foi confirmada com sucesso. Todos os recursos Premium já estão disponíveis!
          </p>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
            <Sparkles className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-white mb-2">Recursos liberados:</h3>
            <ul className="text-left space-y-2 text-blue-100">
              <li>✨ IA para propostas e entregas</li>
              <li>📊 Analytics detalhado</li>
              <li>🎯 Templates exclusivos</li>
              <li>💬 Suporte prioritário</li>
              <li>👑 Badge Pro no perfil</li>
            </ul>
          </div>

          {state?.paymentMethod === 'pix' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 dark:text-yellow-200">
                ⏱️ Aguardando confirmação do pagamento via Pix. Você receberá um email assim que for processado.
              </p>
            </div>
          )}

          {state?.paymentMethod === 'boleto' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 dark:text-yellow-200">
                📄 O boleto foi enviado para seu email. Após o pagamento, os recursos serão liberados em até 2 dias úteis.
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => navigate('/ai-proposal')}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Experimentar IA agora
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors min-h-[44px] flex items-center justify-center gap-2"
            >
              Voltar ao início
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
