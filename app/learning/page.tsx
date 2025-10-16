"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { aiModels } from "@/lib/mock-data"
import { Brain, TrendingUp, Zap, AlertCircle, CheckCircle2, RefreshCw, Play } from "lucide-react"

export default function LearningPage() {
  const improvementSuggestions = [
    { category: "管制刀具", currentAccuracy: 94.2, targetAccuracy: 97.0, sampleNeeded: 1200 },
    { category: "易燃易爆物", currentAccuracy: 91.8, targetAccuracy: 95.0, sampleNeeded: 800 },
    { category: "液体类", currentAccuracy: 89.5, targetAccuracy: 93.0, sampleNeeded: 650 },
    { category: "电池类", currentAccuracy: 87.3, targetAccuracy: 92.0, sampleNeeded: 950 },
  ]

  const learningTasks = [
    {
      id: "TASK-001",
      name: "管制刀具识别优化",
      status: "进行中",
      progress: 65,
      samplesProcessed: 780,
      samplesTotal: 1200,
      expectedImprovement: "+2.8%",
      estimatedTime: "3小时"
    },
    {
      id: "TASK-002",
      name: "未识别样本学习",
      status: "排队中",
      progress: 0,
      samplesProcessed: 0,
      samplesTotal: 450,
      expectedImprovement: "+1.5%",
      estimatedTime: "1.5小时"
    },
    {
      id: "TASK-003",
      name: "可疑物品判断改进",
      status: "已完成",
      progress: 100,
      samplesProcessed: 320,
      samplesTotal: 320,
      expectedImprovement: "+1.2%",
      estimatedTime: "-"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI学习中心</h1>
          <p className="text-muted-foreground mt-2">通过持续学习提升AI识别准确性</p>
        </div>
        <Button>
          <Play className="h-4 w-4 mr-2" />
          开始新学习任务
        </Button>
      </div>

      {/* 学习概览 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">当前准确率</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">96.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              较上周提升 <span className="text-chart-2">+1.3%</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本周学习样本</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,245</div>
            <p className="text-xs text-muted-foreground mt-1">
              新增训练样本数量
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">学习任务</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              1个进行中 · 2个已完成
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">模型迭代次数</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground mt-1">
              累计模型更新次数
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 学习任务 */}
      <Card>
        <CardHeader>
          <CardTitle>学习任务</CardTitle>
          <CardDescription>AI模型持续学习和优化任务</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningTasks.map((task) => (
              <div key={task.id} className="rounded-lg border border-border bg-card/50 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{task.name}</h4>
                      <Badge variant={
                        task.status === "进行中" ? "default" : 
                        task.status === "已完成" ? "outline" : 
                        "secondary"
                      }>
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.id}</p>
                  </div>
                  {task.status === "进行中" && (
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      暂停
                    </Button>
                  )}
                  {task.status === "排队中" && (
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      开始
                    </Button>
                  )}
                  {task.status === "已完成" && (
                    <CheckCircle2 className="h-5 w-5 text-chart-2" />
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2 mb-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">进度</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">样本处理</span>
                      <span className="font-medium">
                        {task.samplesProcessed}/{task.samplesTotal}
                      </span>
                    </div>
                    <Progress 
                      value={(task.samplesProcessed / task.samplesTotal) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-chart-2" />
                    <span className="text-muted-foreground">预期提升:</span>
                    <span className="font-medium text-chart-2">{task.expectedImprovement}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">预计时间:</span>
                    <span className="font-medium">{task.estimatedTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 改进建议 */}
      <Card>
        <CardHeader>
          <CardTitle>识别改进建议</CardTitle>
          <CardDescription>基于数据分析的模型优化建议</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {improvementSuggestions.map((suggestion, index) => (
              <div key={index} className="rounded-lg border border-border bg-card/50 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium mb-1">{suggestion.category}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>当前准确率: {suggestion.currentAccuracy}%</span>
                      <span className="text-chart-2">
                        目标: {suggestion.targetAccuracy}%
                      </span>
                    </div>
                  </div>
                  <Button size="sm">
                    创建学习任务
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">准确率提升空间</span>
                    <span className="font-medium text-chart-2">
                      +{(suggestion.targetAccuracy - suggestion.currentAccuracy).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(suggestion.currentAccuracy / suggestion.targetAccuracy) * 100} 
                    className="h-2" 
                  />
                  <p className="text-xs text-muted-foreground">
                    建议增加 {suggestion.sampleNeeded} 个训练样本
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI模型性能趋势 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>学习效果统计</CardTitle>
            <CardDescription>过去30天的模型性能变化</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">准确率提升</span>
                  <span className="text-lg font-bold text-chart-2">+3.2%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">误报率降低</span>
                  <span className="text-lg font-bold text-chart-2">-1.8%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">处理速度提升</span>
                  <span className="text-lg font-bold text-chart-2">+15%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">新类别识别能力</span>
                  <span className="text-lg font-bold text-chart-2">+5类</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>学习数据源</CardTitle>
            <CardDescription>训练样本来源分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-1" />
                  <span className="text-sm">AI未识别</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">1,234</p>
                  <p className="text-xs text-muted-foreground">38%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-2" />
                  <span className="text-sm">人工复核可疑</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">987</p>
                  <p className="text-xs text-muted-foreground">30%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-3" />
                  <span className="text-sm">超时未判断</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">654</p>
                  <p className="text-xs text-muted-foreground">20%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-4" />
                  <span className="text-sm">人工标注</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">370</p>
                  <p className="text-xs text-muted-foreground">12%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 自动学习配置 */}
      <Card>
        <CardHeader>
          <CardTitle>自动学习配置</CardTitle>
          <CardDescription>配置AI自动学习规则</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="space-y-1">
                <h4 className="font-medium">自动采集未识别样本</h4>
                <p className="text-sm text-muted-foreground">
                  自动将AI无法识别的图像加入训练样本库
                </p>
              </div>
              <Button variant="outline">
                <CheckCircle2 className="h-4 w-4 mr-2 text-chart-2" />
                已启用
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="space-y-1">
                <h4 className="font-medium">自动学习可疑物品</h4>
                <p className="text-sm text-muted-foreground">
                  从人工复核的可疑物品中学习特征
                </p>
              </div>
              <Button variant="outline">
                <CheckCircle2 className="h-4 w-4 mr-2 text-chart-2" />
                已启用
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="space-y-1">
                <h4 className="font-medium">定期模型更新</h4>
                <p className="text-sm text-muted-foreground">
                  每周自动训练并部署新版本模型
                </p>
              </div>
              <Button variant="outline">
                <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                未启用
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

