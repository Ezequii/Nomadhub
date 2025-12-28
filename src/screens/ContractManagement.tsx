import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { EscrowFlow } from '../components/EscrowFlow';
import { DeliveryChecklist } from '../components/DeliveryChecklist';
import { api } from '../api/client';
import { ArrowLeft, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import type { Contract, Delivery, EscrowStatus } from '../types';

export function ContractManagement() {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();

  const [contract, setContract] = useState<Contract | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDelivery, setShowDelivery] = useState(false);

  useEffect(() => {
    if (contractId) {
      loadContract();
      loadDeliveries();
    }
  }, [contractId]);

  const loadContract = async () => {
    try {
      // Mock - em produção viria da API
      const mockContract: Contract = {
        id: contractId!,
        proposalId: '1',
        escrowStatus: 'funded' as EscrowStatus,
        createdAt: new Date().toISOString()
      };
      setContract(mockContract);
    } catch (error) {
      console.error('Error loading contract:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDeliveries = async () => {
    try {
      const data = await api.getDeliveries(contractId!);
      setDeliveries(data);
    } catch (error) {
      console.error('Error loading deliveries:', error);
    }
  };

  const handleFund = async (contractId: string, method: 'pix' | 'paypal' | 'crypto') => {
    try {
      const updated = await api.fundEscrow(contractId, {
        clientId: '1', // Mock
        amount: 8500,
        currency: 'BRL',
        paymentMethod: method
      });
      setContract(updated);
    } catch (error) {
      console.error('Error funding escrow:', error);
    }
  };

  const handleRelease = async (contractId: string) => {
    try {
      const updated = await api.releaseEscrow(contractId, { clientAccept: true });
      setContract(updated);
    } catch (error) {
      console.error('Error releasing escrow:', error);
    }
  };

  const handleRefund = async (contractId: string) => {
    try {
      const updated = await api.refundEscrow(contractId);
      setContract(updated);
    } catch (error) {
      console.error('Error refunding escrow:', error);
    }
  };

  const handleDeliverySubmit = async (data: { checklist: Record<string, boolean>; files?: any[]; notes?: string }) => {
    try {
      await api.createDelivery(contractId!, data);
      setShowDelivery(false);
      loadDeliveries();
    } catch (error) {
      console.error('Error creating delivery:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-gray-600">Carregando contrato...</div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-gray-600">Contrato não encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Gerenciar Contrato" />
      
      <div className="px-4 py-6 max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        {/* Contract Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Contrato #{contract.id.slice(0, 8)}</h2>
            <span className={`px-3 py-1 rounded-full text-xs ${
              contract.escrowStatus === 'funded' ? 'bg-blue-100 text-blue-700' :
              contract.escrowStatus === 'released' ? 'bg-green-100 text-green-700' :
              contract.escrowStatus === 'refunded' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {contract.escrowStatus}
            </span>
          </div>
          {contract.dueDate && (
            <p className="text-sm text-gray-600">
              Prazo: {new Date(contract.dueDate).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>

        {/* Escrow Management */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">Gerenciamento de Escrow</h3>
          <EscrowFlow
            contractId={contract.id}
            amount={8500}
            currency="BRL"
            currentStatus={contract.escrowStatus}
            onFund={handleFund}
            onRelease={handleRelease}
            onRefund={handleRefund}
          />
        </div>

        {/* Deliveries */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Entregas</h3>
            {contract.escrowStatus === 'funded' && !showDelivery && (
              <button
                onClick={() => setShowDelivery(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Package className="w-4 h-4" />
                <span>Nova Entrega</span>
              </button>
            )}
          </div>

          {showDelivery ? (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="text-gray-900 mb-4">Criar Nova Entrega</h4>
              <DeliveryChecklist
                items={[
                  { id: '1', label: 'Wireframes', completed: false },
                  { id: '2', label: 'Protótipo interativo', completed: false },
                  { id: '3', label: 'Código fonte', completed: false },
                  { id: '4', label: 'Testes', completed: false },
                  { id: '5', label: 'Documentação', completed: false }
                ]}
                onUpdate={(items) => {
                  const checklist = items.reduce((acc, item) => ({
                    ...acc,
                    [item.label]: item.completed
                  }), {});
                  handleDeliverySubmit({ checklist });
                }}
              />
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setShowDelivery(false)}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    handleDeliverySubmit({
                      checklist: { wireframes: true, prototype: true }
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Enviar Entrega
                </button>
              </div>
            </div>
          ) : deliveries.length > 0 ? (
            <div className="space-y-3">
              {deliveries.map(delivery => (
                <div key={delivery.id} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">
                      {new Date(delivery.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    {delivery.accepted ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Aceita
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                        Pendente
                      </span>
                    )}
                  </div>
                  {delivery.notes && (
                    <p className="text-sm text-gray-700 mb-2">{delivery.notes}</p>
                  )}
                  {delivery.files && delivery.files.length > 0 && (
                    <div className="text-sm text-gray-600">
                      {delivery.files.length} arquivo(s) anexado(s)
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Nenhuma entrega registrada</p>
            </div>
          )}
        </div>

        {/* Dispute */}
        {contract.escrowStatus === 'funded' && (
          <div className="mb-6">
            <button
              onClick={() => navigate(`/contracts/${contract.id}/dispute`)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Abrir ou Ver Disputa</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}