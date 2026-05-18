import { useState } from 'react';
import { ChatLayout } from '../components/templates/ChatLayout';
import { Sidebar } from '../components/organisms/Sidebar';
import { ChatWindow } from '../components/organisms/ChatWindow';
import { conversations as initialData, type Conversation, type Message } from '../data/conversations';

let msgCounter = 100;

export const ChatPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>(initialData);
  const [activeId, setActiveId] = useState(initialData[0].id);

  const activeConversation = conversations.find((c) => c.id === activeId)!;

  const handleNewChat = () => {
    const id = String(Date.now());
    const newChat: Conversation = { id, title: 'New Chat', messages: [] };
    setConversations((prev) => [newChat, ...prev]);
    setActiveId(id);
  };

  const handleSend = (text: string) => {
    const userMsg: Message = { id: `m${++msgCounter}`, role: 'user', content: text };
    const botMsg: Message = {
      id: `m${++msgCounter}`,
      role: 'assistant',
      content: 'This is a dummy response. Replace me with a real API call later!',
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c;
        const isNew = c.messages.length === 0;
        return {
          ...c,
          title: isNew ? text.slice(0, 40) : c.title,
          messages: [...c.messages, userMsg, botMsg],
        };
      })
    );
  };

  return (
    <ChatLayout
      sidebar={
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={setActiveId}
          onNewChat={handleNewChat}
        />
      }
      main={
        <ChatWindow
          title={activeConversation.title}
          messages={activeConversation.messages}
          onSend={handleSend}
        />
      }
    />
  );
};
