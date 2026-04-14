'use client';

import React from 'react';
import type { ColorScheme } from '@/lib/sprites/types';
import { useSpriteLibraryStore } from '@/stores/useSpriteLibraryStore';

const DB16_COLORS = [
  '#140c1c', '#442434', '#693a53', '#a07242',
  '#cebe71', '#f3f8f4', '#9f7515', '#f33b1e',
  '#f7911b', '#854c30', '#346524', '#d04648',
  '#757161', '#597dce', '#d27d2c', '#8595a1',
  '#6daa2c', '#d2aa99', '#6dc2ca', '#dad45e',
  '#deeed6',
];

interface ColorTriadEditorProps {
  role: string;
  shadow: string;
  base: string;
  highlight: string;
  onChange: (triad: { shadow: string; base: string; highlight: string }) => void;
}

function ColorTriadEditor({ role, shadow, base, highlight, onChange }: ColorTriadEditorProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface-hover text-left text-xs"
      >
        <div className="flex gap-0.5">
          <div className="w-4 h-4 rounded-sm border border-border" style={{ backgroundColor: shadow }} title="Shadow" />
          <div className="w-4 h-4 rounded-sm border border-border" style={{ backgroundColor: base }} title="Base" />
          <div className="w-4 h-4 rounded-sm border border-border" style={{ backgroundColor: highlight }} title="Highlight" />
        </div>
        <span className="flex-1 capitalize text-muted">{role}</span>
        <span className="text-[10px] text-muted">{expanded ? '\u25B2' : '\u25BC'}</span>
      </button>

      {expanded && (
        <div className="pl-2 space-y-1.5">
          {(['shadow', 'base', 'highlight'] as const).map((tone) => (
            <div key={tone} className="space-y-1">
              <div className="text-[10px] text-muted capitalize">{tone}</div>
              <div className="flex flex-wrap gap-1">
                {DB16_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onChange({
                      shadow: tone === 'shadow' ? c : shadow,
                      base: tone === 'base' ? c : base,
                      highlight: tone === 'highlight' ? c : highlight,
                    })}
                    className={`w-4 h-4 rounded-sm border ${
                      (tone === 'shadow' && shadow === c) ||
                      (tone === 'base' && base === c) ||
                      (tone === 'highlight' && highlight === c)
                        ? 'border-accent ring-1 ring-accent/40'
                        : 'border-border/50'
                    }`}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SpriteColorCustomizer() {
  const scheme = useSpriteLibraryStore((s) => s.selectedScheme);
  const customColors = useSpriteLibraryStore((s) => s.customColors);
  const setCustomColor = useSpriteLibraryStore((s) => s.setCustomColor);
  const resetColors = useSpriteLibraryStore((s) => s.resetColors);
  const template = useSpriteLibraryStore((s) => s.selectedTemplate);

  if (!template || !scheme) return null;

  // Get unique roles from template
  const roles = [...new Set(template.regions.map(r => r.role))];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-muted">Color Customizer</span>
        {Object.keys(customColors).length > 0 && (
          <button
            type="button"
            onClick={resetColors}
            className="text-[10px] text-accent hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-0.5">
        {roles.map((role) => {
          const mapping = customColors[role] ?? scheme.mapping[role];
          if (!mapping) return null;
          return (
            <ColorTriadEditor
              key={role}
              role={role}
              shadow={mapping.shadow}
              base={mapping.base}
              highlight={mapping.highlight}
              onChange={(triad) => setCustomColor(role, triad)}
            />
          );
        })}
      </div>
    </div>
  );
}
