/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // No lado do cliente, substitua 'canvas' por um módulo vazio
      config.resolve.alias['canvas'] = false;
    }
    return config;
  },
  images: {
    //domains: ['api.stagingfy.com'],  // Adicione seu domínio aqui
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.stagingfy.com',
        port: '',
        pathname: '/storage/**',
        search: '',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/agents/:slug/connect',
        destination: '/agents/:slug/connect/embed',
        permanent: true,
      },

    ];
  },
  async headers() {
    return [
      {
        source: '/embed.min.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' https://chatagentes.com; frame-src https://chatagentes.com;"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
