import { Button } from '../atoms/Button';
import { PlusIcon } from '../atoms/Icon';
import { ChatItem } from '../molecules/ChatItem';
import type { Conversation } from '../../services/api';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  userName: string;
  onLogout: () => void;
}

export const Sidebar = ({ conversations, activeId, onSelect, onNewChat, userName, onLogout }: SidebarProps) => (
  <aside className="w-64 h-full bg-[#202123] flex flex-col shrink-0">
    <div className="p-3">
      <Button variant="ghost" onClick={onNewChat} className="w-full justify-between border border-white/20">
        <span className="ml-6 font-semibold text-white">Tatva AI</span>
        <PlusIcon />
      </Button>
    </div>

    <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
      <p className="px-3 py-1 text-xs text-gray-500 uppercase tracking-wider">Recent</p>
      {conversations.map((c) => (
        <ChatItem key={c.id} title={c.title} active={c.id === activeId} onClick={() => onSelect(c.id)} />
      ))}
    </nav>

    <div className="p-3 border-t border-white/10">
      <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-gray-300 truncate max-w-[100px]">{userName}</span>
        </div>
        <button onClick={onLogout} className="text-xs text-gray-500 hover:text-red-400 transition-colors cursor-pointer">Logout</button>
      </div>
    </div>
  </aside>
);
