// ==================== 违禁品类别数据 ====================
// 法院安检常见违禁品（日常物品，无严重违法物品）
export const prohibitedItems = [
  "液体超标", "打火机", "火柴", "充电宝", "电池类", 
  "小刀", "剪刀", "指甲刀", "钥匙扣工具", "美工刀",
  "酒类", "喷雾", "雨伞", "自拍杆", "玻璃瓶",
  "金属制品", "尖锐物品", "易燃物", "气体打火机", "利器工具",
  "水果刀", "折叠刀", "瑞士军刀", "多功能工具", "螺丝刀",
  "扳手", "钳子", "锤子", "其他工具", "其他违禁品"
]

export const topProhibitedItems = [
  { name: "液体超标", count: 18, trend: 2 },
  { name: "打火机", count: 12, trend: -1 },
  { name: "小刀", count: 8, trend: 1 },
  { name: "充电宝", count: 4, trend: 0 },
  { name: "剪刀", count: 2, trend: 0 },
  { name: "钥匙扣工具", count: 1, trend: 0 },
]

// ==================== 设备状态数据 ====================
export interface DeviceStatus {
  id: string
  name: string
  type: "X光机" | "金属探测器" | "人脸识别" | "AI分析服务器" | "分拣机"
  location: string
  status: "在线" | "离线" | "故障" | "维护"
  healthScore: number
  lastCheck: string
  temperature?: number
  workload?: number
  processedToday: number
}

export const deviceStatuses: DeviceStatus[] = [
  {
    id: "DEV-003",
    name: "X光机",
    type: "X光机",
    location: "通道C",
    status: "在线",
    healthScore: 85,
    lastCheck: "2025-04-30T18:00:00Z",
    temperature: 35,
    workload: 75,
    processedToday: 127
  }
]

// ==================== AI识别记录 ====================
export interface DetectionRecord {
  id: string
  timestamp: string
  deviceId: string
  imageUrl: string
  aiResult: "安全" | "可疑" | "危险" | "未识别"
  confidence: number
  detectedItems: Array<{
    category: string
    confidence: number
    position: { x: number; y: number; width: number; height: number }
  }>
  humanReview?: "待审核" | "确认" | "否决"
  humanReviewer?: string
  processingTime: number
  needsTraining: boolean
}

export function generateDetectionRecords(count: number): DetectionRecord[] {
  const results: Array<"安全" | "可疑" | "危险" | "未识别"> = ["安全", "可疑", "危险", "未识别"]
  const reviewStatus: Array<"待审核" | "确认" | "否决"> = ["待审核", "确认", "否决"]
  
  // 设备使用期间：2025年2月1日-4月30日(89天) 和 2025年10月16-17日(2天)
  // 将大部分数据分配到2-4月，少量分配到10月
  const period1Start = new Date("2025-02-01").getTime()
  const period1End = new Date("2025-04-30").getTime()
  const period2Start = new Date("2025-10-16").getTime()
  const period2End = new Date("2025-10-17").getTime()
  
  return Array.from({ length: count }, (_, i) => {
    // 95%的数据来自2-4月，5%来自10月16-17日
    const usePeriod1 = Math.random() < 0.95
    const timestamp = usePeriod1
      ? new Date(period1Start + Math.random() * (period1End - period1Start)).toISOString()
      : new Date(period2Start + Math.random() * (period2End - period2Start)).toISOString()
    
    const result = results[Math.floor(Math.random() * results.length)]
    const needsReview = result !== "安全" || Math.random() > 0.8
    
    const detectedItems = result === "安全" ? [] : Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => ({
        category: prohibitedItems[Math.floor(Math.random() * prohibitedItems.length)],
        confidence: 0.6 + Math.random() * 0.39,
        position: {
          x: Math.random() * 400,
          y: Math.random() * 300,
          width: 50 + Math.random() * 100,
          height: 50 + Math.random() * 100
        }
      })
    )

    return {
      id: `DET-${String(i + 1).padStart(8, "0")}`,
      timestamp,
      deviceId: "DEV-003",
      imageUrl: `/placeholder.jpg`,
      aiResult: result,
      confidence: 0.5 + Math.random() * 0.5,
      detectedItems,
      humanReview: needsReview ? reviewStatus[Math.floor(Math.random() * reviewStatus.length)] : undefined,
      humanReviewer: needsReview && Math.random() > 0.5 ? `审核员${Math.floor(Math.random() * 10) + 1}` : undefined,
      processingTime: 100 + Math.random() * 900,
      needsTraining: Math.random() > 0.85
    }
  })
}

