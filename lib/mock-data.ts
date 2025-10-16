// ==================== 违禁品类别数据 ====================
export const prohibitedItems = [
  "枪支弹药", "爆炸物品", "管制刀具", "易燃易爆物", "腐蚀性物品",
  "毒害品", "放射性物品", "传染病病原体", "其他危险品", "酒类",
  "打火机", "火柴", "电池类", "液体类", "气体类",
  "利器工具", "钝器", "警用器械", "军用物品", "违禁药品",
  "毒品及吸毒工具", "淫秽物品", "间谍器材", "非法出版物", "假币",
  "文物", "珍稀动植物", "仿真枪", "弩", "电击器",
  "催泪器", "防卫器", "钢珠枪", "指节铜环", "三棱刀",
  "带刺手套", "其他违禁品"
]

export const topProhibitedItems = [
  { name: "管制刀具", count: 1247, trend: 12 },
  { name: "易燃易爆物", count: 823, trend: -5 },
  { name: "液体类", count: 612, trend: 8 },
  { name: "打火机", count: 487, trend: 3 },
  { name: "利器工具", count: 356, trend: -2 },
  { name: "腐蚀性物品", count: 234, trend: 15 },
  { name: "电池类", count: 189, trend: 6 },
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
    id: "DEV-001",
    name: "X光机-01",
    type: "X光机",
    location: "通道A",
    status: "在线",
    healthScore: 98,
    lastCheck: new Date(Date.now() - 300000).toISOString(),
    temperature: 42,
    workload: 75,
    processedToday: 1247
  },
  {
    id: "DEV-002",
    name: "X光机-02",
    type: "X光机",
    location: "通道B",
    status: "在线",
    healthScore: 95,
    lastCheck: new Date(Date.now() - 180000).toISOString(),
    temperature: 45,
    workload: 82,
    processedToday: 1432
  },
  {
    id: "DEV-003",
    name: "X光机-03",
    type: "X光机",
    location: "通道C",
    status: "故障",
    healthScore: 45,
    lastCheck: new Date(Date.now() - 7200000).toISOString(),
    temperature: 68,
    workload: 0,
    processedToday: 234
  },
  {
    id: "DEV-004",
    name: "金属探测器-01",
    type: "金属探测器",
    location: "入口A",
    status: "在线",
    healthScore: 100,
    lastCheck: new Date(Date.now() - 120000).toISOString(),
    workload: 65,
    processedToday: 2341
  },
  {
    id: "DEV-005",
    name: "AI分析服务器-主",
    type: "AI分析服务器",
    location: "机房01",
    status: "在线",
    healthScore: 92,
    lastCheck: new Date(Date.now() - 60000).toISOString(),
    temperature: 38,
    workload: 88,
    processedToday: 8756
  },
  {
    id: "DEV-006",
    name: "分拣机-01",
    type: "分拣机",
    location: "分拣区A",
    status: "在线",
    healthScore: 96,
    lastCheck: new Date(Date.now() - 240000).toISOString(),
    workload: 71,
    processedToday: 1876
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
  
  return Array.from({ length: count }, (_, i) => {
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
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      deviceId: deviceStatuses[Math.floor(Math.random() * 3)].id,
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

  return Array.from({ length: count }, (_, i) => {
    const level = levels[Math.floor(Math.random() * levels.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const isHandled = status === "已处理" || status === "已忽略"

    return {
      id: `ALERT-${String(i + 1).padStart(6, "0")}`,
      timestamp: new Date(Date.now() - Math.random() * 7200000).toISOString(),
      level,
      type: types[Math.floor(Math.random() * types.length)],
      deviceId: deviceStatuses[Math.floor(Math.random() * deviceStatuses.length)].id,
      detectionId: Math.random() > 0.5 ? `DET-${String(Math.floor(Math.random() * 10000)).padStart(8, "0")}` : undefined,
      message: `检测到${prohibitedItems[Math.floor(Math.random() * prohibitedItems.length)]}，置信度 ${(Math.random() * 40 + 60).toFixed(1)}%`,
      status,
      handler: isHandled ? `操作员${Math.floor(Math.random() * 5) + 1}` : undefined,
      handleTime: isHandled ? new Date(Date.now() - Math.random() * 3600000).toISOString() : undefined,
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

export function generateDailyData(startDate: Date, endDate: Date, baseValue: number, variance: number) {
  const data = []
  const current = new Date(startDate)

  while (current <= endDate) {
    const value = Math.max(0, baseValue + (Math.random() - 0.5) * variance)
    data.push({
      date: current.toISOString().split("T")[0],
      value: Math.round(value),
    })
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
  const profiles: UserProfile[] = []
  for (let i = 0; i < 24; i++) {
    const hour = `${String(i).padStart(2, '0')}:00`
    let count: number
    let type: "高峰期" | "平峰期" | "低峰期"
    
    if (i >= 8 && i <= 10) {
      count = 300 + Math.random() * 200
      type = "高峰期"
    } else if (i >= 17 && i <= 19) {
      count = 350 + Math.random() * 250
      type = "高峰期"
    } else if (i >= 11 && i <= 16) {
      count = 150 + Math.random() * 100
      type = "平峰期"
    } else {
      count = 20 + Math.random() * 50
      type = "低峰期"
    }
    
    profiles.push({ hour, count: Math.round(count), type })
  }
  return profiles
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
