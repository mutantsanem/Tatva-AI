import { UserIcon, BotIcon } from './Icon';

interface AvatarProps {
  role: 'user' | 'assistant';
}

export const Avatar = ({ role }: AvatarProps) => {
  const isUser = role === 'user';
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'bg-violet-600' : 'bg-emerald-600'}`}>
      {isUser ? <UserIcon className="w-4 h-4 text-white" /> : <BotIcon className="w-4 h-4 text-white" />}
    </div>
  );
};
