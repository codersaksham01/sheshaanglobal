/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sheshaanglobal.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/products/fresh-onions",
        destination: "/products/fresh-vegetables/fresh-onion-exporter-india",
        permanent: true,
      },
      {
        source: "/products/green-chillies",
        destination: "/products/fresh-vegetables/green-chilli-exporter-india",
        permanent: true,
      },
      {
        source: "/products/premium-rice",
        destination: "/products/grains-pulses/basmati-rice-exporter-india",
        permanent: true,
      },
      {
        source: "/products/coconut-brown-husked",
        destination: "/products/fresh-fruits/mature-coconut-exporter-india",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
