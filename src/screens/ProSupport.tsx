import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageSquare, 
  Send,
  Calendar,
  Crown,
  Clock,
  CheckCircle,
  Book,
  Video,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  message: string;
  timestamp: Date;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  lastUpdate: string;
}

export function ProSupport() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'chat' | 'schedule' | 'history' | 'knowledge'>('chat');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'support',
      message: 'Olá! Sou o Lucas, especialista em suporte Pro. Como posso ajudar você hoje?',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [tickets] = useState<SupportTicket[]>([
    {
      id: '1',
      subject: 'Dúvida sobre IA de propostas',
      status: 'resolved',
      createdAt: '2024-12-20',
      lastUpdate: '2024-12-20'
    },
    {
      id: '2',
      subject: 'Integração com plataforma de pagamentos',
      status: 'in_progress',
      createdAt: '2024-12-25',
      lastUpdate: '2024-12-26'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: message,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, userMessage]);
    setMessage('');

    // Simulate support response
    setTimeout(() => {
      const supportMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        message: 'Entendi sua dúvida! Vou te ajudar com isso. Um momento por favor...',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, supportMessage]);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      open: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', label: 'Aberto' },
      in_progress: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', label: 'Em andamento' },
      resolved: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Resolvido' }
    };
    return badges[status as keyof typeof badges] || badges.open;
  };

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
            <h1 className="text-gray-900 dark:text-white">Suporte Pro</h1>
            <p className="text-gray-600 dark:text-gray-400">Atendimento prioritário</p>
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full">
            <Crown className="w-4 h-4" />
            <span className="text-sm">Pro</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
              activeTab === 'chat'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat ao vivo
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
              activeTab === 'schedule'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Agendar
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            Histórico
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
              activeTab === 'knowledge'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <Book className="w-4 h-4" />
            Base de conhecimento
          </button>
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <div>
                  <div className="text-white mb-1">Lucas Silva</div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Online • Tempo médio de resposta: 2 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  } rounded-2xl px-4 py-3`}>
                    <p className="whitespace-pre-wrap">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Enviar"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Agendar onboarding personalizado</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Agende uma sessão individual com um especialista para configurar sua conta, importar projetos e otimizar seu perfil.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de sessão
                </label>
                <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Onboarding geral (30 min)</option>
                  <option>Configuração avançada (1 hora)</option>
                  <option>Consultoria estratégica (1 hora)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Data preferencial
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Horário
                </label>
                <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>09:00 - 10:00</option>
                  <option>10:00 - 11:00</option>
                  <option>14:00 - 15:00</option>
                  <option>15:00 - 16:00</option>
                  <option>16:00 - 17:00</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Observações (opcional)
                </label>
                <textarea
                  placeholder="Descreva brevemente o que gostaria de abordar na sessão..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
                />
              </div>
            </div>

            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]">
              Confirmar agendamento
            </button>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {tickets.map(ticket => {
              const badge = getStatusBadge(ticket.status);
              return (
                <div
                  key={ticket.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-gray-900 dark:text-white mb-2">{ticket.subject}</h4>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <span>Ticket #{ticket.id}</span>
                        <span>•</span>
                        <span>Criado em {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]">
                    Ver detalhes
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Knowledge Base Tab */}
        {activeTab === 'knowledge' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-white mb-2">Vídeos tutoriais</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Aprenda a usar recursos avançados com nossos vídeos exclusivos
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]">
                    Assistir agora
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-white mb-2">Guias avançados</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Documentação detalhada sobre funcionalidades Pro
                  </p>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors min-h-[44px]">
                    Acessar guias
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-white mb-2">Melhores práticas</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Dicas e estratégias de freelancers de sucesso
                  </p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors min-h-[44px]">
                    Ver dicas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <h3 className="text-blue-900 dark:text-blue-100 mb-3">💡 Recursos exclusivos Pro</h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>✓ Chat ao vivo com especialistas (resposta em até 2 minutos)</li>
            <li>✓ Onboarding personalizado por videochamada</li>
            <li>✓ Base de conhecimento avançada com guias e vídeos</li>
            <li>✓ Suporte prioritário via email (resposta em até 4 horas)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
