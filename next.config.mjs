/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Turbopack scoped to this repository when a lockfile exists in a
  // parent directory.
  turbopack: {
    root: process.cwd(),
  },
};


export default nextConfig;
