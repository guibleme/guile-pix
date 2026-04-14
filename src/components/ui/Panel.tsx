'use client';

import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Panel({ title, children, className = '', actions, collapsible, collapsed, onToggleCollapse }: PanelProps) {
  return (
    <div
      className={`flex flex-col bg-surface/95 border border-border rounded-2xl overflow-hidden ${className}`}
      style={{ boxShadow: 'var(--ui-shadow)' }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b border-border backdrop-blur"
        style={{ backgroundImage: 'var(--ui-panel-header-gradient)' }}
      >
        <div className="flex items-center gap-1">
          {collapsible && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="text-muted hover:text-foreground transition-colors p-0.5 -ml-1"
              aria-label={collapsed ? 'Expand panel' : 'Collapse panel'}
            >
              {collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
          <h3 className="text-xs font-semibold tracking-wide text-muted">{title}</h3>
        </div>
        {actions && <div className="flex items-center gap-1">{actions}</div>}
      </div>
      {!collapsed && <div className="flex-1 overflow-auto">{children}</div>}
    </div>
  );
}
