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
    <html lang="zh-TW">
      {/* 🚨 關鍵：min-h-screen flex flex-col 確保 Footer 永遠在底部 */}
      <body className="bg-black antialiased min-h-screen flex flex-col">
        
        {/* Navbar：加上 mix-blend-difference 讓它在不同背景色滾動時都清晰 */}
        <nav className="fixed top-12 left-0 right-0 z-50 flex items-center justify-between px-16 pointer-events-auto mix-blend-difference">
          <Link href="/" className={`${libreCaslon.className} text-white text-2xl font-bold uppercase tracking-[0.1em] hover:opacity-70 transition-opacity duration-300`}>
            JAMS Investment
          </Link>

          <div className={`${leagueSpartan.className} flex gap-12 text-white/80 text-[13px] font-normal tracking-[0.3em] uppercase`}>
            <a href="/about" className="hover:text-white transition-opacity duration-300">ABOUT</a>
            <a href="/teams" className="hover:text-white transition-opacity duration-300">TEAMS</a>
            <a href="/dip" className="hover:text-white transition-opacity duration-300">DIP</a>
          </div>
        </nav>

        {/* 內容區：flex-grow 會把下方 Footer 推到底部 */}
        <main className="flex-grow">
          {children}
        </main>

        {/* --- 全域 Footer：簡潔有力、高端配置 --- */}
        <footer className="w-full bg-black py-32 px-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
            
            {/* 左邊：JAMS INVESTMENT LOGO (使用文字 Logo 最有氣派感) */}
            <div className={`${libreCaslon.className} text-white text-3xl md:text-4xl font-bold uppercase tracking-widest leading-none`}>
              JAMS<br/>Investment
            </div>
            
            {/* 右邊：Gmail、Instagram、LinkedIn 連結 */}
            <div className={`${leagueSpartan.className} flex flex-col md:flex-row gap-8 md:gap-16 text-white/40 text-xs md:text-sm tracking-[0.4em] font-bold`}>
              <a href="mailto:jamsinvestment@gmail.com" className="hover:text-white transition-all duration-300">
                GMAIL
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300">
                INSTAGRAM
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300">
                LINKEDIN
              </a>
            </div>
          </div>

          {/* 底部細線與版權宣告 */}
          <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20">
            <p className={`${leagueSpartan.className} text-[9px] tracking-[0.5em] uppercase`}>
              © 2026 JAMS INVESTMENT. ALL RIGHTS RESERVED.
            </p>
            <p className={`${leagueSpartan.className} text-[9px] tracking-[0.5em] uppercase`}>
              EST. 2023
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}