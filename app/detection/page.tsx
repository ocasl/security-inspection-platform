"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateDetectionRecords, prohibitedItems } from "@/lib/mock-data"
import { Upload, Image as ImageIcon, AlertTriangle, CheckCircle2, XCircle, Search, Filter, Scan, Activity } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { XRayImageViewer } from "@/components/xray-image-viewer"
// 不再需要NextImage，使用普通img标签显示外部URL

// @ts-ignore
import imageData from "@/public/Thunderbit_ebc83b_20251017_032403.json"

// X光图片列表 - 从JSON中提取
const xrayImages = imageData
  .map((item: any) => item.png || item.jpg || item.jpeg)
  .filter((url: string) => url)

// 随机获取X光图片
const getRandomXrayImage = (id: string) => {
  const index = parseInt(id.replace(/\D/g, '')) % xrayImages.length
  return xrayImages[index]
}

export default function DetectionPage() {
  const [filterResult, setFilterResult] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  const allDetections = generateDetectionRecords(50).sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const filteredDetections = allDetections.filter(d => {
    const matchesFilter = filterResult === "all" || d.aiResult === filterResult
    const matchesSearch = searchQuery === "" || 
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.deviceId.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getResultIcon = (result: string) => {
    switch (result) {
      case "安全": return <CheckCircle2 className="h-5 w-5 text-chart-2" />
      case "可疑": return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "危险": return <AlertTriangle className="h-5 w-5 text-destructive" />
      case "未识别": return <XCircle className="h-5 w-5 text-muted-foreground" />
      default: return null
    }
  }

  const getResultVariant = (result: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (result) {
      case "安全": return "default"
      case "可疑": return "secondary"
      case "危险": return "destructive"
      case "未识别": return "outline"
      default: return "secondary"
    }
  }

  const stats = {
    total: allDetections.length,
    safe: allDetections.filter(d => d.aiResult === "安全").length,
    suspicious: allDetections.filter(d => d.aiResult === "可疑").length,
    dangerous: allDetections.filter(d => d.aiResult === "危险").length,
    unrecognized: allDetections.filter(d => d.aiResult === "未识别").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">图像识别</h1>
          <p className="text-muted-foreground mt-2">X光图像AI智能识别与违禁品检测</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          上传图像
        </Button>
      </div>

      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总检测数</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">安全通过</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{stats.safe}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((stats.safe / stats.total) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">可疑物品</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.suspicious}</div>
            <p className="text-xs text-muted-foreground mt-1">
              需人工复核
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">危险物品</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.dangerous}</div>
            <p className="text-xs text-muted-foreground mt-1">
              已触发报警
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">未识别</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unrecognized}</div>
            <p className="text-xs text-muted-foreground mt-1">
              待加入训练
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI智能巡检动画 */}
      <Card className="shadow-lg border border-primary/30 shadow-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Scan className="h-5 w-5 text-primary animate-pulse" />
                  AI智能巡检系统
                </CardTitle>
                <CardDescription>智慧安检管理平台 - 广东守门神科技集团</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="relative border-2 border-primary/30 rounded-lg p-8 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                {/* 扫描动画 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-scan" />
                
                <div className="relative z-10 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 animate-pulse">
                    <Scan className="h-10 w-10 text-primary animate-spin-slow" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-primary animate-pulse">AI算法正在巡视中...</p>
                    <p className="text-sm text-muted-foreground">实时扫描 · 智能识别 · 自动预警</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <div className="w-2 h-2 rounded-full bg-chart-2 animate-ping animation-delay-200" />
                    <div className="w-2 h-2 rounded-full bg-accent animate-ping animation-delay-400" />
                  </div>
                </div>
              </div>

              <Card className="bg-card/80 border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4 text-accent" />
                    实时状态
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">巡检模式</span>
                    <Badge className="bg-primary/20 text-primary border-primary/30">自动巡检</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AI模型</span>
                    <span className="text-foreground">违禁品检测 v3.2.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">巡检周期</span>
                    <span className="text-primary font-semibold"></span>
                  </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">已处理</span>
                                <span className="text-chart-2 font-semibold">6,347 件</span>
                              </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {/* 真实X光安检图像 */}
              <XRayImageViewer autoRotate={true} interval={6000} />

              <Card className="bg-card/80 border-destructive/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />
                    检测详情
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">扫描状态</span>
                    <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">监控中</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">准确率</span>
                    <span className="text-chart-2 font-semibold">96.8%</span>
                  </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">违禁品检出</span>
                                <span className="text-destructive font-semibold">45 件</span>
                              </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">最后扫描</span>
                    <span className="text-foreground">2025-04-30 18:00</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 历史记录 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>检测历史</CardTitle>
              <CardDescription>查看所有的图像识别记录</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索记录..."
                  className="pl-8 w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterResult} onValueChange={setFilterResult}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部结果</SelectItem>
                  <SelectItem value="安全">安全</SelectItem>
                  <SelectItem value="可疑">可疑</SelectItem>
                  <SelectItem value="危险">危险</SelectItem>
                  <SelectItem value="未识别">未识别</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredDetections.slice(0, 20).map((detection) => (
              <div
                key={detection.id}
                className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-black flex-shrink-0 relative border border-primary/20">
                  <img
                    src={getRandomXrayImage(detection.id)}
                    alt="X-ray scan"
                    className="w-full h-full object-cover"
                    style={{ filter: 'contrast(1.2) brightness(1.1)' }}
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getResultIcon(detection.aiResult)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{detection.id}</span>
                          <Badge variant={getResultVariant(detection.aiResult)}>
                            {detection.aiResult}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {detection.deviceId}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(detection.timestamp), "yyyy-MM-dd HH:mm")}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      置信度: <span className="font-medium text-foreground">
                        {(detection.confidence * 100).toFixed(1)}%
                      </span>
                    </span>
                    <span className="text-muted-foreground">
                      处理时间: <span className="font-medium text-foreground">
                        {detection.processingTime.toFixed(0)}ms
                      </span>
                    </span>
                  </div>

                  {detection.detectedItems.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">检出物品:</p>
                      <div className="flex flex-wrap gap-2">
                        {detection.detectedItems.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {item.category} ({(item.confidence * 100).toFixed(1)}%)
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {detection.humanReview && (
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">人工复核:</span>
                      <Badge variant="secondary" className="text-xs">{detection.humanReview}</Badge>
                      {detection.humanReviewer && (
                        <span className="text-xs text-muted-foreground">{detection.humanReviewer}</span>
                      )}
                    </div>
                  )}

                  {detection.needsTraining && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        建议加入训练样本
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline">查看详情</Button>
                  {detection.aiResult !== "安全" && !detection.humanReview && (
                    <Button size="sm" variant="default">人工复核</Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredDetections.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>没有找到匹配的检测记录</p>
            </div>
          )}

          {filteredDetections.length > 20 && (
            <div className="text-center pt-4">
              <Button variant="outline">加载更多</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

