import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { generateCaseRecords } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function EventsPage() {
  const cases = generateCaseRecords(100)
  const pending = cases.filter((c) => c.status === "待审理").length
  const inProgress = cases.filter((c) => c.status === "审理中").length
  const completed = cases.filter((c) => c.status === "已结案").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">案件管理</h1>
        <p className="text-muted-foreground mt-2">查看和管理法院案件信息</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总案件数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{cases.length}</div>
            <p className="text-xs text-muted-foreground mt-1">所有案件</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待审理</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{pending}</div>
            <p className="text-xs text-muted-foreground mt-1">等待开庭</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">审理中</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{inProgress}</div>
            <p className="text-xs text-muted-foreground mt-1">正在审理</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已结案</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{completed}</div>
            <p className="text-xs text-muted-foreground mt-1">审理完成</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>案件列表</CardTitle>
          <CardDescription>所有案件的详细信息</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {cases.slice(0, 20).map((caseItem) => (
              <div
                key={caseItem.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-3"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{caseItem.id}</p>
                      <Badge variant="outline" className="text-xs">
                        {caseItem.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{caseItem.courtroom}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      立案: {new Date(caseItem.filingDate).toLocaleDateString("zh-CN")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      开庭: {new Date(caseItem.scheduledDate).toLocaleDateString("zh-CN")}
                    </p>
                  </div>
                  <Badge
                    variant={
                      caseItem.status === "已结案" ? "outline" : caseItem.status === "审理中" ? "default" : "secondary"
                    }
                  >
                    {caseItem.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
