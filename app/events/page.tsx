import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, CheckCircle, XCircle, Calendar } from "lucide-react"
import { generateAlertRecords } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

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
      <div className="border-l-4 border-l-primary pl-4 py-2 bg-gradient-to-r from-primary/5 to-transparent">
        <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground">事件管理</h1>
        <p className="text-muted-foreground mt-2 text-sm">查看和管理系统报警事件</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">总事件数</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{events.length}</div>
            <p className="text-xs text-muted-foreground mt-1">所有报警事件</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">未处理</CardTitle>
            <div className="rounded-lg bg-destructive/10 p-2">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{unhandled}</div>
            <p className="text-xs text-muted-foreground mt-1">等待处理</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-2 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">处理中</CardTitle>
            <div className="rounded-lg bg-chart-2/10 p-2">
              <Clock className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2">{inProgress}</div>
            <p className="text-xs text-muted-foreground mt-1">正在处理</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">已处理</CardTitle>
            <div className="rounded-lg bg-accent/10 p-2">
              <CheckCircle className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{handled}</div>
            <p className="text-xs text-muted-foreground mt-1">处理完成</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-lg font-bold">报警事件列表</CardTitle>
          <CardDescription>所有报警事件的详细信息</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events.slice(0, 30).map((event) => (
              <div
                key={event.id}
                className="flex items-start justify-between rounded-lg border border-border bg-muted/30 p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="rounded-lg bg-destructive/10 p-2 mt-1">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{event.id}</p>
                      <Badge variant={getLevelVariant(event.level)} className="text-xs">
                        {event.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">{event.message}</p>
                    <p className="text-xs text-muted-foreground">
                      设备: {event.deviceId} · {formatDistanceToNow(new Date(event.timestamp), { 
                        addSuffix: true,
                        locale: zhCN 
                      })}
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
