import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle2, TrendingUp, Activity, Clock } from "lucide-react"
import { OverviewCharts } from "@/components/overview-charts"
import { DeviceStatus } from "@/components/device-status"
import { RecentAlerts } from "@/components/recent-alerts"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-l-primary pl-4 py-2 bg-gradient-to-r from-primary/5 to-transparent">
        <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground">智慧安检数据总览</h1>
        <p className="text-muted-foreground mt-2 text-sm">实时监控安检设备运行状态和AI识别情况</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">今日检测总数</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <Activity className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">8,756</div>
            <p className="text-xs text-muted-foreground mt-1">
              较昨日 <span className="text-chart-2 font-semibold">+12.5%</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">违禁品检出</CardTitle>
            <div className="rounded-lg bg-destructive/10 p-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">47</div>
            <p className="text-xs text-muted-foreground mt-1">
              安全通过 <span className="text-chart-2 font-semibold">8,709</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-2 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">AI识别准确率</CardTitle>
            <div className="rounded-lg bg-chart-2/10 p-2">
              <CheckCircle2 className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2">96.8%</div>
            <p className="text-xs text-muted-foreground mt-1">误报率仅 <span className="font-semibold">2.1%</span></p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">设备在线率</CardTitle>
            <div className="rounded-lg bg-accent/10 p-2">
              <Shield className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">83.3%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="font-semibold">5台在线</span> / 6台设备
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 图表区域 */}
      <Suspense fallback={<div>加载中...</div>}>
        <OverviewCharts />
      </Suspense>

      {/* 设备状态和最近报警 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<div>加载中...</div>}>
          <DeviceStatus />
        </Suspense>
        <Suspense fallback={<div>加载中...</div>}>
          <RecentAlerts />
        </Suspense>
      </div>
    </div>
  )
}
