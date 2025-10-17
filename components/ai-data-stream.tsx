"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

// 危险品类别
const threats = [
  "刀具", "枪支", "爆炸物", "易燃物", "腐蚀品", "利器", "管制刀", 
  "弹药", "毒品", "违禁药", "危险液体", "气体罐", "电击器",
]

// 生成随机分析数据
const generateAnalysisData = () => {
  const operations = [
    "扫描特征提取",
    "深度学习分析",
    "神经网络计算",
    "图像增强处理",
    "边缘检测运算",
    "形态学分析",
    "纹理特征识别",
    "密度分布计算",
    "威胁概率评估",
    "多维度特征融合",
    "卷积层前向传播",
    "池化层降维处理",
    "全连接层推理",
    "Softmax概率输出",
    "非极大值抑制",
  ]
  
  const threat = threats[Math.floor(Math.random() * threats.length)]
  const op = operations[Math.floor(Math.random() * operations.length)]
  const confidence = (Math.random() * 40 + 60).toFixed(2)
  const layer = Math.floor(Math.random() * 12) + 1
  const dim = `${Math.floor(Math.random() * 512) + 256}x${Math.floor(Math.random() * 512) + 256}`
  
  const templates = [
    `[Layer${layer}] ${op} → 特征维度: ${dim}`,
    `[威胁检测] ${threat} 置信度: ${confidence}%`,
    `[模型推理] Conv${layer} → ReLU → BatchNorm`,
    `[特征提取] 检测到可疑区域 [${Math.floor(Math.random() * 400)},${Math.floor(Math.random() * 300)}]`,
    `[数据增强] 旋转${Math.floor(Math.random() * 360)}° | 缩放${(Math.random() * 0.5 + 0.75).toFixed(2)}x`,
    `[分类器] ${threat} → P=${(Math.random() * 0.3 + 0.05).toFixed(4)}`,
    `[注意力机制] 关注区域: [${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 100)}]-[${Math.floor(Math.random() * 200) + 100},${Math.floor(Math.random() * 200) + 100}]`,
    `[损失函数] CrossEntropy = ${(Math.random() * 0.5).toFixed(6)}`,
    `[优化器] Adam学习率: ${(Math.random() * 0.001).toFixed(6)}`,
    `[正则化] Dropout=${(Math.random() * 0.3 + 0.2).toFixed(2)} | L2=${(Math.random() * 0.001).toFixed(5)}`,
    `[特征图] 通道${Math.floor(Math.random() * 512) + 64} | 激活值: ${(Math.random() * 10).toFixed(3)}`,
    `[后处理] IoU阈值: ${(Math.random() * 0.2 + 0.5).toFixed(2)} | NMS`,
  ]
  
  return templates[Math.floor(Math.random() * templates.length)]
}

interface DataLine {
  id: number
  text: string
  opacity: number
}

export function AIDataStream() {
  const [dataLines, setDataLines] = useState<DataLine[]>([])
  const [lineId, setLineId] = useState(0)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    // 添加新行的函数
    const addNewLine = () => {
      setDataLines(prevLines => {
        const newLine = {
          id: Date.now() + Math.random(), // 使用时间戳+随机数确保唯一性
          text: generateAnalysisData(),
          opacity: 1
        }
        
        // 保持最多15行
        const updated = [newLine, ...prevLines].slice(0, 15)
        
        // 更新透明度（越老的越透明）
        return updated.map((line, index) => ({
          ...line,
          opacity: 1 - (index * 0.07)
        }))
      })

      // 动态设置下一次的间隔（200-350ms）
      const nextDelay = Math.random() * 150 + 200
      intervalId = setTimeout(addNewLine, nextDelay)
    }

    // 初始化时添加几行
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        setDataLines(prev => {
          const newLine = {
            id: Date.now() + Math.random() + i,
            text: generateAnalysisData(),
            opacity: 1 - (i * 0.15)
          }
          return [...prev, newLine]
        })
      }, i * 200)
    }

    // 开始持续滚动
    setTimeout(() => {
      addNewLine()
    }, 1000)

    return () => {
      if (intervalId) clearTimeout(intervalId)
    }
  }, [])

  return (
    <Card className="shadow-lg border border-primary/30 shadow-primary/10 bg-card/50 backdrop-blur-sm h-full">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse animation-delay-200" />
            <div className="w-2 h-2 rounded-full bg-chart-2 animate-pulse animation-delay-400" />
          </div>
          <span className="text-sm font-mono font-semibold text-foreground">
            AI DEEP LEARNING ANALYSIS
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          NEURAL NETWORK PROCESSING... <span className="text-primary animate-pulse">█</span>
        </p>
      </div>
      
      <div className="relative h-[500px] overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        {/* 背景网格 */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 150, 255, .05) 25%, rgba(0, 150, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 150, 255, .05) 75%, rgba(0, 150, 255, .05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 150, 255, .05) 25%, rgba(0, 150, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 150, 255, .05) 75%, rgba(0, 150, 255, .05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* 数据流 */}
        <div className="relative z-10 p-4 font-mono text-xs space-y-1">
          {dataLines.map((line) => (
            <div
              key={line.id}
              className="transition-all duration-300 ease-out"
              style={{
                opacity: line.opacity,
                transform: `translateY(${line.opacity < 0.5 ? '10px' : '0'})`,
              }}
            >
              <div className="flex items-start gap-2">
                <span className="text-primary shrink-0">&gt;</span>
                <span className="text-foreground/80">{line.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 底部渐变遮罩 */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>

      {/* 底部状态栏 */}
      <div className="px-4 py-2 border-t border-border/50 bg-muted/30">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              GPU: <span className="text-primary">87%</span>
            </span>
            <span className="text-muted-foreground">
              RAM: <span className="text-chart-2">12.4GB</span>
            </span>
            <span className="text-muted-foreground">
              FPS: <span className="text-foreground">60</span>
            </span>
          </div>
          <div className="text-primary animate-pulse">
            PROCESSING...
          </div>
        </div>
      </div>
    </Card>
  )
}

