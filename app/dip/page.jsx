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

// 跑馬燈組件：拔掉濾鏡、大尺寸、對齊高度
const Marquee = ({ images, speed = 30 }) => (
  <div className="relative flex overflow-hidden w-full py-10">
    <motion.div 
      className="flex whitespace-nowrap items-center"
      animate={{ x: [0, -1200] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {[...images, ...images, ...images].map((img, i) => (
        <div key={i} className="flex items-center justify-center shrink-0 mx-12 md:mx-16 transition-transform hover:scale-105">
          <img src={urlFor(img)} className="h-16 md:h-20 lg:h-24 w-auto object-contain" alt="Logo" />
        </div>
      ))}
    </motion.div>
  </div>
);

export default function DIPPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDIP = async () => {
      try {
        const result = await client.fetch(`*[_type == "dip"][0]{..., "videoUrl": backgroundVideo.asset->url}`);
        setData(result);
      } catch (err) {
        console.error("Sanity Fetch Error:", err);
      }
    };
    fetchDIP();
  }, []);

  if (!data) return <div className="bg-[#faf9f5] h-screen flex items-center justify-center text-[#1a2332]">Loading...</div>;

  return (
    <div className="bg-[#faf9f5] text-[#1a2332] selection:bg-black selection:text-white">
      
      {/* 1. HERO SECTION - 只有你的影片/照片與大 Logo */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {data.backgroundType === 'video' && data.videoUrl ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-85">
            <source src={data.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img src={urlFor(data.backgroundImage)} className="absolute inset-0 w-full h-full object-cover opacity-85" alt="hero" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full px-8 flex justify-center">
          {data.mainLogo && <img src={urlFor(data.mainLogo)} className="w-full max-w-4xl md:max-w-6xl object-contain" alt="DIP" />}
        </motion.div>
      </section>

      {/* 2. SELECTIONS WORLDWIDE - 米白底、大標題、大數字 */}
      <section className="py-32 px-8 md:px-24">
        <div className="text-center mb-20 px-4">
          <h2 className={`${leagueSpartan.className} text-4xl font-bold tracking-[0.4em] mb-6 uppercase text-[#1a2332]/40`}>SELECTIONS WORLDWIDE</h2>
          <p className={`${leagueSpartan.className} text-sm tracking-[0.3em] uppercase font-bold text-[#1a2332]/80`}>
            USA • UK • ITALY • FRANCE • TAIWAN • HONG KONG • SINGAPORE • INDONESIA
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center border-y-2 border-[#1a2332] py-20 mb-24">
            <div>
              <div className={`${leagueSpartan.className} text-7xl md:text-9xl font-bold leading-none`}>{data.admittedCount || "15"}</div>
              <div className="text-sm md:text-lg font-bold tracking-[0.3em] mt-6">FINAL ADMITS</div>
            </div>
            <div className="border-x-2 border-[#1a2332]">
              <div className={`${leagueSpartan.className} text-7xl md:text-9xl font-bold leading-none`}>{data.admissionRate || "9%"}</div>
              <div className="text-sm md:text-lg font-bold tracking-[0.3em] mt-6">ACCEPTANCE RATE</div>
            </div>
            <div>
              <div className={`${leagueSpartan.className} text-7xl md:text-9xl font-bold leading-none`}>{data.totalApplicants || "165"}</div>
              <div className="text-sm md:text-lg font-bold tracking-[0.3em] mt-6">APPLICATIONS RECEIVED</div>
            </div>
          </div>
          {data.uniLogos && (
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              {data.uniLogos.map((logo, i) => (
                <div key={i} className="h-16 md:h-24 w-auto flex items-center justify-center transition-transform hover:scale-110">
                  <img src={urlFor(logo)} className="max-h-full max-w-[240px] object-contain" alt="Uni Logo" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. PROGRAM OVERVIEW - 米白底、大標題、三欄表格 */}
      <section className="py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${libreCaslon.className} text-6xl md:text-8xl font-bold text-center tracking-widest mb-24 uppercase`}>PROGRAM OVERVIEW</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 bg-white border-2 border-[#1a2332] shadow-2xl">
            {["Guest Speaker", "Mentorship", "Technical Training"].map((h, i) => (
              <div key={i} className={`font-bold text-center py-10 border-b-2 border-[#1a2332] uppercase tracking-[0.3em] text-sm md:text-base ${i < 2 ? 'border-r-2' : ''}`}>{h}</div>
            ))}
            <div className="p-12 border-r-2 border-[#1a2332] space-y-12 font-bold text-xl leading-snug">
              <div>Industry Insights</div><div>Investment Banking</div><div>Private Equity</div><div>Project Financing</div>
            </div>
            <div className="p-12 border-r-2 border-[#1a2332] space-y-12 font-bold text-xl leading-snug">
              <div>Career Training</div><div>Interview Prep</div><div>Resume Workshop</div><div>Alumni Network</div>
            </div>
            <div className="p-12 space-y-12 font-bold text-xl leading-snug text-blue-900">
              <div>Deal Analysis Fundamentals</div><div>DCF Modeling</div><div>Accretion/Dilution Analysis</div><div>Leveraged Buyout Modeling</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EDUCATION PLANNING - 🚨 修正：移除 Timeline (進度條)，保留標題與表格 */}
      <section className="py-32 px-8 md:px-24">
        <h2 className={`${libreCaslon.className} text-6xl md:text-8xl font-bold text-center tracking-widest mb-20 uppercase`}>EDUCATION PLANNING</h2>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-12 mb-20 text-sm tracking-[0.3em] uppercase font-bold text-[#1a2332]/60">
            <div className="flex items-center gap-4"><span className="w-6 h-6 bg-gray-600 inline-block"></span> Individual Project</div>
            <div className="flex items-center gap-4"><span className="w-6 h-6 bg-red-700 inline-block"></span> Group Project</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-lg border-collapse border-2 border-[#1a2332] min-w-[950px]">
              <tbody className="text-center font-bold tracking-wider">
                <tr>
                  <td rowSpan="6" className="border-2 border-[#1a2332] p-8 w-40 tracking-[0.5em] uppercase text-xs">TOPICS</td>
                  <td className="border-2 border-[#1a2332] p-6 text-left pl-10">MODELING FUNDAMENTALS</td>
                  <td rowSpan="6" className="border-2 border-[#1a2332] p-8 text-[#1a2332]/30 uppercase text-xs">BUILD A 3-STATEMENT MODEL</td>
                </tr>
                {["3-STATEMENT PROJECTION", "ADVANCED ACCOUNTING", "ENTERPRISE & EQUITY VALUE", "WACC & DCF", "TRADING COMPARABLES"].map(t => (
                  <tr key={t}><td className="border-2 border-[#1a2332] p-6 text-left pl-10">{t}</td></tr>
                ))}
                <tr>
                  <td rowSpan="2" className="border-2 border-[#1a2332]"></td>
                  <td className="border-2 border-[#1a2332] p-6 text-left pl-10">LBO / DCF BASICS & MODELING</td>
                  <td rowSpan="2" className="border-2 border-[#1a2332] p-8 text-[#1a2332]/30 uppercase text-xs">BUILD A DCF / LBO MODEL</td>
                </tr>
                <tr><td className="border-2 border-[#1a2332] p-6 text-left pl-10">PROJECT FINANCE MODELING</td></tr>
                <tr>
                  <td rowSpan="3" className="border-2 border-[#1a2332]"></td>
                  <td className="border-2 border-[#1a2332] p-6 text-left pl-10">ACCRETION/DILUTION ANALYSIS</td>
                  <td rowSpan="2" className="border-2 border-[#1a2332] p-8 text-red-700 uppercase text-xs font-black">GROUP PROJECT: M&A PITCH BOOK</td>
                </tr>
                <tr><td className="border-2 border-[#1a2332] p-6 text-left pl-10">M&A MODELING</td></tr>
                <tr><td className="border-2 border-[#1a2332] p-6 text-left pl-10">ESG MODELING</td><td className="border-2 border-[#1a2332] p-8 text-red-700 uppercase text-xs font-black">GROUP PROJECT: ESG PITCH BOOK</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. MENTOR INTRO - 產業表格 > 內文 > LOGO 牆 */}
      <section className="py-32 px-8 md:px-24 bg-[#f3f2ec]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`${libreCaslon.className} text-6xl md:text-8xl font-bold tracking-widest mb-20 uppercase`}>MENTOR INTRO</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#1a2332]/20 border border-[#1a2332]/20 mb-24 max-w-6xl mx-auto shadow-xl">
            {["Project Finance", "Private Equity", "Investment Banking", "Sales & Trading", "Private Banking", "Corporate Banking"].map((item, i) => (
              <div key={i} className="bg-[#faf9f5]/80 backdrop-blur-sm py-8 text-base md:text-xl font-bold tracking-[0.3em] uppercase">{item}</div>
            ))}
          </div>
          <p className={`${libreCaslon.className} text-lg md:text-2xl text-[#1a2332]/80 max-w-5xl mx-auto leading-relaxed mb-24 text-justify px-4`}>
            Mentors bring clarity, perspectives, and real industry value to the member experience... Beyond industry exposure, mentors also support resume development, interview preparation, and personal positioning.
          </p>
          <h3 className={`${leagueSpartan.className} text-xs tracking-[0.5em] text-[#1a2332]/40 mb-16 uppercase font-black`}>MENTORS BACKGROUND: TAIWAN • SINGAPORE • USA</h3>
          {data.mentorLogos && (
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
              {data.mentorLogos.map((logo, i) => (
                <div key={i} className="flex items-center justify-center h-16 md:h-24 transition-transform hover:scale-110">
                  <img src={urlFor(logo)} className="max-h-full max-w-[280px] object-contain" alt="Mentor" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. GUEST SPEAKER INTRO - 跑馬燈 + TOPICS */}
      <section className="py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${libreCaslon.className} text-6xl md:text-8xl font-bold tracking-widest text-center mb-24 uppercase`}>GUEST SPEAKER INTRO</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="w-full overflow-hidden">
               <h3 className={`${leagueSpartan.className} text-xs tracking-[0.5em] text-[#1a2332]/30 mb-12 text-center uppercase font-black`}>SPEAKERS BACKGROUND: UK • TAIWAN • HK • USA</h3>
               {data.speakerLogos && (
                 <>
                  <Marquee images={data.speakerLogos} speed={35} />
                  <div className="mt-16"><Marquee images={data.speakerLogos.slice().reverse()} speed={40} /></div>
                 </>
               )}
            </div>
            <div className="px-8">
              <h3 className={`${leagueSpartan.className} text-xs tracking-[0.5em] text-[#1a2332]/30 mb-12 text-center uppercase font-black`}>TOPICS: PRIMARY & SECONDARY MARKET</h3>
              <div className="border-t-2 border-[#1a2332]/10">
                {["DEAL ADVISORY", "RENEWABLE ENERGY FINANCE", "PRIVATE EQUITY IN MIAMI", "NYC INVESTMENT BANK", "GROWTH EQUITY", "EQUITY RESEARCH", "INFRASTRUCTURE PE", "HK PRIVATE BANKING", "TAIWAN PE", "FIXED INCOME"].map(topic => (
                  <div key={topic} className="border-b-2 border-[#1a2332]/10 py-8 text-base md:text-xl tracking-[0.3em] font-bold text-[#1a2332]/70 hover:text-blue-900 transition-colors cursor-default px-6">{topic}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 text-center border-t border-[#1a2332]/10">
        <p className={`${leagueSpartan.className} text-xs text-[#1a2332]/40 tracking-[0.8em]`}>© 2026 JAMS INVESTMENT. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}