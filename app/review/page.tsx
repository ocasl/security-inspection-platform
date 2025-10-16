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
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { useState } from "react"

export default function ReviewPage() {
  const [selectedReview, setSelectedReview] = useState<string>("confirm")
  const [reviewComment, setReviewComment] = useState("")

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
                      className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-3 hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded bg-muted flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
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
                            {formatDistanceToNow(new Date(detection.timestamp), { 
                              addSuffix: true,
                              locale: zhCN 
                            })}
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

                      <Button size="sm" variant="outline">
                        复核
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
                    <div className="rounded-lg border border-border bg-muted/50 aspect-video flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-16 w-16 mx-auto mb-2" />
                        <p className="text-sm">X光图像将在这里显示</p>
                      </div>
                    </div>

                    {pendingReviews.length > 0 && (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">检测ID</span>
                            <span className="font-medium">{pendingReviews[0].id}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">AI判断</span>
                            <Badge variant={getResultVariant(pendingReviews[0].aiResult)}>
                              {pendingReviews[0].aiResult}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">置信度</span>
                            <span className="font-medium">
                              {(pendingReviews[0].confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">检测设备</span>
                            <span className="font-medium">{pendingReviews[0].deviceId}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">检测时间</span>
                            <span className="font-medium">
                              {new Date(pendingReviews[0].timestamp).toLocaleString("zh-CN")}
                            </span>
                          </div>
                        </div>

                        {pendingReviews[0].detectedItems.length > 0 && (
                          <div className="space-y-2">
                            <Label>AI识别物品</Label>
                            <div className="space-y-2">
                              {pendingReviews[0].detectedItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                                  <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-destructive" />
                                    <span className="text-sm font-medium">{item.category}</span>
                                  </div>
                                  <Badge variant="outline">{(item.confidence * 100).toFixed(1)}%</Badge>
                                </div>
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
                    <Button className="flex-1" disabled={!pendingReviews.length}>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      提交复核
                    </Button>
                    <Button variant="outline" disabled={!pendingReviews.length}>
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
                    <div className="w-20 h-20 rounded bg-muted flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
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
                          {formatDistanceToNow(new Date(detection.timestamp), { 
                            addSuffix: true,
                            locale: zhCN 
                          })}
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

