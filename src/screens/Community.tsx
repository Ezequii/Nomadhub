import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  TrendingUp,
  Award,
  Calendar,
  Users,
  Plus,
  Heart,
  Bookmark
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

const tabs = ['Feed', 'Eventos', 'Ranking', 'Mentorias'];

const posts = [
  {
    id: 1,
    author: 'Maria Santos',
    avatar: '👩‍💻',
    role: 'Designer UI/UX',
    trustScore: 95,
    content: 'Acabei de fechar meu primeiro contrato de $5k usando a plataforma! A IA de propostas realmente faz diferença. Obrigada NomadHub! 🎉',
    likes: 42,
    comments: 8,
    shares: 3,
    timestamp: '2h atrás',
    isLiked: false,
    isSaved: false
  },
  {
    id: 2,
    author: 'Pedro Costa',
    avatar: '👨‍💼',
    role: 'Desenvolvedor Full Stack',
    trustScore: 88,
    content: 'Dica para novatos: sempre inclua seu portfólio nas propostas. Minha taxa de aceitação subiu de 30% para 60% depois disso.',
    likes: 67,
    comments: 15,
    shares: 12,
    timestamp: '5h atrás',
    isLiked: true,
    isSaved: true
  },
  {
    id: 3,
    author: 'Ana Lima',
    avatar: '👩‍🎨',
    role: 'Redatora de Conteúdo',
    trustScore: 92,
    content: 'Trabalhar remotamente da Tailândia foi um sonho realizado. A plataforma me deu a liberdade de viajar e trabalhar ao mesmo tempo! 🌍',
    likes: 89,
    comments: 24,
    shares: 18,
    timestamp: '1d atrás',
    isLiked: false,
    isSaved: false
  }
];

const events = [
  {
    id: 1,
    title: 'Webinar: Como Aumentar Seu Trust Score',
    date: '2025-01-10',
    time: '19:00',
    attendees: 234,
    type: 'webinar'
  },
  {
    id: 2,
    title: 'Encontro de Nômades em Lisboa',
    date: '2025-01-15',
    time: '18:00',
    attendees: 45,
    type: 'meetup'
  },
  {
    id: 3,
    title: 'Workshop: Propostas Vencedoras',
    date: '2025-01-20',
    time: '14:00',
    attendees: 156,
    type: 'workshop'
  }
];

const ranking = [
  { position: 1, name: 'Carlos Mendes', score: 98, projects: 156 },
  { position: 2, name: 'Julia Ferreira', score: 97, projects: 143 },
  { position: 3, name: 'Ricardo Souza', score: 96, projects: 132 },
  { position: 4, name: 'Você', score: 88, projects: 45, isCurrentUser: true },
  { position: 5, name: 'Beatriz Alves', score: 87, projects: 89 }
];

export function Community() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Feed');
  const [likedPosts, setLikedPosts] = useState<number[]>([2]);
  const [savedPosts, setSavedPosts] = useState<number[]>([2]);

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const toggleSave = (postId: number) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Comunidade" />

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {activeTab === 'Feed' && (
          <div className="space-y-6">
            {/* Create Post */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                  👤
                </div>
                <button
                  onClick={() => {/* Open create post modal */}}
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-left text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Compartilhe suas experiências...
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-gray-900 dark:text-white">{post.author}</h4>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <TrendingUp className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs text-blue-600 dark:text-blue-400">{post.trustScore}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-500">{post.role}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">{post.timestamp}</p>
                    </div>
                    <button
                      onClick={() => toggleSave(post.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Bookmark
                        className={`w-5 h-5 ${
                          savedPosts.includes(post.id)
                            ? 'fill-blue-600 text-blue-600'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <p className="text-gray-900 dark:text-white leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Post Actions */}
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      likedPosts.includes(post.id)
                        ? 'text-pink-600 dark:text-pink-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`}
                    />
                    <span className="text-sm">
                      {likedPosts.includes(post.id) ? post.likes + 1 : post.likes}
                    </span>
                  </button>

                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </button>

                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">{post.shares}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'Eventos' && (
          <div className="space-y-4">
            {events.map(event => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 text-xs">
                      {new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-white mb-2">{event.title}</h4>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.attendees} participantes
                      </div>
                    </div>
                  </div>

                  <Button size="sm">
                    Inscrever-se
                  </Button>
                </div>
              </div>
            ))}

            <div className="text-center mt-6">
              <Button variant="outline" onClick={() => navigate('/events')}>
                Ver Todos os Eventos
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'Ranking' && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-6 text-center mb-6">
              <Award className="w-12 h-12 text-white mx-auto mb-3" />
              <h3 className="text-white mb-1">Top Freelancers do Mês</h3>
              <p className="text-yellow-100 text-sm">
                Baseado em Trust Score e projetos concluídos
              </p>
            </div>

            {ranking.map(user => (
              <div
                key={user.position}
                className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 ${
                  user.isCurrentUser ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    user.position === 1
                      ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white'
                      : user.position === 2
                      ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white'
                      : user.position === 3
                      ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    #{user.position}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-white">
                      {user.name}
                      {user.isCurrentUser && (
                        <span className="ml-2 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                          Você
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {user.projects} projetos concluídos
                    </p>
                  </div>

                  <div className="flex items-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-600 dark:text-blue-400">{user.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Mentorias' && (
          <div className="text-center py-12">
            <Button onClick={() => navigate('/mentorships')}>
              Ver Programa de Mentorias
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
