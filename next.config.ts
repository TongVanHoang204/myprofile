import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com https://www.igloo.inc https:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.igloo.inc https:",
      "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.igloo.inc https:",
      "script-src 'self' 'unsafe-inline' https://www.igloo.inc https:",
      "connect-src 'self' https://www.igloo.inc https://fonts.googleapis.com https://fonts.gstatic.com https://www.youtube.com https://*.youtube.com https:",
      "media-src 'self' https://audio-ssl.itunes.apple.com https://*.itunes.apple.com https://*.mzstatic.com blob:",
      "frame-src 'self' https://open.spotify.com https://www.youtube.com https://*.youtube.com",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Fix for "Next.js inferred your workspace root... but it may not be correct"
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
