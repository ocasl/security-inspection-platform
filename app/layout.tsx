import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { TopNav } from "@/components/top-nav"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "成安县人民法院 - 智慧安检管理平台",
  description: "成安县人民法院智能安检管理系统 - 广东守门神科技集团",
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
          <div className="min-h-screen bg-background flex flex-col">
            <TopNav />
            {/* Header Banner */}
            <div className="w-full relative h-32 md:h-40 lg:h-48 border-b border-border shadow-lg overflow-hidden">
              <Image
                src="/security-inspection/header.png"
                alt="守门神科技集团"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto p-6">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </Suspense>
      </body>
    </html>
  )
}
