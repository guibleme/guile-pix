'use client';

import React from 'react';
import { Separator } from 'react-resizable-panels';

interface ResizeHandleProps {
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export default function ResizeHandle({ direction = 'horizontal', className = '' }: ResizeHandleProps) {
  const isHorizontal = direction === 'horizontal';

  return (
    <Separator
      className={`group relative flex items-center justify-center
        ${isHorizontal ? 'w-2 cursor-col-resize' : 'h-2 cursor-row-resize'}
        transition-colors duration-150
        hover:bg-accent/15 active:bg-accent/30
        ${className}`}
    >
      {/* Grip dots */}
      <div
        className={`flex ${isHorizontal ? 'flex-col' : 'flex-row'} gap-[3px] opacity-0 group-hover:opacity-60 group-active:opacity-80 transition-opacity`}
      >
        <div className="w-1 h-1 rounded-full bg-muted" />
        <div className="w-1 h-1 rounded-full bg-muted" />
        <div className="w-1 h-1 rounded-full bg-muted" />
      </div>
    </Separator>
  );
}
