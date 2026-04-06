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

// 跑馬燈組件：加上白底卡片與霸氣尺寸
const Marquee = ({ images, speed = 30 }) => (
  <div className="relative flex overflow-hidden w-full py-4">
    <motion.div 
      className="flex whitespace-nowrap items-center"
      animate={{ x: [0, -1500] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {/* 陣列多複製幾次確保跑馬燈不斷掉 */}
      {[...images, ...images, ...images, ...images].map((img, i) => (
        <div key={i} className="bg-white px-6 py-4 mx-4 rounded-xl flex items-center justify-center shrink-0 w-[160px] md:w-[240px] h-[90px] md:h-[130px] shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform hover:scale-105 cursor-pointer">
          <img src={urlFor(img)} className="max-h-full max-w-full object-contain" alt="Speaker Logo" />
        </div>
      ))}
    </motion.div>
  </div>
);

export default function DIPPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDIP = async () => {
      const result = await client.fetch(`*[_type == "dip"][0]{
        ...,
        "videoUrl": backgroundVideo.asset->url
      }`);
      setData(result);
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
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center">
          <h1 className={`${leagueSpartan.className} text-5xl md:text-7xl font-bold tracking-widest uppercase flex items-center justify-center gap-6`}>
            <div className="text-right leading-tight">
              JAMS DIRECT<br/>INDUSTRY<br/>PROGRAM
            </div>
            <div className="text-7xl md:text-8xl font-light border-l border-white pl-6">
              20<br/>26
            </div>
          </h1>
        </motion.div>
      </section>

      {/* 2. SELECTIONS WORLDWIDE */}
      <section className="py-16 bg-[#dde3e9] text-[#1a2332]">
        <div className="text-center mb-12">
          <h2 className={`${leagueSpartan.className} text-2xl font-bold tracking-widest mb-2`}>SELECTIONS WORLDWIDE</h2>
          <p className={`${leagueSpartan.className} text-xs tracking-[0.2em] uppercase font-semibold`}>
            USA • UK • ITALY • FRANCE • TAIWAN • HONG KONG • SINGAPORE • INDONESIA
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-3 gap-4 text-center border-y-2 border-[#1a2332] py-8 mb-16">
            <div>
              <div className={`${leagueSpartan.className} text-6xl font-bold`}>{data.admittedCount || "15"}</div>
              <div className="text-xs font-bold tracking-widest mt-2">FINAL ADMITS</div>
            </div>
            <div className="border-x-2 border-[#1a2332]">
              <div className={`${leagueSpartan.className} text-6xl font-bold`}>{data.admissionRate || "9%"}</div>
              <div className="text-xs font-bold tracking-widest mt-2">ACCEPTANCE RATE</div>
            </div>
            <div>
              <div className={`${leagueSpartan.className} text-6xl font-bold`}>{data.totalApplicants || "165"}</div>
              <div className="text-xs font-bold tracking-widest mt-2">APPLICATIONS RECEIVED</div>
            </div>
          </div>

          {/* 學校 Logos - 巨大化 + 白卡底 */}
          {data.uniLogos && (
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              {data.uniLogos.map((logo, i) => (
                <div key={i} className="bg-white p-4 md:p-6 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105 w-[140px] md:w-[220px] h-[80px] md:h-[120px]">
                  <img src={urlFor(logo)} className="max-h-full max-w-full object-contain" alt="University Logo" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. PROGRAM OVERVIEW */}
      <section className="py-20 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-[#eef1f4]/90" />
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <h2 className={`${leagueSpartan.className} text-4xl font-bold text-center text-[#1a2332] tracking-widest mb-12`}>
            PROGRAM OVERVIEW
          </h2>
          
          <div className="grid grid-cols-3 bg-white/50 backdrop-blur-sm border border-[#1a2332]/20 text-[#1a2332]">
            <div className="font-bold text-center py-4 border-b border-[#1a2332]/20 border-r">Guest Speaker</div>
            <div className="font-bold text-center py-4 border-b border-[#1a2332]/20 border-r">Mentorship</div>
            <div className="font-bold text-center py-4 border-b border-[#1a2332]/20">Technical Training</div>
            
            <div className="p-8 border-r border-[#1a2332]/20 space-y-12 font-medium">
              <div>Industry Insights</div>
              <div>Investment Banking</div>
              <div>Private Equity</div>
              <div>Project Financing</div>
            </div>
            <div className="p-8 border-r border-[#1a2332]/20 space-y-12 font-medium">
              <div>Career Training & Coaching</div>
              <div>Interview Preparation</div>
              <div>Resume Workshop</div>
              <div>Private Alumni Network</div>
            </div>
            <div className="p-8 space-y-12 font-medium">
              <div>Deal Analysis & Underwriting Fundamentals</div>
              <div>Discounted Cash Flow Modeling</div>
              <div>Accretion / Dilution Modeling</div>
              <div>Leveraged Buyout Modeling and more...</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EDUCATION PLANNING & TOPICS TABLE */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className={`${leagueSpartan.className} text-4xl font-bold text-center tracking-widest mb-8`}>
            EDUCATION PLANNING
          </h2>
          
          <div className="flex justify-center gap-8 mb-12 text-xs tracking-widest">
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-gray-500 inline-block"></span> Individual Project</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-red-600 inline-block"></span> Group Project</div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-white/20 min-w-[800px]">
              <tbody className="text-center font-medium tracking-wider">
                <tr>
                  <td rowSpan="6" className="border border-white/20 p-4 w-32 tracking-[0.3em]">TOPICS</td>
                  <td className="border border-white/20 p-3 text-left pl-6">MODELING FUNDAMENTALS</td>
                  <td rowSpan="6" className="border border-white/20 p-4 text-gray-400">INDIVIDUAL PROJECT: BUILD A 3-STATEMENT MODEL</td>
                </tr>
                <tr><td className="border border-white/20 p-3 text-left pl-6">3-STATEMENT PROJECTION</td></tr>
                <tr><td className="border border-white/20 p-3 text-left pl-6">ADVANCED ACCOUNTING</td></tr>
                <tr><td className="border border-white/20 p-3 text-left pl-6">ENTERPRISE VALUE & EQUITY VALUE</td></tr>
                <tr><td className="border border-white/20 p-3 text-left pl-6">WACC & DCF</td></tr>
                <tr><td className="border border-white/20 p-3 text-left pl-6">TRADING COMPARABLES</td></tr>

                <tr>
                  <td rowSpan="5" className="border border-white/20 p-4 w-32 tracking-[0.3em]"></td>
                  <td className="border border-white/20 p-3 text-left pl-6">LBO / DCF BASICS & MODELING</td>
                  <td rowSpan="2" className="border border-white/20 p-4 text-gray-400">INDIVIDUAL PROJECT: BUILD A DCF MODEL / LBO MODEL</td>
                </tr>
                <tr><td className="border border-white/20 p-3 text-left pl-6">PROJECT FINANCE MODELING</td></tr>

                <tr>
                  <td className="border border-white/20 p-3 text-left pl-6">ACCRETION/DILUTION ANALYSIS</td>
                  <td rowSpan="2" className="border border-white/20 p-4 text-gray-400">GROUP PROJECT: M&A PITCH BOOK</td>
                </tr>
                <tr><td className="border border-white/20 p-3 text-left pl-6">M&A MODELING</td></tr>

                <tr>
                  <td className="border border-white/20 p-3 text-left pl-6">ESG MODELING</td>
                  <td className="border border-white/20 p-4 text-gray-400">GROUP PROJECT: ESG MODELING / PITCH BOOK</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. MENTOR INTRO */}
      <section className="py-20 bg-[#16233b]">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className={`${leagueSpartan.className} text-4xl font-bold tracking-widest mb-8 text-white`}>
            MENTOR INTRO
          </h2>
          
          <p className={`${libreCaslon.className} text-sm md:text-base text-gray-300 max-w-4xl mx-auto leading-relaxed mb-16 text-justify`}>
            Mentors bring clarity, perspectives, and real industry value to the member experience. They offer structured guidance on finance careers, share practical insights drawn from real transactions and sector experience, and help members build a stronger understanding of paths such as Private Equity and Investment Banking. Beyond industry exposure, mentors also support resume development, interview preparation, and personal positioning. Most importantly, they help members form meaningful connections and build long-term relationships within the finance industry.
          </p>

          <h3 className={`${leagueSpartan.className} text-sm tracking-[0.3em] text-gray-400 mb-8 uppercase`}>
            Mentors Background<br/><span className="text-[10px]">TAIWAN • SINGAPORE • USA</span>
          </h3>

          {/* Mentor Logos - 巨大化 + 白卡底 */}
          {data.mentorLogos && (
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-16">
              {data.mentorLogos.map((logo, i) => (
                <div key={i} className="bg-white p-4 md:p-6 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-transform hover:scale-105 w-[160px] md:w-[240px] h-[90px] md:h-[130px]">
                  <img src={urlFor(logo)} className="max-h-full max-w-full object-contain" alt="Mentor Logo" />
                </div>
              ))}
            </div>
          )}

          <h3 className={`${leagueSpartan.className} text-sm tracking-[0.3em] text-gray-400 mb-6 uppercase`}>Industry</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-500 border border-gray-500">
            {["Project Finance", "Private Equity", "Investment Banking", "Sales & Trading", "Private Banking", "Corporate Banking"].map((item, i) => (
              <div key={i} className="bg-[#16233b] py-4 text-sm font-semibold tracking-wider">{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GUEST SPEAKER INTRO */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className={`${leagueSpartan.className} text-4xl font-bold tracking-widest text-center mb-16 text-white`}>
            GUEST SPEAKER INTRO
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 左側：Logos 跑馬燈 */}
            <div className="w-full overflow-hidden">
              <h3 className={`${leagueSpartan.className} text-sm tracking-[0.2em] text-gray-400 mb-8 text-center uppercase`}>
                Speakers Background<br/><span className="text-[10px]">UK • TAIWAN • HONG KONG • USA</span>
              </h3>
              <div className="py-4">
                {data.speakerLogos && <Marquee images={data.speakerLogos} speed={35} />}
                <div className="mt-6">
                  {data.speakerLogos && <Marquee images={data.speakerLogos.slice().reverse()} speed={40} />}
                </div>
              </div>
            </div>

            {/* 右側：Topics 列表 */}
            <div className="px-4">
              <h3 className={`${leagueSpartan.className} text-sm tracking-[0.2em] text-gray-400 mb-8 text-center uppercase`}>
                Topics<br/><span className="text-[10px]">PRIMARY MARKET • SECONDARY MARKET • DATA ANALYSIS</span>
              </h3>
              <div className="border-t border-gray-700">
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
                  <div key={i} className="border-b border-gray-700 py-4 text-xs md:text-sm tracking-widest font-semibold text-gray-300 hover:text-white transition-colors cursor-default">
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t border-white/10">
        <p className={`${leagueSpartan.className} text-[10px] text-white/40 tracking-[0.5em]`}>© 2026 JAMS INVESTMENT. ALL RIGHTS RESERVED.</p>
      </footer>

    </div>
  );
}