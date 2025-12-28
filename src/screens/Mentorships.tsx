import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { 
  Users, 
  Calendar, 
  Clock, 
  Star,
  CheckCircle,
  Video,
  MessageSquare,
  Award,
  TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

const mentors = [
  {
    id: 1,
    name: 'Carlos Mendes',
    avatar: '👨‍💼',
    role: 'Senior Full Stack Developer',
    trustScore: 98,
    specialties: ['React', 'Node.js', 'AWS'],
    rating: 4.9,
    sessions: 156,
    price: 200,
    available: true
  },
  {
    id: 2,
    name: 'Julia Ferreira',
    avatar: '👩‍🎨',
    role: 'Lead UI/UX Designer',
    trustScore: 97,
    specialties: ['Figma', 'Design System', 'UX Research'],
    rating: 5.0,
    sessions: 143,
    price: 180,
    available: true
  },
  {
    id: 3,
    name: 'Ricardo Souza',
    avatar: '👨‍💻',
    role: 'Marketing Digital Expert',
    trustScore: 96,
    specialties: ['SEO', 'Google Ads', 'Analytics'],
    rating: 4.8,
    sessions: 132,
    price: 150,
    available: false
  }
];

const upcomingSessions = [
  {
    id: 1,
    mentor: 'Carlos Mendes',
    topic: 'Review de Portfolio e Dicas de Proposta',
    date: '2025-01-12',
    time: '14:00',
    duration: 60,
    status: 'confirmed'
  },
  {
    id: 2,
    mentor: 'Julia Ferreira',
    topic: 'Como Precificar Seus Serviços',
    date: '2025-01-15',
    time: '10:00',
    duration: 45,
    status: 'pending'
  }
];

export function Mentorships() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'mentors' | 'sessions'>('mentors');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Mentorias" showBack />

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <Award className="w-12 h-12 text-white mx-auto mb-3" />
          <h2 className="text-white mb-2">Aprenda com os Melhores</h2>
          <p className="text-purple-100">
            Sessões 1:1 com freelancers experientes do NomadHub
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex gap-2">
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'mentors'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-600 dark:text-gray-400'
            }`}
          >
            Mentores
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'sessions'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-600 dark:text-gray-400'
            }`}
          >
            Minhas Sessões
          </button>
        </div>
      </div>

      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {activeTab === 'mentors' ? (
          <div className="space-y-4">
            {mentors.map(mentor => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                      {mentor.avatar}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="text-gray-900 dark:text-white">{mentor.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{mentor.role}</p>
                        </div>
                        {mentor.available && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-lg">
                            Disponível
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {mentor.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {mentor.sessions} sessões
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {mentor.trustScore}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.specialties.map(specialty => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-lg"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">Valor da Sessão</p>
                      <p className="text-gray-900 dark:text-white">R$ {mentor.price}/hora</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Conversar
                      </Button>
                      <Button
                        size="sm"
                        disabled={!mentor.available}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-50"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <div>
              <h3 className="text-gray-900 dark:text-white mb-4">Próximas Sessões</h3>
              <div className="space-y-3">
                {upcomingSessions.map(session => (
                  <div
                    key={session.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="text-gray-900 dark:text-white mb-1">{session.topic}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              com {session.mentor}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-lg ${
                            session.status === 'confirmed'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {session.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(session.date).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.time} ({session.duration} min)
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            Reagendar
                          </Button>
                          {session.status === 'confirmed' && (
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                              <Video className="w-4 h-4 mr-2" />
                              Entrar na Chamada
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Sessions */}
            <div>
              <h3 className="text-gray-900 dark:text-white mb-4">Sessões Anteriores</h3>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-white mb-1">
                      Estratégias de Precificação
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      com Carlos Mendes • 05/01/2025
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                      <span className="text-gray-500 dark:text-gray-500">
                        Avaliação enviada
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
