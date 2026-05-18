import { ChatIcon } from '../atoms/Icon';

interface ChatItemProps {
  title: string;
  active: boolean;
  onClick: () => void;
}

export const ChatItem = ({ title, active, onClick }: ChatItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors cursor-pointer truncate ${
      active ? 'bg-white/15 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
    }`}
  >
    <ChatIcon className="w-4 h-4 shrink-0" />
    <span className="truncate">{title}</span>
  </button>
);
