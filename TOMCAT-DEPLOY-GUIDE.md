# Tomcat 部署指南

## 📦 打包文件位置

### ✅ 已生成的文件

**打包目录**:
```
E:\CODE\security-inspection-platform\out\
```

**ZIP压缩包**:
```
E:\CODE\security-inspection-platform\security-inspection.zip
```

---

## 🚀 快速部署步骤

### 方式一：直接复制文件夹（推荐）

1. **复制整个 `out` 目录**
   ```
   源目录: E:\CODE\security-inspection-platform\out
   ```

2. **粘贴到 Tomcat webapps 目录**
   ```
   目标: <TOMCAT_HOME>\webapps\security-inspection\
   ```
   
   例如：
   ```
   C:\Apache\Tomcat9.0\webapps\security-inspection\
   ```

3. **访问应用**
   ```
   http://localhost:8080/security-inspection/
   ```

---

### 方式二：使用 ZIP 压缩包

1. **解压 `security-inspection.zip`**
   ```
   位置: E:\CODE\security-inspection-platform\security-inspection.zip
   ```

2. **将解压内容复制到 Tomcat**
   ```
   目标: <TOMCAT_HOME>\webapps\security-inspection\
   ```

3. **访问应用**
   ```
   http://localhost:8080/security-inspection/
   ```

---

## 📁 目录结构

### 打包后的 `out` 目录内容

```
out/
├── _next/                          # Next.js 静态资源
│   ├── static/
│   │   ├── chunks/                # JavaScript 代码块
│   │   ├── css/                   # 样式文件
│   │   └── media/                 # 媒体文件
│   └── ...
├── 404/                           # 404 页面
│   └── index.html
├── analytics/                     # 数据分析页面
│   └── index.html
├── detection/                     # 检测记录页面
│   └── index.html
├── events/                        # 事件管理页面
│   └── index.html
├── learning/                      # AI学习中心页面
│   └── index.html
├── models/                        # 模型管理页面
│   └── index.html
├── monitoring/                    # 实时监控页面
│   └── index.html
├── reports/                       # 报表统计页面
│   └── index.html
├── review/                        # 人工复核页面
│   └── index.html
├── samples/                       # 样本管理页面
│   └── index.html
├── settings/                      # 系统设置页面
│   └── index.html
├── 404.html                       # 404 错误页面
├── index.html                     # 主页
├── header.png                     # 页面头部图片
├── qrcode.jpg                     # 二维码
├── Thunderbit_ebc83b_20251017_032403.json  # X光图片数据
└── placeholder-*.* (多个)         # 占位图片
```

---

## ⚙️ 配置说明

### `next.config.mjs` 配置

```javascript
const nextConfig = {
  // 静态导出配置
  output: 'export',
  
  // 子目录路径配置
  basePath: '/security-inspection',
  assetPrefix: '/security-inspection',
  
  // 其他配置...
}
```

**说明**:
- `output: 'export'` - 启用静态HTML导出
- `basePath: '/security-inspection'` - 应用部署在 `/security-inspection` 路径下
- `assetPrefix: '/security-inspection'` - 静态资源前缀

---

## 🔧 部署到不同路径

### 如果要部署到根路径

**修改 `next.config.mjs`**:
```javascript
const nextConfig = {
  output: 'export',
  // basePath: '/security-inspection',      // ← 注释掉
  // assetPrefix: '/security-inspection',   // ← 注释掉
  // ...
}
```

**重新打包**:
```bash
npm run tomcat:build
```

**部署**:
```
复制到: <TOMCAT_HOME>\webapps\ROOT\
访问: http://localhost:8080/
```

---

### 如果要部署到自定义路径

**修改 `next.config.mjs`**:
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/your-custom-path',      // ← 修改为你的路径
  assetPrefix: '/your-custom-path',   // ← 修改为你的路径
  // ...
}
```

**重新打包**:
```bash
npm run tomcat:build
```

**部署**:
```
复制到: <TOMCAT_HOME>\webapps\your-custom-path\
访问: http://localhost:8080/your-custom-path/
```

---

## 📝 package.json 脚本说明

### 可用的打包命令

```json
{
  "scripts": {
    "tomcat:build": "next build",
    "tomcat:package-zip": "npm run tomcat:build && powershell Compress-Archive -Path out/* -DestinationPath security-inspection.zip -Force"
  }
}
```

**使用方法**:

1. **只构建（生成 out 目录）**
   ```bash
   npm run tomcat:build
   ```

2. **构建并打包成 ZIP**
   ```bash
   npm run tomcat:package-zip
   ```

---

## 🌐 访问地址

### 本地 Tomcat (默认端口 8080)

```
主页:         http://localhost:8080/security-inspection/
数据分析:     http://localhost:8080/security-inspection/analytics/
检测记录:     http://localhost:8080/security-inspection/detection/
事件管理:     http://localhost:8080/security-inspection/events/
AI学习中心:   http://localhost:8080/security-inspection/learning/
模型管理:     http://localhost:8080/security-inspection/models/
实时监控:     http://localhost:8080/security-inspection/monitoring/
报表统计:     http://localhost:8080/security-inspection/reports/
人工复核:     http://localhost:8080/security-inspection/review/
样本管理:     http://localhost:8080/security-inspection/samples/
系统设置:     http://localhost:8080/security-inspection/settings/
```

### 服务器部署

```
http://your-server-ip:8080/security-inspection/
http://your-domain.com:8080/security-inspection/
```

---

## 🔍 验证部署

### 1. 检查文件是否正确复制

**Tomcat目录应该包含**:
```
<TOMCAT_HOME>\webapps\security-inspection\
├── _next\
├── 404\
├── analytics\
├── ... (其他页面目录)
├── index.html
└── ... (其他文件)
```

### 2. 启动 Tomcat

**Windows**:
```bash
cd <TOMCAT_HOME>\bin
startup.bat
```

**Linux/Mac**:
```bash
cd <TOMCAT_HOME>/bin
./startup.sh
```

### 3. 访问测试

打开浏览器访问:
```
http://localhost:8080/security-inspection/
```

**应该看到**:
- ✅ 智慧安检管理平台首页
- ✅ 导航菜单正常显示
- ✅ X光实时监控正常运行
- ✅ 所有链接可以点击

---

## 🛠️ 常见问题

### 问题 1: 页面无法访问（404错误）

**原因**: 
- 路径配置不正确
- 文件没有正确复制

**解决方案**:
1. 检查 `basePath` 是否与 Tomcat 目录名一致
2. 确认文件完整复制到 webapps 目录
3. 重启 Tomcat 服务器

---

### 问题 2: 样式丢失（页面显示异常）

**原因**: 
- 静态资源路径不正确

**解决方案**:
1. 检查 `assetPrefix` 配置
2. 确认 `_next` 目录已正确复制
3. 清除浏览器缓存后重试

---

### 问题 3: 图片无法显示

**原因**: 
- 外部图片URL被防火墙拦截
- JSON文件未正确复制

**解决方案**:
1. 确认 `Thunderbit_ebc83b_20251017_032403.json` 已复制
2. 检查网络连接（外部图片需要联网）
3. 查看浏览器控制台的错误信息

---

### 问题 4: 路由跳转失败

**原因**: 
- Next.js 路由配置问题

**解决方案**:
1. 确认 `trailingSlash: true` 已配置
2. 访问URL时确保以 `/` 结尾
3. 例如: `http://localhost:8080/security-inspection/analytics/`

---

## 📊 文件大小参考

```
out/ 目录总大小: 约 5-10 MB
security-inspection.zip: 约 2-4 MB（压缩后）
```

**主要组成**:
- JavaScript代码: ~1-2 MB
- CSS样式: ~100-200 KB
- 图片资源: ~200 KB
- JSON数据: ~26 KB
- HTML页面: ~500 KB

---

## 🚀 生产环境部署建议

### 1. 启用GZIP压缩

**Tomcat `server.xml` 配置**:
```xml
<Connector port="8080" 
           compression="on"
           compressionMinSize="2048"
           noCompressionUserAgents="gozilla, traviata"
           compressibleMimeType="text/html,text/xml,text/plain,text/css,text/javascript,application/javascript,application/json"/>
```

### 2. 设置缓存策略

**创建 `WEB-INF/web.xml`**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
         http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    
    <!-- 缓存静态资源 -->
    <filter>
        <filter-name>CacheFilter</filter-name>
        <filter-class>org.apache.catalina.filters.ExpiresFilter</filter-class>
        <init-param>
            <param-name>ExpiresByType image</param-name>
            <param-value>access plus 1 month</param-value>
        </init-param>
        <init-param>
            <param-name>ExpiresByType text/css</param-name>
            <param-value>access plus 1 week</param-value>
        </init-param>
        <init-param>
            <param-name>ExpiresByType application/javascript</param-name>
            <param-value>access plus 1 week</param-value>
        </init-param>
    </filter>
    
    <filter-mapping>
        <filter-name>CacheFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    
</web-app>
```

### 3. 配置错误页面

**在 `web.xml` 中添加**:
```xml
<error-page>
    <error-code>404</error-code>
    <location>/404.html</location>
</error-page>
```

---

## 📋 部署检查清单

### 部署前
- [ ] 确认 `next.config.mjs` 配置正确
- [ ] 运行 `npm run tomcat:build` 成功
- [ ] `out` 目录生成完整
- [ ] 本地测试通过

### 部署中
- [ ] 复制所有文件到 Tomcat webapps
- [ ] 目录名与 `basePath` 一致
- [ ] 文件权限正确（Linux）

### 部署后
- [ ] Tomcat 成功启动
- [ ] 主页可以访问
- [ ] 所有页面链接正常
- [ ] 图片正常显示
- [ ] 数据正常加载

---

## 🎯 快速命令参考

### 构建和打包
```bash
# 只构建
npm run tomcat:build

# 构建并打包成ZIP
npm run tomcat:package-zip
```

### 查看打包结果
```bash
# 查看out目录
ls out

# 查看ZIP文件
ls security-inspection.zip
```

### 复制到Tomcat (PowerShell)
```powershell
# 复制整个目录
Copy-Item -Path "out\*" -Destination "C:\Tomcat\webapps\security-inspection\" -Recurse -Force
```

### 复制到Tomcat (CMD)
```cmd
xcopy /E /I /Y out C:\Tomcat\webapps\security-inspection
```

---

## 📞 技术支持

### 相关文档
- Next.js 静态导出: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- Tomcat 部署指南: https://tomcat.apache.org/tomcat-9.0-doc/deployer-howto.html

### 项目信息
- **项目名称**: 智慧安检管理平台
- **公司**: 广东守门神科技集团
- **版本**: SMS-ZHAJ-1
- **部署路径**: `/security-inspection`

---

## ✅ 部署完成

恭喜！如果你看到这个文档，说明你已经成功配置了部署环境。

**下一步**:
1. 复制 `out` 目录或解压 `security-inspection.zip`
2. 粘贴到 Tomcat 的 `webapps\security-inspection\` 目录
3. 启动 Tomcat
4. 访问 `http://localhost:8080/security-inspection/`

🎉 **享受你的智慧安检管理平台！**

