"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['400', '700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400', '600', '700'] });

const client = createClient({
  projectId: "hpph885a",
  dataset: "production",
  apiVersion: "2024-04-05",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return source ? builder.image(source).url() : null; }

// --- 跑馬燈組件：拔掉全白濾鏡，保持原始顏色與大尺寸 ---
const Marquee = ({ images, speed = 30 }) => (
  <div className="relative flex overflow-hidden w-full py-4">
    <motion.div 
      className="flex whitespace-nowrap items-center"
      animate={{ x: [0, -1500] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {[...images, ...images, ...images, ...images].map((img, i) => (
        <div key={i} className="flex items-center justify-center shrink-0 mx-8 md:mx-12 transition-transform hover:scale-105">
          <img src={urlFor(img)} className="h-12 md:h-16 lg:h-20 w-auto max-w-[220px] object-contain" alt="Speaker Logo" />
        </div>
      ))}
    </motion.div>
  </div>
);

// --- Education Timeline 組件 ---
const EducationTimeline = () => {
  const years = [2023, 2024, 2025, 2026, 2027];
  return (
    <div className="max-w-6xl mx-auto px-8 mb-24 overflow-x-auto">
      <div className="min-w-[800px]">
        {/* 年份橫軸 */}
        <div className="grid grid-cols-5 border-b-2 border-white/20 pb-4 mb-8 text-center text-white/40 text-xs tracking-[0.3em]">
          {years.map(year => <div key={year}>{year}</div>)}
        </div>
        {/* 時間軸條狀圖 */}
        <div className="space-y-6 relative text-xs font-bold tracking-widest uppercase">
          <div className="h-10 w-[20%] bg-blue-900/50 border-l-2 border-blue-400 flex items-center px-6">Undergraduate</div>
          <div className="h-10 w-[40%] translate-x-[20%] bg-indigo-900/50 border-l-2 border-indigo-400 flex items-center px-6">DIP Core Training</div>
          <div className="h-10 w-[30%] translate-x-[50%] bg-purple-900/50 border-l-2 border-purple-400 flex items-center px-6">Market Internship</div>
          <div className="h-10 w-[20%] translate-x-[80%] bg-zinc-800 border-l-2 border-white flex items-center px-6">Master / Career</div>
        </div>
      </div>
    </div>
  );
};

export default function DIPPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDIP = async () => {
      try {
        const result = await client.fetch(`*[_type == "dip"][0]{
          ...,
          "videoUrl": backgroundVideo.asset->url
        }`);
        setData(result);
      } catch (err) {
        console.error("Sanity Fetch Error:", err);
      }
    };
    fetchDIP();
  }, []);

  if (!data) return <div className="bg-[#0a0f16] h-screen flex items-center justify-center text-white">Loading DIP Program...</div>;

  return (
    <div className="bg-[#0a0f16] text-white selection:bg-blue-900 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center">
        {data.backgroundType === 'video' && data.videoUrl ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
            <source src={data.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img src={urlFor(data.backgroundImage)} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f16]/50 to-[#0a0f16]" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center w-full px-8">
          {/* 🚨 刪除廢字，只保留你的大 Logo */}
          {data.mainLogo && (
            <img src={urlFor(data.mainLogo)} className="w-full max-w-3xl md:max-w-5xl object-contain mx-auto" alt="JAMS DIP Hero" />
          )}
        </motion.div>
      </section>

      {/* 2. SELECTIONS WORLDWIDE */}
      <section className="py-24 bg-[#dde3e9] text-[#1a2332]">
        <div className="text-center mb-16 px-4">
          <h2 className={`${leagueSpartan.className} text-3xl font-bold tracking-widest mb-4 uppercase`}>SELECTIONS WORLDWIDE</h2>
          <p className={`${leagueSpartan.className} text-xs tracking-[0.2em] uppercase font-semibold text-[#1a2332]/70`}>
            USA • UK • ITALY • FRANCE • TAIWAN • HONG KONG • SINGAPORE • INDONESIA
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-3 gap-6 text-center border-y-2 border-[#1a2332] py-12 mb-20">
            <div>
              <div className={`${leagueSpartan.className} text-7xl font-bold`}>{data.admittedCount || "15"}</div>
              <div className="text-sm font-bold tracking-widest mt-2 uppercase">FINAL ADMITS</div>
            </div>
            <div className="border-x-2 border-[#1a2332]">
              <div className={`${leagueSpartan.className} text-7xl font-bold`}>{data.admissionRate || "9%"}</div>
              <div className="text-sm font-bold tracking-widest mt-2 uppercase">ACCEPTANCE RATE</div>
            </div>
            <div>
              <div className={`${leagueSpartan.className} text-7xl font-bold`}>{data.totalApplicants || "165"}</div>
              <div className="text-sm font-bold tracking-widest mt-2 uppercase">APPLICATIONS RECEIVED</div>
            </div>
          </div>

          {/* 學校 Logos：拔掉濾鏡，恢復原色 */}
          {data.uniLogos && (
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 px-4">
              {data.uniLogos.map((logo, i) => (
                <div key={i} className="flex items-center justify-center h-12 md:h-16 lg:h-20">
                  <img src={urlFor(logo)} className="max-h-full max-w-[180px] object-contain" alt="University Logo" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. PROGRAM OVERVIEW */}
      <section className="py-24 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000')] bg-cover bg-center relative selection:bg-black selection:text-white">
        <div className="absolute inset-0 bg-[#eef1f4]/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-[#1a2332]">
          <h2 className={`${leagueSpartan.className} text-4xl font-bold text-center tracking-widest mb-16`}>
            PROGRAM OVERVIEW
          </h2>
          
          <div className="grid grid-cols-3 bg-white border-2 border-[#1a2332]/30 shadow-2xl">
            <div className="font-bold text-center py-6 border-b-2 border-[#1a2332]/30 border-r-2 uppercase tracking-widest text-sm">Guest Speaker</div>
            <div className="font-bold text-center py-6 border-b-2 border-[#1a2332]/30 border-r-2 uppercase tracking-widest text-sm">Mentorship</div>
            <div className="font-bold text-center py-6 border-b-2 border-[#1a2332]/30 uppercase tracking-widest text-sm">Technical Training</div>
            
            <div className="p-10 border-r-2 border-[#1a2332]/30 space-y-10 font-semibold text-lg leading-snug">
              <div>Industry Insights</div>
              <div>Investment Banking</div>
              <div>Private Equity</div>
              <div>Project Financing</div>
            </div>
            <div className="p-10 border-r-2 border-[#1a2332]/30 space-y-10 font-semibold text-lg leading-snug">
              <div>Career Training & Coaching</div>
              <div>Interview Preparation</div>
              <div>Resume Workshop</div>
              <div>Private Alumni Network</div>
            </div>
            <div className="p-10 space-y-10 font-semibold text-lg leading-snug">
              <div>Deal Analysis & Underwriting Fundamentals</div>
              <div>Discounted Cash Flow Modeling</div>
              <div>Accretion / Dilution Modeling</div>
              <div>Leveraged Buyout Modeling and more...</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EDUCATION PLANNING */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className={`${leagueSpartan.className} text-4xl font-bold text-center tracking-widest mb-16`}>
            EDUCATION PLANNING
          </h2>
          
          <EducationTimeline />

          <div className="flex justify-center gap-10 mb-16 text-xs tracking-widest uppercase font-semibold">
            <div className="flex items-center gap-3"><span className="w-5 h-5 bg-gray-500 inline-block rounded-sm"></span> Individual Project</div>
            <div className="flex items-center gap-3"><span className="w-5 h-5 bg-red-600 inline-block rounded-sm"></span> Group Project</div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-base border-collapse border-2 border-white/20 min-w-[900px]">
              <tbody className="text-center font-semibold tracking-wider">
                <tr>
                  <td rowSpan="6" className="border-2 border-white/20 p-6 w-36 tracking-[0.4em] uppercase text-sm">TOPICS</td>
                  <td className="border-2 border-white/20 p-5 text-left pl-8">MODELING FUNDAMENTALS</td>
                  <td rowSpan="6" className="border-2 border-white/20 p-6 text-gray-500 uppercase text-xs">INDIVIDUAL PROJECT: BUILD A 3-STATEMENT MODEL</td>
                </tr>
                <tr><td className="border-2 border-white/20 p-5 text-left pl-8">3-STATEMENT PROJECTION</td></tr>
                <tr><td className="border-2 border-white/20 p-5 text-left pl-8">ADVANCED ACCOUNTING</td></tr>
                <tr><td className="border-2 border-white/20 p-5 text-left pl-8">ENTERPRISE VALUE & EQUITY VALUE</td></tr>
                <tr><td className="border-2 border-white/20 p-5 text-left pl-8">WACC & DCF</td></tr>
                <tr><td className="border-2 border-white/20 p-5 text-left pl-8">TRADING COMPARABLES</td></tr>

                <tr>
                  <td rowSpan="5" className="border-2 border-white/20 p-6 w-36 tracking-[0.4em] uppercase text-sm"></td>
                  <td className="border-2 border-white/20 p-5 text-left pl-8">LBO / DCF BASICS & MODELING</td>
                  <td rowSpan="2" className="border-2 border-white/20 p-6 text-gray-500 uppercase text-xs">INDIVIDUAL PROJECT: BUILD A DCF MODEL / LBO MODEL</td>
                </tr>
                <tr><td className="border-2 border-white/20 p-5 text-left pl-8">PROJECT FINANCE MODELING</td></tr>

                <tr>
                  <td className="border-2 border-white/20 p-5 text-left pl-8">ACCRETION/DILUTION ANALYSIS</td>
                  <td rowSpan="2" className="border-2 border-white/20 p-6 text-gray-500 uppercase text-xs font-bold text-red-600">GROUP PROJECT: M&A PITCH BOOK</td>
                </tr>
                <tr><td className="border-2 border-white/20 p-5 text-left pl-8">M&A MODELING</td></tr>

                <tr>
                  <td className="border-2 border-white/20 p-5 text-left pl-8">ESG MODELING</td>
                  <td className="border-2 border-white/20 p-6 text-gray-500 uppercase text-xs font-bold text-red-600">GROUP PROJECT: ESG MODELING / PITCH BOOK</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. MENTOR INTRO */}
      <section className="py-24 bg-[#16233b]">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className={`${leagueSpartan.className} text-4xl font-bold tracking-widest mb-12 text-white`}>
            MENTOR INTRO
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-600 border border-gray-600 mb-16 max-w-5xl mx-auto">
            {["Project Finance", "Private Equity", "Investment Banking", "Sales & Trading", "Private Banking", "Corporate Banking"].map((item, i) => (
              <div key={i} className="bg-[#16233b] py-5 text-base font-bold tracking-wider text-gray-100 uppercase">{item}</div>
            ))}
          </div>

          <p className={`${libreCaslon.className} text-base md:text-lg text-gray-300 max-w-5xl mx-auto leading-relaxed mb-20 text-justify`}>
            Mentors bring clarity, perspectives, and real industry value to the member experience. They offer structured guidance on finance careers, share practical insights drawn from real transactions and sector experience, and help members build a stronger understanding of paths such as Private Equity and Investment Banking. Beyond industry exposure, mentors also support resume development, interview preparation, and personal positioning. Most importantly, they help members form meaningful connections and build long-term relationships within the finance industry.
          </p>

          <h3 className={`${leagueSpartan.className} text-xs tracking-[0.3em] text-gray-400 mb-12 uppercase font-semibold`}>
            Mentors Background<br/><span className="text-[10px]">TAIWAN • SINGAPORE • USA</span>
          </h3>

          {/* Mentor Logos：拔掉濾鏡，恢復原色 */}
          {data.mentorLogos && (
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 max-w-6xl mx-auto mb-16">
              {data.mentorLogos.map((logo, i) => (
                <div key={i} className="flex items-center justify-center h-12 md:h-16 lg:h-20 transition-transform hover:scale-105">
                  <img src={urlFor(logo)} className="max-h-full max-w-[200px] object-contain" alt="Mentor Logo" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. GUEST SPEAKER INTRO */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <h2 className={`${leagueSpartan.className} text-4xl font-bold tracking-widest text-center mb-16 text-white`}>
            GUEST SPEAKER INTRO
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 左側：Logos 跑馬燈 */}
            <div className="w-full overflow-hidden">
              <h3 className={`${leagueSpartan.className} text-xs tracking-[0.3em] text-gray-400 mb-10 text-center uppercase font-semibold`}>
                Speakers Background<br/><span className="text-[10px]">UK • TAIWAN • HONG KONG • USA</span>
              </h3>
              <div className="py-6">
                {data.speakerLogos && <Marquee images={data.speakerLogos} speed={35} />}
                <div className="mt-8">
                  {data.speakerLogos && <Marquee images={data.speakerLogos.slice().reverse()} speed={40} />}
                </div>
              </div>
            </div>

            {/* 右側：Topics 列表 */}
            <div className="px-6 relative z-10">
              <h3 className={`${leagueSpartan.className} text-xs tracking-[0.3em] text-gray-400 mb-10 text-center uppercase font-semibold`}>
                Topics<br/><span className="text-[10px]">PRIMARY MARKET • SECONDARY MARKET • DATA ANALYSIS</span>
              </h3>
              <div className="border-t border-gray-700 max-w-2xl mx-auto lg:max-w-none">
                {[
                  "DEAL ADVISORY",
                  "RENEWABLE ENERGY PROJECT FINANCE",
                  "PRIVATE EQUITY IN MIAMI",
                  "NYC FORMER STERLING INVESTMENT BANK",
                  "TAIWAN GROWTH EQUITY",
                  "EQUITY RESEARCH",
                  "EUROPE INFRASTRUCTURE PRIVATE EQUITY",
                  "HONG KONG PRIVATE BANKING",
                  "TAIWAN PRIVATE EQUITY",
                  "FIXED INCOME & ASSET MANAGEMENT"
                ].map((topic, i) => (
                  <div key={i} className="border-b border-gray-700 py-5 text-sm md:text-base tracking-widest font-semibold text-gray-200 hover:text-white hover:bg-white/5 transition-colors cursor-default px-4 rounded-sm">
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-white/10 selection:bg-black selection:text-white">
        <p className={`${leagueSpartan.className} text-[11px] text-white/40 tracking-[0.6em]`}>© 2026 JAMS INVESTMENT. ALL RIGHTS RESERVED.</p>
      </footer>

    </div>
  );
}