import { useState } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Users, UserPlus, UserCheck, UserMinus, Search, MapPin, Briefcase, Star, MessageCircle, Mail } from 'lucide-react';

interface Connection {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  role: string;
  location: string;
  country: string;
  skills: string[];
  trustScore: number;
  completedProjects: number;
  status: 'pending' | 'accepted' | 'suggested';
  mutualConnections?: number;
  lastActive?: string;
}

export function Networking() {
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: '1',
      userId: '101',
      name: 'Ana Silva',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      role: 'UX/UI Designer',
      location: 'Lisboa',
      country: 'Portugal',
      skills: ['Figma', 'Adobe XD', 'Design Systems'],
      trustScore: 95,
      completedProjects: 42,
      status: 'accepted',
      mutualConnections: 8,
      lastActive: '2h atrás'
    },
    {
      id: '2',
      userId: '102',
      name: 'Carlos Mendes',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      role: 'Backend Developer',
      location: 'São Paulo',
      country: 'Brasil',
      skills: ['Node.js', 'PostgreSQL', 'AWS'],
      trustScore: 88,
      completedProjects: 35,
      status: 'accepted',
      mutualConnections: 12,
      lastActive: '1d atrás'
    },
    {
      id: '3',
      userId: '103',
      name: 'Maria Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop',
      role: 'Product Manager',
      location: 'Porto',
      country: 'Portugal',
      skills: ['Agile', 'Scrum', 'Product Strategy'],
      trustScore: 92,
      completedProjects: 28,
      status: 'pending',
      mutualConnections: 5,
      lastActive: '3h atrás'
    },
    {
      id: '4',
      userId: '104',
      name: 'Pedro Santos',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop',
      role: 'Full Stack Developer',
      location: 'Rio de Janeiro',
      country: 'Brasil',
      skills: ['React', 'Python', 'Docker'],
      trustScore: 90,
      completedProjects: 31,
      status: 'suggested',
      mutualConnections: 15,
      lastActive: '5h atrás'
    },
    {
      id: '5',
      userId: '105',
      name: 'Sofia Oliveira',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&auto=format&fit=crop',
      role: 'Mobile Developer',
      location: 'Bali',
      country: 'Indonesia',
      skills: ['React Native', 'Flutter', 'iOS'],
      trustScore: 87,
      completedProjects: 24,
      status: 'suggested',
      mutualConnections: 6,
      lastActive: '12h atrás'
    },
    {
      id: '6',
      userId: '106',
      name: 'Lucas Ferreira',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop',
      role: 'DevOps Engineer',
      location: 'Barcelona',
      country: 'Espanha',
      skills: ['Kubernetes', 'CI/CD', 'Terraform'],
      trustScore: 94,
      completedProjects: 38,
      status: 'suggested',
      mutualConnections: 9,
      lastActive: '1h atrás'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('connections');

  const acceptedConnections = connections.filter(c => c.status === 'accepted');
  const pendingConnections = connections.filter(c => c.status === 'pending');
  const suggestedConnections = connections.filter(c => c.status === 'suggested');

  const handleConnect = (id: string) => {
    setConnections(connections.map(conn =>
      conn.id === id ? { ...conn, status: 'pending' as const } : conn
    ));
  };

  const handleAccept = (id: string) => {
    setConnections(connections.map(conn =>
      conn.id === id ? { ...conn, status: 'accepted' as const } : conn
    ));
  };

  const handleRemove = (id: string) => {
    setConnections(connections.filter(conn => conn.id !== id));
  };

  const filteredConnections = (list: Connection[]) => {
    if (!searchQuery) return list;
    return list.filter(conn =>
      conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const ConnectionCard = ({ connection }: { connection: Connection }) => (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={connection.avatar} alt={connection.name} />
          <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 dark:text-white truncate">
                {connection.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {connection.role}
              </p>
            </div>
            {connection.status === 'accepted' && (
              <Badge variant="outline" className="ml-2">
                <UserCheck className="w-3 h-3 mr-1" />
                Conectado
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 mb-3 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {connection.location}, {connection.country}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {connection.trustScore}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {connection.completedProjects}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {connection.skills.slice(0, 3).map((skill, i) => (
              <Badge key={i} variant="secondary">
                {skill}
              </Badge>
            ))}
            {connection.skills.length > 3 && (
              <Badge variant="outline">
                +{connection.skills.length - 3}
              </Badge>
            )}
          </div>

          {connection.mutualConnections && connection.mutualConnections > 0 && (
            <div className="text-gray-600 dark:text-gray-400 mb-3">
              <Users className="w-3 h-3 inline mr-1" />
              {connection.mutualConnections} conexões em comum
            </div>
          )}

          <div className="flex gap-2">
            {connection.status === 'suggested' && (
              <Button onClick={() => handleConnect(connection.id)} className="flex-1 min-h-[44px]" size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Conectar
              </Button>
            )}
            {connection.status === 'pending' && (
              <>
                <Button onClick={() => handleAccept(connection.id)} className="flex-1 min-h-[44px]" size="sm">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Aceitar
                </Button>
                <Button onClick={() => handleRemove(connection.id)} variant="outline" size="sm" className="min-h-[44px]">
                  Recusar
                </Button>
              </>
            )}
            {connection.status === 'accepted' && (
              <>
                <Button variant="outline" className="flex-1 min-h-[44px]" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mensagem
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleRemove(connection.id)} className="min-h-[44px] min-w-[44px]">
                  <UserMinus className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <Header title="Networking" />

      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900 dark:text-white">Networking Profissional</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Conecte-se com outros nômades digitais
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar por nome, skill ou localização..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {acceptedConnections.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Conexões</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {pendingConnections.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Pendentes</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {suggestedConnections.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Sugestões</div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="connections">
                Conexões ({acceptedConnections.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pendentes ({pendingConnections.length})
              </TabsTrigger>
              <TabsTrigger value="suggested">
                Sugestões ({suggestedConnections.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="connections" className="space-y-4">
              {filteredConnections(acceptedConnections).map((connection, index) => (
                <motion.div
                  key={connection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ConnectionCard connection={connection} />
                </motion.div>
              ))}
              {filteredConnections(acceptedConnections).length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Nenhuma conexão encontrada
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {filteredConnections(pendingConnections).map((connection, index) => (
                <motion.div
                  key={connection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ConnectionCard connection={connection} />
                </motion.div>
              ))}
              {filteredConnections(pendingConnections).length === 0 && (
                <div className="text-center py-12">
                  <Mail className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Nenhuma solicitação pendente
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="suggested" className="space-y-4">
              {filteredConnections(suggestedConnections).map((connection, index) => (
                <motion.div
                  key={connection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ConnectionCard connection={connection} />
                </motion.div>
              ))}
              {filteredConnections(suggestedConnections).length === 0 && (
                <div className="text-center py-12">
                  <UserPlus className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Nenhuma sugestão disponível
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}