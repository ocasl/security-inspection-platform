"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
// @ts-ignore
import imageData from "@/public/Thunderbit_ebc83b_20251017_032403.json"

// 从JSON中提取图片URL并创建xrayImages数组
const xrayImageUrls = imageData
  .map((item: any) => item.png || item.jpg || item.jpeg)
  .filter((url: string) => url)

// 日常违禁品类型列表（法院常见）
const threatTypes = ["液体超标", "打火机", "小刀", "剪刀", "钥匙扣工具", "充电宝", "喷雾", "酒类"]

const xrayImages = xrayImageUrls.map((url: string, index: number) => ({
  id: index + 1,
  path: url,
  threat: Math.random() > 0.85, // 15%概率有威胁（降低检出率）
  type: threatTypes[Math.floor(Math.random() * threatTypes.length)]
}))

interface XRayImageViewerProps {
  autoRotate?: boolean
  interval?: number
}

export function XRayImageViewer({ autoRotate = true, interval = 5000 }: XRayImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScanning, setIsScanning] = useState(true)

  useEffect(() => {
    if (!autoRotate) return
    
    const timer = setInterval(() => {
      setIsScanning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % xrayImages.length)
        setIsScanning(false)
      }, 1000)
    }, interval)

    return () => clearInterval(timer)
  }, [autoRotate, interval])

  const currentImage = xrayImages[currentIndex]

  return (
    <div className="relative rounded-lg border border-primary/30 bg-black aspect-video overflow-hidden group">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
      
      {/* X光图像 */}
      <div className="absolute inset-0">
        <img
          src={currentImage.path}
          alt={`X-ray scan ${currentImage.id}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isScanning ? 'opacity-50' : 'opacity-100'}`}
          style={{
            filter: 'contrast(1.2) brightness(1.1)',
          }}
        />
      </div>

      {/* 扫描线动画 */}
      {isScanning && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" 
               style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)' }} />
        </div>
      )}

      {/* 扫描网格 */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 212, 255, 0.3)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 顶部信息栏 */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
        <div className="flex gap-2">
          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs backdrop-blur-sm">
            {isScanning ? "扫描中..." : "扫描完成"}
          </Badge>
          {currentImage.threat && !isScanning && (
            <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-xs backdrop-blur-sm animate-pulse">
              威胁: {currentImage.type}
            </Badge>
          )}
        </div>
        <Badge className="bg-card/80 text-foreground border-border text-xs backdrop-blur-sm">
          ID: {currentImage.id}
        </Badge>
      </div>

      {/* 底部信息栏 */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-10">
        <div className="text-xs text-primary font-mono bg-card/80 px-2 py-1 rounded backdrop-blur-sm">
          SCAN: {new Date().toLocaleTimeString('zh-CN')}
        </div>
        <div className="flex gap-1">
          {xrayImages.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-primary w-4' 
                  : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 角落装饰 */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}

