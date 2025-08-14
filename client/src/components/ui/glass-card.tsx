import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className, style }: GlassCardProps) {
  return (
    <div className={cn('glass-morphism rounded-3xl', className)} style={style}>
      {children}
    </div>
  );
}
