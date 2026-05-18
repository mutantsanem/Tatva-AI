import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, id, ...props }: InputProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm text-gray-400">{label}</label>
    <input
      id={id}
      className="bg-[#40414f] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-violet-500 transition-colors"
      {...props}
    />
  </div>
);
