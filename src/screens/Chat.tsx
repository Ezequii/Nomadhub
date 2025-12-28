import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Paperclip, MoreVertical, Phone, Video, Image as ImageIcon } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
}

// Mock data
const mockChats: Record<string, { user: ChatUser; messages: Message[] }> = {
  '1': {
    user: {
      id: '2',
      name: 'Maria Santos',
      avatar: undefined,
      online: true
    },
    messages: [
      {
        id: '1',
        senderId: '2',
        text: 'Olá! Vi que você se candidatou ao projeto de desenvolvimento mobile.',
        timestamp: '2025-12-28T10:30:00Z',
        read: true
      },
      {
        id: '2',
        senderId: '1',
        text: 'Sim! Tenho bastante experiência com React Native e já desenvolvi apps similares.',
        timestamp: '2025-12-28T10:32:00Z',
        read: true
      },
      {
        id: '3',
        senderId: '2',
        text: 'Perfeito! Você poderia me enviar alguns exemplos de projetos anteriores?',
        timestamp: '2025-12-28T10:35:00Z',
        read: true
      },
      {
        id: '4',
        senderId: '1',
        text: 'Claro! Vou enviar meu portfólio completo com cases de sucesso.',
        timestamp: '2025-12-28T10:38:00Z',
        read: true
      }
    ]
  }
};

export function Chat() {
  const { chatId = '1' } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockChats[chatId]?.messages || []);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatUser = mockChats[chatId]?.user;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: '1',
      text: message,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!chatUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-gray-900 dark:text-white mb-2">Chat não encontrado</h3>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>

            <div className="relative">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white">{chatUser.name[0]}</span>
              </div>
              {chatUser.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
              )}
            </div>

            <div>
              <h2 className="text-gray-900 dark:text-white">{chatUser.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {chatUser.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-screen-xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((msg, index) => {
            const isOwn = msg.senderId === '1';
            const showAvatar = index === 0 || messages[index - 1].senderId !== msg.senderId;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}
              >
                {!isOwn && (
                  <div className="w-8 h-8">
                    {showAvatar && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white">{chatUser.name[0]}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className={`flex flex-col max-w-[70%] ${isOwn ? 'items-end' : ''}`}>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      isOwn
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 mt-1 px-2">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>

                {isOwn && <div className="w-8" />}
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <ImageIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Digite uma mensagem..."
                className="w-full bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white placeholder:text-gray-500 max-h-32"
                rows={1}
              />
            </div>

            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 rounded-full transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}