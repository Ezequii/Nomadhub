import { useState } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, MapPin, Users, Clock, DollarSign, Heart, Search, Plus, Coffee, Presentation, Laptop, UserPlus, Check } from 'lucide-react';

interface NomadEvent {
  id: string;
  title: string;
  description: string;
  type: 'meetup' | 'workshop' | 'coworking' | 'networking';
  location: string;
  city: string;
  country: string;
  startDate: string;
  endDate?: string;
  maxAttendees?: number;
  currentAttendees: number;
  price?: number;
  currency?: string;
  imageUrl: string;
  tags: string[];
  organizer: string;
  isGoing?: boolean;
  isInterested?: boolean;
}

export function Events() {
  const [events, setEvents] = useState<NomadEvent[]>([
    {
      id: '1',
      title: 'Nomad Coffee Meetup Lisboa',
      description: 'Encontro casual entre nômades digitais para networking e troca de experiências. Vamos compartilhar histórias, dicas de viagem e oportunidades de trabalho.',
      type: 'meetup',
      location: 'Café Central Lisboa',
      city: 'Lisboa',
      country: 'Portugal',
      startDate: '2025-01-05T10:00:00',
      currentAttendees: 12,
      maxAttendees: 20,
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop',
      tags: ['networking', 'coffee', 'casual'],
      organizer: 'Ana Silva',
      isGoing: true
    },
    {
      id: '2',
      title: 'Workshop: Building Your Personal Brand',
      description: 'Workshop intensivo de 4 horas sobre como construir e promover sua marca pessoal como freelancer. Inclui estratégias de marketing, presença online e networking efetivo.',
      type: 'workshop',
      location: 'Second Home Lisboa',
      city: 'Lisboa',
      country: 'Portugal',
      startDate: '2025-01-08T14:00:00',
      endDate: '2025-01-08T18:00:00',
      currentAttendees: 8,
      maxAttendees: 15,
      price: 50,
      currency: 'EUR',
      imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop',
      tags: ['workshop', 'branding', 'marketing'],
      organizer: 'Carlos Mendes',
      isInterested: true
    },
    {
      id: '3',
      title: 'Coworking Day: Focus & Productivity',
      description: 'Dia completo de coworking com método Pomodoro em grupo, sessões de accountability e networking durante os breaks. Café e snacks inclusos.',
      type: 'coworking',
      location: 'Selina Secret Garden Lisboa',
      city: 'Lisboa',
      country: 'Portugal',
      startDate: '2025-01-10T09:00:00',
      endDate: '2025-01-10T18:00:00',
      currentAttendees: 15,
      maxAttendees: 25,
      price: 15,
      currency: 'EUR',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
      tags: ['coworking', 'productivity', 'focus'],
      organizer: 'Maria Costa'
    },
    {
      id: '4',
      title: 'Tech Talks: AI & Future of Work',
      description: 'Série de apresentações sobre IA, automação e como isso afeta o trabalho remoto. Seguido de painel de discussão com especialistas e Q&A.',
      type: 'networking',
      location: 'LX Factory',
      city: 'Lisboa',
      country: 'Portugal',
      startDate: '2025-01-12T19:00:00',
      endDate: '2025-01-12T22:00:00',
      currentAttendees: 45,
      maxAttendees: 80,
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
      tags: ['tech', 'AI', 'networking'],
      organizer: 'Pedro Santos'
    },
    {
      id: '5',
      title: 'Bali Digital Nomad Sunset Meetup',
      description: 'Encontro ao pôr do sol na praia para nômades digitais em Bali. Ambiente descontraído para conhecer pessoas, compartilhar experiências e fazer conexões.',
      type: 'meetup',
      location: 'Canggu Beach Club',
      city: 'Canggu',
      country: 'Indonesia',
      startDate: '2025-01-15T17:00:00',
      currentAttendees: 28,
      maxAttendees: 40,
      price: 10,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop',
      tags: ['beach', 'sunset', 'networking'],
      organizer: 'Sofia Oliveira'
    },
    {
      id: '6',
      title: 'Workshop: Freelance Contracts & Legal',
      description: 'Aprenda tudo sobre contratos freelance, questões legais, impostos internacionais e proteção legal para nômades digitais.',
      type: 'workshop',
      location: 'Remote (Zoom)',
      city: 'Online',
      country: 'Global',
      startDate: '2025-01-18T15:00:00',
      endDate: '2025-01-18T17:00:00',
      currentAttendees: 67,
      price: 30,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop',
      tags: ['legal', 'contracts', 'online'],
      organizer: 'Lucas Ferreira'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'meetup' | 'workshop' | 'coworking' | 'networking'>('all');

  const handleToggleGoing = (id: string) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, isGoing: !event.isGoing } : event
    ));
  };

  const handleToggleInterested = (id: string) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, isInterested: !event.isInterested } : event
    ));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filter === 'all' || event.type === filter;
    
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meetup': return <Coffee className="w-4 h-4" />;
      case 'workshop': return <Presentation className="w-4 h-4" />;
      case 'coworking': return <Laptop className="w-4 h-4" />;
      case 'networking': return <UserPlus className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'meetup': return 'Meetup';
      case 'workshop': return 'Workshop';
      case 'coworking': return 'Coworking';
      case 'networking': return 'Networking';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meetup': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'workshop': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'coworking': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'networking': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <Header title="Eventos Nomad" />

      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-600 rounded-2xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900 dark:text-white">Eventos & Meetups</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Conecte-se pessoalmente
                </p>
              </div>
            </div>
            <Button className="min-h-[44px]">
              <Plus className="w-4 h-4 mr-2" />
              Criar
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar eventos por cidade, tipo ou tag..."
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
          className="grid grid-cols-4 gap-3 mb-6"
        >
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {events.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Eventos</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {events.filter(e => e.isGoing).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Confirmado</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Heart className="w-5 h-5 text-red-600 dark:text-red-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {events.filter(e => e.isInterested).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Interesse</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
              <div className="text-gray-900 dark:text-white mb-1">
                {new Set(events.map(e => e.city)).size}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Cidades</div>
            </div>
          </Card>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="min-h-[44px]"
          >
            Todos
          </Button>
          <Button
            variant={filter === 'meetup' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('meetup')}
            className="min-h-[44px]"
          >
            <Coffee className="w-4 h-4 mr-2" />
            Meetups
          </Button>
          <Button
            variant={filter === 'workshop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('workshop')}
            className="min-h-[44px]"
          >
            <Presentation className="w-4 h-4 mr-2" />
            Workshops
          </Button>
          <Button
            variant={filter === 'coworking' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('coworking')}
            className="min-h-[44px]"
          >
            <Laptop className="w-4 h-4 mr-2" />
            Coworking
          </Button>
          <Button
            variant={filter === 'networking' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('networking')}
            className="min-h-[44px]"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Networking
          </Button>
        </motion.div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  {/* Image */}
                  <div className="md:w-1/3 aspect-video md:aspect-square bg-gray-200 dark:bg-gray-800">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 md:w-2/3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getTypeColor(event.type)}>
                            {getTypeIcon(event.type)}
                            <span className="ml-1">{getTypeName(event.type)}</span>
                          </Badge>
                          {event.isGoing && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <Check className="w-3 h-3 mr-1" />
                              Confirmado
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-gray-900 dark:text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.startDate).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {event.location} - {event.city}, {event.country}
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.currentAttendees}
                          {event.maxAttendees && ` / ${event.maxAttendees}`} participantes
                        </div>
                        {event.price !== undefined && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {event.price === 0 ? 'Gratuito' : `${event.currency} ${event.price}`}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleToggleGoing(event.id)}
                        variant={event.isGoing ? 'default' : 'outline'}
                        className="flex-1 min-h-[44px]"
                      >
                        {event.isGoing ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Confirmado
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4 mr-2" />
                            Participar
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleToggleInterested(event.id)}
                        variant="ghost"
                        className={`min-h-[44px] min-w-[44px] ${event.isInterested ? 'text-red-600' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${event.isInterested ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum evento encontrado
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}