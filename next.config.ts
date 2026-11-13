import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== 'production';

// The disk-sync sidecar (guile-pix MCP server) lives on a different localhost
// port than the editor, so it is a different origin for CSP purposes. Without
// these entries the browser blocks every sidecar fetch/EventSource and the
// editor silently works standalone. Both host spellings share the configured
// port (NEXT_PUBLIC_GUILE_PIX_SIDECAR_URL, default http://127.0.0.1:3101).
let sidecarOrigins = 'http://127.0.0.1:3101 http://localhost:3101';
try {
  const sidecarPort = new URL(
    process.env.NEXT_PUBLIC_GUILE_PIX_SIDECAR_URL || 'http://127.0.0.1:3101',
  ).port || '3101';
  sidecarOrigins = `http://127.0.0.1:${sidecarPort} http://localhost:${sidecarPort}`;
} catch {
  // keep defaults
}

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self' data: blob:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  `connect-src 'self' ${sidecarOrigins} https://va.vercel-scripts.com https://vitals.vercel-insights.com${isDevelopment ? ' ws: wss:' : ''}`,
  "worker-src 'self' blob:",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
