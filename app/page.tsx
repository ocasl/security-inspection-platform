import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle2, TrendingUp, Activity, Clock } from "lucide-react"
import { OverviewCharts } from "@/components/overview-charts"
import { DeviceStatus } from "@/components/device-status"
import { RecentAlerts } from "@/components/recent-alerts"
import { XRayImageViewer } from "@/components/xray-image-viewer"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-l-primary pl-4 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/5">
        <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground">成安县人民法院 - 智慧安检管理平台 - 数据总览</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          <span className="font-semibold text-foreground">广东守门神科技集团</span> | 
          设备运行周期：<span className="text-primary font-semibold"></span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-primary/30 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:border-primary/50 transition-all bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">总检测次数</CardTitle>
            <div className="rounded-lg bg-primary/20 p-2 shadow-inner shadow-primary/30">
              <Activity className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary drop-shadow-[0_0_8px_rgba(0,150,255,0.4)]">6,347</div>
            <p className="text-xs text-muted-foreground mt-1">
              运行周期：<span className="text-primary font-semibold"></span>
            </p>
          </CardContent>
        </Card>

        <Card className="border border-destructive/30 shadow-lg shadow-destructive/10 hover:shadow-destructive/20 hover:border-destructive/50 transition-all bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">违禁品检出</CardTitle>
            <div className="rounded-lg bg-destructive/20 p-2 shadow-inner shadow-destructive/30">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive drop-shadow-[0_0_8px_rgba(255,80,80,0.4)]">45</div>
            <p className="text-xs text-muted-foreground mt-1">
              安全通过 <span className="text-chart-2 font-semibold">6,302</span> | 检出率 <span className="text-destructive font-semibold">0.71%</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border border-chart-2/30 shadow-lg shadow-chart-2/10 hover:shadow-chart-2/20 hover:border-chart-2/50 transition-all bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">人工复核</CardTitle>
            <div className="rounded-lg bg-chart-2/20 p-2 shadow-inner shadow-chart-2/30">
              <CheckCircle2 className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2 drop-shadow-[0_0_8px_rgba(80,255,150,0.5)]">25</div>
            <p className="text-xs text-muted-foreground mt-1">复核率 <span className="text-chart-2 font-semibold">0.39%</span> | AI准确率 <span className="font-semibold">96.8%</span></p>
          </CardContent>
        </Card>

        <Card className="border border-accent/30 shadow-lg shadow-accent/10 hover:shadow-accent/20 hover:border-accent/50 transition-all bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">报警事件</CardTitle>
            <div className="rounded-lg bg-accent/20 p-2 shadow-inner shadow-accent/30">
              <Clock className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent drop-shadow-[0_0_8px_rgba(150,255,80,0.5)]">52</div>
            <p className="text-xs text-muted-foreground mt-1">
              已处理 <span className="text-chart-2 font-semibold">48</span> | 处理率 <span className="font-semibold">92%</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* X光实时监控 */}
      <Card className="shadow-lg border border-primary/30 shadow-primary/10 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary animate-pulse" />
            实时X光扫描监控
          </CardTitle>
        </CardHeader>
        <CardContent>
          <XRayImageViewer autoRotate={true} interval={8000} />
        </CardContent>
      </Card>

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
