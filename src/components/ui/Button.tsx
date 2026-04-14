'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
}

export default function Button({
  variant = 'default',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 border disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    default: '[background-image:var(--ui-accent-gradient)] text-white border-accent hover:[background-image:var(--ui-accent-gradient-hover)] hover:border-accent-hover hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'bg-transparent border-border text-foreground hover:bg-surface-hover hover:border-border-light active:scale-[0.98]',
    danger: 'bg-danger text-white border-danger hover:brightness-110 active:scale-[0.98]',
  };
  const sizes = {
    sm: 'h-7 px-2.5 text-xs',
    md: 'h-8 px-3 text-sm',
  };

  return (
    <button {...props} type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
}
