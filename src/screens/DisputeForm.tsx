import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { AlertTriangle, Upload, X, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

const disputeReasons = [
  'Entrega não atende aos requisitos',
  'Prazo não cumprido',
  'Falta de comunicação',
  'Qualidade abaixo do esperado',
  'Escopo alterado sem acordo',
  'Outro motivo'
];

export function DisputeForm() {
  const navigate = useNavigate();
  const { contractId } = useParams();
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReason || !description) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const addAttachment = () => {
    // Simular upload
    const fileName = `evidencia-${Date.now()}.jpg`;
    setAttachments([...attachments, fileName]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header title="Disputa Aberta" showBack />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-4 py-12 max-w-md mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            
            <h2 className="text-gray-900 dark:text-white mb-3">Disputa Registrada</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sua disputa foi registrada com sucesso. Nossa equipe irá analisar o caso e entrar em contato em até 24 horas.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
              <p className="text-blue-900 dark:text-blue-100">
                <strong>Protocolo:</strong> #DSP-{contractId}-{Date.now().toString().slice(-6)}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate('/contracts')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                Ver Meus Contratos
              </Button>
              <Button
                onClick={() => navigate('/chat')}
                variant="outline"
                className="w-full"
              >
                Falar com Suporte
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Abrir Disputa" showBack />

      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Warning Alert */}
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-900 dark:text-yellow-100 mb-1">Importante</h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                Abrir uma disputa deve ser o último recurso. Tente primeiro resolver diretamente com a outra parte através do chat.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reason */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Motivo da Disputa *</h3>
            <div className="space-y-2">
              {disputeReasons.map(reason => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setSelectedReason(reason)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedReason === reason
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className={
                    selectedReason === reason
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }>
                    {reason}
                  </span>
                </button>
              ))}
            </div>

            {selectedReason === 'Outro motivo' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4"
              >
                <input
                  type="text"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Descreva o motivo..."
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </motion.div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-gray-900 dark:text-white mb-2">Descrição Detalhada *</h3>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              Explique em detalhes o que aconteceu. Quanto mais informações, melhor.
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o problema em detalhes..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              required
            />
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              {description.length} / 1000 caracteres
            </p>
          </div>

          {/* Attachments */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-gray-900 dark:text-white mb-2">Anexos (Opcional)</h3>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              Adicione prints, documentos ou qualquer evidência que comprove seu caso.
            </p>

            {attachments.length > 0 && (
              <div className="space-y-2 mb-4">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  >
                    <Upload className="w-4 h-4 text-gray-400" />
                    <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{file}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Button
              type="button"
              onClick={addAttachment}
              variant="outline"
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Adicionar Arquivo
            </Button>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!selectedReason || !description || isSubmitting}
              className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </div>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Abrir Disputa
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