// ==================== 报警记录 ====================
export interface AlertRecord {
  id: string
  timestamp: string
  level: "低" | "中" | "高" | "紧急"
  type: "违禁品检测" | "设备故障" | "系统异常" | "超时未处理"
  deviceId: string
  detectionId?: string
  message: string
  status: "未处理" | "处理中" | "已处理" | "已忽略"
  handler?: string
  handleTime?: string
  soundAlert: boolean
}

export function generateAlertRecords(count: number): AlertRecord[] {
  const levels: Array<"低" | "中" | "高" | "紧急"> = ["低", "中", "高", "紧急"]
  const types: Array<"违禁品检测" | "设备故障" | "系统异常" | "超时未处理"> = 
    ["违禁品检测", "设备故障", "系统异常", "超时未处理"]
  const statuses: Array<"未处理" | "处理中" | "已处理" | "已忽略"> = 
    ["未处理", "处理中", "已处理", "已忽略"]

  // 2025年2月1日到4月30日
  const startDate = new Date("2025-02-01").getTime()
  const endDate = new Date("2025-04-30").getTime()
  const timeRange = endDate - startDate

  return Array.from({ length: count }, (_, i) => {
    const level = levels[Math.floor(Math.random() * levels.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const isHandled = status === "已处理" || status === "已忽略"
    const timestamp = new Date(startDate + Math.random() * timeRange).toISOString()

    return {
      id: `ALERT-${String(i + 1).padStart(6, "0")}`,
      timestamp,
      level,
      type: types[Math.floor(Math.random() * types.length)],
      deviceId: "DEV-003",
      detectionId: Math.random() > 0.5 ? `DET-${String(Math.floor(Math.random() * 10000)).padStart(8, "0")}` : undefined,
      message: `检测到${prohibitedItems[Math.floor(Math.random() * prohibitedItems.length)]}，置信度 ${(Math.random() * 40 + 60).toFixed(1)}%`,
      status,
      handler: isHandled ? `操作员${Math.floor(Math.random() * 5) + 1}` : undefined,
      handleTime: isHandled ? new Date(new Date(timestamp).getTime() + Math.random() * 3600000).toISOString() : undefined,
      soundAlert: level === "高" || level === "紧急"
    }
  })
}

// ==================== AI模型数据 ====================
export interface AIModel {
  id: string
  name: string
  version: string
  type: "目标检测" | "分类" | "分割"
  status: "训练中" | "已部署" | "待更新" | "已停用"
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  trainingSamples: number
  lastTrainDate: string
  deployDate?: string
  categories: string[]
}

export const aiModels: AIModel[] = [
  {
    id: "MODEL-001",
    name: "违禁品检测主模型",
    version: "v3.2.1",
    type: "目标检测",
    status: "已部署",
    accuracy: 96.8,
    precision: 95.4,
    recall: 97.2,
    f1Score: 96.3,
    trainingSamples: 125000,
    lastTrainDate: new Date(Date.now() - 7 * 86400000).toISOString(),
    deployDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    categories: prohibitedItems.slice(0, 35)
  },
  {
    id: "MODEL-002",
    name: "液体检测专用模型",
    version: "v2.1.0",
    type: "分类",
    status: "已部署",
    accuracy: 94.2,
    precision: 93.1,
    recall: 95.3,
    f1Score: 94.2,
    trainingSamples: 45000,
    lastTrainDate: new Date(Date.now() - 14 * 86400000).toISOString(),
    deployDate: new Date(Date.now() - 10 * 86400000).toISOString(),
    categories: ["易燃易爆液体", "腐蚀性液体", "酒类", "普通液体"]
  },
  {
    id: "MODEL-003",
    name: "刀具识别模型",
    version: "v4.0.0",
    type: "目标检测",
    status: "训练中",
    accuracy: 97.5,
    precision: 96.8,
    recall: 98.1,
    f1Score: 97.4,
    trainingSamples: 78000,
    lastTrainDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    categories: ["管制刀具", "利器工具", "剪刀", "水果刀"]
  }
]

// ==================== 训练样本数据 ====================
export interface TrainingSample {
  id: string
  imageUrl: string
  source: "AI未识别" | "超时" | "可疑" | "人工标注"
  uploadDate: string
  labeled: boolean
  labeledBy?: string
  labeledDate?: string
  annotations: Array<{
    category: string
    bbox: { x: number; y: number; width: number; height: number }
  }>
  usedInTraining: boolean
  modelVersion?: string
}

export function generateTrainingSamples(count: number): TrainingSample[] {
  const sources: Array<"AI未识别" | "超时" | "可疑" | "人工标注"> = 
    ["AI未识别", "超时", "可疑", "人工标注"]

  return Array.from({ length: count }, (_, i) => {
    const labeled = Math.random() > 0.3
    
    return {
      id: `SAMPLE-${String(i + 1).padStart(6, "0")}`,
      imageUrl: `/placeholder.jpg`,
      source: sources[Math.floor(Math.random() * sources.length)],
      uploadDate: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
      labeled,
      labeledBy: labeled ? `标注员${Math.floor(Math.random() * 8) + 1}` : undefined,
      labeledDate: labeled ? new Date(Date.now() - Math.random() * 15 * 86400000).toISOString() : undefined,
      annotations: labeled ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
        category: prohibitedItems[Math.floor(Math.random() * prohibitedItems.length)],
        bbox: {
          x: Math.random() * 400,
          y: Math.random() * 300,
          width: 50 + Math.random() * 100,
          height: 50 + Math.random() * 100
        }
      })) : [],
      usedInTraining: labeled && Math.random() > 0.4,
      modelVersion: labeled && Math.random() > 0.4 ? aiModels[Math.floor(Math.random() * aiModels.length)].version : undefined
    }
  })
}

