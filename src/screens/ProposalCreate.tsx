import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { AIProposalGenerator } from '../components/AIProposalGenerator';
import { api } from '../api/client';
import { ArrowLeft, DollarSign, Calendar, FileText } from 'lucide-react';
import type { Project, AIProposalResponse } from '../types';

export function ProposalCreate() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [useAI, setUseAI] = useState(false);
  const [manualProposal, setManualProposal] = useState({
    amount: 0,
    timeline: '',
    scope: ''
  });

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      const data = await api.getProject(projectId!);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAIGenerate = async (projectId: string, freelancerId: string) => {
    return api.generateAIProposal(projectId, freelancerId);
  };

  const handleAISubmit = async (proposal: AIProposalResponse & { edited?: boolean }) => {
    try {
      await api.createProposal(projectId!, {
        freelancerId: '1', // Mock - seria pego do contexto do usuário logado
        amount: proposal.amount,
        currency: proposal.currency,
        scope: proposal.scope,
        timeline: proposal.timeline
      });
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Error creating proposal:', error);
    }
  };

  const handleManualSubmit = async () => {
    try {
      await api.createProposal(projectId!, {
        freelancerId: '1', // Mock
        amount: manualProposal.amount,
        currency: 'BRL',
        scope: manualProposal.scope,
        timeline: manualProposal.timeline
      });
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Error creating proposal:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-gray-600">Carregando projeto...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-gray-600">Projeto não encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Nova Proposta" />
      
      <div className="px-4 py-6 max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        {/* Project Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h2 className="text-gray-900 mb-2">{project.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{project.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>
                {project.budgetMin && project.budgetMax
                  ? `${formatCurrency(project.budgetMin)} - ${formatCurrency(project.budgetMax)}`
                  : 'A combinar'}
              </span>
            </div>
          </div>
        </div>

        {/* Method Selection */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3">Como deseja criar a proposta?</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setUseAI(true)}
              className={`p-4 rounded-xl border-2 transition-all ${
                useAI
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-left">
                <h4 className="text-gray-900 mb-1">Com IA</h4>
                <p className="text-sm text-gray-600">Geração automática e inteligente</p>
              </div>
            </button>
            <button
              onClick={() => setUseAI(false)}
              className={`p-4 rounded-xl border-2 transition-all ${
                !useAI
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-left">
                <h4 className="text-gray-900 mb-1">Manual</h4>
                <p className="text-sm text-gray-600">Criar do zero</p>
              </div>
            </button>
          </div>
        </div>

        {/* AI Proposal Generator */}
        {useAI ? (
          <AIProposalGenerator
            projectId={projectId!}
            freelancerId="1"
            onGenerate={handleAIGenerate}
            onSubmit={handleAISubmit}
          />
        ) : (
          /* Manual Proposal Form */
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Detalhes da Proposta</h3>

              {/* Amount */}
              <div className="mb-4">
                <label className="block text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Valor da Proposta</span>
                  </div>
                </label>
                <input
                  type="number"
                  value={manualProposal.amount || ''}
                  onChange={(e) => setManualProposal({ ...manualProposal, amount: parseFloat(e.target.value) })}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Timeline */}
              <div className="mb-4">
                <label className="block text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Prazo de Entrega</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={manualProposal.timeline}
                  onChange={(e) => setManualProposal({ ...manualProposal, timeline: e.target.value })}
                  placeholder="Ex: 4-6 semanas"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Scope */}
              <div>
                <label className="block text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Escopo do Trabalho</span>
                  </div>
                </label>
                <textarea
                  value={manualProposal.scope}
                  onChange={(e) => setManualProposal({ ...manualProposal, scope: e.target.value })}
                  placeholder="Descreva o que será entregue, etapas, metodologia..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleManualSubmit}
                disabled={!manualProposal.amount || !manualProposal.timeline || !manualProposal.scope}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Proposta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}