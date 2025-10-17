"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateAlertRecords } from "@/lib/mock-data"
import { AlertTriangle, Bell, Volume2 } from "lucide-react"
import { format } from "date-fns"

export function RecentAlerts() {
  const alerts = generateAlertRecords(20)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6)

  const getLevelVariant = (level: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (level) {
      case "紧急":
        return "destructive"
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
    <Card className="shadow-lg border border-chart-2/30 shadow-chart-2/10 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-foreground">报警事件记录</CardTitle>
        <CardDescription>智慧安检管理平台运行期间的报警信息</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start justify-between rounded-lg border border-border bg-card/80 p-3 hover:bg-card/90 hover:border-primary/30 transition-all"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="relative">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  {alert.soundAlert && (
                    <Volume2 className="h-3 w-3 text-destructive absolute -top-1 -right-1" />
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">{alert.type}</p>
                    <Badge variant={getLevelVariant(alert.level)} className="text-xs">
                      {alert.level}
                    </Badge>
                    <Badge variant={getStatusVariant(alert.status)} className="text-xs">
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {alert.deviceId} · {format(new Date(alert.timestamp), "yyyy-MM-dd HH:mm:ss")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
