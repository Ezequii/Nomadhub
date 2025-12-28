import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Filter, 
  Download, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  AlertCircle,
  Calendar,
  Globe,
  CreditCard
} from 'lucide-react';
import { api } from '../api/client';
import type { Transaction, TransactionType } from '../types';

type Period = 'monthly' | 'quarterly' | 'yearly';
type Country = 'BR' | 'PT';

interface CategorySummary {
  earnings: number;
  fees: number;
  withdrawals: number;
  balance: number;
}

export function FiscalReports() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState<'pdf' | 'csv' | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<CategorySummary>({
    earnings: 0,
    fees: 0,
    withdrawals: 0,
    balance: 0
  });

  // Filtros
  const [country, setCountry] = useState<Country>('BR');
  const [period, setPeriod] = useState<Period>('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, period, selectedMonth, selectedYear]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    const filtered = transactions.filter(tx => {
      const txDate = new Date(tx.createdAt);
      const txYear = txDate.getFullYear();
      const txMonth = txDate.getMonth();
      const txQuarter = Math.floor(txMonth / 3);
      const selectedQuarter = Math.floor(selectedMonth / 3);

      if (period === 'monthly') {
        return txYear === selectedYear && txMonth === selectedMonth;
      } else if (period === 'quarterly') {
        return txYear === selectedYear && txQuarter === selectedQuarter;
      } else {
        return txYear === selectedYear;
      }
    });

    setFilteredTransactions(filtered);
    calculateSummary(filtered);
  };

  const calculateSummary = (txs: Transaction[]) => {
    const earnings = txs
      .filter(tx => tx.type === 'payout' || tx.type === 'deposit')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const fees = txs
      .filter(tx => tx.type === 'fee')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const withdrawals = txs
      .filter(tx => tx.type === 'withdraw')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const balance = earnings - fees - withdrawals;

    setSummary({ earnings, fees, withdrawals, balance });
  };

  const handleExportPDF = async () => {
    setExporting('pdf');
    try {
      await api.generateFiscalReport({
        userId: '1',
        country,
        from: new Date(selectedYear, selectedMonth, 1).toISOString(),
        to: new Date(selectedYear, selectedMonth + 1, 0).toISOString(),
        format: 'pdf'
      });
      alert('Relatório PDF gerado com sucesso!');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Erro ao gerar relatório PDF');
    } finally {
      setExporting(null);
    }
  };

  const handleExportCSV = async () => {
    setExporting('csv');
    try {
      await api.generateFiscalReport({
        userId: '1',
        country,
        from: new Date(selectedYear, selectedMonth, 1).toISOString(),
        to: new Date(selectedYear, selectedMonth + 1, 0).toISOString(),
        format: 'csv'
      });
      alert('Relatório CSV gerado com sucesso!');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Erro ao gerar relatório CSV');
    } finally {
      setExporting(null);
    }
  };

  const formatCurrency = (value: number) => {
    const locale = country === 'BR' ? 'pt-BR' : 'pt-PT';
    const currency = country === 'BR' ? 'BRL' : 'EUR';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'payout':
      case 'deposit':
        return TrendingUp;
      case 'withdraw':
        return TrendingDown;
      case 'fee':
        return CreditCard;
      default:
        return DollarSign;
    }
  };

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case 'payout':
      case 'deposit':
        return 'text-green-600 dark:text-green-400';
      case 'withdraw':
      case 'fee':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTransactionLabel = (type: TransactionType) => {
    const labels: Record<TransactionType, string> = {
      deposit: 'Depósito',
      payout: 'Pagamento Recebido',
      withdraw: 'Saque',
      fee: 'Taxa'
    };
    return labels[type];
  };

  const getPeriodLabel = () => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    if (period === 'monthly') {
      return `${months[selectedMonth]} ${selectedYear}`;
    } else if (period === 'quarterly') {
      const quarter = Math.floor(selectedMonth / 3) + 1;
      return `${quarter}º Trimestre ${selectedYear}`;
    } else {
      return `Ano ${selectedYear}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-screen-xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-gray-900 dark:text-white">Relatórios Fiscais</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-gray-900 dark:text-white">Filtros</h2>
          </div>

          <div className="space-y-4">
            {/* Country Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Globe className="w-4 h-4" />
                País
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCountry('BR')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    country === 'BR'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  🇧🇷 Brasil
                </button>
                <button
                  onClick={() => setCountry('PT')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    country === 'PT'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  🇵🇹 Portugal
                </button>
              </div>
            </div>

            {/* Period Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Calendar className="w-4 h-4" />
                Período
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPeriod('monthly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    period === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setPeriod('quarterly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    period === 'quarterly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Trimestral
                </button>
                <button
                  onClick={() => setPeriod('yearly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    period === 'yearly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Anual
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-3">
              {period !== 'yearly' && (
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
                    {period === 'monthly' ? 'Mês' : 'Trimestre'}
                  </label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {period === 'monthly' ? (
                      <>
                        <option value={0}>Janeiro</option>
                        <option value={1}>Fevereiro</option>
                        <option value={2}>Março</option>
                        <option value={3}>Abril</option>
                        <option value={4}>Maio</option>
                        <option value={5}>Junho</option>
                        <option value={6}>Julho</option>
                        <option value={7}>Agosto</option>
                        <option value={8}>Setembro</option>
                        <option value={9}>Outubro</option>
                        <option value={10}>Novembro</option>
                        <option value={11}>Dezembro</option>
                      </>
                    ) : (
                      <>
                        <option value={0}>1º Trimestre (Jan-Mar)</option>
                        <option value={3}>2º Trimestre (Abr-Jun)</option>
                        <option value={6}>3º Trimestre (Jul-Set)</option>
                        <option value={9}>4º Trimestre (Out-Dez)</option>
                      </>
                    )}
                  </select>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Ano</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={2025}>2025</option>
                  <option value={2024}>2024</option>
                  <option value={2023}>2023</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-blue-100 mb-1">Período Selecionado</p>
              <h2>{getPeriodLabel()}</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-blue-100">Ganhos</span>
              </div>
              <p>{formatCurrency(summary.earnings)}</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4" />
                <span className="text-blue-100">Taxas</span>
              </div>
              <p>{formatCurrency(summary.fees)}</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4" />
                <span className="text-blue-100">Saques</span>
              </div>
              <p>{formatCurrency(summary.withdrawals)}</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-blue-100">Saldo Final</span>
              </div>
              <p>{formatCurrency(summary.balance)}</p>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-900 dark:text-white">
              Transações ({filteredTransactions.length})
            </h3>
          </div>

          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map((tx) => {
                const Icon = getTransactionIcon(tx.type);
                const isPositive = tx.amount > 0 || tx.type === 'payout' || tx.type === 'deposit';
                
                return (
                  <div key={tx.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isPositive 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}>
                        <Icon className={`w-5 h-5 ${getTransactionColor(tx.type)}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <p className="text-gray-900 dark:text-white">
                              {tx.meta?.description || getTransactionLabel(tx.type)}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                              {getTransactionLabel(tx.type)}
                            </p>
                          </div>
                          <p className={`text-right ${getTransactionColor(tx.type)}`}>
                            {isPositive ? '+' : ''}{formatCurrency(tx.amount)}
                          </p>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                          {formatDate(tx.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                Nenhuma transação encontrada neste período
              </p>
            </div>
          )}
        </div>

        {/* Export Buttons */}
        {filteredTransactions.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleExportPDF}
              disabled={exporting !== null}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
            >
              {exporting === 'pdf' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Exportando...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Exportar PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handleExportCSV}
              disabled={exporting !== null}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
            >
              {exporting === 'csv' ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-900 dark:border-white border-t-transparent rounded-full animate-spin" />
                  <span>Exportando...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Exportar CSV</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Warning Message */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-yellow-900 dark:text-yellow-300 mb-1">
                Aviso Importante
              </h4>
              <p className="text-yellow-800 dark:text-yellow-400">
                Este relatório é apenas informativo e serve como base para sua contabilidade. 
                Recomendamos que você consulte um contador especializado para garantir o 
                cumprimento de todas as obrigações fiscais do seu país.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-900 dark:text-blue-300 mb-1">
                Sobre os Relatórios
              </h4>
              <p className="text-blue-800 dark:text-blue-400">
                Os relatórios incluem todas as transações do período selecionado: pagamentos recebidos, 
                taxas da plataforma e saques realizados. Você pode exportar em PDF para impressão ou 
                CSV para análise em planilhas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}