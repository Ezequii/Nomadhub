import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Building2, Smartphone, Plus, Trash2, Check, Shield, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/Toast';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'pix';
  name: string;
  details: string;
  isDefault: boolean;
  lastUsed?: string;
}

export function PaymentMethods() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Mastercard',
      details: '**** 4532',
      isDefault: true,
      lastUsed: '2024-12-20'
    },
    {
      id: '2',
      type: 'bank',
      name: 'Banco do Brasil',
      details: 'Ag: 1234 CC: ****-5',
      isDefault: false,
      lastUsed: '2024-12-15'
    },
    {
      id: '3',
      type: 'pix',
      name: 'Chave PIX',
      details: 'seu****@email.com',
      isDefault: false
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState<'card' | 'bank' | 'pix'>('card');

  const handleSetDefault = (id: string) => {
    setMethods(methods.map(m => ({ ...m, isDefault: m.id === id })));
    toast({ title: 'Método padrão atualizado!', variant: 'success' });
  };

  const handleDelete = (id: string) => {
    const method = methods.find(m => m.id === id);
    if (method?.isDefault) {
      toast({ title: 'Não é possível remover o método padrão', variant: 'destructive' });
      return;
    }
    setMethods(methods.filter(m => m.id !== id));
    toast({ title: 'Método removido com sucesso', variant: 'success' });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard className="w-5 h-5" />;
      case 'bank': return <Building2 className="w-5 h-5" />;
      case 'pix': return <Smartphone className="w-5 h-5" />;
      default: return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 dark:text-white">Métodos de Pagamento</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie suas formas de recebimento</p>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Security Notice */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-blue-900 dark:text-blue-100 mb-1">Seus dados estão seguros</h3>
              <p className="text-blue-700 dark:text-blue-300">
                Utilizamos criptografia de ponta para proteger suas informações financeiras.
              </p>
            </div>
          </div>
        </div>

        {/* Add New Method Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl flex items-center justify-center gap-2 min-h-[56px] hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Adicionar Novo Método
        </button>

        {/* Payment Methods List */}
        <div className="space-y-3">
          <h2 className="text-gray-900 dark:text-white px-1">Métodos Cadastrados</h2>
          
          {methods.map((method) => (
            <motion.div
              key={method.id}
              layout
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  method.type === 'card' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                  method.type === 'bank' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                  'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                }`}>
                  {getIcon(method.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-gray-900 dark:text-white">{method.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{method.details}</p>
                      {method.lastUsed && (
                        <p className="text-gray-500 dark:text-gray-500 mt-1">
                          Usado em {new Date(method.lastUsed).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                    
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Padrão
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    {!method.isDefault && (
                      <Button
                        onClick={() => handleSetDefault(method.id)}
                        variant="outline"
                        className="flex-1"
                      >
                        Tornar Padrão
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(method.id)}
                      variant="outline"
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Method Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-gray-900 dark:text-white mb-4">Adicionar Método de Pagamento</h3>
              
              <div className="space-y-4">
                {/* Type Selection */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedType('card')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedType === 'card'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-gray-900 dark:text-white">Cartão</p>
                  </button>
                  <button
                    onClick={() => setSelectedType('bank')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedType === 'bank'
                        ? 'border-green-600 bg-green-50 dark:bg-green-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Building2 className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-gray-900 dark:text-white">Banco</p>
                  </button>
                  <button
                    onClick={() => setSelectedType('pix')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedType === 'pix'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-gray-900 dark:text-white">PIX</p>
                  </button>
                </div>

                {/* Form based on type */}
                {selectedType === 'card' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Número do cartão"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Nome no cartão"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                )}

                {selectedType === 'bank' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nome do banco"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Agência"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Conta"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                )}

                {selectedType === 'pix' && (
                  <div className="space-y-3">
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                      <option>CPF/CNPJ</option>
                      <option>E-mail</option>
                      <option>Telefone</option>
                      <option>Chave Aleatória</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Digite sua chave PIX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button onClick={() => setShowAddModal(false)} variant="outline" className="flex-1">
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      toast({ title: 'Método adicionado com sucesso!', variant: 'success' });
                      setShowAddModal(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
