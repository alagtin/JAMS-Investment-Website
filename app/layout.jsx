// app/layout.jsx
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import "./globals.css";

const libreCaslon = Libre_Caslon_Text({ 
  subsets: ['latin'], 
  weight: ['700'], 
  display: 'swap' 
});

const leagueSpartan = League_Spartan({ 
  subsets: ['latin'], 
  weight: ['400'], 
  display: 'swap' 
});

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className="bg-black antialiased">
        {/* 全域懸浮 Navbar */}
        <nav className="fixed top-12 left-0 right-0 z-50 flex items-center justify-between px-16 pointer-events-auto">
          {/* 左側：品牌名稱 */}
          <div className={`${libreCaslon.className} text-white text-2xl font-bold uppercase tracking-[0.1em]`}>
            JAMS Investment
          </div>

          {/* 右側：選單 */}
          <div className={`${leagueSpartan.className} flex gap-12 text-white/80 text-[13px] font-normal tracking-[0.3em] uppercase`}>
            <a href="/about" className="hover:text-white transition-opacity duration-300">ABOUT</a>
            <a href="/teams" className="hover:text-white transition-opacity duration-300">TEAMS</a>
            <a href="/dip" className="hover:text-white transition-opacity duration-300">DIP</a>
          </div>
        </nav>

        {/* 這裡塞入各頁面的內容 */}
        {children}
      </body>
    </html>
  );
}