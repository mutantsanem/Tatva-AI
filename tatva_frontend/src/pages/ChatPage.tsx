import { useState, useEffect } from 'react';
import { ChatLayout } from '../components/templates/ChatLayout';
import { Sidebar } from '../components/organisms/Sidebar';
import { ChatWindow } from '../components/organisms/ChatWindow';
import { api, type Conversation } from '../services/api';

export const ChatPage = ({ userName, onLogout }: { userName: string; onLogout: () => void }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAll().then((data) => {
      setConversations(data);
      if (data.length > 0) setActiveId(data[0].id);
      setLoading(false);
    });
  }, []);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  const handleNewChat = async () => {
    const created = await api.create();
    setConversations((prev) => [created, ...prev]);
    setActiveId(created.id);
  };

  const handleSend = async (text: string) => {
    if (!activeId) return;
    const { userMessage, botReply } = await api.sendMessage(activeId, text);
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c;
        const messages = [...c.messages, userMessage, botReply];
        const title = c.messages.length === 0 ? text.slice(0, 40) : c.title;
        return { ...c, title, messages };
      })
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#343541] text-gray-400 text-sm">
        Loading...
      </div>
    );
  }

  return (
    <ChatLayout
      sidebar={
        <Sidebar
          conversations={conversations}
          activeId={activeId ?? ''}
          onSelect={setActiveId}
          onNewChat={handleNewChat}
          userName={userName}
          onLogout={onLogout}
        />
      }
      main={
        activeConversation ? (
          <ChatWindow
            title={activeConversation.title}
            messages={activeConversation.messages}
            onSend={handleSend}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500 text-sm">
            <p>Create a new chat to get started</p>
          </div>
        )
      }
    />
  );
};
