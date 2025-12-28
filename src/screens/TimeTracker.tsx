import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Play, Pause, Square, Clock, Calendar, TrendingUp, Briefcase, DollarSign, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TimeEntry {
  id: string;
  projectId: string;
  projectName: string;
  description: string;
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

export function TimeTracker() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [projects] = useState<Project[]>([
    { id: '1', name: 'App Delivery Mobile', color: '#3b82f6' },
    { id: '2', name: 'Dashboard Analytics', color: '#8b5cf6' },
    { id: '3', name: 'Sistema Chat', color: '#10b981' },
    { id: '4', name: 'E-commerce B2B', color: '#f59e0b' }
  ]);

  const [isTracking, setIsTracking] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<TimeEntry> | null>(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [description, setDescription] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [filter, setFilter] = useState<'today' | 'week' | 'month'>('week');

  useEffect(() => {
    // Mock data
    const now = new Date();
    const mockEntries: TimeEntry[] = [
      {
        id: '1',
        projectId: '1',
        projectName: 'App Delivery Mobile',
        description: 'Implementação de autenticação',
        startTime: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        duration: 120,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        projectId: '1',
        projectName: 'App Delivery Mobile',
        description: 'Integração com API de pagamentos',
        startTime: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
        duration: 120,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        projectId: '2',
        projectName: 'Dashboard Analytics',
        description: 'Criação de gráficos D3.js',
        startTime: new Date(now.getTime() - 25 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(now.getTime() - 22 * 60 * 60 * 1000).toISOString(),
        duration: 180,
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        projectId: '3',
        projectName: 'Sistema Chat',
        description: 'Setup WebSocket server',
        startTime: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(now.getTime() - 46 * 60 * 60 * 1000).toISOString(),
        duration: 120,
        createdAt: new Date(now.getTime() - 47 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '5',
        projectId: '2',
        projectName: 'Dashboard Analytics',
        description: 'Implementação de filtros',
        startTime: new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(now.getTime() - 70 * 60 * 60 * 1000).toISOString(),
        duration: 120,
        createdAt: new Date(now.getTime() - 71 * 60 * 60 * 1000).toISOString()
      }
    ];

    setEntries(mockEntries);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && currentEntry) {
      interval = setInterval(() => {
        const start = new Date(currentEntry.startTime!).getTime();
        const now = new Date().getTime();
        setElapsedTime(Math.floor((now - start) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, currentEntry]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const startTracking = () => {
    if (!selectedProject) return;

    const entry: Partial<TimeEntry> = {
      id: Date.now().toString(),
      projectId: selectedProject,
      projectName: projects.find(p => p.id === selectedProject)?.name || '',
      description,
      startTime: new Date().toISOString(),
      duration: 0
    };

    setCurrentEntry(entry);
    setIsTracking(true);
    setElapsedTime(0);
  };

  const pauseTracking = () => {
    setIsTracking(false);
  };

  const stopTracking = () => {
    if (currentEntry) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - new Date(currentEntry.startTime!).getTime()) / 60000);

      const newEntry: TimeEntry = {
        ...currentEntry as TimeEntry,
        endTime: endTime.toISOString(),
        duration,
        createdAt: new Date().toISOString()
      };

      setEntries([newEntry, ...entries]);
    }

    setCurrentEntry(null);
    setIsTracking(false);
    setElapsedTime(0);
    setDescription('');
    setSelectedProject('');
  };

  // Statistics
  const totalMinutes = entries.reduce((sum, entry) => sum + entry.duration, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const estimatedEarnings = (totalMinutes / 60) * 150; // R$150/hora

  // Chart data - hours per project
  const projectStats = projects.map(project => {
    const projectEntries = entries.filter(e => e.projectId === project.id);
    const hours = projectEntries.reduce((sum, e) => sum + e.duration, 0) / 60;
    return {
      name: project.name,
      hours: parseFloat(hours.toFixed(1)),
      color: project.color
    };
  }).filter(p => p.hours > 0);

  // Weekly chart data
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayEntries = entries.filter(e => {
      const entryDate = new Date(e.createdAt);
      return entryDate.toDateString() === date.toDateString();
    });
    const hours = dayEntries.reduce((sum, e) => sum + e.duration, 0) / 60;
    return {
      name: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      hours: parseFloat(hours.toFixed(1))
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <Header title="Time Tracker" />

      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Timer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <div className="text-center mb-6">
              <div className="mb-4">
                {isTracking ? (
                  <Clock className="w-12 h-12 mx-auto animate-pulse" />
                ) : (
                  <Clock className="w-12 h-12 mx-auto" />
                )}
              </div>
              <div className="text-5xl mb-2">
                {formatTime(elapsedTime)}
              </div>
              <div className="text-blue-100">
                {currentEntry ? currentEntry.projectName : 'Não rastreando'}
              </div>
            </div>

            {!isTracking && !currentEntry && (
              <div className="space-y-3">
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                          {project.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Descrição da tarefa..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />

                <Button
                  onClick={startTracking}
                  disabled={!selectedProject}
                  className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Iniciar Timer
                </Button>
              </div>
            )}

            {currentEntry && (
              <div className="flex gap-2">
                {isTracking ? (
                  <Button
                    onClick={pauseTracking}
                    className="flex-1 bg-white/20 hover:bg-white/30"
                    size="lg"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pausar
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsTracking(true)}
                    className="flex-1 bg-white/20 hover:bg-white/30"
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Continuar
                  </Button>
                )}
                <Button
                  onClick={stopTracking}
                  className="flex-1 bg-white text-red-600 hover:bg-red-50"
                  size="lg"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Finalizar
                </Button>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {totalHours}h
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {projects.filter(p => entries.some(e => e.projectId === p.id)).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Projetos</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {estimatedEarnings.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Estimado</div>
            </div>
          </Card>
        </motion.div>

        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 dark:text-white">Horas por Dia</h3>
              <Badge variant="secondary">
                <Calendar className="w-3 h-3 mr-1" />
                Última Semana
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="hours" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Project Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 dark:text-white">Distribuição por Projeto</h3>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={projectStats}
                    dataKey="hours"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {projectStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-3">
                {projectStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
                      <span className="text-gray-700 dark:text-gray-300">{stat.name}</span>
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {stat.hours}h
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 dark:text-white">Entradas Recentes</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {entries.slice(0, 10).map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: projects.find(p => p.id === entry.projectId)?.color }}
                        />
                        <span className="text-gray-900 dark:text-white">
                          {entry.projectName}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {entry.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900 dark:text-white">
                        {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {new Date(entry.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
