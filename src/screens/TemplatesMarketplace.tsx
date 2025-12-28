import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  FileText,
  Download,
  Star,
  Heart,
  Eye,
  Crown,
  CheckCircle,
  Lock,
  Zap
} from 'lucide-react';

type TemplateCategory = 'all' | 'proposal' | 'contract' | 'delivery' | 'report';

interface Template {
  id: string;
  title: string;
  description: string;
  category: TemplateCategory;
  language: string;
  downloads: number;
  rating: number;
  isPro: boolean;
  preview: string;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Proposta para Desenvolvimento Web',
    description: 'Template completo para propostas de desenvolvimento web com escopo, cronograma e investimento',
    category: 'proposal',
    language: 'pt-BR',
    downloads: 1245,
    rating: 4.8,
    isPro: false,
    preview: 'Olá! Vi seu projeto e tenho a solução perfeita...'
  },
  {
    id: '2',
    title: 'Contrato de Prestação de Serviços',
    description: 'Modelo de contrato completo com cláusulas de escopo, pagamento, propriedade intelectual e rescisão',
    category: 'contract',
    language: 'pt-BR',
    downloads: 892,
    rating: 4.9,
    isPro: true,
    preview: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS\n\nEntre as partes...'
  },
  {
    id: '3',
    title: 'Relatório de Entrega de Projeto',
    description: 'Template para relatórios finais de projeto com resumo executivo, entregas e recomendações',
    category: 'delivery',
    language: 'pt-BR',
    downloads: 567,
    rating: 4.7,
    isPro: true,
    preview: 'RELATÓRIO DE ENTREGA\n\nProjeto: [Nome do projeto]...'
  },
  {
    id: '4',
    title: 'Proposta para Design de Interface',
    description: 'Template especializado para propostas de UX/UI com pesquisa, wireframes e prototipação',
    category: 'proposal',
    language: 'pt-BR',
    downloads: 734,
    rating: 4.6,
    isPro: false,
    preview: 'Proposta de Design de Interface\n\nObjetivo do projeto...'
  },
  {
    id: '5',
    title: 'Relatório Mensal de Progresso',
    description: 'Modelo de relatório mensal para clientes recorrentes com métricas e próximos passos',
    category: 'report',
    language: 'pt-BR',
    downloads: 421,
    rating: 4.8,
    isPro: true,
    preview: 'RELATÓRIO MENSAL - [Mês/Ano]\n\nResumo Executivo...'
  },
  {
    id: '6',
    title: 'Checklist de Entrega Final',
    description: 'Lista completa de verificação para entregas finais de projetos de desenvolvimento',
    category: 'delivery',
    language: 'pt-BR',
    downloads: 986,
    rating: 4.9,
    isPro: false,
    preview: '✓ Código-fonte completo\n✓ Documentação técnica...'
  }
];

export function TemplatesMarketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const categories = [
    { id: 'all' as TemplateCategory, label: 'Todos', icon: FileText },
    { id: 'proposal' as TemplateCategory, label: 'Propostas', icon: FileText },
    { id: 'contract' as TemplateCategory, label: 'Contratos', icon: FileText },
    { id: 'delivery' as TemplateCategory, label: 'Entregas', icon: CheckCircle },
    { id: 'report' as TemplateCategory, label: 'Relatórios', icon: FileText }
  ];

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleUseTemplate = (template: Template) => {
    // Check if user is Pro
    const userPlan = localStorage.getItem('nomadhub-user-plan');
    const isPro = userPlan === 'pro' || userPlan === 'corporate';
    
    if (template.isPro && !isPro) {
      // Redirect to pricing
      navigate('/pricing');
    } else {
      // Use template
      alert(`Template "${template.title}" copiado! Você pode editar e personalizar.`);
      setSelectedTemplate(null);
    }
  };

  // Check if user is Pro
  const userPlan = localStorage.getItem('nomadhub-user-plan');
  const isUserPro = userPlan === 'pro' || userPlan === 'corporate';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 dark:text-white">Templates</h1>
            <p className="text-gray-600 dark:text-gray-400">Modelos prontos para usar</p>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => {
            const isLocked = template.isPro && !isUserPro;
            
            return (
              <div
                key={template.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow relative ${
                  isLocked ? 'opacity-90' : ''
                }`}
              >
                {/* Lock Overlay for Pro Templates */}
                {isLocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 dark:from-yellow-500/20 dark:to-amber-500/20 rounded-2xl border-2 border-yellow-500/30 dark:border-yellow-500/40 z-10 pointer-events-none">
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
                      <Crown className="w-3 h-3" />
                      <span>Pro</span>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900 dark:text-white">{template.title}</h3>
                      {template.isPro && (
                        <div className="relative group">
                          <Crown className="w-4 h-4 text-yellow-500 cursor-help" />
                          {/* Tooltip */}
                          {isLocked && (
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                              Disponível no Pro
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
                    aria-label={favorites.includes(template.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        favorites.includes(template.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Preview */}
                <div className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 max-h-32 overflow-hidden relative ${
                  isLocked ? 'filter blur-sm' : ''
                }`}>
                  <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {template.preview}
                  </pre>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 dark:from-gray-700 to-transparent" />
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gray-900/80 dark:bg-gray-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">Bloqueado</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{template.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                      {template.language}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors min-h-[44px] flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Visualizar
                  </button>
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]"
                  >
                    Usar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <h3 className="text-gray-900 dark:text-white mb-2">Nenhum template encontrado</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente buscar com outras palavras-chave ou filtros
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {selectedTemplate && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTemplate(null)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-gray-900 dark:text-white">{selectedTemplate.title}</h2>
                  {selectedTemplate.isPro && (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400">{selectedTemplate.description}</p>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <pre className="text-gray-900 dark:text-white whitespace-pre-wrap">
                {selectedTemplate.preview}
              </pre>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleUseTemplate(selectedTemplate)}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]"
              >
                Usar este template
              </button>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors min-h-[44px]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}