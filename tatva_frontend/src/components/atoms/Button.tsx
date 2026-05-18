import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'ghost' | 'primary';
}

export const Button = ({ children, variant = 'ghost', className = '', ...props }: ButtonProps) => {
  const base = 'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer';
  const variants = {
    ghost: 'hover:bg-white/10 text-gray-300',
    primary: 'bg-white text-gray-900 hover:bg-gray-100 font-medium',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
