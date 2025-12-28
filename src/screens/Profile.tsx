import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { TrustScore } from '../components/TrustScore';
import { Badge, type BadgeData } from '../components/Badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Briefcase, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Edit,
  CheckCircle,
  Award,
  Heart,
  Trophy,
  Users,
  Wallet,
  TrendingUp,
  MessageSquare,
  Camera
} from 'lucide-react';
import { api, type User as UserType } from '../api/client';

const mockBadges: BadgeData[] = [
  {
    id: '1',
    name: 'Verificado',
    description: 'Perfil verificado com documentos',
    icon: 'award',
    color: 'bg-blue-600',
    earned: true,
    earnedDate: '10 Jan 2025'
  },
  {
    id: '2',
    name: 'Top Performer',
    description: '10+ projetos com 5 estrelas',
    icon: 'star',
    color: 'bg-yellow-600',
    earned: true,
    earnedDate: '05 Dez 2024'
  },
  {
    id: '3',
    name: 'Rápido',
    description: 'Entrega sempre antes do prazo',
    icon: 'zap',
    color: 'bg-purple-600',
    earned: true,
    earnedDate: '20 Nov 2024'
  },
  {
    id: '4',
    name: 'Confiável',
    description: '50+ projetos concluídos',
    icon: 'trophy',
    color: 'bg-green-600',
    earned: false
  }
];

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews'>('about');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await api.getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'settings':
        navigate('/settings');
        break;
      case 'portfolio':
        navigate('/portfolio');
        break;
      case 'achievements':
        navigate('/achievements');
        break;
      case 'favorites':
        navigate('/favorites');
        break;
      case 'wallet':
        navigate('/wallet');
        break;
      case 'reviews':
        navigate('/reviews');
        break;
      case 'referral':
        navigate('/referral');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'logout':
        if (window.confirm('Deseja realmente sair?')) {
          console.log('Logout');
        }
        break;
      default:
        console.log('Action:', action);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div className="text-gray-600">Carregando perfil...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-gray-600">Erro ao carregar perfil</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Perfil" showNotifications={false} />
      
      <div className="px-4 py-4 max-w-screen-xl mx-auto space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Cover with gradient */}
          <div className="h-24 bg-blue-600 relative">
            <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl text-white hover:bg-opacity-30 transition-all min-h-[44px] min-w-[44px]">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="px-5 pb-5">
            {/* Avatar */}
            <div className="flex items-start gap-3 -mt-10 mb-4">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white border-2 border-white hover:bg-blue-700 transition-colors shadow-lg min-h-[44px] min-w-[44px]">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              
              <div className="flex-1 min-w-0 mt-11">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h2 className="text-gray-900 truncate">{user.name}</h2>
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  </div>
                  <TrustScore score={92} trend="up" size="sm" />
                </div>
                <p className="text-xs text-gray-600 mb-2 truncate">{user.email}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs">
                    <Briefcase className="w-3 h-3" />
                    <span className="capitalize">{user.role === 'nomad' ? 'Nômade' : user.role === 'client' ? 'Cliente' : 'Nômade'}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>São Paulo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-lg text-gray-900">{(user.rating || 0).toFixed(1)}</span>
                </div>
                <p className="text-xs text-gray-600">Avaliação</p>
              </div>
              <div className="text-center">
                <div className="text-lg text-gray-900 mb-1">{user.completedProjects || 0}</div>
                <p className="text-xs text-gray-600">Projetos</p>
              </div>
              <div className="text-center">
                <div className="text-lg text-gray-900 mb-1">156</div>
                <p className="text-xs text-gray-600">Seguidores</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-0.5 mb-1">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span className="text-lg text-gray-900">12</span>
                </div>
                <p className="text-xs text-gray-600">Badges</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <h3 className="text-sm text-gray-500 mb-2">Bio</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Desenvolvedor Full Stack com 5+ anos de experiência em React, Node.js e React Native. 
            Apaixonado por criar produtos digitais que impactam positivamente a vida das pessoas. 
            Trabalho remotamente de diferentes lugares do mundo 🌎
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => navigate('/wallet')}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-green-50 rounded-xl">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Carteira</p>
                <p className="text-xl text-gray-900">R$ {(user.balance || 0).toLocaleString('pt-BR')}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+12% este mês</span>
            </div>
          </button>

          <button 
            onClick={() => navigate('/reviews')}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-yellow-50 rounded-xl">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Avaliações</p>
                <p className="text-xl text-gray-900">{(user.rating || 0).toFixed(1)}/5.0</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span>142 avaliações</span>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 px-4 py-3 text-sm transition-colors ${
                activeTab === 'about'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Sobre
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex-1 px-4 py-3 text-sm transition-colors ${
                activeTab === 'portfolio'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Portfólio
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 px-4 py-3 text-sm transition-colors ${
                activeTab === 'reviews'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Reviews
            </button>
          </div>

          <div className="p-4">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Telefone</p>
                    <p className="text-sm text-gray-900">+55 (11) 98765-4321</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Localização</p>
                    <p className="text-sm text-gray-900">São Paulo, Brasil</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="pt-3">
                  <h4 className="text-sm text-gray-600 mb-3">Habilidades</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'TypeScript', 'React Native', 'Next.js', 'TailwindCSS', 'GraphQL', 'PostgreSQL'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm text-gray-900 mb-1">Projeto de Design #{i}</h4>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">Interface moderna para aplicativo mobile de finanças</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span>5.0</span>
                          </div>
                          <span>•</span>
                          <span>Dez 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => navigate('/projects')}
                  className="w-full py-3 text-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  Ver todos os projetos
                </button>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {[
                  { name: 'Maria Silva', rating: 5, comment: 'Excelente profissional! Entregou antes do prazo e com qualidade excepcional.', date: '2 dias atrás' },
                  { name: 'Pedro Santos', rating: 5, comment: 'Muito competente e comunicativo. Recomendo!', date: '1 semana atrás' },
                  { name: 'Ana Costa', rating: 4, comment: 'Bom trabalho, apenas alguns ajustes foram necessários.', date: '2 semanas atrás' }
                ].map((review, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm text-gray-900">{review.name}</h4>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => navigate('/reviews')}
                  className="w-full py-3 text-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  Ver todas as avaliações
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-gray-900">Conquistas Recentes</h3>
            <button 
              onClick={() => navigate('/achievements')}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Ver todas
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {mockBadges.filter(b => b.earned).slice(0, 4).map(badge => (
              <div key={badge.id} className="flex flex-col items-center gap-1.5">
                <div className={`w-12 h-12 ${badge.color} rounded-2xl flex items-center justify-center`}>
                  {badge.icon === 'award' && <Award className="w-6 h-6 text-white" />}
                  {badge.icon === 'star' && <Star className="w-6 h-6 text-white" />}
                  {badge.icon === 'zap' && <Trophy className="w-6 h-6 text-white" />}
                </div>
                <span className="text-xs text-gray-700 text-center line-clamp-1">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handleMenuClick('portfolio')}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 rounded-xl">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-900">Meu Portfólio</span>
            </div>
          </button>

          <button 
            onClick={() => handleMenuClick('favorites')}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-pink-50 rounded-xl">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-sm text-gray-900">Favoritos</span>
            </div>
          </button>

          <button 
            onClick={() => handleMenuClick('achievements')}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-yellow-50 rounded-xl">
                <Trophy className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-900">Conquistas</span>
            </div>
          </button>

          <button 
            onClick={() => handleMenuClick('referral')}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 rounded-xl">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm text-gray-900">Indicar Amigos</span>
            </div>
          </button>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => handleMenuClick('settings')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-900">Configurações</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => handleMenuClick('notifications')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-xl">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-900">Notificações</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => handleMenuClick('privacy')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-xl">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-900">Privacidade e Segurança</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => handleMenuClick('help')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-xl">
                <HelpCircle className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-900">Central de Ajuda</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => handleMenuClick('logout')}
            className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-xl">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-red-600">Sair da conta</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* App Version */}
        <div className="text-center text-xs text-gray-500 py-4">
          NomadHub v1.0.0 • Made with ❤️ for Digital Nomads
        </div>
      </div>
    </div>
  );
}