"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { deviceStatuses } from "@/lib/mock-data"
import { CheckCircle2, AlertCircle, XCircle, Wrench } from "lucide-react"

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
    <Card className="shadow-md border-t-4 border-t-accent">
      <CardHeader>
        <CardTitle className="text-lg font-bold">设备运行状态</CardTitle>
        <CardDescription>
          在线: {onlineCount}/{totalCount} 台设备
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deviceStatuses.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                {getStatusIcon(device.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{device.name}</p>
                    <Badge variant={getStatusVariant(device.status)} className="text-xs">
                      {device.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {device.location} · 今日处理: {device.processedToday}
                  </p>
                  {device.workload !== undefined && (
                    <div className="flex items-center gap-2">
                      <Progress value={device.workload} className="h-1" />
                      <span className="text-xs text-muted-foreground">{device.workload}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
