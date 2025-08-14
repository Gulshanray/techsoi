import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

export default function AnimatedText({ 
  children, 
  className,
  gradient = false 
}: AnimatedTextProps) {
  return (
    <span className={cn(
      'animate-fade-in-up',
      gradient && 'text-gradient',
      className
    )}>
      {children}
    </span>
  );
}