// ==================== 统计数据生成函数 ====================
export function generateTimeSeriesData(startDate: Date, endDate: Date, baseValue: number, variance: number) {
  const data = []
  const current = new Date(startDate)

  while (current <= endDate) {
    const value = Math.max(0, baseValue + (Math.random() - 0.5) * variance)
    data.push({
      date: new Date(current).toISOString(),
      value: Math.round(value),
    })
    current.setHours(current.getHours() + 1)
  }

  return data
}

export function generateDailyData(startDate: Date, endDate: Date, baseValue: number, variance: number, maxDaily: number = 150) {
  const data = []
  const current = new Date(startDate)
  
  // 设备使用期间：2025年2月1日-4月30日 和 2025年10月16-17日
  const period1Start = new Date("2025-02-01")
  const period1End = new Date("2025-04-30")
  const period2Start = new Date("2025-10-16")
  const period2End = new Date("2025-10-17")
  
  // 辅助函数：判断日期是否在使用期间
  const isInUsagePeriod = (date: Date) => {
    const time = date.getTime()
    return (time >= period1Start.getTime() && time <= period1End.getTime()) ||
           (time >= period2Start.getTime() && time <= period2End.getTime())
  }

  while (current <= endDate) {
    const dateStr = current.toISOString().split("T")[0]
    
    // 如果不在使用期间，跳过
    if (!isInUsagePeriod(current)) {
      current.setDate(current.getDate() + 1)
      continue
    }
    
    // 检查是否为工作日（周一到周五）
    const dayOfWeek = current.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    // 周末没有数据
    if (isWeekend) {
      data.push({
        date: dateStr,
        value: 0,
      })
    } else {
      // 工作日：每天最多maxDaily次（默认150）
      const value = Math.min(maxDaily, Math.max(0, baseValue + (Math.random() - 0.5) * variance))
      data.push({
        date: dateStr,
        value: Math.round(value),
      })
    }
    current.setDate(current.getDate() + 1)
  }

  return data
}

// 生成违禁品检出数据（特殊规则：一天最多2个，50%的日子为0，周末无数据）
export function generateViolationData(startDate: Date, endDate: Date) {
  const data = []
  const current = new Date(startDate)
  
  // 设备使用期间：2025年2月1日-4月30日 和 2025年10月16-17日
  const period1Start = new Date("2025-02-01")
  const period1End = new Date("2025-04-30")
  const period2Start = new Date("2025-10-16")
  const period2End = new Date("2025-10-17")
  
  // 辅助函数：判断日期是否在使用期间
  const isInUsagePeriod = (date: Date) => {
    const time = date.getTime()
    return (time >= period1Start.getTime() && time <= period1End.getTime()) ||
           (time >= period2Start.getTime() && time <= period2End.getTime())
  }

  while (current <= endDate) {
    const dateStr = current.toISOString().split("T")[0]
    
    // 如果不在使用期间，跳过
    if (!isInUsagePeriod(current)) {
      current.setDate(current.getDate() + 1)
      continue
    }
    
    const dayOfWeek = current.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    if (isWeekend) {
      // 周末没有数据
      data.push({
        date: dateStr,
        value: 0,
      })
    } else {
      // 工作日：50%的日子没有违禁品
      const hasViolation = Math.random() > 0.5
      const value = hasViolation ? Math.floor(Math.random() * 2) + 1 : 0 // 0-2个
      
      data.push({
        date: dateStr,
        value,
      })
    }
    current.setDate(current.getDate() + 1)
  }

  return data
}

