"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { generateDailyData } from "@/lib/mock-data"

export function OverviewCharts() {
  // 生成5月到10月的数据
  const startDate = new Date("2025-05-01")
  const endDate = new Date("2025-10-15")

  const detectionData = generateDailyData(startDate, endDate, 8500, 2000)
  const alertData = generateDailyData(startDate, endDate, 45, 20)

  // 按月汇总数据
  const monthlyDetections = detectionData
    .reduce((acc: any[], item) => {
      const month = item.date.substring(0, 7)
      const existing = acc.find((d) => d.month === month)
      if (existing) {
        existing.detections += item.value
        existing.count += 1
      } else {
        acc.push({ month, detections: item.value, count: 1 })
      }
      return acc
    }, [])
    .map((item) => ({
      month: item.month,
      detections: Math.round(item.detections / item.count),
    }))

  const monthlyAlerts = alertData.reduce((acc: any[], item) => {
    const month = item.date.substring(0, 7)
    const existing = acc.find((d) => d.month === month)
    if (existing) {
      existing.alerts += item.value
    } else {
      acc.push({ month, alerts: item.value })
    }
    return acc
  }, [])

  // 最近7天的数据
  const recent7Days = detectionData.slice(-7).map((item, index) => ({
    day: `${index + 1}日`,
    detections: item.value,
    violations: Math.floor(item.value * 0.005) + Math.floor(Math.random() * 5)
  }))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-lg font-bold">安检检测趋势</CardTitle>
          <CardDescription>2025年5月 - 10月每日平均检测量</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyDetections}>
              <defs>
                <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="detections"
                stroke="hsl(var(--chart-1))"
                fill="url(#colorDetections)"
                strokeWidth={2}
                name="检测数量"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-md border-t-4 border-t-destructive">
        <CardHeader>
          <CardTitle className="text-lg font-bold">违禁品检出统计</CardTitle>
          <CardDescription>2025年5月 - 10月违禁品检出数量</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyAlerts}>
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
              <Bar dataKey="alerts" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} name="违禁品数量" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
