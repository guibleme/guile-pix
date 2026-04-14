'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isEditorCommandEnabled, runEditorCommand, type EditorCommandId } from '@/lib/editor/editorCommands';
import PixelIcon from '@/components/ui/PixelIcon';
import { useUIStore } from '@/stores/useUIStore';
import { getPlayerName, setPlayerName as setStoredPlayerName, subscribePlayerName } from '@/lib/profile/playerIdentity';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import useI18n from '@/hooks/useI18n';
import { type LocalePreference, writeStoredLocalePreference } from '@/lib/i18n';
import { useLocaleStore } from '@/stores/useLocaleStore';
import RpgStatusBar from '@/components/editor/RpgStatusBar';

type MenuId = 'file' | 'edit' | 'image' | 'view' | 'help';
type MenuEntry =
  | {
      kind: 'command';
      label: string;
      commandId: EditorCommandId;
      shortcut?: string;
    }
  | {
      kind: 'separator';
    };

const MENU_ORDER: MenuId[] = ['file', 'edit', 'image', 'view', 'help'];

function buildMenus(t: (key: string, fallback?: string) => string): Array<{ id: MenuId; label: string; entries: MenuEntry[] }> {
  return [
    {
      id: 'file',
      label: t('menu.file', 'File'),
      entries: [
        { kind: 'command', label: t('menu.file.newSketch', 'New Sketch...'), commandId: 'file.newProject' },
        { kind: 'command', label: t('menu.file.saveProject', 'Save Project...'), commandId: 'file.saveProject', shortcut: 'Ctrl+S' },
        { kind: 'command', label: t('menu.file.loadImport', 'Load / Import...'), commandId: 'file.loadProject', shortcut: 'Ctrl+Shift+O' },
        { kind: 'command', label: t('menu.file.importImage', 'Import Image...'), commandId: 'file.importImage' },
        { kind: 'command', label: t('menu.file.sessionManager', 'Session Manager...'), commandId: 'file.openSession' },
        { kind: 'separator' },
        { kind: 'command', label: t('menu.file.export', 'Export...'), commandId: 'file.openExport' },
      ],
    },
    {
      id: 'edit',
      label: t('menu.edit', 'Edit'),
      entries: [
        { kind: 'command', label: t('menu.edit.undo', 'Undo'), commandId: 'edit.undo', shortcut: 'Ctrl+Z' },
        { kind: 'command', label: t('menu.edit.redo', 'Redo'), commandId: 'edit.redo', shortcut: 'Ctrl+Shift+Z' },
      ],
    },
    {
      id: 'image',
      label: t('menu.image', 'Image'),
      entries: [
        { kind: 'command', label: t('menu.image.resizeCanvas', 'Resize Canvas...'), commandId: 'canvas.resize' },
      ],
    },
    {
      id: 'view',
      label: t('menu.view', 'View'),
      entries: [
        { kind: 'command', label: t('menu.view.toggleGrid', 'Toggle Grid'), commandId: 'view.toggleGrid', shortcut: 'Ctrl+G' },
        { kind: 'command', label: t('menu.view.toggleTileGrid', 'Toggle Tile Grid'), commandId: 'view.toggleTileGrid', shortcut: 'Ctrl+Shift+G' },
        { kind: 'command', label: '  8 × 8', commandId: 'view.tileGrid8' },
        { kind: 'command', label: '  16 × 16', commandId: 'view.tileGrid16' },
        { kind: 'command', label: '  32 × 32', commandId: 'view.tileGrid32' },
        { kind: 'command', label: '  64 × 64', commandId: 'view.tileGrid64' },
        { kind: 'separator' },
        { kind: 'command', label: t('menu.view.ghostFrames', 'Ghost Frames'), commandId: 'view.toggleGhostFrames', shortcut: 'Ctrl+O' },
        { kind: 'separator' },
        { kind: 'command', label: t('menu.view.zoomIn', 'Zoom In'), commandId: 'view.zoomIn', shortcut: 'Ctrl+=' },
        { kind: 'command', label: t('menu.view.zoomOut', 'Zoom Out'), commandId: 'view.zoomOut', shortcut: 'Ctrl+-' },
        { kind: 'command', label: t('menu.view.resetView', 'Reset View'), commandId: 'view.resetZoom' },
        { kind: 'separator' },
        { kind: 'command', label: t('menu.view.spriteLibrary', 'Sprite Library'), commandId: 'view.toggleSpriteLibrary', shortcut: 'Ctrl+Shift+L' },
      ],
    },
    {
      id: 'help',
      label: t('menu.help', 'Help'),
      entries: [
        { kind: 'command', label: t('menu.help.shortcuts', 'Keyboard Shortcuts...'), commandId: 'help.shortcuts', shortcut: '?' },
        { kind: 'separator' },
        { kind: 'command', label: t('menu.help.about', 'About DogSprite...'), commandId: 'help.about' },
      ],
    },
  ];
}

