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
        
        {/* --- 響應式 Navbar：視覺強化版 --- */}
        <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-16 h-20 md:h-28 pointer-events-auto mix-blend-difference">
          
          {/* 左上角：JAMS (增加 drop-shadow 強化亮度) */}
          <Link href="/" className={`${libreCaslon.className} text-white text-lg md:text-2xl font-bold uppercase tracking-[0.15em] z-[110] whitespace-nowrap drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] hover:text-[#820000] transition-colors duration-300`}>
            JAMS Investment
          </Link>

          {/* 手機版漢堡控制 */}
          <input type="checkbox" id="menu-toggle" className="hidden peer" />
          
          <label htmlFor="menu-toggle" className="z-[110] cursor-pointer md:hidden flex flex-col gap-1.5 p-2">
            <span className="w-6 h-0.5 bg-white shadow-sm transition-all peer-checked:rotate-45 peer-checked:translate-y-2"></span>
            <span className="w-6 h-0.5 bg-white shadow-sm transition-all peer-checked:opacity-0"></span>
            <span className="w-6 h-0.5 bg-white shadow-sm transition-all peer-checked:-rotate-45 peer-checked:-translate-y-2"></span>
          </label>

          {/* 🚨 選單連結：強化白色亮度 + 加入 #820000 懸停效果 */}
          <div className={`
            ${leagueSpartan.className} 
            fixed md:relative top-0 left-0 w-full h-screen md:h-auto 
            bg-black md:bg-transparent 
            flex flex-col md:flex-row items-center justify-center md:justify-end 
            gap-10 md:gap-12 
            text-white text-2xl md:text-[12px] 
            font-bold tracking-[0.4em] uppercase 
            transition-transform duration-500 transform -translate-y-full md:translate-y-0 
            peer-checked:translate-y-0 z-[105] md:z-auto
          `}>
            {/* 這裡加入 hover:text-[#820000] */}
            <Link href="/about" className="hover:text-[#820000] transition-colors duration-300 drop-shadow-sm">ABOUT</Link>
            <Link href="/teams" className="hover:text-[#820000] transition-colors duration-300 drop-shadow-sm">TEAMS</Link>
            <Link href="/dip" className="hover:text-[#820000] transition-colors duration-300 border border-white/20 md:border-none px-10 py-4 md:p-0 drop-shadow-sm">DIP</Link>
          </div>
        </nav>

        {/* 內容區 */}
        <main className="flex-grow pt-20 md:pt-0">
          {children}
        </main>

        {/* --- 全新修正 Footer --- */}
        <footer className="w-full bg-black py-20 md:py-24 px-8 md:px-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-0">
            
            {/* 左邊：品牌名 */}
            <div className={`${libreCaslon.className} text-white text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] whitespace-nowrap`}>
              JAMS Investment
            </div>
            
            {/* 右邊：連結 */}
            <div className={`${leagueSpartan.className} flex flex-wrap gap-x-8 gap-y-4 md:gap-x-16 text-white/40 text-[10px] md:text-xs tracking-[0.4em] font-bold`}>
              <a href="mailto:jamsinvestment@gmail.com" className="hover:text-[#820000] transition-colors duration-300">GMAIL</a>
              <a href="https://instagram.com" target="_blank" className="hover:text-[#820000] transition-colors duration-300">INSTAGRAM</a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-[#820000] transition-colors duration-300">LINKEDIN</a>
            </div>
          </div>

          {/* 版權宣告 */}
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] md:text-[9px] tracking-[0.5em] text-white/20">
            <p className={leagueSpartan.className}>© 2026 JAMS INVESTMENT. ALL RIGHTS RESERVED.</p>
            <p className={leagueSpartan.className}>EST. 2023</p>
          </div>
        </footer>

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