// 生成人工复核数据（一天最多1个，周末无数据）
export function generateReviewData(startDate: Date, endDate: Date) {
  const data = []
  const current = new Date(startDate)
  
  // 设备使用期间：2025年2月1日-4月30日 和 2025年10月16-17日
  const period1Start = new Date("2025-02-01")
  const period1End = new Date("2025-04-30")
  const period2Start = new Date("2025-10-16")
  const period2End = new Date("2025-10-17")
  
  // 辅助函数：判断日期是否在使用期间
  const isInUsagePeriod = (date: Date) => {
    const time = date.getTime()
    return (time >= period1Start.getTime() && time <= period1End.getTime()) ||
           (time >= period2Start.getTime() && time <= period2End.getTime())
  }

  while (current <= endDate) {
    const dateStr = current.toISOString().split("T")[0]
    
    // 如果不在使用期间，跳过
    if (!isInUsagePeriod(current)) {
      current.setDate(current.getDate() + 1)
      continue
    }
    
    const dayOfWeek = current.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    if (isWeekend) {
      // 周末没有数据
      data.push({
        date: dateStr,
        value: 0,
      })
    } else {
      // 工作日：一天最多1个，40%的概率有复核
      const value = Math.random() > 0.6 ? 1 : 0
      
      data.push({
        date: dateStr,
        value,
      })
    }
    current.setDate(current.getDate() + 1)
  }

  return data
}

// ==================== 用户画像数据 ====================
export interface UserProfile {
  hour: string
  count: number
  type: "高峰期" | "平峰期" | "低峰期"
}

export function generateUserProfiles(): UserProfile[] {
  // 法院朝九晚五，只有9:00-17:00有数据
  return [
    { hour: "09:00", count: 45, type: "平峰期" },
    { hour: "10:00", count: 89, type: "高峰期" },
    { hour: "11:00", count: 102, type: "高峰期" },
    { hour: "12:00", count: 35, type: "低峰期" },  // 午休时间，人少
    { hour: "13:00", count: 28, type: "低峰期" },  // 午休时间，人少
    { hour: "14:00", count: 98, type: "高峰期" },
    { hour: "15:00", count: 115, type: "高峰期" },
    { hour: "16:00", count: 92, type: "高峰期" },
    { hour: "17:00", count: 48, type: "平峰期" },  // 下班时间
  ]
}

// ==================== 系统配置数据 ====================
export interface SystemConfig {
  id: string
  category: "设备配置" | "AI配置" | "报警配置" | "用户配置"
  name: string
  value: string | number | boolean
  description: string
  lastModified: string
  modifiedBy: string
}

export const systemConfigs: SystemConfig[] = [
  {
    id: "CFG-001",
    category: "AI配置",
    name: "识别置信度阈值",
    value: 0.75,
    description: "低于此阈值的识别结果将标记为可疑",
    lastModified: new Date(Date.now() - 5 * 86400000).toISOString(),
    modifiedBy: "管理员"
  },
  {
    id: "CFG-002",
    category: "报警配置",
    name: "声音报警",
    value: true,
    description: "检测到高危违禁品时是否启用声音报警",
    lastModified: new Date(Date.now() - 10 * 86400000).toISOString(),
    modifiedBy: "管理员"
  },
  {
    id: "CFG-003",
    category: "设备配置",
    name: "图像处理超时时间",
    value: 3000,
    description: "AI处理单张图像的最大时间(毫秒)",
    lastModified: new Date(Date.now() - 3 * 86400000).toISOString(),
    modifiedBy: "技术员"
  },
  {
    id: "CFG-004",
    category: "AI配置",
    name: "自动学习开关",
    value: true,
    description: "是否自动将未识别图片加入训练样本",
    lastModified: new Date(Date.now() - 7 * 86400000).toISOString(),
    modifiedBy: "管理员"
  }
]
