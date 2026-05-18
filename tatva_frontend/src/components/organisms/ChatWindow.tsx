import { useEffect, useRef } from 'react';
import { MessageBubble } from '../molecules/MessageBubble';
import { ChatInput } from '../molecules/ChatInput';
import type { Message } from '../../data/conversations';

interface ChatWindowProps {
  title: string;
  messages: Message[];
  onSend: (text: string) => void;
}

export const ChatWindow = ({ title, messages, onSend }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <header className="shrink-0 px-6 py-4 border-b border-white/10 text-center">
        <h1 className="text-sm font-semibold text-gray-300 truncate">{title}</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500">
            <p className="text-2xl font-semibold text-gray-300">How can I help you?</p>
            <p className="text-sm">Start a conversation below</p>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}
        <div ref={bottomRef} />
      </div>

      <div className="shrink-0 px-4 pb-4 pt-2 max-w-3xl w-full mx-auto">
        <ChatInput onSend={onSend} />
        <p className="text-center text-xs text-gray-600 mt-2">Tatva AI can make mistakes. Consider checking important info.</p>
      </div>
    </div>
  );
};
