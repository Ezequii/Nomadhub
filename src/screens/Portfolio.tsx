import { useState } from 'react';
import { Header } from '../components/Header';
import { Plus, ExternalLink, Heart, Eye, Star, Award, Calendar, Edit, Trash2 } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  projectLink?: string;
  skills: string[];
  completedAt: string;
  featured: boolean;
  views: number;
  likes: number;
}

export function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'App de Delivery Completo',
      description: 'Desenvolvimento de aplicativo mobile completo para delivery de alimentos com sistema de pedidos em tempo real, rastreamento de entregadores via GPS, integração com múltiplos métodos de pagamento (Pix, cartão, dinheiro) e painel administrativo para restaurantes.',
      images: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop'],
      projectLink: 'https://github.com/user/delivery-app',
      skills: ['React Native', 'TypeScript', 'Firebase', 'Google Maps API', 'Stripe'],
      completedAt: '2024-11-15',
      featured: true,
      views: 1234,
      likes: 89
    },
    {
      id: '2',
      title: 'Dashboard Analytics B2B',
      description: 'Plataforma de analytics empresarial com visualizações interativas, relatórios customizáveis, exportação de dados em múltiplos formatos e integração com principais ferramentas de BI do mercado.',
      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'],
      projectLink: 'https://demo-analytics.vercel.app',
      skills: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Recharts'],
      completedAt: '2024-10-28',
      featured: true,
      views: 892,
      likes: 67
    },
    {
      id: '3',
      title: 'E-commerce Sustentável',
      description: 'Loja virtual focada em produtos sustentáveis com sistema de recompensas por compras eco-friendly, calculadora de impacto ambiental, programa de cashback verde e marketplace para pequenos produtores.',
      images: ['https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop'],
      projectLink: undefined,
      skills: ['Next.js', 'Tailwind CSS', 'Stripe', 'Prisma', 'MongoDB'],
      completedAt: '2024-09-10',
      featured: false,
      views: 567,
      likes: 43
    },
    {
      id: '4',
      title: 'Sistema de Gestão Escolar',
      description: 'Plataforma completa para gestão escolar incluindo controle de notas, frequência, comunicação pais-escola, agenda digital, biblioteca virtual e relatórios pedagógicos automatizados.',
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop'],
      skills: ['Vue.js', 'Laravel', 'MySQL', 'WebSockets', 'PDF Generation'],
      completedAt: '2024-08-22',
      featured: false,
      views: 421,
      likes: 31
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredItems = filter === 'featured' 
    ? items.filter(item => item.featured)
    : items;

  const totalViews = items.reduce((sum, item) => sum + item.views, 0);
  const totalLikes = items.reduce((sum, item) => sum + item.likes, 0);

  const toggleFeatured = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
  };

  const deleteItem = (id: string) => {
    if (window.confirm('Deseja realmente excluir este projeto?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Meu Portfólio" />

      <div className="px-4 py-4 max-w-screen-xl mx-auto space-y-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl text-gray-900 mb-1">Portfólio Profissional</h2>
              <p className="text-sm text-gray-600">
                Mostre seus melhores trabalhos
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-100">
            <div className="text-center">
              <Award className="w-5 h-5 text-purple-600 mx-auto mb-2" />
              <div className="text-lg text-gray-900 mb-1">{items.length}</div>
              <div className="text-xs text-gray-600">Projetos</div>
            </div>

            <div className="text-center">
              <Star className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
              <div className="text-lg text-gray-900 mb-1">
                {items.filter(i => i.featured).length}
              </div>
              <div className="text-xs text-gray-600">Destaque</div>
            </div>

            <div className="text-center">
              <Eye className="w-5 h-5 text-blue-600 mx-auto mb-2" />
              <div className="text-lg text-gray-900 mb-1">{totalViews}</div>
              <div className="text-xs text-gray-600">Views</div>
            </div>

            <div className="text-center">
              <Heart className="w-5 h-5 text-red-600 mx-auto mb-2" />
              <div className="text-lg text-gray-900 mb-1">{totalLikes}</div>
              <div className="text-xs text-gray-600">Likes</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-4 py-3 rounded-xl text-sm transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Todos ({items.length})
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`flex-1 px-4 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 ${
              filter === 'featured'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Star className="w-4 h-4" />
            Destaques ({items.filter(i => i.featured).length})
          </button>
        </div>

        {/* Portfolio Grid */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="relative aspect-video bg-gray-200">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.featured && (
                  <div className="absolute top-3 right-3">
                    <div className="px-2.5 py-1 bg-yellow-500 text-white rounded-lg text-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Destaque
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.skills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs">
                      {skill}
                    </span>
                  ))}
                  {item.skills.length > 4 && (
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                      +{item.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {item.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {item.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.completedAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {item.projectLink && (
                    <a
                      href={item.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver Projeto
                    </a>
                  )}
                  <button
                    onClick={() => toggleFeatured(item.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      item.featured 
                        ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${item.featured ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Nenhum projeto no portfólio ainda
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
              <Plus className="w-4 h-4" />
              Adicionar Primeiro Projeto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
