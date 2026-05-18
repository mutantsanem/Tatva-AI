import { Avatar } from '../atoms/Avatar';
import type { Message } from '../../services/api';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-4 px-4 py-5 ${isUser ? 'bg-transparent' : 'bg-white/5'}`}>
      <Avatar role={message.role} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-400 mb-1">{isUser ? 'You' : 'Tatva AI'}</p>
        <p className="text-gray-100 text-sm leading-7 whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};
