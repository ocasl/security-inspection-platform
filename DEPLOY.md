# Cloudflare Pages 部署指南

## 📋 Cloudflare Pages 构建配置

在 Cloudflare Pages 控制台中，使用以下配置：

### 构建设置

```
框架预设: Next.js (Static HTML Export)
构建命令: pnpm build
构建输出目录: out
根目录: /
Node.js 版本: 18
包管理器: pnpm
```

### 环境变量（可选）

如果需要，可以添加以下环境变量：

```
NODE_VERSION=18
SKIP_INSTALL_DEPS=false
```

## 🚀 部署步骤

### 方法一：通过 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** 页面
3. 点击 **Create a project**
4. 连接你的 Git 仓库（GitHub/GitLab）
5. 选择你的项目仓库
6. 配置构建设置（使用上面的配置）
7. 点击 **Save and Deploy**

### 方法二：使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 构建项目
pnpm build

# 部署到 Cloudflare Pages
wrangler pages deploy out --project-name=security-inspection-platform
```

## 📝 配置说明

### Next.js 配置 (next.config.mjs)

项目已配置为静态导出模式：

```javascript
output: 'export'           // 启用静态导出
trailingSlash: true        // URL 以斜杠结尾
images: {
  unoptimized: true        // 禁用图像优化（CF Pages 不支持）
}
```

### 构建产物

- 构建命令会生成静态文件到 `out` 目录
- 所有页面都会预渲染为静态 HTML
- 支持客户端路由和动态交互

## ⚠️ 注意事项

1. **静态导出限制**：
   - 不支持 Next.js API Routes
   - 不支持服务器端渲染 (SSR)
   - 不支持图像优化
   - 不支持 ISR（增量静态再生成）

2. **已处理的兼容性**：
   - ✅ 移除了 Vercel Analytics
   - ✅ 配置了静态导出
   - ✅ 禁用了图像优化
   - ✅ 所有页面都是客户端组件或静态页面

3. **性能优化**：
   - Cloudflare Pages 提供全球 CDN
   - 自动 HTTPS
   - 自动预览部署

## 🔧 本地测试静态导出

在部署前，可以本地测试静态导出：

```bash
# 构建静态文件
pnpm build

# 使用任意静态服务器预览
npx serve out

# 或使用 http-server
npx http-server out
```

## 📊 构建成功标志

构建成功后，你会看到：

```
✓ Generating static pages (14/14)
✓ Finalizing page optimization
✓ Collecting build traces
✓ Export successful. Files written to out
```

## 🌐 自定义域名

部署成功后，可以在 Cloudflare Pages 设置中：

1. 进入项目设置
2. 点击 **Custom domains**
3. 添加你的域名
4. 按照提示配置 DNS

## 🔄 自动部署

连接 Git 仓库后，每次推送代码都会自动触发构建和部署：

- `main` 分支 → 生产环境
- 其他分支 → 预览环境（独立 URL）

## 📞 需要帮助？

如果遇到问题，检查：

1. 构建日志中是否有错误
2. Node.js 版本是否正确（18+）
3. 所有依赖是否正确安装
4. `out` 目录是否正确生成

---

**项目**: 智慧安检管理平台  
**框架**: Next.js 15 + React 18  
**部署平台**: Cloudflare Pages

