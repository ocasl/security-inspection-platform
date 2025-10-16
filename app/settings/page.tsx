"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { deviceStatuses, systemConfigs } from "@/lib/mock-data"
import { Settings, Monitor, Brain, Bell, Users, Database, Shield } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [confidenceThreshold, setConfidenceThreshold] = useState([75])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">系统配置</h1>
        <p className="text-muted-foreground mt-2">管理设备、AI模型、人员和报警系统配置</p>
      </div>

      <Tabs defaultValue="ai" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ai">
            <Brain className="h-4 w-4 mr-2" />
            AI配置
          </TabsTrigger>
          <TabsTrigger value="devices">
            <Monitor className="h-4 w-4 mr-2" />
            设备配置
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <Bell className="h-4 w-4 mr-2" />
            报警配置
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            用户管理
          </TabsTrigger>
          <TabsTrigger value="system">
            <Settings className="h-4 w-4 mr-2" />
            系统设置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI识别配置</CardTitle>
                <CardDescription>配置AI模型识别参数</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>识别置信度阈值: {confidenceThreshold[0]}%</Label>
                    <Slider
                      value={confidenceThreshold}
                      onValueChange={setConfidenceThreshold}
                      min={50}
                      max={99}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      低于此阈值的识别结果将标记为可疑，需要人工复核
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeout">图像处理超时时间（毫秒）</Label>
                    <Input id="timeout" type="number" defaultValue="3000" />
                    <p className="text-xs text-muted-foreground">
                      超过此时间未完成处理将触发超时报警
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">当前使用模型</Label>
                    <Select defaultValue="main">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">违禁品检测主模型 v3.2.1</SelectItem>
                        <SelectItem value="liquid">液体检测专用模型 v2.1.0</SelectItem>
                        <SelectItem value="knife">刀具识别模型 v4.0.0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full">保存AI配置</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>自动学习配置</CardTitle>
                <CardDescription>配置AI自动学习和优化规则</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>自动采集未识别样本</Label>
                    <p className="text-xs text-muted-foreground">
                      将AI无法识别的图像自动加入训练库
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>自动学习可疑物品</Label>
                    <p className="text-xs text-muted-foreground">
                      从人工复核中学习特征
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>定期模型更新</Label>
                    <p className="text-xs text-muted-foreground">
                      每周自动训练并部署新版本
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-samples">最小学习样本数</Label>
                  <Input id="min-samples" type="number" defaultValue="100" />
                  <p className="text-xs text-muted-foreground">
                    达到此数量后才开始训练
                  </p>
                </div>

                <Button className="w-full">保存学习配置</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>设备列表</CardTitle>
              <CardDescription>管理和配置所有安检设备</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deviceStatuses.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{device.name}</h4>
                        <Badge variant={device.status === "在线" ? "default" : "destructive"}>
                          {device.status}
                        </Badge>
                        <Badge variant="outline">{device.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {device.location} · ID: {device.id}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">配置</Button>
                      <Button size="sm" variant="outline">维护</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Monitor className="h-4 w-4 mr-2" />
                添加新设备
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>设备连接配置</CardTitle>
                <CardDescription>设备网络和通信参数</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="device-timeout">设备离线超时（分钟）</Label>
                  <Input id="device-timeout" type="number" defaultValue="5" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>自动重连</Label>
                    <p className="text-xs text-muted-foreground">
                      设备离线后自动尝试重连
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>心跳检测</Label>
                    <p className="text-xs text-muted-foreground">
                      每30秒检查设备在线状态
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button className="w-full">保存配置</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>设备维护配置</CardTitle>
                <CardDescription>设备健康检查和维护计划</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>定期健康检查</Label>
                    <p className="text-xs text-muted-foreground">
                      每小时自动检查设备健康度
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="health-threshold">健康度预警阈值（%）</Label>
                  <Input id="health-threshold" type="number" defaultValue="70" />
                  <p className="text-xs text-muted-foreground">
                    低于此值将触发维护预警
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maintenance-interval">维护周期（天）</Label>
                  <Input id="maintenance-interval" type="number" defaultValue="30" />
                </div>

                <Button className="w-full">保存配置</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>报警级别配置</CardTitle>
                <CardDescription>不同级别报警的触发条件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-destructive/50 bg-destructive/5">
                    <div className="flex items-center justify-between mb-2">
                      <Label>紧急报警</Label>
                      <Badge variant="destructive">紧急</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      枪支弹药、爆炸物品等高危违禁品
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">声音报警</span>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <Label>高级报警</Label>
                      <Badge variant="destructive">高</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      管制刀具、易燃易爆物等危险品
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">声音报警</span>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <Label>中级报警</Label>
                      <Badge variant="default">中</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      可疑物品、设备异常等
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">声音报警</span>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Button className="w-full">保存报警配置</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>通知配置</CardTitle>
                <CardDescription>报警通知方式和接收人</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>系统弹窗通知</Label>
                    <p className="text-xs text-muted-foreground">
                      在系统界面显示报警弹窗
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>邮件通知</Label>
                    <p className="text-xs text-muted-foreground">
                      向管理员发送邮件
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>短信通知</Label>
                    <p className="text-xs text-muted-foreground">
                      紧急情况发送短信
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alert-email">通知邮箱</Label>
                  <Input id="alert-email" type="email" defaultValue="admin@security.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alert-phone">通知手机</Label>
                  <Input id="alert-phone" type="tel" defaultValue="+86 138****8888" />
                </div>

                <Button className="w-full">保存通知配置</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>用户管理</CardTitle>
              <CardDescription>管理系统操作人员和权限</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["管理员", "操作员1", "操作员2", "审核员1", "审核员2", "标注员1", "标注员2"].map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{user}</p>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 ? "超级管理员" : 
                         user.includes("操作员") ? "设备操作员" :
                         user.includes("审核员") ? "人工审核员" : "数据标注员"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? "destructive" : "default"}>
                      {index === 0 ? "管理员" : "普通用户"}
                    </Badge>
                    <Button size="sm" variant="outline">编辑</Button>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                添加新用户
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>基本设置</CardTitle>
                <CardDescription>系统基本配置信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">系统名称</Label>
                  <Input id="system-name" defaultValue="智慧安检管理平台" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refresh-interval">数据刷新间隔（秒）</Label>
                  <Input id="refresh-interval" type="number" defaultValue="5" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">时区</Label>
                  <Select defaultValue="asia-shanghai">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-shanghai">中国标准时间 (UTC+8)</SelectItem>
                      <SelectItem value="utc">世界标准时间 (UTC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">保存设置</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>数据管理</CardTitle>
                <CardDescription>数据存储和备份配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="retention-days">数据保留天数</Label>
                  <Input id="retention-days" type="number" defaultValue="180" />
                  <p className="text-xs text-muted-foreground">
                    超过此天数的数据将被自动清理
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>自动备份</Label>
                    <p className="text-xs text-muted-foreground">
                      每日凌晨3:00自动备份
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>数据导出</Label>
                  <Button variant="outline" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    导出历史数据
                  </Button>
                </div>

                <Button className="w-full">保存设置</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>系统信息</CardTitle>
                <CardDescription>当前系统运行信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">系统版本</span>
                  <span className="font-medium">v1.0.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">运行时间</span>
                  <span className="font-medium">15天 8小时</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">数据库大小</span>
                  <span className="font-medium">2.3 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">最后备份</span>
                  <span className="font-medium">2小时前</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>系统维护</CardTitle>
                <CardDescription>系统维护和诊断工具</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  系统诊断
                </Button>
                <Button variant="outline" className="w-full">
                  清理缓存
                </Button>
                <Button variant="outline" className="w-full">
                  查看日志
                </Button>
                <Button variant="destructive" className="w-full">
                  重启系统
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
