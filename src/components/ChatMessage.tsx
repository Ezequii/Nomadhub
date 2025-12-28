import { Check, CheckCheck } from 'lucide-react';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  isOwn: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[75%] ${message.isOwn ? 'items-end' : 'items-start'}`}>
        {!message.isOwn && (
          <span className="text-xs text-gray-600 ml-3 mb-1 block">{message.senderName}</span>
        )}
        <div
          className={`px-4 py-2 rounded-2xl ${
            message.isOwn
              ? 'bg-blue-600 text-white rounded-br-md'
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }`}
        >
          <p>{message.content}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 px-2 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          {message.isOwn && (
            <>
              {message.status === 'sent' && <Check className="w-3 h-3 text-gray-400" />}
              {message.status === 'delivered' && <CheckCheck className="w-3 h-3 text-gray-400" />}
              {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-500" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
