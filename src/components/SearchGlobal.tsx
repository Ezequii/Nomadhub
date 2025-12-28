import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Briefcase, User, MapPin, TrendingUp } from 'lucide-react';
import { api } from '../api/client';

interface SearchGlobalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchGlobal({ isOpen, onClose }: SearchGlobalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        // Simulated search - in production, this would call API
        const projects = await api.getProjects();
        const filtered = projects.filter(p => 
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
        );
        
        setResults(filtered.slice(0, 5).map(p => ({
          type: 'project',
          id: p.id,
          title: p.title,
          subtitle: p.description,
          budget: p.budgetMax
        })));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = (result: any) => {
    if (result.type === 'project') {
      navigate(`/projects/${result.id}`);
    }
    onClose();
    setQuery('');
  };

  const popularSearches = [
    { icon: Briefcase, label: 'Desenvolvimento Mobile', query: 'mobile' },
    { icon: User, label: 'Design UI/UX', query: 'design' },
    { icon: MapPin, label: 'Marketing Digital', query: 'marketing' },
    { icon: TrendingUp, label: 'Projetos em Alta', query: 'alta' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar projetos, freelancers, destinos..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                    autoFocus
                  />
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                  </div>
                ) : results.length > 0 ? (
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {results.map((result) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                        onClick={() => handleResultClick(result)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-gray-900 dark:text-white mb-1">
                              {result.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                              {result.subtitle}
                            </p>
                            {result.budget && (
                              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                Até R$ {result.budget.toLocaleString('pt-BR')}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : query ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      Nenhum resultado encontrado para "{query}"
                    </p>
                  </div>
                ) : (
                  <div className="p-4">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-3 px-2">
                      Buscas populares
                    </h3>
                    <div className="space-y-1">
                      {popularSearches.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={index}
                            onClick={() => setQuery(item.query)}
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
                          >
                            <Icon className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Use ↑↓ para navegar</span>
                  <span>ESC para fechar</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
