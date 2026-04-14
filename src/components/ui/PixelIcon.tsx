'use client';

import { PIXEL_ICONS, type PixelIconName } from '@/constants/pixelIcons';

interface PixelIconProps {
  name: PixelIconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PixelIcon({ name, size = 14, className = '', style }: PixelIconProps) {
  const file = PIXEL_ICONS[name];

  return (
    <img
      src={`/icons/${file}.png`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className={className}
      style={{
        imageRendering: 'pixelated',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
      onError={(e) => {
        // Fallback: hide broken image, show placeholder
        const el = e.currentTarget;
        el.style.display = 'none';
      }}
    />
  );
}
