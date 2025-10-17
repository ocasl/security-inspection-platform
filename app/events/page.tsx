import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, CheckCircle, XCircle, Calendar } from "lucide-react"
import { generateAlertRecords } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default function EventsPage() {
  const events = generateAlertRecords(100)
  const unhandled = events.filter((e) => e.status === "未处理").length
  const inProgress = events.filter((e) => e.status === "处理中").length
  const handled = events.filter((e) => e.status === "已处理").length

  const getLevelVariant = (level: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (level) {
      case "紧急":
      case "高":
        return "destructive"
      case "中":
        return "default"
      case "低":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusVariant = (status: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (status) {
      case "未处理":
        return "destructive"
      case "处理中":
        return "default"
      case "已处理":
        return "outline"
      case "已忽略":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-l-primary pl-4 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/5">
        <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground">事件管理</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          <span className="font-semibold text-foreground">广东守门神科技集团</span> | 
          <span className="text-primary font-semibold"></span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border border-primary/30 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:border-primary/50 transition-all bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">总事件数</CardTitle>
            <div className="rounded-lg bg-primary/20 p-2 shadow-inner shadow-primary/30">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary drop-shadow-[0_0_8px_rgba(0,200,255,0.5)]">{events.length}</div>
            <p className="text-xs text-muted-foreground mt-1">所有报警事件</p>
          </CardContent>
        </Card>

        <Card className="border border-destructive/30 shadow-lg shadow-destructive/10 hover:shadow-destructive/20 hover:border-destructive/50 transition-all bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">未处理</CardTitle>
            <div className="rounded-lg bg-destructive/20 p-2 shadow-inner shadow-destructive/30">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive drop-shadow-[0_0_8px_rgba(255,80,80,0.5)]">{unhandled}</div>
            <p className="text-xs text-muted-foreground mt-1">等待处理</p>
          </CardContent>
        </Card>

        <Card className="border border-chart-2/30 shadow-lg shadow-chart-2/10 hover:shadow-chart-2/20 hover:border-chart-2/50 transition-all bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">处理中</CardTitle>
            <div className="rounded-lg bg-chart-2/20 p-2 shadow-inner shadow-chart-2/30">
              <Clock className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2 drop-shadow-[0_0_8px_rgba(80,255,150,0.5)]">{inProgress}</div>
            <p className="text-xs text-muted-foreground mt-1">正在处理</p>
          </CardContent>
        </Card>

        <Card className="border border-accent/30 shadow-lg shadow-accent/10 hover:shadow-accent/20 hover:border-accent/50 transition-all bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">已处理</CardTitle>
            <div className="rounded-lg bg-accent/20 p-2 shadow-inner shadow-accent/30">
              <CheckCircle className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent drop-shadow-[0_0_8px_rgba(150,255,80,0.5)]">{handled}</div>
            <p className="text-xs text-muted-foreground mt-1">处理完成</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border border-primary/30 shadow-primary/10 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground">报警事件列表</CardTitle>
          <CardDescription>所有报警事件的详细信息</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.slice(0, 30).map((event) => (
              <div
                key={event.id}
                className="flex items-start justify-between rounded-lg border border-border bg-card/80 p-4 hover:bg-card/90 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="rounded-lg bg-destructive/20 p-2 mt-1">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-foreground">{event.id}</p>
                      <Badge variant={getLevelVariant(event.level)} className="text-xs">
                        {event.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">{event.message}</p>
                    <p className="text-xs text-muted-foreground">
                      设备: {event.deviceId} · {format(new Date(event.timestamp), "yyyy-MM-dd HH:mm:ss")}
                    </p>
                    {event.handler && (
                      <p className="text-xs text-muted-foreground">
                        处理人: {event.handler}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={getStatusVariant(event.status)} className="whitespace-nowrap">
                    {event.status}
                  </Badge>
                  {event.soundAlert && (
                    <span className="text-xs text-destructive font-semibold">声音报警</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
