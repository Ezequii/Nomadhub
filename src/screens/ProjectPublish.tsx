import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Globe, 
  Clock,
  FileText,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export function ProjectPublish() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'intermediate',
    budget: '',
    deadline: '',
    deliverables: '',
    requirements: '',
    language: 'pt-BR',
    timezone: 'UTC-3',
    remote: true
  });

  const [showPreview, setShowPreview] = useState(false);

  const handlePublish = () => {
    // Mock: salvar projeto
    console.log('Publicando projeto:', formData);
    navigate('/proposals-received', { state: { projectId: 'new-123' } });
  };

  const categories = [
    'Desenvolvimento Web',
    'Design Gráfico',
    'Marketing Digital',
    'Redação',
    'Tradução',
    'Consultoria',
    'Vídeo & Animação'
  ];

  const recommendations = [
    { icon: Calendar, text: 'Prazo de 2-4 semanas aumenta em 40% as propostas', type: 'info' },
    { icon: DollarSign, text: 'Orçamento flexível atrai freelancers de todos níveis', type: 'success' },
    { icon: Clock, text: 'Adicione descrição detalhada para melhores propostas', type: 'warning' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <Header 
        title="Publicar Projeto" 
        showBack 
        onBack={() => navigate(-1)}
      />

      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step >= s
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step > s ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className={step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}>
              Informações Básicas
            </span>
            <span className={step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}>
              Detalhes
            </span>
            <span className={step >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}>
              Revisão
            </span>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-gray-900 dark:text-white mb-4">Informações Básicas</h3>

              {/* Title */}
              <div className="space-y-2 mb-4">
                <label className="text-gray-700 dark:text-gray-300">
                  Título do Projeto *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Desenvolver landing page para startup"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2 mb-4">
                <label className="text-gray-700 dark:text-gray-300">
                  Categoria *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300">
                  Nível de Experiência *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'junior', label: 'Júnior' },
                    { value: 'intermediate', label: 'Pleno' },
                    { value: 'senior', label: 'Sênior' }
                  ].map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, level: level.value })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.level === level.value
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget & Deadline */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-gray-900 dark:text-white mb-4">Orçamento e Prazo</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300">
                    Orçamento (R$) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="5000"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300">
                    Prazo (dias) *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="number"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      placeholder="30"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.title || !formData.category || !formData.budget || !formData.deadline}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
            >
              Continuar
            </Button>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-gray-900 dark:text-white mb-4">Descrição do Projeto</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300">
                    Descrição Completa *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva em detalhes o que você precisa..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300">
                    Entregáveis Esperados *
                  </label>
                  <textarea
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    placeholder="Ex: Código fonte, documentação, deploy em produção"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300">
                    Requisitos Técnicos
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Ex: React, TypeScript, experiência com APIs REST"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Language & Timezone */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-gray-900 dark:text-white mb-4">Preferências</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Idioma
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="pt-BR">Português</option>
                    <option value="en">Inglês</option>
                    <option value="es">Espanhol</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Fuso Horário
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="UTC-3">UTC-3 (Brasília)</option>
                    <option value="UTC-5">UTC-5 (NY)</option>
                    <option value="UTC+0">UTC+0 (Londres)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-900 dark:text-white mb-2">
                    Quer que a IA ajude a melhorar sua descrição?
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Melhorar com IA
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 py-6"
              >
                Voltar
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!formData.description || !formData.deliverables}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6"
              >
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Preview */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Recommendations */}
            <div className="space-y-3">
              <h3 className="text-gray-900 dark:text-white mb-3">Recomendações</h3>
              {recommendations.map((rec, index) => {
                const Icon = rec.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${
                      rec.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : rec.type === 'warning'
                        ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        rec.type === 'success'
                          ? 'text-green-600 dark:text-green-400'
                          : rec.type === 'warning'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-blue-600 dark:text-blue-400'
                      }`}
                    />
                    <p className="text-gray-700 dark:text-gray-300">{rec.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Preview */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 dark:text-white">Preview do Projeto</h3>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xl text-gray-900 dark:text-white mb-2">
                    {formData.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                      {formData.category}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                      {formData.level === 'junior' ? 'Júnior' : formData.level === 'senior' ? 'Sênior' : 'Pleno'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Orçamento</p>
                    <p className="text-lg text-gray-900 dark:text-white">
                      R$ {formData.budget}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Prazo</p>
                    <p className="text-lg text-gray-900 dark:text-white">
                      {formData.deadline} dias
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Descrição</p>
                  <p className="text-gray-900 dark:text-white">{formData.description}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Entregáveis</p>
                  <p className="text-gray-900 dark:text-white">{formData.deliverables}</p>
                </div>

                {formData.requirements && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Requisitos</p>
                    <p className="text-gray-900 dark:text-white">{formData.requirements}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 py-6"
              >
                Editar
              </Button>
              <Button
                onClick={handlePublish}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Publicar Projeto
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
