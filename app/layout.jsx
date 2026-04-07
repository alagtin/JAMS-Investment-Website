import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import Link from 'next/link'; // 🚨 導入 Link 組件
import "./globals.css";

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: "JAMS Investment",
  description: "Official Website of JAMS Investment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className="bg-black antialiased">
        {/* Navbar：維持原本排版，加上首頁連結 */}
        <nav className="fixed top-12 left-0 right-0 z-50 flex items-center justify-between px-16 pointer-events-auto">
          
          {/* 🚨 左上角：現在點擊 JAMS Investment 會回到首頁 */}
          <Link href="/" className={`${libreCaslon.className} text-white text-2xl font-bold uppercase tracking-[0.1em] hover:opacity-70 transition-opacity duration-300`}>
            JAMS Investment
          </Link>

          <div className={`${leagueSpartan.className} flex gap-12 text-white/80 text-[13px] font-normal tracking-[0.3em] uppercase`}>
            <a href="/about" className="hover:text-white transition-opacity duration-300">ABOUT</a>
            <a href="/teams" className="hover:text-white transition-opacity duration-300">TEAMS</a>
            <a href="/dip" className="hover:text-white transition-opacity duration-300">DIP</a>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}