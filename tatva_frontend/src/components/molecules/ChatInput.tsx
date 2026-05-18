import { useState, KeyboardEvent } from 'react';
import { Textarea } from '../atoms/Textarea';
import { Button } from '../atoms/Button';
import { SendIcon } from '../atoms/Icon';

interface ChatInputProps {
  onSend: (text: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-3 bg-[#40414f] rounded-xl px-4 py-3 border border-white/10">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message Tatva AI..."
      />
      <button
        onClick={handleSend}
        disabled={!value.trim()}
        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <SendIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
