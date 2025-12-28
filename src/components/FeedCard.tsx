import { Calendar, MapPin, Users, MessageCircle, Heart } from 'lucide-react';

export interface FeedItem {
  id: string;
  type: 'event' | 'mentorship' | 'post';
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  timestamp: string;
  location?: string;
  date?: string;
  participants?: number;
  likes: number;
  comments: number;
  image?: string;
}

interface FeedCardProps {
  item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Agora há pouco';
    if (hours < 24) return `${hours}h atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const typeLabels = {
    event: 'Evento',
    mentorship: 'Mentoria',
    post: 'Post'
  };

  const typeColors = {
    event: 'bg-purple-100 text-purple-700',
    mentorship: 'bg-blue-100 text-blue-700',
    post: 'bg-gray-100 text-gray-700'
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
          {item.author.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-gray-900 truncate">{item.author.name}</h4>
            <span className={`px-2 py-1 rounded-lg ${typeColors[item.type]}`}>
              {typeLabels[item.type]}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span>{item.author.role}</span>
            <span>•</span>
            <span>{formatTimestamp(item.timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-3">{item.content}</p>

      {/* Image */}
      {item.image && (
        <img
          src={item.image}
          alt="Post"
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      )}

      {/* Event/Mentorship Details */}
      {(item.type === 'event' || item.type === 'mentorship') && (
        <div className="flex flex-wrap gap-3 mb-3 text-gray-600">
          {item.date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{item.date}</span>
            </div>
          )}
          {item.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{item.location}</span>
            </div>
          )}
          {item.participants && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{item.participants} participantes</span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors min-h-[44px]">
          <Heart className="w-5 h-5" />
          <span>{item.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors min-h-[44px]">
          <MessageCircle className="w-5 h-5" />
          <span>{item.comments}</span>
        </button>
      </div>
    </div>
  );
}