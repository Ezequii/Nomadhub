import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Briefcase, MapPin, Filter, Search, Trash2 } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useTheme } from '../contexts/ThemeContext';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';

// Mock data para demonstração
const mockProjects = [
  {
    id: '1',
    title: 'Desenvolvimento de App Mobile',
    description: 'Criar aplicativo de delivery com React Native',
    budget: 8500,
    budgetMin: 8500,
    budgetMax: 8500,
    deadline: '30 dias',
    status: 'open' as const,
    currency: 'BRL',
    createdAt: new Date().toISOString(),
    tags: ['React Native', 'TypeScript', 'Firebase'],
    client: {
      name: 'TechFood',
      avatar: '🍔',
      trustScore: 92,
    },
  },
  {
    id: '2',
    title: 'Landing Page para SaaS',
    description: 'Design e desenvolvimento de landing page de alta conversão',
    budget: 3500,
    budgetMin: 3500,
    budgetMax: 3500,
    deadline: '15 dias',
    status: 'open' as const,
    currency: 'BRL',
    createdAt: new Date().toISOString(),
    tags: ['React', 'Tailwind', 'SEO'],
    client: {
      name: 'CloudSync',
      avatar: '☁️',
      trustScore: 88,
    },
  },
  {
    id: '3',
    title: 'API REST com NestJS',
    description: 'Backend completo com autenticação e pagamentos',
    budget: 12000,
    budgetMin: 12000,
    budgetMax: 12000,
    deadline: '45 dias',
    status: 'open' as const,
    currency: 'BRL',
    createdAt: new Date().toISOString(),
    tags: ['NestJS', 'PostgreSQL', 'Docker'],
    client: {
      name: 'FinTech Pro',
      avatar: '💳',
      trustScore: 95,
    },
  },
];

const mockDestinations = [
  {
    id: 'lisboa',
    name: 'Lisboa, Portugal',
    costOfLiving: 1800,
    wifiSpeed: 150,
    community: 9.5,
    image: '🇵🇹',
  },
  {
    id: 'bali',
    name: 'Bali, Indonésia',
    costOfLiving: 1200,
    wifiSpeed: 80,
    community: 9.8,
    image: '🇮🇩',
  },
  {
    id: 'medellin',
    name: 'Medellín, Colômbia',
    costOfLiving: 1000,
    wifiSpeed: 120,
    community: 9.2,
    image: '🇨🇴',
  },
];

type TabType = 'projects' | 'destinations';

export function Favorites() {
  const { favorites, removeFavorite, clearAll } = useFavorites();
  const { isDark } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar favoritos por tipo
  const favoriteProjects = favorites.filter((fav) => 
    mockProjects.some((p) => p.id === fav)
  );
  const favoriteDestinations = favorites.filter((fav) => 
    mockDestinations.some((d) => d.id === fav)
  );

  // Filtrar por busca
  const filteredProjects = mockProjects.filter((project) =>
    favoriteProjects.includes(project.id) &&
    (searchQuery === '' || 
     project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredDestinations = mockDestinations.filter((dest) =>
    favoriteDestinations.includes(dest.id) &&
    (searchQuery === '' || dest.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRemove = (id: string) => {
    removeFavorite(id);
    showToast('success', 'Removido', 'Item removido dos favoritos');
  };

  const handleClearAll = () => {
    if (window.confirm('Deseja remover todos os favoritos?')) {
      clearAll();
      showToast('info', 'Favoritos limpos', 'Todos os favoritos foram removidos');
    }
  };

  const isEmpty = (activeTab === 'projects' ? filteredProjects : filteredDestinations).length === 0;

  return (
    <div className="pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-600 text-white p-6 rounded-b-3xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 fill-current" />
            <div>
              <h1>Favoritos</h1>
              <p className="text-blue-100">
                {favorites.length} {favorites.length === 1 ? 'item salvo' : 'itens salvos'}
              </p>
            </div>
          </div>
          {favorites.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="text-white border-white/30 hover:bg-white/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar nos favoritos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 p-4"
      >
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'projects'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          Projetos ({favoriteProjects.length})
        </button>
        <button
          onClick={() => setActiveTab('destinations')}
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'destinations'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          <MapPin className="w-5 h-5" />
          Destinos ({favoriteDestinations.length})
        </button>
      </motion.div>

      {/* Content */}
      <div className="p-4">
        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-gray-900 dark:text-white">
              Nenhum favorito
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery ? 'Nenhum resultado encontrado' : `Você ainda não favoritou nenhum ${activeTab === 'projects' ? 'projeto' : 'destino'}`}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => navigate(activeTab === 'projects' ? '/projects' : '/nomad')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Explorar {activeTab === 'projects' ? 'Projetos' : 'Destinos'}
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {activeTab === 'projects' ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <ProjectCard project={project} />
                  <button
                    onClick={() => handleRemove(project.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </motion.div>
              ))
            ) : (
              filteredDestinations.map((dest, index) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div>{dest.image}</div>
                      <div>
                        <h3 className="text-gray-900 dark:text-white">
                          {dest.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          ${dest.costOfLiving}/mês
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(dest.id)}
                      className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors min-h-[44px] min-w-[44px]"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">WiFi</p>
                      <p className="text-gray-900 dark:text-white">{dest.wifiSpeed} Mbps</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Comunidade</p>
                      <p className="text-gray-900 dark:text-white">{dest.community}/10</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}