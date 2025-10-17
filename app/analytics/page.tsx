"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend
} from "recharts"
import { generateDailyData, topProhibitedItems, generateUserProfiles, deviceStatuses } from "@/lib/mock-data"
import { TrendingUp, AlertTriangle, Activity, Shield } from "lucide-react"

export default function AnalyticsPage() {
  // 使用正确的日期范围：2025年2月-4月
  const startDate = new Date("2025-02-01")
  const endDate = new Date("2025-04-30")

  // 使用符合法院实际的数据量：每天80-150次
  const detectionData = generateDailyData(startDate, endDate, 100, 40, 150)
  const alertData = generateDailyData(startDate, endDate, 0.8, 1, 2)

  // 按月汇总检测数据
  const monthlyDetections = detectionData.reduce((acc: any[], item) => {
    const month = item.date.substring(0, 7)
    const existing = acc.find((d) => d.month === month)
    if (existing) {
      existing.detections += item.value
      existing.count += 1
    } else {
      acc.push({ month, detections: item.value, count: 1 })
    }
    return acc
  }, []).map(item => ({
    month: item.month,
    detections: Math.round(item.detections / item.count),
    violations: Math.round(item.detections / item.count * 0.005)
  }))

  // 违禁品类型分布
  const prohibitedTypeData = topProhibitedItems.map((item) => ({
    name: item.name,
    value: item.count,
    trend: item.trend
  }))

  // 用户画像数据
  const userProfiles = generateUserProfiles()

  // 设备状态分布
  // 设备状态分布（只显示数量大于0的状态，避免显示"离线 0 (0%)"）
  const deviceStatusData = [
    { name: "在线", value: deviceStatuses.filter(d => d.status === "在线").length, color: "hsl(var(--chart-2))" },
    { name: "故障", value: deviceStatuses.filter(d => d.status === "故障").length, color: "hsl(var(--destructive))" },
    { name: "维护", value: deviceStatuses.filter(d => d.status === "维护").length, color: "hsl(var(--chart-3))" },
    { name: "离线", value: deviceStatuses.filter(d => d.status === "离线").length, color: "hsl(var(--muted))" },
  ].filter(item => item.value > 0)

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">数据分析大屏</h1>
          <p className="text-muted-foreground mt-2">
            <span className="font-semibold text-foreground">成安县人民法院</span> | 
            运行数据分析
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Activity className="h-3 w-3 mr-1" />
          版本号:SMS-ZHAJ-1
        </Badge>
      </div>

      {/* 核心指标 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-chart-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总检测次数</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6,347</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span></span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">违禁品检出</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">45</div>
            <p className="text-xs text-muted-foreground mt-1">检出率 0.71%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI准确率</CardTitle>
            <Shield className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">96.8%</div>
            <p className="text-xs text-muted-foreground mt-1">人工复核 25次</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">设备在线率</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground mt-1">1台在线 / 1台</p>
          </CardContent>
        </Card>
      </div>

      {/* 趋势分析 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>检测量趋势</CardTitle>
            <CardDescription>检测量和违禁品检出统计</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyDetections}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="detections"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="检测总量"
                  dot={{ fill: "hsl(var(--chart-1))" }}
                />
                <Line
                  type="monotone"
                  dataKey="violations"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  name="违禁品数"
                  dot={{ fill: "hsl(var(--destructive))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>违禁品类型统计</CardTitle>
            <CardDescription>Top 7 违禁品检出排名</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prohibitedTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} name="检出次数" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 用户画像和设备状态 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>工作时间检测流量分布</CardTitle>
            <CardDescription>（9:00-17:00）</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userProfiles}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--chart-2))"
                  fill="url(#colorCount)"
                  strokeWidth={2}
                  name="检测量"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-1" />
                <span className="text-xs text-muted-foreground">高峰期</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-2" />
                <span className="text-xs text-muted-foreground">平峰期</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-3" />
                <span className="text-xs text-muted-foreground">低峰期</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>设备状态分布</CardTitle>
            <CardDescription>各设备实时运行状态统计</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name} ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 详细统计 */}
      <Card>
        <CardHeader>
          <CardTitle>检测情况详细统计</CardTitle>
          <CardDescription>运行期间统计数据</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">总检测次数</p>
              <p className="text-2xl font-bold">6,347</p>
              <p className="text-xs text-muted-foreground">63个工作日</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">违禁品检出</p>
              <p className="text-2xl font-bold text-destructive">45</p>
              <p className="text-xs text-muted-foreground">检出率 0.71%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">人工复核</p>
              <p className="text-2xl font-bold">25</p>
              <p className="text-xs text-muted-foreground">复核率 0.39%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">平均处理时长</p>
              <p className="text-2xl font-bold">2.3秒</p>
              <p className="text-xs text-chart-2">AI准确率 96.8%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
