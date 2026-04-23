"use client"
import { motion } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400', '700', '900'] });

export default function JoinUsPage() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-[#820000] selection:text-white">
      
      {/* 1. 頂部大標 & 招募表單 (合而為一，直球對決) */}
      <section className="pt-32 md:pt-48 pb-24 px-8 md:px-24 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        {/* 左側：極簡大標 */}
        <div className="w-full lg:w-5/12 flex flex-col">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className={`${libreCaslon.className} text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tight leading-none mb-6`}
          >
            JOIN<br/>JAMS.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`${leagueSpartan.className} text-xs md:text-sm tracking-[0.4em] uppercase text-white/50 leading-relaxed`}
          >
            Passionate about finance, tech, or community?<br/>
            Leave your details. We will find you.
          </motion.p>
        </div>

        {/* 右側：精品級表單 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-7/12"
        >
          {/* 🚨 如果你註冊了 Formspree，把這裡改成 <form action="你的URL" method="POST"> */}
          <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* 姓名 */}
              <div className="flex flex-col relative group">
                <input type="text" name="name" id="name" required className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:outline-none focus:border-[#820000] transition-colors" placeholder=" " />
                <label htmlFor="name" className={`${leagueSpartan.className} absolute left-0 top-3 text-white/40 text-xs tracking-[0.3em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[#820000] peer-focus:text-[10px] peer-valid:-top-4 peer-valid:text-[10px]`}>
                  Full Name *
                </label>
              </div>

              {/* 信箱 */}
              <div className="flex flex-col relative group">
                <input type="email" name="email" id="email" required className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:outline-none focus:border-[#820000] transition-colors" placeholder=" " />
                <label htmlFor="email" className={`${leagueSpartan.className} absolute left-0 top-3 text-white/40 text-xs tracking-[0.3em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[#820000] peer-focus:text-[10px] peer-valid:-top-4 peer-valid:text-[10px]`}>
                  Email Address *
                </label>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col relative group">
              <input type="url" name="linkedin" id="linkedin" required className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:outline-none focus:border-[#820000] transition-colors" placeholder=" " />
              <label htmlFor="linkedin" className={`${leagueSpartan.className} absolute left-0 top-3 text-white/40 text-xs tracking-[0.3em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[#820000] peer-focus:text-[10px] peer-valid:-top-4 peer-valid:text-[10px]`}>
                LinkedIn Profile URL *
              </label>
            </div>

            {/* 職位選擇 */}
            <div className="flex flex-col gap-6">
              <label className={`${leagueSpartan.className} text-[10px] tracking-[0.3em] text-white/40 uppercase`}>Role of Interest</label>
              <div className="flex flex-wrap gap-4">
                {["Analyst", "Marketing & PR", "Tech / Design", "Open App"].map((role) => (
                  <label key={role} className="cursor-pointer">
                    <input type="radio" name="role" value={role} className="peer sr-only" required />
                    <div className={`${leagueSpartan.className} px-6 py-3 border border-white/20 text-xs tracking-[0.2em] uppercase text-white/60 peer-checked:bg-[#820000] peer-checked:text-white peer-checked:border-[#820000] hover:border-white transition-all duration-300`}>
                      {role}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 送出按鈕 */}
            <button type="submit" className={`${leagueSpartan.className} mt-8 w-full md:w-auto self-start bg-white text-black px-12 py-5 text-xs tracking-[0.4em] font-bold uppercase hover:bg-[#820000] hover:text-white transition-colors duration-500`}>
              Submit Application
            </button>
          </form>
        </motion.div>
      </section>

      {/* 2. 贊助區塊 (重製：滿版大氣 Banner) */}
      <section className="px-8 md:px-24 pb-32 max-w-[1400px] mx-auto mt-12">
        <a 
          href="mailto:jamsinvestment@gmail.com?subject=Partnership Inquiry" 
          className="block w-full border border-white/10 p-12 md:p-20 relative group overflow-hidden cursor-pointer bg-zinc-950 hover:border-white/30 transition-colors duration-500"
        >
          {/* 背景 Hover 擴散效果 */}
          <div className="absolute inset-0 bg-[#820000] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-in-out z-0" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <h3 className={`${leagueSpartan.className} text-[10px] tracking-[0.5em] text-white/40 group-hover:text-white/70 mb-6 uppercase transition-colors`}>
                Corporate Partnerships
              </h3>
              <h2 className={`${libreCaslon.className} text-4xl md:text-6xl font-bold uppercase tracking-widest leading-none`}>
                Sponsor<br/>Our Vision.
              </h2>
            </div>
            
            <div className={`${leagueSpartan.className} flex items-center gap-4 text-xs tracking-[0.4em] uppercase font-bold text-white/50 group-hover:text-white transition-colors`}>
              Get In Touch 
              <span className="text-xl font-light transform group-hover:translate-x-2 transition-transform">&rarr;</span>
            </div>
          </div>
        </a>
      </section>

    </div>
  );
}