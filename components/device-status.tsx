"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { deviceStatuses } from "@/lib/mock-data"
import { CheckCircle2, AlertCircle, XCircle, Wrench } from "lucide-react"
import { format } from "date-fns"

export function DeviceStatus() {
  const onlineCount = deviceStatuses.filter((d) => d.status === "在线").length
  const totalCount = deviceStatuses.length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "在线":
        return <CheckCircle2 className="h-4 w-4 text-chart-2" />
      case "故障":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "维护":
        return <Wrench className="h-4 w-4 text-yellow-500" />
      case "离线":
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (status) {
      case "在线":
        return "default"
      case "故障":
        return "destructive"
      case "维护":
        return "secondary"
      case "离线":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="shadow-lg border border-accent/30 shadow-accent/10 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-foreground">设备运行状态</CardTitle>
        <CardDescription>
          智慧安检管理平台 - 广东守门神科技集团
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deviceStatuses.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between rounded-lg border border-accent/20 bg-card/80 p-4 hover:border-accent/40 transition-all"
            >
              <div className="flex items-center gap-4 flex-1">
                {getStatusIcon(device.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-base font-bold text-foreground">{device.name}</p>
                    <Badge variant={getStatusVariant(device.status)} className="text-xs">
                      {device.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    位置：{device.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    最后检测：{format(new Date(device.lastCheck), "yyyy-MM-dd HH:mm")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    运行周期：
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
