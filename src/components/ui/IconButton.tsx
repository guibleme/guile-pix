'use client';

import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  tooltip?: string;
}

export default function IconButton({ active, tooltip, className = '', children, ...props }: IconButtonProps) {
  return (
    <button
      type={props.type ?? 'button'}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-150
        ${active
          ? '[background-image:var(--ui-accent-gradient)] text-white border-accent shadow-[0_0_8px_rgba(245,166,35,0.25)]'
          : 'bg-transparent text-foreground border-border hover:bg-surface-hover hover:border-border-light hover:scale-[1.04]'}
        active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none ${className}`}
      title={tooltip}
      {...props}
    >
      {children}
    </button>
  );
}
