import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
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
        {/* Navbar 直接寫死在這裡，不搞什麼獨立組件了 */}
        <nav className="fixed top-12 left-0 right-0 z-50 flex items-center justify-between px-16 pointer-events-auto">
          <div className={`${libreCaslon.className} text-white text-2xl font-bold uppercase tracking-[0.1em]`}>
            JAMS Investment
          </div>
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