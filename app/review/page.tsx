"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { generateDetectionRecords } from "@/lib/mock-data"
import { CheckCircle2, XCircle, AlertTriangle, Image as ImageIcon, Clock, User } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
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

export default function ReviewPage() {
  const [selectedReview, setSelectedReview] = useState<string>("confirm")
  const [reviewComment, setReviewComment] = useState("")
  const [selectedDetection, setSelectedDetection] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // 筛选需要人工复核的记录
  const pendingReviews = generateDetectionRecords(100)
    .filter(d => d.aiResult !== "安全" || d.needsTraining)
    .filter(d => !d.humanReview || d.humanReview === "待审核")
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 15)

  const reviewedRecords = generateDetectionRecords(100)
    .filter(d => d.humanReview && d.humanReview !== "待审核")
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 20)

  const stats = {
    pending: pendingReviews.length,
    reviewed: reviewedRecords.length,
    todayReviewed: Math.floor(reviewedRecords.length * 0.3),
    avgTime: "2.5分钟"
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

  const handleSelectDetection = (detection: any) => {
    setSelectedDetection(detection)
    setSubmitSuccess(false)
    setReviewComment("")
  }

  const handleSubmitReview = () => {
    if (!selectedDetection) return
    
    setIsSubmitting(true)
    // 模拟提交过程
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        setSelectedDetection(null)
        setReviewComment("")
      }, 2000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">人工复核</h1>
        <p className="text-muted-foreground mt-2">AI+人工双重识别，确保检测准确性</p>
      </div>

      {/* 统计信息 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待复核</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">需要处理</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已复核</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reviewed}</div>
            <p className="text-xs text-muted-foreground mt-1">历史记录</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日复核</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayReviewed}</div>
            <p className="text-xs text-muted-foreground mt-1">本人今日完成</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均时长</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgTime}</div>
            <p className="text-xs text-muted-foreground mt-1">每次复核耗时</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            待复核 ({stats.pending})
          </TabsTrigger>
          <TabsTrigger value="reviewed">
            已复核 ({stats.reviewed})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* 复核列表 */}
            <Card>
              <CardHeader>
                <CardTitle>待复核队列</CardTitle>
                <CardDescription>按优先级排序的待复核项目</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {pendingReviews.map((detection, index) => (
                    <div
                      key={detection.id}
                      className={`flex items-start gap-3 rounded-lg border p-3 transition-colors cursor-pointer ${
                        selectedDetection?.id === detection.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card/50 hover:bg-accent/50'
                      }`}
                      onClick={() => handleSelectDetection(detection)}
                    >
                      <div className="w-16 h-16 rounded overflow-hidden bg-black flex-shrink-0 relative border border-primary/20">
                        <img
                          src={getRandomXrayImage(detection.id)}
                          alt="X-ray scan"
                          className="w-full h-full object-cover"
                          style={{ filter: 'contrast(1.2) brightness(1.1)' }}
                        />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={getResultVariant(detection.aiResult)}>
                              {detection.aiResult}
                            </Badge>
                            {index < 3 && (
                              <Badge variant="destructive" className="text-xs">高优先级</Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(detection.timestamp), "yyyy-MM-dd HH:mm")}
                          </span>
                        </div>

                        <p className="text-sm font-medium">{detection.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {detection.deviceId} · 置信度 {(detection.confidence * 100).toFixed(1)}%
                        </p>

                        {detection.detectedItems.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {detection.detectedItems.slice(0, 2).map((item, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                            ))}
                            {detection.detectedItems.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{detection.detectedItems.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      <Button 
                        size="sm" 
                        variant={selectedDetection?.id === detection.id ? "default" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectDetection(detection)
                        }}
                      >
                        {selectedDetection?.id === detection.id ? "已选中" : "复核"}
                      </Button>
                    </div>
                  ))}

                  {pendingReviews.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>暂无待复核项目</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 复核详情 */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>图像详情</CardTitle>
                  <CardDescription>选择左侧项目进行复核</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedDetection ? (
                      <div className="rounded-lg border border-primary/30 bg-black aspect-video flex items-center justify-center overflow-hidden relative">
                        <img
                          src={getRandomXrayImage(selectedDetection.id)}
                          alt="X-ray scan"
                          className="w-full h-full object-contain"
                          style={{ filter: 'contrast(1.2) brightness(1.1)' }}
                        />
                      </div>
                    ) : (
                      <div className="rounded-lg border border-border bg-muted/50 aspect-video flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <ImageIcon className="h-16 w-16 mx-auto mb-2" />
                          <p className="text-sm">请从左侧选择项目进行复核</p>
                        </div>
                      </div>
                    )}

                    {selectedDetection && (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">检测ID</span>
                            <span className="font-medium">{selectedDetection.id}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">AI判断</span>
                            <Badge variant={getResultVariant(selectedDetection.aiResult)}>
                              {selectedDetection.aiResult}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">置信度</span>
                            <span className="font-medium">
                              {(selectedDetection.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">检测设备</span>
                            <span className="font-medium">{selectedDetection.deviceId}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">检测时间</span>
                            <span className="font-medium">
                              {format(new Date(selectedDetection.timestamp), "yyyy-MM-dd HH:mm:ss")}
                            </span>
                          </div>
                        </div>

                        {selectedDetection.detectedItems && selectedDetection.detectedItems.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">检出物品:</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedDetection.detectedItems.map((item: any, idx: number) => (
                                <Badge key={idx} variant="outline">
                                  {item.category} ({(item.confidence * 100).toFixed(1)}%)
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>人工复核</CardTitle>
                  <CardDescription>根据图像给出您的判断</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>复核结果</Label>
                    <RadioGroup value={selectedReview} onValueChange={setSelectedReview}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="confirm" id="confirm" />
                        <Label htmlFor="confirm" className="font-normal cursor-pointer">
                          确认AI判断 - 判断正确
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reject" id="reject" />
                        <Label htmlFor="reject" className="font-normal cursor-pointer">
                          否决AI判断 - 判断错误
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="uncertain" id="uncertain" />
                        <Label htmlFor="uncertain" className="font-normal cursor-pointer">
                          不确定 - 需要进一步检查
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">复核备注</Label>
                    <Textarea
                      id="comment"
                      placeholder="请输入复核意见和备注信息..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      disabled={!selectedDetection || isSubmitting}
                      onClick={handleSubmitReview}
                    >
                      {isSubmitting ? (
                        <>正在提交...</>
                      ) : submitSuccess ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          提交成功！
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          提交复核
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      disabled={!selectedDetection}
                      onClick={() => {
                        setSelectedDetection(null)
                        setReviewComment("")
                      }}
                    >
                      跳过
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="addToTraining" className="rounded" />
                    <Label htmlFor="addToTraining" className="text-sm font-normal cursor-pointer">
                      将此图像加入AI训练样本库
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>已复核记录</CardTitle>
              <CardDescription>查看历史复核记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reviewedRecords.map((detection) => (
                  <div
                    key={detection.id}
                    className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4"
                  >
                    <div className="w-20 h-20 rounded overflow-hidden bg-black flex-shrink-0 relative border border-primary/20">
                      <img
                        src={getRandomXrayImage(detection.id)}
                        alt="X-ray scan"
                        className="w-full h-full object-cover"
                        style={{ filter: 'contrast(1.2) brightness(1.1)' }}
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{detection.id}</span>
                            <Badge variant={getResultVariant(detection.aiResult)}>
                              AI: {detection.aiResult}
                            </Badge>
                            {detection.humanReview && (
                              <Badge variant={detection.humanReview === "确认" ? "default" : "destructive"}>
                                人工: {detection.humanReview}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {detection.deviceId} · 置信度 {(detection.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(detection.timestamp), "yyyy-MM-dd HH:mm")}
                        </span>
                      </div>

                      {detection.detectedItems.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {detection.detectedItems.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {item.category} ({(item.confidence * 100).toFixed(1)}%)
                            </Badge>
                          ))}
                        </div>
                      )}

                      {detection.humanReviewer && (
                        <div className="flex items-center gap-2 pt-2 border-t border-border">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            复核人: {detection.humanReviewer}
                          </span>
                        </div>
                      )}
                    </div>

                    <Button size="sm" variant="outline">
                      查看详情
                    </Button>
                  </div>
                ))}

                {reviewedRecords.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>暂无复核记录</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

