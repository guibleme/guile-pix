/**
 * Map of semantic icon names → PNG filenames in /icons/.
 * All icons are 32x32 sprites rendered at 4x (128x128 PNGs).
 */
export const PIXEL_ICONS = {
  // Drawing Tools
  brush: 'brush_icon_32',
  eraser: 'eraser_icon_32',
  fill: 'fill_icon_32',
  eyedropper: 'eyedropper_icon_32',
  line: 'line_icon_32',
  rect: 'rect_icon_32',
  select: 'select_icon_32',
  wand: 'wand_icon_32',

  // Navigation & Actions
  undo: 'undo_icon_32',
  redo: 'redo_icon_32',
  save: 'save_icon_32',
  load: 'load_icon_32',
  history: 'history_icon_32',
  rotate3d: 'rotate3d_icon_32',
  home: 'home_icon_32',

  // Layer Controls
  plus: 'plus_icon_32',
  trash: 'trash_icon_32',
  copy: 'copy_icon_32',
  eye: 'eye_icon_32',
  eyeOff: 'eye_off_icon_32',
  lock: 'lock_icon_32',
  unlock: 'unlock_icon_32',
  arrowUp: 'arrow_up_icon_32',
  arrowDown: 'arrow_down_icon_32',

  // Timeline
  play: 'play_icon_32',
  pause: 'pause_icon_32',
  stop: 'stop_icon_32',
  loop: 'loop_icon_32',
  link: 'link_icon_32',
  unlink: 'unlink_icon_32',

  // Palette
  swapColors: 'swap_colors_icon_32',
  colorRamp: 'color_ramp_icon_32',

  // General UI
  close: 'close_icon_32',
  check: 'check_icon_32',
  search: 'magnify_icon_32',
  settings: 'gear_settings_icon_32',
  arrowLeft: 'arrow_left_icon_32',
  sparkles: 'sparkles_icon_32',
  loader: 'loader_icon_32',

  // App Branding
  dog: 'dog_icon_32',
  sun: 'sun_icon_32',
  moon: 'moon_icon_32',
  globe: 'globe_icon_32',
} as const;

export type PixelIconName = keyof typeof PIXEL_ICONS;
