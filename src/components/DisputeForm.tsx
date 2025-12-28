import { useState } from 'react';
import { AlertTriangle, Upload, FileText, X, Send } from 'lucide-react';

interface Evidence {
  url: string;
  note?: string;
}

interface DisputeFormProps {
  contractId: string;
  onSubmit: (reason: string, evidence: Evidence[]) => Promise<void>;
  onCancel: () => void;
}

export function DisputeForm({ contractId, onSubmit, onCancel }: DisputeFormProps) {
  const [reason, setReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(false);

  const commonReasons = [
    'Entrega não conforme especificações',
    'Prazo não cumprido',
    'Falta de comunicação',
    'Qualidade abaixo do esperado',
    'Escopo alterado sem acordo',
    'Outro motivo'
  ];

  const handleSubmit = async () => {
    if (!reason.trim()) return;

    setLoading(true);
    try {
      await onSubmit(reason, evidence);
    } catch (error) {
      console.error('Error creating dispute:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = () => {
    // Mock file upload
    const mockFile: Evidence = {
      url: `https://example.com/evidence/${Date.now()}.pdf`,
      note: ''
    };
    setEvidence([...evidence, mockFile]);
  };

  const removeEvidence = (index: number) => {
    setEvidence(evidence.filter((_, i) => i !== index));
  };

  const updateEvidenceNote = (index: number, note: string) => {
    setEvidence(evidence.map((e, i) => i === index ? { ...e, note } : e));
  };

  return (
    <div className="space-y-6">
      {/* Warning Header */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-yellow-900 mb-2">Abrir Disputa</h3>
            <p className="text-yellow-800 mb-3">
              Uma disputa deve ser o último recurso. Recomendamos tentar resolver diretamente com a outra parte primeiro.
            </p>
            <ul className="text-yellow-700 space-y-1 list-disc list-inside">
              <li>Nossa equipe de mediação analisará em até 72 horas</li>
              <li>Ambas as partes receberão notificação</li>
              <li>Pode afetar o Trust Score se for frivolosa</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common Reasons */}
      <div>
        <label className="block text-gray-900 mb-3">Selecione o motivo da disputa</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {commonReasons.map(reasonOption => (
            <button
              key={reasonOption}
              onClick={() => {
                setSelectedReason(reasonOption);
                if (reasonOption !== 'Outro motivo') {
                  setReason(reasonOption);
                }
              }}
              className={`p-4 text-left rounded-xl border-2 transition-all min-h-[60px] ${
                selectedReason === reasonOption
                  ? 'border-red-600 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className={selectedReason === reasonOption ? 'text-red-900' : 'text-gray-700'}>
                {reasonOption}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Reason */}
      {selectedReason === 'Outro motivo' && (
        <div>
          <label className="block text-gray-900 mb-2">Descreva o motivo</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explique detalhadamente o motivo da disputa..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px]"
          />
        </div>
      )}

      {/* Detailed Explanation */}
      <div>
        <label className="block text-gray-900 mb-2">
          Explicação detalhada {selectedReason === 'Outro motivo' ? '(opcional)' : ''}
        </label>
        <textarea
          value={selectedReason === 'Outro motivo' ? '' : reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Adicione mais detalhes sobre a situação (opcional)..."
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
        />
      </div>

      {/* Evidence Upload */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-gray-900">Evidências (opcional)</label>
          <button
            onClick={handleFileUpload}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors min-h-[44px]"
          >
            <Upload className="w-4 h-4" />
            <span>Adicionar arquivo</span>
          </button>
        </div>

        {evidence.length > 0 && (
          <div className="space-y-3">
            {evidence.map((e, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 truncate">Evidência {index + 1}</span>
                      <button
                        onClick={() => removeEvidence(index)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={e.note || ''}
                      onChange={(e) => updateEvidenceNote(index, e.target.value)}
                      placeholder="Descrição do arquivo (opcional)"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 min-h-[44px]"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || !reason.trim()}
          className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
        >
          {loading ? (
            'Enviando...'
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Abrir Disputa</span>
            </>
          )}
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-blue-900">
          <strong>Próximos passos:</strong> Após enviar, nossa equipe de mediação analisará a disputa e entrará em contato com ambas as partes dentro de 72 horas. Você receber�� atualizações por e-mail e notificações no app.
        </p>
      </div>
    </div>
  );
}