import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const productLinks = [
    { title: "安检设备", href: "http://www.somens.com.cn/security.html" },
    { title: "军警装备", href: "http://www.somens.com.cn/military.html" },
    { title: "智慧城市", href: "http://www.somens.com.cn/wisdom.html" },
    { title: "设备租赁", href: "http://www.somens.com.cn/leasing.html" },
  ]

  const caseLinks = [
    { title: "政府服务", href: "http://www.somens.com.cn/minor.html" },
    { title: "交通行业", href: "http://www.somens.com.cn/sector.html" },
    { title: "公共场所", href: "http://www.somens.com.cn/places.html" },
    { title: "机构场馆", href: "http://www.somens.com.cn/services.html" },
    { title: "快递物流", href: "http://www.somens.com.cn/express.html" },
  ]

  const newsLinks = [
    { title: "公司新闻", href: "http://www.somens.com.cn/copnews.html" },
    { title: "行业新闻", href: "http://www.somens.com.cn/xingyexinwen.html" },
  ]

  const aboutLinks = [
    { title: "公司简介", href: "http://www.somens.com.cn/somens#bod1" },
    { title: "企业文化", href: "http://www.somens.com.cn/somens#bod3" },
    { title: "发展历程", href: "http://www.somens.com.cn/somens#bod2" },
    { title: "资质证书", href: "http://www.somens.com.cn/certificate.html" },
    { title: "公司环境", href: "http://www.somens.com.cn/gongsihuanjing.html" },
  ]

  const friendLinks = [
    { title: "安检机", href: "http://www.somens.com.cn/" },
    { title: "安检门", href: "http://www.somens.com.cn/" },
    { title: "爆炸物分析师", href: "http://www.somens.com.cn/eod/48-448.html" },
  ]

  return (
    <footer className="w-full border-t border-border bg-card/80 backdrop-blur-sm mt-12">
      {/* 主要内容区 */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* 产品中心 */}
          <div>
            <h3 className="text-base font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
              产品中心
            </h3>
            <div className="space-y-2">
              {productLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* 应用案例 */}
          <div>
            <h3 className="text-base font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
              应用案例
            </h3>
            <div className="space-y-2">
              {caseLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* 新闻中心 */}
          <div>
            <h3 className="text-base font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
              新闻中心
            </h3>
            <div className="space-y-2">
              {newsLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* 关于守门神 */}
          <div>
            <h3 className="text-base font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
              关于守门神
            </h3>
            <div className="space-y-2">
              {aboutLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* 二维码 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 relative mb-3 border-2 border-primary/20 rounded-lg overflow-hidden">
              <Image
                src="/qrcode.jpg"
                alt="守门神公众号"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">扫一扫</p>
            <p className="text-sm text-muted-foreground">关注我们公众号</p>
          </div>
        </div>
      </div>

      {/* 底部版权信息 */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* 左侧版权和友情链接 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>© 2018 广东守门神科技集团有限公司</span>
                <a
                  href="http://www.beian.miit.gov.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  粤ICP备17007918号
                </a>
              </div>
              
              {/* 友情链接 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">友情链接</span>
                  <span className="text-xs text-muted-foreground">Links</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {friendLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧链接 */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                免责声明
              </Link>
              <span>•</span>
              <Link href="#" className="hover:text-primary transition-colors">
                网站地图
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

