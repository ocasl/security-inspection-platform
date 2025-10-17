"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generateDetectionRecords, generateAlertRecords, topProhibitedItems } from "@/lib/mock-data"
import { FileText, Download, Calendar, TrendingUp, AlertTriangle, Search, Filter } from "lucide-react"
import { useState } from "react"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30days")
  const [reportType, setReportType] = useState("all")

  // 生成报表数据
  const detections = generateDetectionRecords(100)
  const alerts = generateAlertRecords(50)

  // 统计异常数据
  const anomalies = [
    {
      id: "ANO-001",
      type: "检测量异常",
      description: "10月10日 14:00-16:00 检测量下降80%",
      severity: "高",
      affectedDevice: "X光机-03",
      timestamp: "2025-10-10 14:23:15"
    },
    {
      id: "ANO-002",
      type: "误报率升高",
      description: "管制刀具误报率从2.1%上升至8.5%",
      severity: "中",
      affectedDevice: "AI分析服务器-主",
      timestamp: "2025-10-12 09:15:42"
    },
    {
      id: "ANO-003",
      type: "处理超时",
      description: "连续15分钟平均处理时间超过5秒",
      severity: "低",
      affectedDevice: "X光机-02",
      timestamp: "2025-10-13 16:45:20"
    }
  ]

  // 性能报告
  const performanceMetrics = [
    { metric: "日均检测量", value: "101", change: "工作日平均", trend: "up" },
    { metric: "AI准确率", value: "96.8%", change: "+1.3%", trend: "up" },
    { metric: "平均处理时间", value: "2.3秒", change: "-0.5秒", trend: "up" },
    { metric: "设备在线率", value: "100%", change: "持续稳定", trend: "up" },
    { metric: "误报率", value: "2.1%", change: "-0.7%", trend: "up" },
    { metric: "人工复核率", value: "0.39%", change: "极低水平", trend: "down" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">报表管理</h1>
          <p className="text-muted-foreground mt-2">数据统计分析与异常报表管理</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            选择日期
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      {/* 报表配置 */}
      <Card>
        <CardHeader>
          <CardTitle>报表配置</CardTitle>
          <CardDescription>选择报表类型和时间范围</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>报表类型</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">综合报表</SelectItem>
                  <SelectItem value="detection">检测报表</SelectItem>
                  <SelectItem value="violation">违禁品报表</SelectItem>
                  <SelectItem value="device">设备运行报表</SelectItem>
                  <SelectItem value="performance">性能分析报表</SelectItem>
                  <SelectItem value="anomaly">异常分析报表</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>时间范围</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">今天</SelectItem>
                  <SelectItem value="7days">最近7天</SelectItem>
                  <SelectItem value="30days">最近30天</SelectItem>
                  <SelectItem value="90days">最近90天</SelectItem>
                  <SelectItem value="custom">自定义</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>导出格式</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">统计概览</TabsTrigger>
          <TabsTrigger value="violations">违禁品分析</TabsTrigger>
          <TabsTrigger value="anomalies">异常报告</TabsTrigger>
          <TabsTrigger value="performance">性能指标</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总检测次数</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6,347</div>
                <p className="text-xs text-muted-foreground mt-1">
                  
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">违禁品检出</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">45</div>
                <p className="text-xs text-muted-foreground mt-1">
                  检出率 0.71%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">报警触发</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52</div>
                <p className="text-xs text-muted-foreground mt-1">
                  已处理 48
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">人工复核</CardTitle>
                <TrendingUp className="h-4 w-4 text-chart-2" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-muted-foreground mt-1">
                  复核率 0.39%
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>检测记录汇总</CardTitle>
              <CardDescription>最近检测活动的详细统计</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期</TableHead>
                    <TableHead>检测总数</TableHead>
                    <TableHead>违禁品检出</TableHead>
                    <TableHead>人工复核</TableHead>
                    <TableHead>报警次数</TableHead>
                    <TableHead>平均处理时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { date: '2025-04-29', detections: 115, violations: 1, reviews: 0, alerts: 1, time: 2.1 },
                    { date: '2025-04-28', detections: 98, violations: 0, reviews: 1, alerts: 0, time: 2.3 },
                    { date: '2025-04-25', detections: 127, violations: 2, reviews: 1, alerts: 2, time: 2.5 },
                    { date: '2025-04-24', detections: 103, violations: 1, reviews: 0, alerts: 1, time: 2.2 },
                    { date: '2025-04-23', detections: 89, violations: 0, reviews: 0, alerts: 0, time: 2.0 },
                    { date: '2025-04-22', detections: 134, violations: 1, reviews: 0, alerts: 1, time: 2.4 },
                    { date: '2025-04-21', detections: 107, violations: 0, reviews: 1, alerts: 0, time: 2.2 },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.date}</TableCell>
                      <TableCell>{row.detections}</TableCell>
                      <TableCell className="text-destructive">{row.violations}</TableCell>
                      <TableCell>{row.reviews}</TableCell>
                      <TableCell>{row.alerts}</TableCell>
                      <TableCell>{row.time}秒</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="violations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>违禁品类型统计</CardTitle>
              <CardDescription>按违禁品类别的检出情况分析</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>违禁品类别</TableHead>
                    <TableHead>检出次数</TableHead>
                    <TableHead>趋势</TableHead>
                    <TableHead>占比</TableHead>
                    <TableHead>高发时段</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProhibitedItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>
                        <Badge variant={item.trend > 0 ? "destructive" : "default"}>
                          {item.trend > 0 ? '+' : ''}{item.trend}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {((item.count / topProhibitedItems.reduce((sum, i) => sum + i.count, 0)) * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-muted-foreground">08:00-10:00</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>违禁品检出详情</CardTitle>
              <CardDescription>具体的违禁品检测记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detections
                  .filter(d => d.aiResult === "危险")
                  .slice(0, 10)
                  .map((detection) => (
                    <div
                      key={detection.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{detection.id}</span>
                          <Badge variant="destructive">危险</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {detection.deviceId} · 
                          {detection.detectedItems.map(item => item.category).join(', ')}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">查看详情</Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>异常事件分析</CardTitle>
              <CardDescription>系统检测到的异常情况和处理建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {anomalies.map((anomaly) => (
                  <div
                    key={anomaly.id}
                    className="rounded-lg border border-border bg-card/50 p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                          anomaly.severity === "高" ? "text-destructive" : 
                          anomaly.severity === "中" ? "text-yellow-500" : 
                          "text-muted-foreground"
                        }`} />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{anomaly.type}</h4>
                            <Badge variant={
                              anomaly.severity === "高" ? "destructive" : 
                              anomaly.severity === "中" ? "default" : 
                              "secondary"
                            }>
                              {anomaly.severity}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{anomaly.id}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {anomaly.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>受影响设备: {anomaly.affectedDevice}</span>
                            <span>发现时间: {anomaly.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">分析</Button>
                        <Button size="sm">处理</Button>
                      </div>
                    </div>
                    
                    {anomaly.severity === "高" && (
                      <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-sm text-destructive font-medium mb-1">处理建议:</p>
                        <p className="text-sm text-muted-foreground">
                          立即检查设备状态，必要时进行维护或重启。建议联系技术支持进行深度诊断。
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>异常统计趋势</CardTitle>
              <CardDescription>各类异常事件的发生频率</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">设备故障</span>
                  <div className="text-right">
                    <p className="font-bold">3次</p>
                    <p className="text-xs text-muted-foreground">最近30天</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">AI识别异常</span>
                  <div className="text-right">
                    <p className="font-bold">7次</p>
                    <p className="text-xs text-muted-foreground">最近30天</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">处理超时</span>
                  <div className="text-right">
                    <p className="font-bold">12次</p>
                    <p className="text-xs text-muted-foreground">最近30天</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>性能指标汇总</CardTitle>
              <CardDescription>系统各项性能指标的统计分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground mb-2">{metric.metric}</p>
                    <div className="flex items-baseline justify-between">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <Badge variant={metric.trend === "up" ? "default" : "secondary"}>
                        <TrendingUp className={`h-3 w-3 mr-1 ${metric.trend === "down" ? "rotate-180" : ""}`} />
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>设备性能排名</CardTitle>
              <CardDescription>各设备处理效率和准确率对比</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>设备名称</TableHead>
                    <TableHead>今日处理量</TableHead>
                    <TableHead>平均处理时间</TableHead>
                    <TableHead>准确率</TableHead>
                    <TableHead>健康度</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">X光机-02</TableCell>
                    <TableCell>1,432</TableCell>
                    <TableCell>2.1秒</TableCell>
                    <TableCell className="text-chart-2">97.2%</TableCell>
                    <TableCell>
                      <Badge variant="default">95%</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">X光机-01</TableCell>
                    <TableCell>1,247</TableCell>
                    <TableCell>2.3秒</TableCell>
                    <TableCell className="text-chart-2">96.5%</TableCell>
                    <TableCell>
                      <Badge variant="default">98%</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">X光机-03</TableCell>
                    <TableCell>234</TableCell>
                    <TableCell>--</TableCell>
                    <TableCell>--</TableCell>
                    <TableCell>
                      <Badge variant="destructive">45%</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

