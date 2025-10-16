"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { deviceStatuses, generateDetectionRecords, generateAlertRecords } from "@/lib/mock-data"
import { Activity, AlertTriangle, CheckCircle2, RefreshCw, Volume2, XCircle, TrendingUp, Monitor } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { useState } from "react"

export default function MonitoringPage() {
  const [refreshing, setRefreshing] = useState(false)
  const detections = generateDetectionRecords(10).sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  const alerts = generateAlertRecords(10).sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case "安全": return "default"
      case "可疑": return "secondary"
      case "危险": return "destructive"
      case "未识别": return "outline"
      default: return "secondary"
    }
  }

  const totalProcessed = deviceStatuses.reduce((sum, d) => sum + d.processedToday, 0)
  const onlineDevices = deviceStatuses.filter(d => d.status === "在线").length
  const activeAlerts = alerts.filter(a => a.status === "未处理" || a.status === "处理中").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">实时监控</h1>
          <p className="text-muted-foreground mt-2">监控设备状态、AI识别结果和报警信息</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          刷新数据
        </Button>
      </div>

      {/* 关键指标 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日检测总数</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProcessed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              实时更新中
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">在线设备</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onlineDevices}/{deviceStatuses.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              设备在线率 {((onlineDevices / deviceStatuses.length) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃报警</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{activeAlerts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              需要立即处理
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">系统状态</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">正常</div>
            <p className="text-xs text-muted-foreground mt-1">
              所有服务运行正常
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 设备状态详情 */}
      <Card>
        <CardHeader>
          <CardTitle>设备状态监控</CardTitle>
          <CardDescription>实时监控各个安检设备的运行状态</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deviceStatuses.map((device) => (
              <Card key={device.id} className={device.status === "故障" ? "border-destructive" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{device.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{device.location}</CardDescription>
                    </div>
                    <Badge variant={device.status === "在线" ? "default" : "destructive"}>
                      {device.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">类型</span>
                    <span className="font-medium">{device.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">健康度</span>
                    <span className="font-medium">{device.healthScore}%</span>
                  </div>
                  <Progress value={device.healthScore} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">今日处理</span>
                    <span className="font-medium">{device.processedToday}</span>
                  </div>
                  {device.workload !== undefined && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">工作负载</span>
                        <span className="font-medium">{device.workload}%</span>
                      </div>
                      <Progress value={device.workload} className="h-2" />
                    </>
                  )}
                  {device.temperature !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">温度</span>
                      <span className={`font-medium ${device.temperature > 60 ? 'text-destructive' : ''}`}>
                        {device.temperature}°C
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground pt-1">
                    最后检查: {formatDistanceToNow(new Date(device.lastCheck), { 
                      addSuffix: true,
                      locale: zhCN 
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 检测记录和报警 */}
      <Tabs defaultValue="detections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="detections">最新检测记录</TabsTrigger>
          <TabsTrigger value="alerts">实时报警</TabsTrigger>
        </TabsList>

        <TabsContent value="detections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI检测记录</CardTitle>
              <CardDescription>最近的图像识别结果</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detections.map((detection) => (
                  <div
                    key={detection.id}
                    className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={getResultColor(detection.aiResult)}>
                            {detection.aiResult}
                          </Badge>
                          <span className="text-sm font-medium">{detection.id}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(detection.timestamp), { 
                            addSuffix: true,
                            locale: zhCN 
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{detection.deviceId}</span>
                        <span>置信度: {(detection.confidence * 100).toFixed(1)}%</span>
                        <span>处理时间: {detection.processingTime.toFixed(0)}ms</span>
                      </div>

                      {detection.detectedItems.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {detection.detectedItems.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {item.category} ({(item.confidence * 100).toFixed(1)}%)
                            </Badge>
                          ))}
                        </div>
                      )}

                      {detection.humanReview && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">人工复核:</span>
                          <Badge variant="secondary">{detection.humanReview}</Badge>
                          {detection.humanReviewer && (
                            <span className="text-muted-foreground">by {detection.humanReviewer}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>实时报警信息</CardTitle>
              <CardDescription>需要处理的报警事件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 ${
                      alert.status === "未处理" ? "border-destructive bg-destructive/5" : "border-border bg-card/50"
                    }`}
                  >
                    <div className="relative">
                      <AlertTriangle className={`h-5 w-5 ${
                        alert.level === "紧急" || alert.level === "高" ? "text-destructive" : "text-yellow-500"
                      }`} />
                      {alert.soundAlert && (
                        <Volume2 className="h-3 w-3 text-destructive absolute -top-1 -right-1" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{alert.type}</span>
                          <Badge variant={alert.level === "紧急" || alert.level === "高" ? "destructive" : "default"}>
                            {alert.level}
                          </Badge>
                          <Badge variant={alert.status === "未处理" ? "destructive" : "secondary"}>
                            {alert.status}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(alert.timestamp), { 
                            addSuffix: true,
                            locale: zhCN 
                          })}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">{alert.message}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{alert.deviceId}</span>
                        {alert.detectionId && <span>检测ID: {alert.detectionId}</span>}
                      </div>

                      {alert.handler && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>处理人: {alert.handler}</span>
                          {alert.handleTime && (
                            <span>
                              处理时间: {formatDistanceToNow(new Date(alert.handleTime), { 
                                addSuffix: true,
                                locale: zhCN 
                              })}
                            </span>
                          )}
                        </div>
                      )}

                      {alert.status === "未处理" && (
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="default">处理</Button>
                          <Button size="sm" variant="outline">忽略</Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
