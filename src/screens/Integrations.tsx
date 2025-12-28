import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Link as LinkIcon, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ExternalLink,
  Shield,
  Zap
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'productivity' | 'payment' | 'development' | 'automation';
  connected: boolean;
  permissions?: string[];
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'notion',
    name: 'Notion',
    description: 'Sincronize projetos e tarefas automaticamente',
    icon: '📝',
    category: 'productivity',
    connected: false,
    permissions: ['Ler workspaces', 'Criar páginas', 'Atualizar banco de dados']
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Adicione prazos e reuniões ao seu calendário',
    icon: '📅',
    category: 'productivity',
    connected: true,
    permissions: ['Ler eventos', 'Criar eventos']
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Conecte repositórios e acompanhe commits',
    icon: '🐙',
    category: 'development',
    connected: false,
    permissions: ['Ler repositórios', 'Ver commits', 'Criar webhooks']
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Receba pagamentos diretamente na sua conta',
    icon: '💳',
    category: 'payment',
    connected: true,
    permissions: ['Ler saldo', 'Criar payouts']
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automatize workflows com milhares de apps',
    icon: '⚡',
    category: 'automation',
    connected: false,
    permissions: ['Criar zaps', 'Disparar webhooks']
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Receba notificações no seu workspace',
    icon: '💬',
    category: 'productivity',
    connected: false,
    permissions: ['Enviar mensagens', 'Ler canais']
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Importe designs e protótipos para projetos',
    icon: '🎨',
    category: 'development',
    connected: false,
    permissions: ['Ler arquivos', 'Ver comentários']
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Sincronize boards e cartões de tarefas',
    icon: '📋',
    category: 'productivity',
    connected: false,
    permissions: ['Ler boards', 'Criar cartões', 'Mover cartões']
  }
];

export function Integrations() {
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const getCategoryLabel = (category: string) => {
    const labels = {
      productivity: 'Produtividade',
      payment: 'Pagamentos',
      development: 'Desenvolvimento',
      automation: 'Automação'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      productivity: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      payment: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      development: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      automation: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
    };
    return colors[category as keyof typeof colors] || '';
  };

  const handleConnect = (integration: Integration) => {
    if (integration.connected) {
      handleDisconnect(integration.id);
    } else {
      setSelectedIntegration(integration);
      setShowPermissionsModal(true);
    }
  };

  const handleConfirmConnect = async () => {
    if (!selectedIntegration) return;

    setConnecting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIntegrations(prev =>
        prev.map(int =>
          int.id === selectedIntegration.id ? { ...int, connected: true } : int
        )
      );

      setShowPermissionsModal(false);
      setSelectedIntegration(null);
      alert(`${selectedIntegration.name} conectado com sucesso!`);
    } catch (error) {
      console.error('Error connecting:', error);
      alert('Erro ao conectar. Tente novamente.');
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    const integration = integrations.find(int => int.id === integrationId);
    if (!integration) return;

    if (!confirm(`Deseja realmente desconectar ${integration.name}?`)) return;

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));

      setIntegrations(prev =>
        prev.map(int =>
          int.id === integrationId ? { ...int, connected: false } : int
        )
      );

      alert(`${integration.name} desconectado com sucesso!`);
    } catch (error) {
      console.error('Error disconnecting:', error);
      alert('Erro ao desconectar. Tente novamente.');
    }
  };

  const connectedCount = integrations.filter(int => int.connected).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 dark:text-white">Integrações</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {connectedCount} de {integrations.length} conectadas
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-900 dark:text-blue-300 mb-1">
                Automatize sua rotina
              </h4>
              <p className="text-blue-800 dark:text-blue-400">
                Conecte ferramentas externas para sincronizar projetos, receber notificações 
                e automatizar tarefas repetitivas.
              </p>
            </div>
          </div>
        </div>

        {/* Integrations List */}
        <div className="space-y-3">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{integration.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900 dark:text-white">
                          {integration.name}
                        </h3>
                        {integration.connected && (
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {integration.description}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full ${getCategoryColor(integration.category)}`}>
                        {getCategoryLabel(integration.category)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleConnect(integration)}
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors min-h-[44px] ${
                        integration.connected
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      aria-label={integration.connected ? 'Desconectar' : 'Conectar'}
                    >
                      {integration.connected ? (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>Desconectar</span>
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-4 h-4" />
                          <span>Conectar</span>
                        </>
                      )}
                    </button>

                    {integration.connected && (
                      <button
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors min-h-[44px]"
                        aria-label="Ver configurações"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Configurar</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Note */}
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-gray-900 dark:text-white mb-1">
                Suas integrações são seguras
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Todas as conexões são criptografadas e você pode revogar o acesso a qualquer momento. 
                Nunca compartilhamos seus dados sem permissão.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Modal */}
      {showPermissionsModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{selectedIntegration.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white mb-1">
                  Conectar {selectedIntegration.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedIntegration.description}
                </p>
              </div>
            </div>

            {/* Permissions */}
            {selectedIntegration.permissions && selectedIntegration.permissions.length > 0 && (
              <div className="mb-6">
                <h4 className="text-gray-900 dark:text-white mb-3">
                  Permissões necessárias:
                </h4>
                <div className="space-y-2">
                  {selectedIntegration.permissions.map((permission, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warning */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3 mb-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-yellow-800 dark:text-yellow-400">
                  Ao conectar, você permite que o NomadHub acesse dados do {selectedIntegration.name} 
                  conforme as permissões acima.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPermissionsModal(false);
                  setSelectedIntegration(null);
                }}
                disabled={connecting}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 min-h-[48px]"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmConnect}
                disabled={connecting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 min-h-[48px]"
              >
                {connecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Conectando...</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4" />
                    <span>Autorizar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
