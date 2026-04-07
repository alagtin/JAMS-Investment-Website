import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import Link from 'next/link';
import "./globals.css";

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: "JAMS Investment",
  description: "Official Website of JAMS Investment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <body className="bg-[#faf9f5] text-[#1a2332] antialiased min-h-screen flex flex-col overflow-x-hidden">
        
        {/* --- 響應式 Navbar --- */}
        <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-16 h-24 md:h-32 pointer-events-auto mix-blend-difference">
          
          {/* 左上角：JAMS (永遠存在) */}
          <Link href="/" className={`${libreCaslon.className} text-white text-xl md:text-2xl font-bold uppercase tracking-[0.1em] z-[110]`}>
            JAMS Investment
          </Link>

          {/* 🚨 手機版漢堡選單控制 (Checkbox Hack - 無須額外 JS 檔案) */}
          <input type="checkbox" id="menu-toggle" className="hidden peer" />
          
          {/* 漢堡圖示 */}
          <label htmlFor="menu-toggle" className="z-[110] cursor-pointer md:hidden flex flex-col gap-1.5 p-2">
            <span className="w-6 h-0.5 bg-white transition-all peer-checked:rotate-45 peer-checked:translate-y-2"></span>
            <span className="w-6 h-0.5 bg-white transition-all peer-checked:opacity-0"></span>
            <span className="w-6 h-0.5 bg-white transition-all peer-checked:-rotate-45 peer-checked:-translate-y-2"></span>
          </label>

          {/* 選單連結：電腦版橫排，手機版全屏覆蓋 */}
          <div className={`
            ${leagueSpartan.className} 
            fixed md:relative top-0 left-0 w-full h-screen md:h-auto 
            bg-black md:bg-transparent 
            flex flex-col md:flex-row items-center justify-center md:justify-end 
            gap-12 md:gap-12 
            text-white md:text-white/80 text-2xl md:text-[13px] 
            font-normal tracking-[0.4em] uppercase 
            transition-transform duration-500 transform -translate-y-full md:translate-y-0 
            peer-checked:translate-y-0 z-[105] md:z-auto
          `}>
            <Link href="/about" className="hover:text-white transition-opacity">ABOUT</Link>
            <Link href="/teams" className="hover:text-white transition-opacity">TEAMS</Link>
            <Link href="/dip" className="hover:text-white transition-opacity border border-white/20 md:border-none px-8 py-3 md:p-0">DIP</Link>
          </div>
        </nav>

        {/* 內容區 */}
        <main className="flex-grow pt-24 md:pt-0">
          {children}
        </main>

        {/* --- 響應式 Footer：手機版自動垂直排版 --- */}
        <footer className="w-full bg-black py-20 md:py-32 px-8 md:px-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16 md:gap-0">
            
            {/* 左邊：Logo (手機版靠左，電腦版維持) */}
            <div className={`${libreCaslon.className} text-white text-3xl md:text-4xl font-bold uppercase tracking-widest leading-none`}>
              JAMS<br/>Investment
            </div>
            
            {/* 右邊：連結 (手機版垂直排列) */}
            <div className={`${leagueSpartan.className} flex flex-col md:flex-row gap-6 md:gap-16 text-white/40 text-xs md:text-sm tracking-[0.4em] font-bold`}>
              <a href="mailto:jamsinvestment@gmail.com" className="hover:text-white transition-colors">GMAIL</a>
              <a href="https://instagram.com" target="_blank" className="hover:text-white transition-colors">INSTAGRAM</a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">LINKEDIN</a>
            </div>
          </div>

          {/* 底部宣告 (手機版自動分行) */}
          <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] tracking-[0.5em] text-white/20">
            <p className={leagueSpartan.className}>© 2026 JAMS INVESTMENT. ALL RIGHTS RESERVED.</p>
            <p className={leagueSpartan.className}>EST. 2023</p>
          </div>
        </footer>

        {/* 🚨 漢堡選單點擊後的動畫微調 CSS (直接寫在 html 裡) */}
        <style dangerouslySetInnerHTML={{ __html: `
          #menu-toggle:checked ~ label span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
          #menu-toggle:checked ~ label span:nth-child(2) { opacity: 0; }
          #menu-toggle:checked ~ label span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
          #menu-toggle:checked ~ div { transform: translateY(0); }
        `}} />

      </body>
    </html>
  );
}