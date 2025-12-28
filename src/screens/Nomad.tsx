import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Wifi,
  Coffee,
  Users,
  Star,
  DollarSign,
  Calendar,
  Award,
  MessageSquare,
  Heart,
  Globe,
  Trophy,
  Zap,
  Briefcase,
  Sparkles,
  Plus,
  Search
} from 'lucide-react';
import { api } from '../api/client';
import type { CommunityPost } from '../types';

interface NomadLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  costPerMonth: number;
  wifi: number;
  coworking: boolean;
  image: string;
  description: string;
}

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  category: 'stack' | 'country';
  members: number;
  icon: string;
}

interface Achievement {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
}

const mockLocations: NomadLocation[] = [
  {
    id: '1',
    name: 'Bali, Indonésia',
    city: 'Ubud',
    country: 'Indonésia',
    rating: 4.8,
    costPerMonth: 1200,
    wifi: 95,
    coworking: true,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    description: 'Paraíso tropical com ótima comunidade de nômades digitais'
  },
  {
    id: '2',
    name: 'Lisboa, Portugal',
    city: 'Lisboa',
    country: 'Portugal',
    rating: 4.7,
    costPerMonth: 1800,
    wifi: 98,
    coworking: true,
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a',
    description: 'Cidade vibrante com excelente infraestrutura para trabalho remoto'
  },
  {
    id: '3',
    name: 'Medellín, Colômbia',
    city: 'Medellín',
    country: 'Colômbia',
    rating: 4.6,
    costPerMonth: 900,
    wifi: 92,
    coworking: true,
    image: 'https://images.unsplash.com/photo-1605722243979-fe0be8158232',
    description: 'Clima perfeito e comunidade acolhedora de empreendedores'
  },
  {
    id: '4',
    name: 'Chiang Mai, Tailândia',
    city: 'Chiang Mai',
    country: 'Tailândia',
    rating: 4.7,
    costPerMonth: 800,
    wifi: 90,
    coworking: true,
    image: 'https://images.unsplash.com/photo-1598935898639-81586f7d2129',
    description: 'Baixo custo de vida e rica cultura asiática'
  }
];

