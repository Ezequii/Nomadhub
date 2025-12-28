import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Copy, RotateCcw, Download, Check, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GeneratedVersion {
  id: string;
  content: string;
  timestamp: Date;
}

export function AIProposal() {
  const navigate = useNavigate();
  const [projectDescription, setProjectDescription] = useState('');
  const [yourExperience, setYourExperience] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState('');
  const [versions, setVersions] = useState<GeneratedVersion[]>([]);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<'professional' | 'casual' | 'enthusiastic'>('professional');

  const handleGenerate = async () => {
    if (!projectDescription.trim()) return;

    setGenerating(true);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockProposal = `Olá! Vi seu projeto e fiquei muito interessado em ajudar.

**Sobre minha experiência:**
${yourExperience || 'Tenho ampla experiência na área e já entreguei diversos projetos similares com sucesso.'}

**Minha proposta:**
Com base na descrição do projeto "${projectDescription.substring(0, 50)}...", proponho as seguintes entregas:

1. **Análise inicial e planejamento** (2 dias)
   - Levantamento completo dos requisitos
   - Definição de escopo e cronograma detalhado

2. **Desenvolvimento** (7-10 dias)
   - Implementação das funcionalidades principais
   - Testes unitários e de integração
   - Documentação técnica

3. **Revisão e ajustes** (2 dias)
   - Incorporação de feedbacks
   - Ajustes finais e otimizações

**Investimento:** R$ 2.500,00
**Prazo:** 14 dias úteis

Estou disponível para começar imediatamente e mantenho comunicação diária sobre o progresso. Vamos conversar sobre os detalhes?

Atenciosamente,
[Seu nome]`;

    const newVersion: GeneratedVersion = {
      id: Date.now().toString(),
      content: mockProposal,
      timestamp: new Date()
    };

    setGeneratedProposal(mockProposal);
    setVersions([newVersion, ...versions]);
    setGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedProposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setGeneratedProposal('');
    handleGenerate();
  };

  const handleUseProposal = () => {
    // Navigate to proposal creation with pre-filled content
    navigate('/projects/1/proposal', { state: { generatedContent: generatedProposal } });
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
            <h1 className="text-gray-900 dark:text-white">IA para Propostas</h1>
            <p className="text-gray-600 dark:text-gray-400">Crie propostas profissionais em segundos</p>
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
            {/* Project Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Descrição do projeto
              </h3>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Cole aqui a descrição do projeto do cliente..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[150px] resize-none"
              />
            </div>

            {/* Your Experience */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Sua experiência (opcional)</h3>
              <textarea
                value={yourExperience}
                onChange={(e) => setYourExperience(e.target.value)}
                placeholder="Destaque suas habilidades e experiências relevantes..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] resize-none"
              />
            </div>

            {/* Tone Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Tom da proposta</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setTone('professional')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] ${
                    tone === 'professional'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Profissional
                </button>
                <button
                  onClick={() => setTone('casual')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] ${
                    tone === 'casual'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Casual
                </button>
                <button
                  onClick={() => setTone('enthusiastic')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] ${
                    tone === 'enthusiastic'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Entusiasta
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!projectDescription.trim() || generating}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Gerando proposta...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Gerar proposta com IA
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {generatedProposal ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900 dark:text-white">Proposta gerada</h3>
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
                        onClick={handleRegenerate}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Regenerar"
                      >
                        <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-gray-900 dark:text-white">
                      {generatedProposal}
                    </pre>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleUseProposal}
                      className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors min-h-[44px]"
                    >
                      Usar esta proposta
                    </button>
                    <button
                      onClick={handleRegenerate}
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
                  <h3 className="text-gray-900 dark:text-white mb-2">Pronto para começar?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Preencha os campos ao lado e clique em "Gerar proposta" para criar uma proposta profissional instantaneamente
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Version History */}
            {versions.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-gray-900 dark:text-white mb-4">Histórico de versões</h3>
                <div className="space-y-3">
                  {versions.slice(0, 5).map((version, idx) => (
                    <button
                      key={version.id}
                      onClick={() => setGeneratedProposal(version.content)}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-left transition-colors min-h-[44px]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white">
                          Versão {versions.length - idx}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {version.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <h3 className="text-blue-900 dark:text-blue-100 mb-4">💡 Dicas para melhores resultados:</h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>✓ Cole a descrição completa do projeto do cliente</li>
            <li>✓ Mencione tecnologias e ferramentas que você domina</li>
            <li>✓ Destaque projetos similares que você já entregou</li>
            <li>✓ Seja específico sobre prazos e valores quando possível</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
