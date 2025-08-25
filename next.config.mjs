/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable problematic features that might cause WebAssembly issues
    esmExternals: 'loose',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure proper handling of WebAssembly
  webpack: (config, { isServer }) => {
    // Handle WebAssembly modules
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    }

    // Fix for WebAssembly compilation issues
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    })

    // Optimize for better compatibility
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    return config
  },
  // Disable SWC minifier if it's causing issues
  swcMinify: false,
  // Use Terser instead
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig
