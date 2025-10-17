# X光数据集集成说明

## 📊 数据集信息

### HUMS X-ray Dataset
- **来源**: 双能量X光扫描仪采集的真实数据
- **用途**: 刀具威胁检测
- **格式**: Pascal VOC标注格式

### 数据集结构

```
lib/HUMS-X-ray-Dataset-main/
├── ThreatsRGB/          # 150张威胁物品RGB图像（JPG）
│   ├── pngImg_1.jpg
│   ├── pngImg_2.jpg
│   └── ...
├── NotThreats/          # 275张安全物品图像（TIFF）
├── HighLow/             # 164张高低能量图像（TIFF）
└── Annotation/          # 150个XML标注文件（Pascal VOC格式）
    ├── pngImg_1.xml
    └── ...
```

### 标注信息示例

```xml
<object>
  <name>Knife</name>
  <bndbox>
    <xmin>1</xmin>
    <ymin>1</ymin>
    <xmax>330</xmax>
    <ymax>89</ymax>
  </bndbox>
</object>
```

## 🎨 集成实现

### 1. 图片存储
- **位置**: `public/xray-images/`
- **已复制图片**:
  - pngImg_1.jpg - 刀具威胁
  - pngImg_2.jpg - 刀具威胁
  - pngImg_3.jpg - 刀具威胁
  - pngImg_5.jpg - 刀具威胁
  - pngImg_10.jpg - 刀具威胁
  - image_0_1000.jpg - 刀具威胁

### 2. 组件实现

#### XRayImageViewer 组件
**位置**: `components/xray-image-viewer.tsx`

**功能**:
- ✨ 自动轮播显示真实X光图片
- 🔍 扫描线动画效果
- 🌐 扫描网格背景
- 🏷️ 威胁物品标签显示
- ⏱️ 实时时间显示
- 📍 图片索引指示器
- 🎯 四角装饰边框

**Props**:
```typescript
interface XRayImageViewerProps {
  autoRotate?: boolean  // 是否自动轮播，默认true
  interval?: number     // 轮播间隔（毫秒），默认5000
}
```

**使用示例**:
```tsx
<XRayImageViewer autoRotate={true} interval={8000} />
```

### 3. 页面集成

#### 首页 (app/page.tsx)
- ✅ 添加"实时X光扫描监控"卡片
- ✅ 8秒轮播间隔
- ✅ 展示真实威胁物品检测

#### 图像识别页 (app/detection/page.tsx)
- ✅ 替换SVG模拟图为真实X光图片
- ✅ 6秒轮播间隔
- ✅ AI巡检动画配合真实图片

### 4. 视觉效果

#### 扫描动画
```css
@keyframes scan-line {
  0% { top: 0; }
  100% { top: 100%; }
}
```

#### 图片处理
```css
filter: contrast(1.2) brightness(1.1);
```
- 增强对比度
- 提高亮度
- 模拟真实X光效果

#### 扫描网格
- SVG pattern实现
- 40x40网格
- 半透明青色线条

## 🎯 显示特性

### 实时信息显示
- **顶部左侧**: 扫描状态 + 威胁警告
- **顶部右侧**: 图片ID
- **底部左侧**: 扫描时间
- **底部右侧**: 轮播指示器

### 威胁检测标识
- 🔴 红色脉冲徽章
- 自动识别威胁类型
- 动画提示效果

### 交互效果
- 扫描中：图片半透明 + 扫描线动画
- 扫描完成：图片完全显示 + 威胁标签

## 📈 数据统计

### 当前数据集
- **威胁图片**: 6张（已集成）
- **检测类型**: 刀具（Knife）
- **图片格式**: JPG
- **分辨率**: 变化（保持原始比例）

### 可扩展性
- 可添加更多威胁类型
- 支持NotThreats图片（需转换格式）
- 支持自定义标注信息

## 🔧 技术实现

### 图片加载
- Next.js Image组件
- 自动优化
- 响应式布局
- object-contain适配

### 状态管理
```typescript
const [currentIndex, setCurrentIndex] = useState(0)
const [isScanning, setIsScanning] = useState(true)
```

### 自动轮播
```typescript
useEffect(() => {
  const timer = setInterval(() => {
    setIsScanning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % xrayImages.length)
      setIsScanning(false)
    }, 1000)
  }, interval)
  return () => clearInterval(timer)
}, [autoRotate, interval])
```

## 🎨 样式特点

### 暗色科技风格
- 黑色背景 + 霓虹边框
- 青色主题色
- 发光效果
- 毛玻璃质感

### 动画效果
- 扫描线上下移动（1秒）
- 图片淡入淡出
- 脉冲警告动画
- 轮播指示器过渡

## 📝 未来扩展

### 待实现功能
- [ ] 添加更多X光图片
- [ ] 支持放大查看
- [ ] 标注框绘制（基于XML数据）
- [ ] 手动切换图片
- [ ] 威胁物品统计
- [ ] 图片分类筛选

### 数据增强
- [ ] 转换NotThreats TIFF图片
- [ ] 整合HighLow能量级别图片
- [ ] 生成更多威胁类型标签
- [ ] 添加置信度显示

## 🚀 部署注意事项

### Cloudflare Pages
- ✅ 图片已放在public目录
- ✅ 静态资源自动优化
- ✅ 全球CDN加速
- ✅ 自动HTTPS

### 性能优化
- Next.js Image自动优化
- 懒加载
- 响应式图片
- 浏览器缓存

---

**更新时间**: 2025-10-16  
**数据集**: HUMS X-ray Dataset  
**集成页面**: 首页、图像识别页

