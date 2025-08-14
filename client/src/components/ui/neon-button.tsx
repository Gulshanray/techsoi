import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export default function NeonButton({ 
  children, 
  className, 
  type = 'button',
  disabled = false,
  onClick 
}: NeonButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'neon-border bg-gradient-to-r from-tech-primary to-tech-accent text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
