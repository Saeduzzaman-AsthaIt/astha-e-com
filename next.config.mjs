/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "img.lemde.fr",
      "occ-0-8407-2705.1.nflxso.net",
      "images.secretlab.co",
      "via.placeholder.com",
      "images.pokemontcg.io"
    ],
  },
  transpilePackages: [
    'rc-util',
    '@ant-design',
    // 'kitchen-flow-editor',
    '@ant-design/pro-editor',
    // 'zustand', 'leva', 'antd',
    'rc-pagination',
    'rc-picker'
  ],
};

export default nextConfig;
