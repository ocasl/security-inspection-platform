"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateTrainingSamples } from "@/lib/mock-data"
import { Database, Upload, Tag, CheckCircle2, Clock, Search, Filter } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { useState } from "react"
// @ts-ignore
import imageData from "@/public/Thunderbit_ebc83b_20251017_032403.json"

export default function SamplesPage() {
  const [filterSource, setFilterSource] = useState<string>("all")
  const [filterLabeled, setFilterLabeled] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  // 提取所有图片URL
  const xrayImages = imageData
    .map((item: any) => item.png || item.jpg || item.jpeg)
    .filter((url: string) => url)
  
  const allSamples = generateTrainingSamples(100)
  
  const filteredSamples = allSamples.filter(s => {
    const matchesSource = filterSource === "all" || s.source === filterSource
    const matchesLabeled = filterLabeled === "all" || 
      (filterLabeled === "labeled" && s.labeled) ||
      (filterLabeled === "unlabeled" && !s.labeled)
    const matchesSearch = searchQuery === "" || 
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSource && matchesLabeled && matchesSearch
  })

  const stats = {
    total: allSamples.length,
    labeled: allSamples.filter(s => s.labeled).length,
    unlabeled: allSamples.filter(s => !s.labeled).length,
    used: allSamples.filter(s => s.usedInTraining).length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">训练样本管理</h1>
          <p className="text-muted-foreground mt-2">管理AI模型训练所需的图像样本</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            批量上传
          </Button>
          <Button>
            <Tag className="h-4 w-4 mr-2" />
            开始标注
          </Button>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">样本总数</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">图像训练样本</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已标注</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{stats.labeled}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((stats.labeled / stats.total) * 100).toFixed(1)}% 完成
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待标注</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.unlabeled}</div>
            <p className="text-xs text-muted-foreground mt-1">等待处理</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已用于训练</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.used}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((stats.used / stats.total) * 100).toFixed(1)}% 使用率
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 样本列表 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>样本库</CardTitle>
              <CardDescription>浏览和管理所有训练样本</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索样本..."
                  className="pl-8 w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterSource} onValueChange={setFilterSource}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部来源</SelectItem>
                  <SelectItem value="AI未识别">AI未识别</SelectItem>
                  <SelectItem value="超时">超时</SelectItem>
                  <SelectItem value="可疑">可疑</SelectItem>
                  <SelectItem value="人工标注">人工标注</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLabeled} onValueChange={setFilterLabeled}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="labeled">已标注</SelectItem>
                  <SelectItem value="unlabeled">待标注</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSamples.slice(0, 24).map((sample, index) => {
              // 为每个样本分配一个真实的X光图片
              const imageUrl = xrayImages[index % xrayImages.length]
              
              return (
                <Card key={sample.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center relative group overflow-hidden">
                    {/* 显示真实的X光图片 */}
                    <img 
                      src={imageUrl}
                      alt={`X光图片 ${sample.id}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">
                        查看
                      </Button>
                      {!sample.labeled && (
                        <Button size="sm">
                          标注
                        </Button>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      {sample.labeled ? (
                        <Badge variant="default" className="text-xs bg-chart-2">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          已标注
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs bg-yellow-500/90 text-white">
                          <Clock className="h-3 w-3 mr-1" />
                          待标注
                        </Badge>
                      )}
                    </div>
                  </div>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{sample.id}</span>
                      <Badge variant="outline" className="text-xs">
                        {sample.source}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      上传: {formatDistanceToNow(new Date(sample.uploadDate), { 
                        addSuffix: true,
                        locale: zhCN 
                      })}
                    </p>

                    {sample.labeled && sample.labeledBy && (
                      <p className="text-xs text-muted-foreground">
                        标注人: {sample.labeledBy}
                      </p>
                    )}

                    {sample.annotations.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {sample.annotations.slice(0, 2).map((ann, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {ann.category}
                          </Badge>
                        ))}
                        {sample.annotations.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{sample.annotations.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}

                    {sample.usedInTraining && sample.modelVersion && (
                      <div className="flex items-center gap-1 text-xs text-chart-2">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>已用于 {sample.modelVersion}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              )
            })}
          </div>

          {filteredSamples.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>没有找到匹配的样本</p>
            </div>
          )}

          {filteredSamples.length > 24 && (
            <div className="text-center pt-6">
              <Button variant="outline">加载更多</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 批量操作 */}
      <Card>
        <CardHeader>
          <CardTitle>批量操作</CardTitle>
          <CardDescription>对选中的样本进行批量处理</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline">
              <Tag className="h-4 w-4 mr-2" />
              批量标注
            </Button>
            <Button variant="outline">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              标记为已用
            </Button>
            <Button variant="outline">
              <Database className="h-4 w-4 mr-2" />
              导出样本
            </Button>
            <Button variant="outline" className="text-destructive">
              删除选中
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

