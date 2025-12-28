import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, SlidersHorizontal, DollarSign, Calendar, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

const categories = [
  'Desenvolvimento Web', 'Design', 'Marketing', 'Escrita', 
  'Tradução', 'Vídeo', 'Consultoria', 'Dados', 'Outros'
];

const budgetRanges = [
  { label: 'Até R$ 500', min: 0, max: 500 },
  { label: 'R$ 500 - R$ 1.000', min: 500, max: 1000 },
  { label: 'R$ 1.000 - R$ 2.500', min: 1000, max: 2500 },
  { label: 'R$ 2.500 - R$ 5.000', min: 2500, max: 5000 },
  { label: 'Acima de R$ 5.000', min: 5000, max: 999999 }
];

const deadlines = [
  { label: 'Urgente (até 7 dias)', days: 7 },
  { label: 'Curto prazo (até 30 dias)', days: 30 },
  { label: 'Médio prazo (até 90 dias)', days: 90 },
  { label: 'Longo prazo (90+ dias)', days: 999 }
];

export function ProjectFilters() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<typeof budgetRanges[0] | null>(null);
  const [selectedDeadline, setSelectedDeadline] = useState<typeof deadlines[0] | null>(null);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleApply = () => {
    // Aqui você salvaria os filtros e navegaria de volta
    const filters = {
      categories: selectedCategories,
      budget: selectedBudget || { min: minBudget, max: maxBudget },
      deadline: selectedDeadline
    };
    
    localStorage.setItem('nomadhub-project-filters', JSON.stringify(filters));
    navigate('/projects');
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedBudget(null);
    setSelectedDeadline(null);
    setMinBudget('');
    setMaxBudget('');
  };

  const activeFiltersCount = 
    selectedCategories.length + 
    (selectedBudget ? 1 : 0) + 
    (selectedDeadline ? 1 : 0) +
    (minBudget || maxBudget ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-gray-900 dark:text-white">Filtros Avançados</h1>
              {activeFiltersCount > 0 && (
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {activeFiltersCount} {activeFiltersCount === 1 ? 'filtro ativo' : 'filtros ativos'}
                </p>
              )}
            </div>
          </div>
          
          {activeFiltersCount > 0 && (
            <button
              onClick={handleClear}
              className="text-red-600 dark:text-red-400 hover:underline"
            >
              Limpar tudo
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 py-6 max-w-screen-xl mx-auto space-y-6">
          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-gray-900 dark:text-white">Categorias</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-xl border-2 transition-all ${
                    selectedCategories.includes(category)
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Ranges */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-gray-900 dark:text-white">Orçamento</h3>
            </div>
            <div className="space-y-2">
              {budgetRanges.map(range => (
                <button
                  key={range.label}
                  onClick={() => setSelectedBudget(selectedBudget?.label === range.label ? null : range)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedBudget?.label === range.label
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className={
                    selectedBudget?.label === range.label
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }>
                    {range.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Budget */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Ou defina um valor personalizado:</p>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Mínimo"
                    value={minBudget}
                    onChange={(e) => {
                      setMinBudget(e.target.value);
                      setSelectedBudget(null);
                    }}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Máximo"
                    value={maxBudget}
                    onChange={(e) => {
                      setMaxBudget(e.target.value);
                      setSelectedBudget(null);
                    }}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-gray-900 dark:text-white">Prazo</h3>
            </div>
            <div className="space-y-2">
              {deadlines.map(deadline => (
                <button
                  key={deadline.label}
                  onClick={() => setSelectedDeadline(selectedDeadline?.label === deadline.label ? null : deadline)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedDeadline?.label === deadline.label
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className={
                    selectedDeadline?.label === deadline.label
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }>
                    {deadline.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4 sticky bottom-0">
        <div className="max-w-screen-xl mx-auto flex gap-3">
          <Button
            onClick={handleClear}
            variant="outline"
            className="flex-1"
          >
            Limpar
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Aplicar Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </div>
      </div>
    </div>
  );
}
