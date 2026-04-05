'use client';

import React, { useState, useEffect } from 'react';
/**
 * 請注意：在將此代碼貼回您的正式 Next.js 專案時，
 * 1. 取消下面兩行的註解。
 * 2. 刪除 <div id="html-mock">、<div id="head-mock">、<div id="body-mock"> 的模擬標籤。
 * 3. 將這些模擬標籤改回標準的 <html>, <head>, <body> 標籤。
 */
// import Link from 'next/link';
// import "./globals.css";

// --- 預覽環境專用替代方案 (貼回正式專案請刪除) ---
const Link = ({ href, children, className }) => <a href={href} className={className}>{children}</a>;

// ==========================================
// 未來串接 Sanity CMS 的預留資料結構
// ==========================================
const globalLayoutData = {
  navbar: {
    brandName: "JAMS INVESTMENT",
    brandLink: "/",
    links: [
      { name: "ABOUT", path: "/" },
      { name: "TEAMS", path: "/teams" },
      { name: "DIP", path: "/dip" }
    ]
  },
  footer: {
    brandName: "JAMS INVESTMENT",
    subtitle: "Elite Society of Finance",
    copyright: "© 2026 JAMS INVESTMENT. All Rights Reserved.",
    locations: ["TAIPEI", "SINGAPORE", "LONDON", "NEW YORK", "MILAN", "HONG KONG"]
  }
};

export default function RootLayout({ children }) {
  const [scrolled, setScrolled] = useState(false);

  // 監聽滾動事件，當下滑超過 80px 時切換導航欄狀態
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="html-mock" lang="zh-TW">
      <div id="head-mock">
        {/* 載入指定字體系統 */}
        <link 
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400;1,700&display=swap" 
          rel="stylesheet" 
        />
        {/* 預覽環境應急 CSS (正式環境請依賴 globals.css) */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { 
            margin: 0; 
            padding: 0;
            background-color: #f7f9fc; 
            overflow-x: hidden; 
            font-family: 'Inter', sans-serif;
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          
          /* 字體應用 */
          .font-libre { font-family: 'Libre Caslon Text', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          .font-spartan { font-family: 'League Spartan', sans-serif; }

          /* 滑動切換動畫 */
          .nav-transition {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}} />
      </div>

      <div id="body-mock" className="no-scrollbar bg-[#f7f9fc] text-[#191c1e] antialiased min-h-screen flex flex-col">
        
        {/* 【動態導航列】
            1. 透明狀態 (Top): 無背景, 白色字 (text-white)
            2. 滾動狀態 (Scrolled): 白底 (bg-white), 黑字 (text-black), 帶陰影 (shadow-md)
        */}
        <nav className={`nav-transition fixed top-0 left-0 z-[100] w-full flex items-center justify-between px-6 md:px-12 py-6 ${
          scrolled 
            ? 'bg-white text-black shadow-md py-4' 
            : 'bg-transparent text-white'
        }`}>
            {/* 品牌名稱 - Libre Caslon Text */}
            <Link 
                href={globalLayoutData.navbar.brandLink} 
                className="font-libre font-bold text-xl lg:text-2xl uppercase tracking-tighter hover:text-[#ff3b3b] transition-colors duration-300"
            >
                {globalLayoutData.navbar.brandName}
            </Link>

            {/* 導航選單 - Inter */}
            <div className="flex gap-10 font-inter text-[11px] font-bold tracking-[0.3em] uppercase">
                {globalLayoutData.navbar.links.map((link, index) => (
                    <Link 
                        key={index} 
                        href={link.path} 
                        className={`transition-all duration-300 relative hover:text-[#ff3b3b] ${
                            scrolled ? 'text-black/80' : 'text-white/90 drop-shadow-sm'
                        }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>

        {/* 各獨立頁面內容注入區 */}
        <main className="w-full flex-grow">
            {children}
        </main>

        {/* 頁尾 (Footer) */}
        <footer className="bg-[#0a0a0a] text-white px-8 md:px-12 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-50">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                {/* 品牌名稱 - Libre Caslon Text */}
                <span className="font-libre font-bold text-2xl lg:text-3xl uppercase tracking-tighter mb-2">
                    {globalLayoutData.footer.brandName}
                </span>
                {/* 副標題 - League Spartan */}
                <span className="font-spartan text-[10px] tracking-[0.5em] font-black opacity-30 uppercase">
                    {globalLayoutData.footer.subtitle}
                </span>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
                <span className="font-spartan text-[9px] tracking-[0.2em] font-bold opacity-30 uppercase">
                    {globalLayoutData.footer.copyright}
                </span>
                <div className="flex flex-wrap justify-center gap-4 opacity-10 font-spartan text-[8px] font-black tracking-widest">
                    {globalLayoutData.footer.locations.map((loc, index) => (
                        <span key={index}>{loc}</span>
                    ))}
                </div>
            </div>
        </footer>

      </div>
    </div>
  );
}
