import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { 
  FileText, 
  MessageSquare, 
  Paperclip, 
  CheckSquare, 
  Clock,
  DollarSign,
  User,
  AlertTriangle,
  Send,
  Download,
  Upload
} from 'lucide-react';
import { Button } from '../components/ui/button';

type Tab = 'scope' | 'chat' | 'attachments' | 'deliveries';

export function ContractDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<Tab>('scope');
  const [message, setMessage] = useState('');

  // Mock data
  const contract = {
    id: id || '1',
    title: 'Desenvolvimento de Landing Page',
    client: 'Tech Startup Inc.',
    freelancer: 'João Silva',
    value: 3500,
    deadline: '2025-01-15',
    status: 'in_progress' as const,
    description: 'Desenvolvimento de uma landing page moderna e responsiva com foco em conversão. Incluindo design, desenvolvimento front-end e integração com formulário de contato.',
    requirements: [
      'Design responsivo para mobile e desktop',
      'Integração com API de e-mail',
      'Otimização para SEO',
      'Tempo de carregamento < 3 segundos'
    ],
    deliveries: [
      { id: 1, title: 'Design aprovado', status: 'completed', date: '2025-01-05' },
      { id: 2, title: 'Desenvolvimento front-end', status: 'in_progress', date: null },
      { id: 3, title: 'Testes e ajustes finais', status: 'pending', date: null }
    ],
    attachments: [
      { id: 1, name: 'briefing.pdf', size: '2.4 MB', date: '2025-01-01' },
      { id: 2, name: 'logo.png', size: '156 KB', date: '2025-01-01' },
      { id: 3, name: 'wireframe.fig', size: '8.1 MB', date: '2025-01-03' }
    ],
    messages: [
      { id: 1, sender: 'client', text: 'Olá! Quando podemos começar?', time: '10:30' },
      { id: 2, sender: 'freelancer', text: 'Oi! Posso começar hoje mesmo. Vou revisar o briefing e te mando um plano.', time: '10:45' },
      { id: 3, sender: 'client', text: 'Perfeito! Aguardo.', time: '10:47' }
    ]
  };

  const tabs = [
    { id: 'scope' as Tab, label: 'Escopo', icon: FileText },
    { id: 'chat' as Tab, label: 'Chat', icon: MessageSquare },
    { id: 'attachments' as Tab, label: 'Anexos', icon: Paperclip },
    { id: 'deliveries' as Tab, label: 'Entregas', icon: CheckSquare }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'pending': return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in_progress': return 'Em andamento';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Detalhes do Contrato" showBack />

      {/* Contract Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-gray-900 dark:text-white mb-4">{contract.title}</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">Valor</p>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-gray-900 dark:text-white">R$ {contract.value.toFixed(2)}</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">Prazo</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-900 dark:text-white">{contract.deadline}</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">Cliente</p>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-900 dark:text-white">{contract.client}</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">Status</p>
              <span className={`inline-flex items-center px-2 py-1 rounded-lg text-sm ${getStatusColor(contract.status)}`}>
                {getStatusLabel(contract.status)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(`/dispute/new/${contract.id}`)}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Abrir Disputa
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              onClick={() => navigate(`/delivery/${contract.id}`)}
            >
              <Upload className="w-4 h-4 mr-2" />
              Enviar Entrega
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex gap-2 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {activeTab === 'scope' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="text-gray-900 dark:text-white mb-3">Descrição do Projeto</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {contract.description}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Requisitos</h3>
              <ul className="space-y-2">
                {contract.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            {/* Messages */}
            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
              {contract.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'freelancer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'freelancer'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="mb-1">{msg.text}</p>
                    <span className={`text-xs ${
                      msg.sender === 'freelancer' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={() => setMessage('')}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attachments' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 dark:text-white">Arquivos do Projeto</h3>
              <Button size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>

            {contract.attachments.map(file => (
              <div
                key={file.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Paperclip className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 dark:text-white truncate">{file.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {file.size} • {file.date}
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'deliveries' && (
          <div className="space-y-4">
            {contract.deliveries.map(delivery => (
              <div
                key={delivery.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getStatusColor(delivery.status)}`}>
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-gray-900 dark:text-white">{delivery.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(delivery.status)}`}>
                        {getStatusLabel(delivery.status)}
                      </span>
                    </div>
                    {delivery.date && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Concluído em {delivery.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
