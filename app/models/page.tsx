"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { aiModels } from "@/lib/mock-data"
import { Brain, TrendingUp, Database, Zap, CheckCircle2, Clock, Upload, Download } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

export default function ModelsPage() {
  const deployedModels = aiModels.filter(m => m.status === "已部署")
  const trainingModels = aiModels.filter(m => m.status === "训练中")

  const stats = {
    total: aiModels.length,
    deployed: deployedModels.length,
    training: trainingModels.length,
    avgAccuracy: (aiModels.reduce((sum, m) => sum + m.accuracy, 0) / aiModels.length).toFixed(1)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已部署": return "default"
      case "训练中": return "secondary"
      case "待更新": return "outline"
      case "已停用": return "destructive"
      default: return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI模型管理</h1>
          <p className="text-muted-foreground mt-2">管理和监控AI识别模型的训练与部署</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导入模型
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            新建模型
          </Button>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">模型总数</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">不同类型的AI模型</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已部署</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{stats.deployed}</div>
            <p className="text-xs text-muted-foreground mt-1">正在生产环境运行</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">训练中</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.training}</div>
            <p className="text-xs text-muted-foreground mt-1">模型训练进行中</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均准确率</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{stats.avgAccuracy}%</div>
            <p className="text-xs text-muted-foreground mt-1">所有模型平均值</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">全部模型 ({stats.total})</TabsTrigger>
          <TabsTrigger value="deployed">已部署 ({stats.deployed})</TabsTrigger>
          <TabsTrigger value="training">训练中 ({stats.training})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {aiModels.map((model) => (
            <Card key={model.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{model.name}</CardTitle>
                      <Badge variant={getStatusColor(model.status)}>{model.status}</Badge>
                      <Badge variant="outline">{model.version}</Badge>
                    </div>
                    <CardDescription>
                      {model.type} · 训练样本: {model.trainingSamples.toLocaleString()} 张 · 
                      识别类别: {model.categories.length} 类
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {model.status === "已部署" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          更新
                        </Button>
                        <Button variant="outline" size="sm">查看详情</Button>
                      </>
                    )}
                    {model.status === "训练中" && (
                      <Button variant="outline" size="sm" disabled>
                        训练中...
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* 性能指标 */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">性能指标</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">准确率 (Accuracy)</span>
                          <span className="font-medium">{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">精确率 (Precision)</span>
                          <span className="font-medium">{model.precision}%</span>
                        </div>
                        <Progress value={model.precision} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">召回率 (Recall)</span>
                          <span className="font-medium">{model.recall}%</span>
                        </div>
                        <Progress value={model.recall} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">F1分数</span>
                          <span className="font-medium">{model.f1Score}%</span>
                        </div>
                        <Progress value={model.f1Score} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {/* 训练信息 */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">训练信息</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">训练样本</span>
                        </div>
                        <span className="font-medium">{model.trainingSamples.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">模型类型</span>
                        </div>
                        <span className="font-medium">{model.type}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">最后训练</span>
                        </div>
                        <span className="font-medium">
                          {formatDistanceToNow(new Date(model.lastTrainDate), { 
                            addSuffix: true,
                            locale: zhCN 
                          })}
                        </span>
                      </div>

                      {model.deployDate && (
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">部署时间</span>
                          </div>
                          <span className="font-medium">
                            {formatDistanceToNow(new Date(model.deployDate), { 
                              addSuffix: true,
                              locale: zhCN 
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 识别类别 */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">支持识别类别 ({model.categories.length}类)</h4>
                  <div className="flex flex-wrap gap-2">
                    {model.categories.slice(0, 15).map((category, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {model.categories.length > 15 && (
                      <Badge variant="outline" className="text-xs">
                        +{model.categories.length - 15} 更多
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="deployed" className="space-y-4">
          {deployedModels.map((model) => (
            <Card key={model.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{model.name}</CardTitle>
                      <Badge variant="default">{model.status}</Badge>
                      <Badge variant="outline">{model.version}</Badge>
                    </div>
                    <CardDescription>
                      准确率: {model.accuracy}% · F1分数: {model.f1Score}%
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      更新版本
                    </Button>
                    <Button variant="outline" size="sm">管理</Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}

          {deployedModels.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>暂无已部署的模型</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          {trainingModels.map((model) => (
            <Card key={model.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{model.name}</CardTitle>
                      <Badge variant="secondary">{model.status}</Badge>
                      <Badge variant="outline">{model.version}</Badge>
                    </div>
                    <CardDescription>
                      训练样本: {model.trainingSamples.toLocaleString()} 张
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    查看进度
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">训练进度</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    预计剩余时间: 2小时15分钟
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          {trainingModels.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>暂无正在训练的模型</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

