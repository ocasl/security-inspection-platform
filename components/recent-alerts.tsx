"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateAlertRecords } from "@/lib/mock-data"
import { AlertTriangle, Bell, Volume2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

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
    <Card className="shadow-md border-t-4 border-t-chart-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold">最近报警</CardTitle>
        <CardDescription>最新的系统报警信息</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start justify-between rounded-lg border border-border bg-muted/30 p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="relative">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  {alert.soundAlert && (
                    <Volume2 className="h-3 w-3 text-destructive absolute -top-1 -right-1" />
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium">{alert.type}</p>
                    <Badge variant={getLevelVariant(alert.level)} className="text-xs">
                      {alert.level}
                    </Badge>
                    <Badge variant={getStatusVariant(alert.status)} className="text-xs">
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {alert.deviceId} · {formatDistanceToNow(new Date(alert.timestamp), { 
                      addSuffix: true,
                      locale: zhCN 
                    })}
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
