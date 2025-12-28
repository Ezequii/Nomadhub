import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Copy, RotateCcw, Check, FileText, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DeliveryItem {
  id: string;
  title: string;
  description: string;
}

export function AIDelivery() {
  const navigate = useNavigate();
  const [contractDescription, setContractDescription] = useState('');
  const [deliveryType, setDeliveryType] = useState<'code' | 'design' | 'content' | 'other'>('code');
  const [generating, setGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<DeliveryItem[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!contractDescription.trim()) return;

    setGenerating(true);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockDeliveries: DeliveryItem[] = [
      {
        id: '1',
        title: 'Código-fonte completo',
        description: 'Repositório Git com todo o código desenvolvido, organizado em branches e com commits descritivos. Inclui arquivo README com instruções de instalação e execução.'
      },
      {
        id: '2',
        title: 'Documentação técnica',
        description: 'Documentação completa da arquitetura, padrões utilizados, estrutura de pastas, e guia de desenvolvimento para futuras manutenções.'
      },
      {
        id: '3',
        title: 'Testes automatizados',
        description: 'Suite de testes unitários e de integração com cobertura mínima de 80%, utilizando Jest e React Testing Library.'
      },
      {
        id: '4',
        title: 'Deploy e configuração',
        description: 'Aplicação deployada em ambiente de produção (Vercel/Netlify) com variáveis de ambiente configuradas e SSL ativo.'
      },
      {
        id: '5',
        title: 'Vídeo de apresentação',
        description: 'Screencast de 5-10 minutos demonstrando as principais funcionalidades implementadas e fluxos de uso.'
      }
    ];

    setGeneratedItems(mockDeliveries);
    setGenerating(false);
  };

  const handleCopy = () => {
    const text = generatedItems
      .map(item => `${item.title}\n${item.description}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseDeliveries = () => {
    navigate('/contracts/1', { state: { generatedDeliveries: generatedItems } });
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
          <div className="flex-1">
            <h1 className="text-gray-900 dark:text-white">IA para Entregas</h1>
            <p className="text-gray-600 dark:text-gray-400">Organize suas entregas automaticamente</p>
          </div>
          <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Pro</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Contract Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Descrição do contrato
              </h3>
              <textarea
                value={contractDescription}
                onChange={(e) => setContractDescription(e.target.value)}
                placeholder="Descreva o que foi acordado no contrato, escopo, objetivos e requisitos..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[200px] resize-none"
              />
            </div>

            {/* Delivery Type */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Tipo de entrega</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeliveryType('code')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] ${
                    deliveryType === 'code'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Código
                </button>
                <button
                  onClick={() => setDeliveryType('design')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] ${
                    deliveryType === 'design'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Design
                </button>
                <button
                  onClick={() => setDeliveryType('content')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] ${
                    deliveryType === 'content'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Conteúdo
                </button>
                <button
                  onClick={() => setDeliveryType('other')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] ${
                    deliveryType === 'other'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Outro
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!contractDescription.trim() || generating}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Gerando entregas...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Gerar checklist com IA
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {generatedItems.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900 dark:text-white">Checklist gerado</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Copiar"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Regenerar"
                      >
                        <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {generatedItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-600 dark:bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-900 dark:text-white mb-1">
                              {item.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleUseDeliveries}
                      className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors min-h-[44px]"
                    >
                      Usar este checklist
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="w-full px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors min-h-[44px]"
                    >
                      Gerar nova versão
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center"
                >
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-2">Organize suas entregas</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Descreva o contrato e deixe a IA criar um checklist profissional de entregas
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <h3 className="text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Dicas para melhores resultados:
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>✓ Seja específico sobre os requisitos técnicos</li>
            <li>✓ Mencione formatos de entrega esperados (código, arquivos, docs)</li>
            <li>✓ Inclua prazos e marcos importantes do projeto</li>
            <li>✓ Destaque necessidades de documentação e testes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
