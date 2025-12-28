import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BalanceCard } from '../components/BalanceCard';
import { FinancialChart } from '../components/FinancialChart';
import { FeeCalculator } from '../components/FeeCalculator';
import { Button } from '../components/ui/button';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Download, 
  CreditCard,
  AlertCircle,
  Crown,
  TrendingDown,
  Receipt,
  Info
} from 'lucide-react';
import { api, type Transaction } from '../api/client';

export function Wallet() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(2500); // Saldo em processamento
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'received' | 'sent'>('all');
  const [isPro, setIsPro] = useState(false); // Estado do plano

  useEffect(() => {
    const loadWalletData = async () => {
      try {
        const [balanceData, transactionsData] = await Promise.all([
          api.getBalance(),
          api.getTransactions()
        ]);
        setBalance(balanceData);
        setTransactions(transactionsData);
        
        // Check if user is Pro
        const userPlan = localStorage.getItem('nomadhub-user-plan');
        setIsPro(userPlan === 'pro' || userPlan === 'corporate');
      } catch (error) {
        console.error('Error loading wallet data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWalletData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(value));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payout':
      case 'deposit':
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case 'withdraw':
      case 'fee':
        return <ArrowUpRight className="w-5 h-5 text-red-600" />;
      default:
        return <ArrowDownLeft className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const filteredTransactions = transactions.filter(t => {
    if (activeTab === 'all') return true;
    if (activeTab === 'received') return t.type === 'received' || t.type === 'deposit';
    if (activeTab === 'sent') return t.type === 'withdrawal' || t.type === 'payment';
    return true;
  });

  // Mock chart data
  const chartData = [
    { name: 'Out', value: 12500 },
    { name: 'Nov', value: 18200 },
    { name: 'Dez', value: 15400 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-gray-600">Carregando carteira...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Carteira" />
      
      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Balance Card */}
        <div className="mb-6">
          <BalanceCard balance={balance} />
        </div>

        {/* Pending Balance Alert */}
        {pendingBalance > 0 && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4">
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-yellow-900 dark:text-yellow-100 mb-1">Saldo em Processamento</h3>
                <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                  R$ {pendingBalance.toFixed(2)} será liberado após conclusão dos projetos
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900 dark:text-white">Métodos de Pagamento</h3>
            <button
              onClick={() => navigate('/payment-methods')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Gerenciar
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => navigate('/payment-methods')}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Pix</span>
            </button>
            
            <button
              onClick={() => navigate('/payment-methods')}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Cartão</span>
            </button>
            
            <button
              onClick={() => navigate('/payment-methods')}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Banco</span>
            </button>
          </div>
        </div>

        {/* Financial Chart */}
        <div className="mb-6">
          <FinancialChart 
            data={chartData} 
            type="line" 
            color="#3B82F6"
            title="Receita Mensal"
          />
        </div>

        {/* Fee Calculator */}
        <div className="mb-6">
          <FeeCalculator amount={5000} isPro={isPro} />
        </div>

        {/* Banner Pro (if not Pro) */}
        {!isPro && (
          <div 
            onClick={() => navigate('/pricing')}
            className="mb-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-1">
                  Economize com taxas reduzidas
                </h4>
                <p className="text-yellow-100 text-sm mb-3">
                  Plano Pro: de 9% para 6% em todas as transações
                </p>
                <Button
                  className="bg-white text-yellow-600 hover:bg-yellow-50 text-sm h-9"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Ver Plano Pro
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tax Reports */}
        <div className="mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900">Relatórios Fiscais</h3>
              <button 
                onClick={() => navigate('/fiscal-reports')}
                className="text-blue-600 text-sm hover:text-blue-700"
              >
                Ver todos
              </button>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => navigate('/fiscal-reports')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <h4 className="text-gray-900 text-sm">Relatório Dezembro 2025</h4>
                    <p className="text-xs text-gray-600">Brasil (IRPF)</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">PDF</span>
              </button>
              <button 
                onClick={() => navigate('/fiscal-reports')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <h4 className="text-gray-900 text-sm">Relatório Novembro 2025</h4>
                    <p className="text-xs text-gray-600">Portugal (IRS)</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 -mb-px transition-colors ${
              activeTab === 'all'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab('received')}
            className={`px-4 py-2 -mb-px transition-colors ${
              activeTab === 'received'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Recebidas
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-4 py-2 -mb-px transition-colors ${
              activeTab === 'sent'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Enviadas
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <div
                key={transaction.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-gray-900 truncate">{transaction.description}</h4>
                      <span className={`text-nowrap ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{formatDate(transaction.date)}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(transaction.status)}
                        <span className="capitalize">{transaction.status === 'completed' ? 'Concluída' : transaction.status === 'pending' ? 'Pendente' : 'Falhou'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Nenhuma transação encontrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}