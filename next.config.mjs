/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://github.com/Lorenzo0111/DownloadTracker",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
