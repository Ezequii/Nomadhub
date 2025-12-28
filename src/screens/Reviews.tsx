import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle, Send, AlertCircle } from 'lucide-react';

interface Contract {
  id: string;
  projectTitle: string;
  clientName: string;
  amount: number;
  currency: string;
  completedAt: string;
}

const REVIEW_TAGS = [
  'Pontual',
  'Boa comunicação',
  'Alta qualidade',
  'Profissional',
  'Respeitoso',
  'Criativo',
  'Detalhista',
  'Flexível'
];

export function Reviews() {
  const navigate = useNavigate();
  const { contractId } = useParams<{ contractId: string }>();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Mock contract data
  const contract: Contract = {
    id: contractId || '1',
    projectTitle: 'Website Institucional React',
    clientName: 'João Silva',
    amount: 5000,
    currency: 'BRL',
    completedAt: new Date().toISOString()
  };

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    }).format(value);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Por favor, selecione uma avaliação de 1 a 5 estrelas');
      return;
    }

    if (comment.length < 50) {
      alert('O comentário deve ter no mínimo 50 caracteres');
      return;
    }

    setSubmitting(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular sucesso
      alert('Avaliação enviada com sucesso!');
      navigate('/wallet');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const getRatingLabel = (stars: number) => {
    const labels = {
      1: 'Muito insatisfeito',
      2: 'Insatisfeito',
      3: 'Neutro',
      4: 'Satisfeito',
      5: 'Muito satisfeito'
    };
    return labels[stars as keyof typeof labels] || '';
  };

  const isFormValid = rating > 0 && comment.length >= 50;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-gray-900 dark:text-white">Avaliar Contrato</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Contract Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white mb-2">
                {contract.projectTitle}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Cliente: {contract.clientName}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              <span className="text-green-700 dark:text-green-400">Concluído</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Valor do contrato</span>
            <span className="text-gray-900 dark:text-white">
              {formatCurrency(contract.amount, contract.currency)}
            </span>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-gray-900 dark:text-white mb-2">
            Como foi sua experiência?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Sua avaliação é essencial para manter a qualidade da plataforma
          </p>

          {/* Star Rating */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-2 hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            {(rating > 0 || hoverRating > 0) && (
              <div className="text-gray-900 dark:text-white">
                {getRatingLabel(hoverRating || rating)}
              </div>
            )}
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="text-gray-900 dark:text-white mb-2 block">
              Conte mais sobre sua experiência *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Descreva como foi trabalhar neste projeto. Seja honesto e construtivo..."
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px]"
              aria-label="Comentário da avaliação"
            />
            <div className="flex items-center justify-between mt-2">
              <span className={`${
                comment.length >= 50 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {comment.length}/50 caracteres mínimos
              </span>
              {comment.length >= 50 && (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-gray-900 dark:text-white mb-3 block">
              Adicione tags (opcional)
            </label>
            <div className="flex flex-wrap gap-2">
              {REVIEW_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full border-2 transition-all min-h-[44px] ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                  aria-pressed={selectedTags.includes(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-900 dark:text-blue-300 mb-1">
                Avaliação obrigatória
              </h4>
              <p className="text-blue-800 dark:text-blue-400">
                Para liberar o pagamento final, é necessário avaliar o contrato. 
                Sua avaliação será exibida no perfil do cliente e ajuda outros freelancers.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || submitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
          aria-label="Enviar avaliação"
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Enviar Avaliação</span>
            </>
          )}
        </button>

        {!isFormValid && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            {rating === 0 && 'Selecione uma classificação'}
            {rating > 0 && comment.length < 50 && `Faltam ${50 - comment.length} caracteres no comentário`}
          </div>
        )}
      </div>
    </div>
  );
}
