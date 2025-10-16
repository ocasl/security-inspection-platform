"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateDetectionRecords, prohibitedItems } from "@/lib/mock-data"
import { Upload, Image as ImageIcon, AlertTriangle, CheckCircle2, XCircle, Search, Filter } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { useState } from "react"

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

      {/* 实时识别演示 */}
      <Card>
        <CardHeader>
          <CardTitle>实时识别</CardTitle>
          <CardDescription>上传X光图像进行AI智能识别</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">拖拽图像到这里或点击上传</p>
                <Button variant="outline" size="sm">
                  选择文件
                </Button>
              </div>

              <div className="space-y-2">
                <Label>选择AI模型</Label>
                <Select defaultValue="main">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">违禁品检测主模型 v3.2.1</SelectItem>
                    <SelectItem value="liquid">液体检测专用模型 v2.1.0</SelectItem>
                    <SelectItem value="knife">刀具识别模型 v4.0.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>置信度阈值</Label>
                <Input type="number" min="0" max="1" step="0.01" defaultValue="0.75" />
                <p className="text-xs text-muted-foreground">低于此阈值的结果将标记为可疑</p>
              </div>

              <Button className="w-full">
                开始识别
              </Button>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/50 aspect-video flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="h-16 w-16 mx-auto mb-2" />
                  <p className="text-sm">识别结果将在这里显示</p>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">识别详情</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">检测结果</span>
                    <Badge>等待识别</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">置信度</span>
                    <span>--</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">处理时间</span>
                    <span>--</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">检出物品</span>
                    <span>--</span>
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
                <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
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
                      {formatDistanceToNow(new Date(detection.timestamp), { 
                        addSuffix: true,
                        locale: zhCN 
                      })}
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

