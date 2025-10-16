import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "智慧安检管理平台",
  description: "基于物联设备的智能安检管理系统",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-muted/30">
              <div className="border-b border-border bg-card/80 backdrop-blur-sm shadow-sm supports-[backdrop-filter]:bg-card/80">
                <div className="flex h-16 items-center gap-4 px-6">
                  <SidebarTrigger />
                  <div className="flex-1" />
                  <div className="text-sm text-muted-foreground">智慧安检管理平台</div>
                </div>
              </div>
              <div className="p-6">{children}</div>
            </main>
          </SidebarProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
