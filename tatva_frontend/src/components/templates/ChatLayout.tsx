import { ReactNode, useState } from 'react';
import { MenuIcon } from '../atoms/Icon';

interface ChatLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
}

export const ChatLayout = ({ sidebar, main }: ChatLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#343541] text-white overflow-hidden">
      {sidebarOpen && sidebar}

      <div className="flex flex-col flex-1 min-w-0">
        <button
          onClick={() => setSidebarOpen((p) => !p)}
          className="absolute top-3 left-3 z-10 p-2 rounded-lg hover:bg-white/10 text-gray-400 transition-colors cursor-pointer"
        >
          <MenuIcon />
        </button>
        {main}
      </div>
    </div>
  );
};
