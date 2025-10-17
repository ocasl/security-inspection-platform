/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置（用于Tomcat部署）
  output: 'export',
  
  // Tomcat部署路径
  basePath: '/security-inspection',
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // 禁用不支持的功能
  trailingSlash: true,
}

export default nextConfig
