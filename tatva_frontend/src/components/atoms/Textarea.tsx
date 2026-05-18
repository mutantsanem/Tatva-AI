import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = ({ className = '', ...props }: TextareaProps) => (
  <textarea
    rows={1}
    className={`w-full resize-none bg-transparent text-white placeholder-gray-500 outline-none text-sm leading-6 max-h-40 overflow-y-auto ${className}`}
    {...props}
  />
);
