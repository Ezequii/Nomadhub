import { useState } from 'react';
import { Sparkles, Loader, DollarSign, Calendar, FileText, CheckCircle } from 'lucide-react';
import type { AIProposalResponse } from '../types';

interface AIProposalGeneratorProps {
  projectId: string;
  freelancerId: string;
  onGenerate: (projectId: string, freelancerId: string) => Promise<AIProposalResponse>;
  onSubmit: (proposal: AIProposalResponse & { edited?: boolean }) => void;
}

export function AIProposalGenerator({ projectId, freelancerId, onGenerate, onSubmit }: AIProposalGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<AIProposalResponse | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedProposal, setEditedProposal] = useState<AIProposalResponse | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await onGenerate(projectId, freelancerId);
      setProposal(result);
      setEditedProposal(result);
    } catch (error) {
      console.error('Error generating proposal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (editedProposal) {
      onSubmit({ ...editedProposal, edited: editing });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!proposal && !loading) {
    return (
      <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-gray-900 mb-2">Gerar Proposta com IA</h3>
          <p className="text-gray-600 mb-6">
            Nossa IA analisa o projeto, seu perfil e o mercado para criar uma proposta profissional e competitiva em segundos.
          </p>
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl min-h-[44px]"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Gerar Proposta Inteligente</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-gray-200">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Analisando projeto...</h3>
          <p className="text-gray-600">
            A IA está processando as especificações e criando sua proposta personalizada
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3>Proposta Gerada por IA</h3>
            <p className="text-purple-100">Revise e edite antes de enviar</p>
          </div>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 text-purple-100 mb-1">
              <DollarSign className="w-4 h-4" />
              <span>Valor</span>
            </div>
            <div>{formatCurrency(editedProposal?.amount || 0)}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 text-purple-100 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Prazo</span>
            </div>
            <div>{editedProposal?.timeline}</div>
          </div>
        </div>
      </div>

      {/* Scope */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <h4 className="text-gray-900">Escopo do Trabalho</h4>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 hover:text-blue-700 min-h-[44px] px-3"
            >
              Editar
            </button>
          )}
        </div>
        {editing ? (
          <textarea
            value={editedProposal?.scope || ''}
            onChange={(e) => setEditedProposal(prev => prev ? { ...prev, scope: e.target.value } : null)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[200px]"
          />
        ) : (
          <pre className="text-gray-700 whitespace-pre-wrap">{editedProposal?.scope}</pre>
        )}
      </div>

      {/* Justification */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-gray-900 mb-1">Justificativa da IA</h4>
            <p className="text-gray-700">{editedProposal?.justification}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {editing ? (
          <>
            <button
              onClick={() => setEditing(false)}
              className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-xl hover:bg-gray-50 transition-colors min-h-[44px]"
            >
              Cancelar Edição
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors min-h-[44px]"
            >
              Salvar Alterações
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleGenerate}
              className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-xl hover:bg-gray-50 transition-colors min-h-[44px]"
            >
              Gerar Novamente
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl min-h-[44px]"
            >
              Enviar Proposta
            </button>
          </>
        )}
      </div>
    </div>
  );
}