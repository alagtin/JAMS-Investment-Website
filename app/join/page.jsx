"use client"
import { motion } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['400', '700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function JoinUsPage() {
  return (
    <div className="bg-[#faf9f5] text-[#1a2332] selection:bg-black selection:text-white min-h-screen">
      
      {/* 1. HERO SECTION - 頁面主視覺 */}
      <section className="pt-48 pb-24 px-8 md:px-24 flex flex-col items-center justify-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${libreCaslon.className} text-6xl md:text-8xl font-bold tracking-widest uppercase mb-8`}
        >
          JOIN THE VISION
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`${leagueSpartan.className} text-sm md:text-base tracking-[0.4em] uppercase font-bold text-[#1a2332]/50 max-w-3xl leading-relaxed`}
        >
          Whether you are looking to build your career with us or back the next generation of financial leaders.
        </motion.p>
      </section>

      {/* 2. TALENT & CAREER SECTION - 給想加入團隊的人 */}
      <section className="py-24 px-8 md:px-24 max-w-7xl mx-auto">
        <div className="border-t-2 border-[#1a2332] pt-20 flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* 左側：招募文案 */}
          <div className="w-full lg:w-1/3">
            <h2 className={`${leagueSpartan.className} text-2xl md:text-3xl font-bold tracking-[0.3em] uppercase mb-8`}>
              TALENT &<br/>CAREERS
            </h2>
            <p className={`${libreCaslon.className} text-lg text-[#1a2332]/80 leading-relaxed mb-8 text-justify`}>
              We are constantly looking for driven individuals to expand our ecosystem. If you are passionate about finance, tech, or community building, leave your details below. Our team will reach out when a fitting opportunity arises.
            </p>
          </div>

          {/* 右側：極簡表單 */}
          <div className="w-full lg:w-2/3">
            <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col">
                  <label className={`${leagueSpartan.className} text-xs tracking-[0.2em] font-bold text-[#1a2332]/60 mb-2 uppercase`}>Full Name *</label>
                  <input type="text" className="border-b-2 border-[#1a2332]/20 bg-transparent py-3 focus:outline-none focus:border-[#1a2332] transition-colors text-lg" required />
                </div>
                <div className="flex flex-col">
                  <label className={`${leagueSpartan.className} text-xs tracking-[0.2em] font-bold text-[#1a2332]/60 mb-2 uppercase`}>Email Address *</label>
                  <input type="email" className="border-b-2 border-[#1a2332]/20 bg-transparent py-3 focus:outline-none focus:border-[#1a2332] transition-colors text-lg" required />
                </div>
              </div>

              <div className="flex flex-col">
                <label className={`${leagueSpartan.className} text-xs tracking-[0.2em] font-bold text-[#1a2332]/60 mb-2 uppercase`}>LinkedIn Profile URL *</label>
                <input type="url" className="border-b-2 border-[#1a2332]/20 bg-transparent py-3 focus:outline-none focus:border-[#1a2332] transition-colors text-lg" required />
              </div>

              <div className="flex flex-col">
                <label className={`${leagueSpartan.className} text-xs tracking-[0.2em] font-bold text-[#1a2332]/60 mb-4 uppercase`}>Role of Interest</label>
                <div className="flex flex-wrap gap-4">
                  {["Analyst", "Marketing & PR", "Tech / Design", "Open Application"].map((role) => (
                    <label key={role} className="cursor-pointer">
                      <input type="radio" name="role" value={role} className="peer sr-only" />
                      <div className="px-6 py-3 border-2 border-[#1a2332]/20 text-sm font-bold tracking-wider uppercase peer-checked:bg-[#1a2332] peer-checked:text-[#faf9f5] transition-all hover:border-[#1a2332]">
                        {role}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label className={`${leagueSpartan.className} text-xs tracking-[0.2em] font-bold text-[#1a2332]/60 mb-2 uppercase`}>Tell us why you'd be a great fit (Optional)</label>
                <textarea rows="3" className="border-b-2 border-[#1a2332]/20 bg-transparent py-3 focus:outline-none focus:border-[#1a2332] transition-colors text-lg resize-none"></textarea>
              </div>

              <button type="submit" className={`${leagueSpartan.className} mt-4 self-start bg-[#1a2332] text-[#faf9f5] px-12 py-5 text-sm tracking-[0.3em] uppercase font-bold hover:bg-black transition-colors`}>
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. PARTNERSHIP & SPONSOR SECTION - 給企業與贊助商 */}
      <section className="bg-[#1a2332] text-[#faf9f5] py-32 px-8 md:px-24 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          
          <div className="w-full md:w-1/2">
            <h3 className={`${leagueSpartan.className} text-xs tracking-[0.5em] text-[#faf9f5]/50 mb-6 uppercase font-black`}>Corporate Partnerships</h3>
            <h2 className={`${libreCaslon.className} text-5xl md:text-7xl font-bold tracking-wide mb-10 leading-tight`}>
              BECOME OUR<br/>FIRST PARTNER.
            </h2>
            <div className="space-y-6 text-[#faf9f5]/80 text-lg md:text-xl font-light">
              <p className="flex items-start gap-4">
                <span className="font-bold text-[#faf9f5] mt-1">—</span>
                Directly engage with top-tier campus talent and emerging financial professionals.
              </p>
              <p className="flex items-start gap-4">
                <span className="font-bold text-[#faf9f5] mt-1">—</span>
                Enhance your employer brand through our exclusive workshops, pitch events, and DIP program.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="border-2 border-[#faf9f5] p-10 md:p-16 max-w-md w-full text-center hover:bg-[#faf9f5] hover:text-[#1a2332] transition-all duration-500 group cursor-pointer" 
                 onClick={() => window.location.href = 'mailto:contact@jamsinvestment.com?subject=Partnership Inquiry'}>
              <div className={`${leagueSpartan.className} text-3xl font-bold tracking-widest uppercase mb-4`}>
                SPONSOR<br/>OUR VISION
              </div>
              <p className="text-sm opacity-70 group-hover:opacity-100 tracking-wider mb-8">
                Let's discuss how we can build value together.
              </p>
              <div className={`${leagueSpartan.className} inline-block border-b-2 border-transparent group-hover:border-[#1a2332] text-sm tracking-[0.2em] font-bold pb-1`}>
                GET IN TOUCH &rarr;
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}