export function Nomad() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'feed' | 'destinos' | 'grupos' | 'conquistas'>('feed');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCommunityData();
  }, []);

  const loadCommunityData = async () => {
    setLoading(true);
    try {
      const postsData = await api.getCommunityPosts();
      setPosts(postsData);
      loadMockGroups();
      loadMockAchievements();
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMockGroups = () => {
    const mockGroups: CommunityGroup[] = [
      {
        id: '1',
        name: 'React Brasil',
        description: 'Desenvolvedores React do Brasil',
        category: 'stack',
        members: 234,
        icon: '⚛️'
      },
      {
        id: '2',
        name: 'Nômades em Lisboa',
        description: 'Comunidade de nômades digitais em Portugal',
        category: 'country',
        members: 189,
        icon: '🇵🇹'
      },
      {
        id: '3',
        name: 'UI/UX Designers',
        description: 'Designers de interface e experiência',
        category: 'stack',
        members: 312,
        icon: '🎨'
      },
      {
        id: '4',
        name: 'Nômades em Bali',
        description: 'Trabalhando remotamente do paraíso',
        category: 'country',
        members: 456,
        icon: '🇮🇩'
      },
      {
        id: '5',
        name: 'Node.js Brasil',
        description: 'Backend developers usando Node.js',
        category: 'stack',
        members: 178,
        icon: '🟢'
      }
    ];
    setGroups(mockGroups);
  };

  const loadMockAchievements = () => {
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        userId: '1',
        userName: 'Lucas Silva',
        userAvatar: '👨‍💻',
        type: 'projects',
        title: 'Finalizou 10 projetos!',
        description: '10 projetos entregues com sucesso',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '2',
        userId: '2',
        userName: 'Marina Costa',
        userAvatar: '👩‍💼',
        type: 'trust',
        title: 'Trust Score 95!',
        description: 'Alcançou score de confiança de 95',
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: '3',
        userId: '3',
        userName: 'Pedro Santos',
        userAvatar: '🧑‍🎨',
        type: 'mentor',
        title: 'Primeiro aluno mentorado!',
        description: 'Concluiu sua primeira mentoria',
        createdAt: new Date(Date.now() - 10800000).toISOString()
      },
      {
        id: '4',
        userId: '4',
        userName: 'Ana Oliveira',
        userAvatar: '👩‍💻',
        type: 'earnings',
        title: 'R$ 50k em ganhos!',
        description: 'Atingiu R$ 50.000 em ganhos totais',
        createdAt: new Date(Date.now() - 14400000).toISOString()
      }
    ];
    setAchievements(mockAchievements);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    });
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'mentor':
        return <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'event':
        return <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'update':
        return <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'projects':
        return <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'trust':
        return <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'mentor':
        return <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'earnings':
        return <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />;
      default:
        return <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando comunidade...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          {showSearch ? (
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar na comunidade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setShowSearch(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white min-h-[44px]"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <h1 className="text-gray-900 dark:text-white">Nômade Digital</h1>
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Buscar"
              >
                <Search className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>
      </header>
      
      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Intro Banner */}
        <div className="bg-purple-600 dark:bg-purple-700 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-white mb-2">Comunidade Nômade 🌍</h2>
          <p className="text-purple-100 mb-4">
            Conecte-se com nômades digitais, explore destinos e cresça profissionalmente
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>150+ cidades</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50k+ nômades</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedTab('feed')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all min-h-[44px] ${
              selectedTab === 'feed'
                ? 'bg-purple-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
            aria-pressed={selectedTab === 'feed'}
          >
            Feed
          </button>
          <button
            onClick={() => setSelectedTab('destinos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all min-h-[44px] ${
              selectedTab === 'destinos'
                ? 'bg-purple-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
            aria-pressed={selectedTab === 'destinos'}
          >
            <MapPin className="w-4 h-4" />
            Destinos
          </button>
          <button
            onClick={() => setSelectedTab('grupos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all min-h-[44px] ${
              selectedTab === 'grupos'
                ? 'bg-purple-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
            aria-pressed={selectedTab === 'grupos'}
          >
            <Users className="w-4 h-4" />
            Grupos
          </button>
          <button
            onClick={() => setSelectedTab('conquistas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all min-h-[44px] ${
              selectedTab === 'conquistas'
                ? 'bg-purple-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
            aria-pressed={selectedTab === 'conquistas'}
          >
            <Award className="w-4 h-4" />
            Conquistas
          </button>
        </div>

        {/* Feed Tab - Mentorias e Eventos */}
        {selectedTab === 'feed' && (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    post.type === 'mentor' ? 'bg-purple-100 dark:bg-purple-900/30' :
                    post.type === 'event' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    {getPostIcon(post.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full ${
                        post.type === 'mentor' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                        post.type === 'event' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      }`}>
                        {post.type === 'mentor' ? 'Mentoria' : post.type === 'event' ? 'Evento' : 'Atualização'}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white mb-2">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{post.content}</p>
                    
                    {post.startsAt && (
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.startsAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors min-h-[44px]">
                        <Heart className="w-5 h-5" />
                        <span>Curtir</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors min-h-[44px]">
                        <MessageSquare className="w-5 h-5" />
                        <span>Comentar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {posts.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <h3 className="text-gray-900 dark:text-white mb-2">Nenhum post ainda</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Seja o primeiro a compartilhar algo com a comunidade!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Destinos Tab */}
        {selectedTab === 'destinos' && (
          <div className="grid grid-cols-1 gap-4">
            {mockLocations.map(location => (
              <div
                key={location.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative h-48">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-900 dark:text-white">{location.rating}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-gray-900 dark:text-white mb-1">{location.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{location.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Wifi className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{location.wifi}% uptime</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Coffee className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span>Coworking</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-900 dark:text-white">
                      <DollarSign className="w-4 h-4" />
                      <span>{formatCurrency(location.costPerMonth)}/mês</span>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors min-h-[44px]">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grupos Tab */}
        {selectedTab === 'grupos' && (
          <div className="space-y-3">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{group.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900 dark:text-white">{group.name}</h3>
                      {group.category === 'country' ? (
                        <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{group.members} membros</span>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors min-h-[44px]">
                        Participar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Conquistas Tab */}
        {selectedTab === 'conquistas' && (
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-yellow-400 dark:border-yellow-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{achievement.userAvatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                        {getAchievementIcon(achievement.type)}
                      </div>
                      <span className="text-gray-900 dark:text-white">
                        {achievement.userName}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {formatDate(achievement.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white mb-1">🎉 {achievement.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => alert('Criar nova mentoria (funcionalidade em desenvolvimento)')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-110 flex items-center justify-center z-20"
        aria-label="Nova mentoria"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
