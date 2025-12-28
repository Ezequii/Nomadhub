import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { 
  FileText, 
  Star, 
  Heart, 
  Lock, 
  Crown,
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

const categories = ['Todos', 'Desenvolvimento', 'Design', 'Marketing', 'Escrita', 'Consultoria'];

const templates = [
  {
    id: 1,
    title: 'Proposta de Desenvolvimento Web Completo',
    category: 'Desenvolvimento',
    description: 'Template profissional para projetos de desenvolvimento web full-stack',
    rating: 4.9,
    uses: 1234,
    isPro: false,
    isFavorite: true
  },
  {
    id: 2,
    title: 'Proposta de Branding Empresarial',
    category: 'Design',
    description: 'Apresentação completa para projetos de identidade visual',
    rating: 4.8,
    uses: 892,
    isPro: true,
    isFavorite: false
  },
  {
    id: 3,
    title: 'Consultoria em Marketing Digital',
    category: 'Marketing',
    description: 'Template para propostas de consultoria e estratégia digital',
    rating: 4.7,
    uses: 654,
    isPro: true,
    isFavorite: false
  },
  {
    id: 4,
    title: 'Redação de Conteúdo para Blog',
    category: 'Escrita',
    description: 'Proposta profissional para serviços de copywriting',
    rating: 4.6,
    uses: 543,
    isPro: false,
    isFavorite: true
  },
  {
    id: 5,
    title: 'Design de UI/UX para Apps',
    category: 'Design',
    description: 'Template premium para projetos de design de interfaces',
    rating: 5.0,
    uses: 2103,
    isPro: true,
    isFavorite: false
  },
  {
    id: 6,
    title: 'Consultoria Empresarial Estratégica',
    category: 'Consultoria',
    description: 'Proposta executiva para projetos de consultoria',
    rating: 4.9,
    uses: 432,
    isPro: true,
    isFavorite: false
  }
];

export function Templates() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([1, 4]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const isPro = false; // Mock - verificar do contexto

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'Todos' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorites = !showOnlyFavorites || favorites.includes(template.id);
    
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleUseTemplate = (template: typeof templates[0]) => {
    if (template.isPro && !isPro) {
      // Show upgrade modal
      navigate('/pricing');
      return;
    }
    
    // Use template
    navigate('/ai-proposal', { state: { templateId: template.id } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Templates de Proposta" showBack />

      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Search and Filters */}
        <div className="mb-6 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar templates..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl border-2 whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filter Favorites */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                showOnlyFavorites
                  ? 'border-pink-600 bg-pink-50 dark:bg-pink-950 text-pink-600 dark:text-pink-400'
                  : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
              Favoritos {favorites.length > 0 && `(${favorites.length})`}
            </button>

            <span className="text-gray-600 dark:text-gray-400">
              {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'}
            </span>
          </div>
        </div>

        {/* Pro Banner */}
        {!isPro && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/pricing')}
            className="mb-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-1">Desbloqueie Templates Premium</h4>
                <p className="text-yellow-100 text-sm">
                  Acesse +50 templates profissionais com o Plano Pro
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Templates Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredTemplates.map(template => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-gray-900 dark:text-white flex-1">{template.title}</h3>
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(template.id)
                          ? 'fill-pink-600 text-pink-600'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    {template.category}
                  </span>
                  {template.isPro && (
                    <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Pro
                    </span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {template.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {template.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {template.uses} usos
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    // Preview modal
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  className={`flex-1 ${
                    template.isPro && !isPro
                      ? 'bg-gradient-to-r from-yellow-600 to-amber-600'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600'
                  } text-white`}
                  onClick={() => handleUseTemplate(template)}
                >
                  {template.isPro && !isPro ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Desbloquear
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Usar Template
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 dark:text-white mb-2">Nenhum template encontrado</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Todos');
              setShowOnlyFavorites(false);
            }}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
