import { useState } from 'react';
import { Header } from '../components/Header';
import { ChatMessage, type Message } from '../components/ChatMessage';
import { DeliveryChecklist, type ChecklistItem } from '../components/DeliveryChecklist';
import { 
  Calendar, 
  DollarSign, 
  User, 
  MessageCircle, 
  FileText, 
  AlertTriangle,
  Send,
  Paperclip,
  CheckCircle
} from 'lucide-react';

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    senderName: 'Maria Santos',
    content: 'Olá! Gostaria de discutir alguns detalhes do projeto.',
    timestamp: '2025-12-28T09:00:00',
    status: 'read',
    isOwn: false
  },
  {
    id: '2',
    senderId: '1',
    senderName: 'João Silva',
    content: 'Claro! Estou à disposição. Qual seria sua dúvida?',
    timestamp: '2025-12-28T09:05:00',
    status: 'read',
    isOwn: true
  },
  {
    id: '3',
    senderId: '2',
    senderName: 'Maria Santos',
    content: 'Preciso que inclua integração com API de pagamento.',
    timestamp: '2025-12-28T09:10:00',
    status: 'read',
    isOwn: false
  }
];

const mockChecklist: ChecklistItem[] = [
  {
    id: '1',
    title: 'Wireframes aprovados',
    description: 'Enviar wireframes para aprovação do cliente',
    completed: true,
    required: true,
    fileUrl: 'https://example.com/wireframes.pdf'
  },
  {
    id: '2',
    title: 'Protótipo funcional',
    description: 'Desenvolver protótipo navegável no Figma',
    completed: true,
    required: true,
    fileUrl: 'https://example.com/prototype.fig'
  },
  {
    id: '3',
    title: 'Código fonte',
    description: 'Entregar código fonte documentado',
    completed: false,
    required: true
  },
  {
    id: '4',
    title: 'Testes de usabilidade',
    description: 'Realizar testes com usuários',
    completed: false,
    required: false
  }
];

export function ProjectDetail() {
  const [activeTab, setActiveTab] = useState<'details' | 'chat' | 'delivery'>('details');
  const [messageInput, setMessageInput] = useState('');

  const project = {
    id: '1',
    title: 'Desenvolvimento de App Mobile',
    description: 'App de delivery com integração de pagamento completo, incluindo carrinho de compras, tracking de pedidos e sistema de avaliações.',
    budget: 8500,
    status: 'in_progress' as const,
    client: 'Maria Santos',
    deadline: '2025-02-15',
    category: 'Desenvolvimento',
    startDate: '2025-01-05',
    progress: 65
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Detalhes do Projeto" />
      
      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Project Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">{project.title}</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Em andamento
            </span>
          </div>

          <p className="text-gray-600 mb-4">{project.description}</p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progresso</span>
              <span className="text-sm text-gray-900">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Project Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">Orçamento</p>
                <p className="text-sm">{formatCurrency(project.budget)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Prazo</p>
                <p className="text-sm">{formatDate(project.deadline)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-600">Cliente</p>
                <p className="text-sm">{project.client}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FileText className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-gray-600">Categoria</p>
                <p className="text-sm">{project.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center justify-center gap-2 text-gray-900">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Finalizar Projeto</span>
          </button>
          <button className="bg-white border border-red-200 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center justify-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <span>Abrir Disputa</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 -mb-px transition-colors ${
              activeTab === 'details'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Detalhes
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 -mb-px transition-colors ${
              activeTab === 'chat'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>Chat</span>
              <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">3</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`px-4 py-2 -mb-px transition-colors ${
              activeTab === 'delivery'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Entrega
          </button>
        </div>

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">Escopo do Projeto</h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <h4 className="text-gray-900 mb-2">Funcionalidades Principais:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Sistema de autenticação de usuários</li>
                  <li>Catálogo de produtos com busca e filtros</li>
                  <li>Carrinho de compras e checkout</li>
                  <li>Integração com gateway de pagamento</li>
                  <li>Tracking de pedidos em tempo real</li>
                  <li>Sistema de avaliações e reviews</li>
                  <li>Notificações push</li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-900 mb-2">Tecnologias:</h4>
                <div className="flex flex-wrap gap-2">
                  {['React Native', 'TypeScript', 'Firebase', 'Stripe'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[600px]">
            <div className="flex-1 bg-white rounded-t-2xl border border-gray-200 p-4 overflow-y-auto">
              {mockMessages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            <div className="bg-white rounded-b-2xl border border-gray-200 border-t-0 p-4">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Tab */}
        {activeTab === 'delivery' && (
          <DeliveryChecklist
            items={mockChecklist}
            onToggle={(itemId) => console.log('Toggle:', itemId)}
            onUpload={(itemId) => console.log('Upload:', itemId)}
            editable={true}
          />
        )}
      </div>
    </div>
  );
}
