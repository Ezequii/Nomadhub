import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react';

const monthlyData = [
  { month: 'Jul', ganhos: 4500, projetos: 3 },
  { month: 'Ago', ganhos: 6200, projetos: 4 },
  { month: 'Set', ganhos: 5800, projetos: 5 },
  { month: 'Out', ganhos: 7300, projetos: 6 },
  { month: 'Nov', ganhos: 8100, projetos: 7 },
  { month: 'Dez', ganhos: 9500, projetos: 8 }
];

const categoryData = [
  { name: 'Desenvolvimento', value: 45, color: '#3b82f6' },
  { name: 'Design', value: 30, color: '#8b5cf6' },
  { name: 'Marketing', value: 15, color: '#10b981' },
  { name: 'Consultoria', value: 10, color: '#f59e0b' }
];

const performanceMetrics = [
  {
    label: 'Taxa de Aprovação',
    value: '87%',
    trend: 'up',
    change: '+5%',
    icon: TrendingUp,
    color: 'green'
  },
  {
    label: 'Tempo Médio de Resposta',
    value: '2.3h',
    trend: 'down',
    change: '-0.5h',
    icon: Clock,
    color: 'blue'
  },
  {
    label: 'Ganhos Mensais',
    value: 'R$ 9.5k',
    trend: 'up',
    change: '+17%',
    icon: DollarSign,
    color: 'purple'
  }
];

export function AdvancedAnalytics() {
  const totalGanhos = monthlyData.reduce((acc, curr) => acc + curr.ganhos, 0);
  const avgGanhosMensal = totalGanhos / monthlyData.length;

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  metric.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                  metric.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                  'bg-purple-100 dark:bg-purple-900'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    metric.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    metric.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    'text-purple-600 dark:text-purple-400'
                  }`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${ 
                  isPositive 
                    ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                }`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className="text-gray-900 dark:text-white mb-1">{metric.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{metric.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Monthly Earnings Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-gray-900 dark:text-white mb-1">Ganhos Mensais</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Média: R$ {avgGanhosMensal.toLocaleString('pt-BR')}
            </p>
          </div>
          <select className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white min-h-[44px]">
            <option>Últimos 6 meses</option>
            <option>Últimos 3 meses</option>
            <option>Este ano</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-800" />
            <XAxis 
              dataKey="month" 
              stroke="#9ca3af" 
              className="dark:stroke-gray-400"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#9ca3af" 
              className="dark:stroke-gray-400"
              tick={{ fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#111827'
              }}
              formatter={(value: any) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Ganhos']}
            />
            <Bar dataKey="ganhos" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
      >
        <h3 className="text-gray-900 dark:text-white mb-6">Distribuição por Categoria</h3>
        <div className="flex items-center gap-8">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                </div>
                <span className="text-gray-900 dark:text-white">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}