function getNeighborMenuId(current: MenuId, direction: -1 | 1): MenuId {
  const index = MENU_ORDER.indexOf(current);
  const nextIndex = (index + direction + MENU_ORDER.length) % MENU_ORDER.length;
  return MENU_ORDER[nextIndex];
}

export default function MenuBar() {
  const { t } = useI18n();
  const localePreference = useLocaleStore((s) => s.preference);
  const setPreference = useLocaleStore((s) => s.setPreference);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [playerName, setPlayerName] = useState(() => getPlayerName() ?? '');
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const menus = useMemo(() => buildMenus(t), [t]);

  const menuButtonRefs = useRef<Record<MenuId, HTMLButtonElement | null>>({
    file: null,
    edit: null,
    image: null,
    view: null,
    help: null,
  });
  const menuItemRefs = useRef<Record<MenuId, Array<HTMLButtonElement | null>>>({
    file: [],
    edit: [],
    image: [],
    view: [],
    help: [],
  });

  useEffect(() => {
    menuItemRefs.current.file = [];
    menuItemRefs.current.edit = [];
    menuItemRefs.current.image = [];
    menuItemRefs.current.view = [];
    menuItemRefs.current.help = [];
  }, [openMenu]);

  useEffect(() => {
    return subscribePlayerName((next) => setPlayerName(next ?? ''));
  }, []);

  const closeMenu = useCallback(() => {
    setOpenMenu(null);
  }, []);

  const runMenuCommand = useCallback(async (commandId: EditorCommandId) => {
    closeMenu();
    const result = await runEditorCommand(commandId);
    if (!result.ok && result.error && !result.error.startsWith('Command disabled')) {
      window.alert(result.error);
    }
  }, [closeMenu]);

  const focusMenuButton = useCallback((menuId: MenuId) => {
    menuButtonRefs.current[menuId]?.focus();
  }, []);

  const getEnabledMenuItems = useCallback((menuId: MenuId): HTMLButtonElement[] => {
    return menuItemRefs.current[menuId].filter(
      (el): el is HTMLButtonElement => {
        if (!el) return false;
        return !el.disabled;
      }
    );
  }, []);

  const openMenuAndFocusItem = useCallback((menuId: MenuId, where: 'first' | 'last' = 'first') => {
    setOpenMenu(menuId);
    window.requestAnimationFrame(() => {
      const items = getEnabledMenuItems(menuId);
      if (items.length === 0) {
        focusMenuButton(menuId);
        return;
      }
      if (where === 'last') {
        items[items.length - 1].focus();
        return;
      }
      items[0].focus();
    });
  }, [focusMenuButton, getEnabledMenuItems]);

  const handleMenuButtonKeyDown = (menuId: MenuId, e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = getNeighborMenuId(menuId, 1);
      if (openMenu) openMenuAndFocusItem(next, 'first');
      else focusMenuButton(next);
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = getNeighborMenuId(menuId, -1);
      if (openMenu) openMenuAndFocusItem(prev, 'first');
      else focusMenuButton(prev);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      openMenuAndFocusItem(menuId, 'first');
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      openMenuAndFocusItem(menuId, 'last');
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (openMenu === menuId) closeMenu();
      else openMenuAndFocusItem(menuId, 'first');
      return;
    }

    if (e.key === 'Escape' && openMenu) {
      e.preventDefault();
      closeMenu();
      focusMenuButton(menuId);
    }
  };

  const handleMenuItemKeyDown = (menuId: MenuId, e: React.KeyboardEvent<HTMLButtonElement>) => {
    const items = getEnabledMenuItems(menuId);
    if (items.length === 0) return;

    const currentIndex = items.indexOf(e.currentTarget);
    if (currentIndex === -1) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(currentIndex + 1) % items.length].focus();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length].focus();
      return;
    }

    if (e.key === 'Home') {
      e.preventDefault();
      items[0].focus();
      return;
    }

    if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1].focus();
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      openMenuAndFocusItem(getNeighborMenuId(menuId, 1), 'first');
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      openMenuAndFocusItem(getNeighborMenuId(menuId, -1), 'first');
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      focusMenuButton(menuId);
      return;
    }

    if (e.key === 'Tab') {
      closeMenu();
    }
  };

  const [showNameDialog, setShowNameDialog] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const applyLocalePreference = useCallback((nextPreference: LocalePreference) => {
    setPreference(nextPreference);
    writeStoredLocalePreference(nextPreference);
  }, [setPreference]);

  const openNameDialog = useCallback(() => {
    setNameInput(playerName);
    setShowNameDialog(true);
  }, [playerName]);

  const submitNameChange = useCallback(() => {
    const saved = setStoredPlayerName(nameInput);
    if (saved) {
      setPlayerName(saved);
    }
    setShowNameDialog(false);
  }, [nameInput]);

  return (
    <div className="flex items-center h-12 bg-surface/95 border-b border-border px-2 no-select relative z-40 backdrop-blur">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'var(--ui-chrome-gradient)' }}
      />
      <div className="flex items-center gap-1 mr-4 relative z-10">
        <PixelIcon name="dog" size={16} className="text-accent" />
        <span className="text-sm font-bold tracking-wide bg-clip-text text-transparent" style={{ backgroundImage: 'var(--ui-logo-gradient)' }}>
          DogSprite
        </span>
      </div>

      <div role="menubar" aria-label={t('menu.main.aria', 'Main menu')} className="flex items-center relative z-10">
        {menus.map((menu) => (
          <div key={menu.id} className="relative">
            <button
              ref={(el) => { menuButtonRefs.current[menu.id] = el; }}
              id={`menu-button-${menu.id}`}
              type="button"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={openMenu === menu.id}
              aria-controls={`menu-panel-${menu.id}`}
              className={`px-3 py-1 text-xs rounded-md border border-transparent hover:bg-surface-hover hover:border-border ${openMenu === menu.id ? 'bg-surface-hover border-border text-foreground' : ''}`}
              onClick={() => setOpenMenu((current) => (current === menu.id ? null : menu.id))}
              onMouseEnter={() => {
                if (openMenu && openMenu !== menu.id) setOpenMenu(menu.id);
              }}
              onKeyDown={(e) => handleMenuButtonKeyDown(menu.id, e)}
            >
              {menu.label}
            </button>

            {openMenu === menu.id && (
              <div
                id={`menu-panel-${menu.id}`}
                role="menu"
                aria-labelledby={`menu-button-${menu.id}`}
                className="absolute top-full left-0 mt-1 bg-surface border border-border rounded-lg shadow-xl py-1 min-w-[210px]"
              >
                {menu.entries.map((entry, index) => {
                  if (entry.kind === 'separator') {
                    return <div key={`${menu.id}-sep-${index}`} className="border-t border-border my-1" role="separator" />;
                  }

                  const disabled = !isEditorCommandEnabled(entry.commandId);
                  const actionIndex = menu.entries
                    .slice(0, index + 1)
                    .filter((item) => item.kind === 'command').length - 1;

                  return (
                    <button
                      key={`${menu.id}-${entry.commandId}`}
                      ref={(el) => { menuItemRefs.current[menu.id][actionIndex] = el; }}
                      type="button"
                      role="menuitem"
                      disabled={disabled}
                      onClick={() => { void runMenuCommand(entry.commandId); }}
                      onKeyDown={(e) => handleMenuItemKeyDown(menu.id, e)}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-surface-hover flex justify-between disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>{entry.label}</span>
                      {entry.shortcut && <span className="text-muted">{entry.shortcut}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="ml-auto relative z-10 flex items-center gap-2">
        <RpgStatusBar />
        <button
          type="button"
          onClick={() => useUIStore.getState().setAboutDialog(true)}
          className="h-7 px-2.5 rounded-md border border-border bg-surface-hover/40 text-xs inline-flex items-center gap-1.5 hover:bg-surface-hover"
          title={t('menu.help.about', 'About DogSprite...')}
        >
          <PixelIcon name="sparkles" size={13} />
          <span>{t('nav.credits', 'Credits')}</span>
        </button>
        <div className="h-7 px-2 rounded-md border border-border bg-surface-hover/40 text-xs inline-flex items-center gap-1.5">
          <PixelIcon name="globe" size={13} />
          <select
            value={localePreference}
            onChange={(event) => applyLocalePreference(event.target.value as LocalePreference)}
            className="menu-locale-select border-0 text-xs outline-none"
            style={{ colorScheme: 'light' }}
            title={t('locale.label', 'Language')}
          >
            <option value="auto">{t('locale.auto', 'Language')}</option>
            <option value="en">{t('locale.en', 'English')}</option>
            <option value="es">{t('locale.es', 'Spanish')}</option>
            <option value="ja">{t('locale.ja', 'Japanese')}</option>
          </select>
        </div>
        <button
          type="button"
          onClick={openNameDialog}
          className="h-7 px-2.5 rounded-md border border-border bg-surface-hover/40 text-xs inline-flex items-center gap-1.5 hover:bg-surface-hover max-w-[140px]"
          title={t('menu.artist.editButton', 'Edit artist name')}
        >
          <PixelIcon name="dog" size={13} />
          <span className="truncate">{playerName || t('menu.artist.fallback', 'Artist')}</span>
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="h-7 px-2.5 rounded-md border border-border bg-surface-hover/40 text-xs inline-flex items-center gap-1.5 hover:bg-surface-hover"
          title={theme === 'dark' ? t('menu.theme.switchToLight', 'Switch to light mode') : t('menu.theme.switchToDark', 'Switch to dark mode')}
        >
          {theme === 'dark' ? <PixelIcon name="sun" size={13} /> : <PixelIcon name="moon" size={13} />}
          <span>{theme === 'dark' ? t('menu.theme.light', 'Light') : t('menu.theme.dark', 'Dark')}</span>
        </button>
      </div>

      {openMenu && <div className="fixed inset-0 z-30" onClick={closeMenu} />}

      <Dialog open={showNameDialog} onClose={() => setShowNameDialog(false)} title={t('menu.artist.editTitle', 'Edit Artist Name')}>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted block mb-1.5">{t('menu.artist.nameLabel', 'Your name')}</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              data-dialog-autofocus="true"
              maxLength={28}
              className="w-full h-10 px-3 text-sm bg-background border border-border rounded-lg text-foreground outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent/30"
               placeholder={t('menu.artist.placeholder', 'Artist name...')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && nameInput.trim()) {
                  e.preventDefault();
                  submitNameChange();
                }
              }}
            />
            <p className="text-[10px] text-muted mt-1">{t('menu.artist.hint', 'This shows in the editor menu bar.')}</p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setShowNameDialog(false)}>
              {t('menu.artist.cancel', 'Cancel')}
            </Button>
            <Button
              data-dialog-default="true"
              size="sm"
              onClick={submitNameChange}
              disabled={!nameInput.trim()}
            >
              {t('menu.artist.save', 'Save')}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
