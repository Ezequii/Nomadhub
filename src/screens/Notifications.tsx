import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle,
  DollarSign,
  AlertTriangle,
  MessageSquare,
  Bell,
  Trash2,
  CheckCheck,
  ArrowLeft,
  FileCheck,
  Shield,
  Info,
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react';

type NotificationType = 
  | 'proposal_accepted'
  | 'payment_received'
  | 'delivery_approved'
  | 'dispute_opened'
  | 'dispute_resolved'
  | 'system_message'
  | 'review_received'
  | 'milestone_completed'
  | 'event_reminder';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata?: {
    projectId?: string;
    contractId?: string;
    disputeId?: string;
    amount?: number;
    currency?: string;
  };
}

export function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [swipedId, setSwipedId] = useState<string | null>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    // Mock data - em produção viria da API
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'payment_received',
        title: 'Pagamento recebido',
        message: 'Você recebeu R$ 5.200,00 pelo projeto "App Mobile"',
        read: false,
        createdAt: new Date(Date.now() - 300000).toISOString(),
        metadata: {
          amount: 5200,
          currency: 'BRL',
          projectId: '123'
        }
      },
      {
        id: '2',
        type: 'proposal_accepted',
        title: 'Proposta aceita',
        message: 'Sua proposta para "Design UI/UX" foi aceita pelo cliente',
        read: false,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        metadata: {
          projectId: '124'
        }
      },
      {
        id: '3',
        type: 'delivery_approved',
        title: 'Entrega aprovada',
        message: 'O cliente aprovou sua entrega do projeto "Website Corporativo"',
        read: true,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        metadata: {
          projectId: '125',
          contractId: '1'
        }
      },
      {
        id: '4',
        type: 'dispute_opened',
        title: 'Disputa iniciada',
        message: 'Uma disputa foi aberta para o contrato #12345',
        read: false,
        createdAt: new Date(Date.now() - 10800000).toISOString(),
        metadata: {
          contractId: '1',
          disputeId: '1'
        }
      },
      {
        id: '5',
        type: 'review_received',
        title: 'Nova avaliação',
        message: 'Você recebeu uma avaliação 5 estrelas de Maria Santos',
        read: true,
        createdAt: new Date(Date.now() - 14400000).toISOString()
      },
      {
        id: '6',
        type: 'milestone_completed',
        title: 'Marco atingido',
        message: 'Parabéns! Você completou 10 projetos com sucesso',
        read: true,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '7',
        type: 'system_message',
        title: 'Atualização dos Termos',
        message: 'Atualizamos nossos Termos de Serviço. Por favor, revise as mudanças.',
        read: true,
        createdAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: '8',
        type: 'event_reminder',
        title: 'Lembrete de evento',
        message: 'O evento "Encontro Nômade SP" começa amanhã às 19h',
        read: true,
        createdAt: new Date(Date.now() - 259200000).toISOString()
      }
    ];
    setNotifications(mockNotifications);
    setLoading(false);
  };

  const getNotificationIcon = (type: NotificationType) => {
    const iconClass = 'w-6 h-6';
    switch (type) {
      case 'proposal_accepted':
        return <CheckCircle className={`${iconClass} text-green-600 dark:text-green-400`} />;
      case 'payment_received':
        return <DollarSign className={`${iconClass} text-green-600 dark:text-green-400`} />;
      case 'delivery_approved':
        return <FileCheck className={`${iconClass} text-blue-600 dark:text-blue-400`} />;
      case 'dispute_opened':
        return <AlertTriangle className={`${iconClass} text-orange-600 dark:text-orange-400`} />;
      case 'dispute_resolved':
        return <Shield className={`${iconClass} text-green-600 dark:text-green-400`} />;
      case 'system_message':
        return <Info className={`${iconClass} text-blue-600 dark:text-blue-400`} />;
      case 'review_received':
        return <Star className={`${iconClass} text-yellow-600 dark:text-yellow-400`} />;
      case 'milestone_completed':
        return <TrendingUp className={`${iconClass} text-purple-600 dark:text-purple-400`} />;
      case 'event_reminder':
        return <Calendar className={`${iconClass} text-blue-600 dark:text-blue-400`} />;
      default:
        return <Bell className={`${iconClass} text-gray-600 dark:text-gray-400`} />;
    }
  };

  const getNotificationBgColor = (type: NotificationType) => {
    switch (type) {
      case 'proposal_accepted':
      case 'payment_received':
      case 'dispute_resolved':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'delivery_approved':
      case 'system_message':
      case 'event_reminder':
        return 'bg-blue-100 dark:bg-blue-900/30';
      case 'dispute_opened':
        return 'bg-orange-100 dark:bg-orange-900/30';
      case 'review_received':
        return 'bg-yellow-100 dark:bg-yellow-900/30';
      case 'milestone_completed':
        return 'bg-purple-100 dark:bg-purple-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);

    // Navegar para a tela apropriada baseado no tipo
    if (notification.metadata?.projectId) {
      navigate(`/projects/${notification.metadata.projectId}`);
    } else if (notification.metadata?.disputeId) {
      navigate(`/contracts/${notification.metadata.contractId}/dispute`);
    } else if (notification.type === 'payment_received') {
      navigate('/wallet');
    } else if (notification.type === 'review_received') {
      navigate('/reviews');
    } else if (notification.type === 'event_reminder') {
      navigate('/nomad');
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    if (confirm('Deseja realmente limpar todas as notificações?')) {
      setNotifications([]);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando notificações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-gray-900 dark:text-white">Notificações</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {unreadCount} não {unreadCount === 1 ? 'lida' : 'lidas'}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Marcar todas como lidas"
              >
                <CheckCheck className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Limpar todas"
              >
                <Trash2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {notifications.length > 0 ? (
          <div className="space-y-2">
            <AnimatePresence>
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(event, info) => {
                    if (Math.abs(info.offset.x) > 100) {
                      setSwipedId(notification.id);
                      setTimeout(() => {
                        deleteNotification(notification.id);
                        setSwipedId(null);
                      }, 200);
                    }
                  }}
                  className="relative"
                >
                  {/* Swipe background */}
                  <div className="absolute inset-0 bg-red-500 dark:bg-red-600 rounded-xl flex items-center justify-end px-6">
                    <Trash2 className="w-6 h-6 text-white" />
                  </div>

                  {/* Notification card */}
                  <div
                    onClick={() => handleNotificationClick(notification)}
                    className={`relative bg-white dark:bg-gray-800 border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow ${
                      notification.read
                        ? 'border-gray-200 dark:border-gray-700'
                        : 'border-blue-300 dark:border-blue-700 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full ${getNotificationBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`${notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDate(notification.createdAt)}
                          </span>
                          {notification.metadata?.amount && (
                            <span className="text-sm text-green-600 dark:text-green-400">
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: notification.metadata.currency || 'BRL'
                              }).format(notification.metadata.amount)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Swipe action buttons */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm"
                        >
                          <CheckCheck className="w-4 h-4" />
                          Marcar como lida
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-gray-900 dark:text-white mb-2">Nenhuma notificação</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Você está em dia! Quando houver novidades,<br />elas aparecerão aqui.
            </p>
          </div>
        )}

        {/* Info text */}
        {notifications.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Deslize para a direita para excluir uma notificação
            </p>
          </div>
        )}
      </div>
    </div>
  );
}