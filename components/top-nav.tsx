"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import NextImage from "next/image"
import { 
  LayoutDashboard, 
  Monitor, 
  Image, 
  Users, 
  Brain,
  Database,
  BarChart3, 
  FileText,
  Settings, 
  Shield,
  Cpu,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "总览",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "实时监控",
    url: "/monitoring",
    icon: Monitor,
  },
  {
    title: "图像识别",
    url: "/detection",
    icon: Image,
  },
  {
    title: "人工复核",
    url: "/review",
    icon: Users,
  },
  {
    title: "AI模型",
    url: "/models",
    icon: Brain,
  },
  {
    title: "AI学习中心",
    url: "/learning",
    icon: Cpu,
  },
  {
    title: "训练样本",
    url: "/samples",
    icon: Database,
  },
  {
    title: "数据分析",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "报表",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "事件",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "设置",
    url: "/settings",
    icon: Settings,
  },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-card/95 backdrop-blur-xl shadow-lg shadow-primary/5">
      <div className="container mx-auto">
        <div className="flex h-16 items-center gap-8 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all">
              <NextImage
                src="/header.png"
                alt="守门神科技"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-foreground tracking-wide">
                智慧安检管理平台
              </span>
              <span className="text-xs text-muted-foreground font-medium">广东守门神科技集团</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.url
              const Icon = item.icon
              
              return (
                <Link
                  key={item.url}
                  href={item.url}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap",
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/30 shadow-inner shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/80"
                  )}
                >
                  <Icon className={cn(
                    "h-4 w-4",
                    isActive && "drop-shadow-[0_0_4px_rgba(0,200,255,0.5)]"
                  )} />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>

          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-chart-2/10 border border-chart-2/30">
              <div className="w-2 h-2 rounded-full bg-chart-2 animate-pulse shadow-lg shadow-chart-2/50" />
              <span className="text-xs font-semibold text-chart-2">X光机在线</span>
            </div>
            <div className="text-xs text-muted-foreground">
              
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border">
              <span className="text-xs font-mono font-semibold text-foreground/70">版本号:SMS-ZHAJ-1</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

