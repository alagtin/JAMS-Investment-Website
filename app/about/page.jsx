"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400', '700', '900'] });

// 🚨 完全保留你的 Sanity Client 設定
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-04-05",
  useCdn: false,
});

// 🚨 完全保留你的 urlFor 函數
const builder = imageUrlBuilder(client);
function urlFor(source) { return builder.image(source); }

export default function AboutPage() {
  const [data, setData] = useState(null);

  // 確保滿版吸附特效啟動
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('snap-y', 'snap-mandatory');
    return () => {
      document.documentElement.classList.remove('snap-y', 'snap-mandatory');
    };
  }, []);

  // 🚨 完全保留你指定的資料抓取語法
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const result = await client.fetch(`*[_type == "about"][0]{ "videoUrl": heroVideo.asset->url, mainLogo }`);
        setData(result);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchAbout();
  }, []);

  // 資料還沒回來前給黑畫面防閃
  if (!data) return <div className="bg-black h-[100dvh] w-full" />;

  return (
    <div className="w-full bg-[#1a2332] flex flex-col">
      
      {/* =========================================
          第一卡：HERO CUT (結合你的 Code 與新視覺)
      ========================================= */}
      <section className="relative h-[100dvh] w-full snap-start snap-always flex flex-col items-center justify-center overflow-hidden bg-black px-8 md:px-24">
        
        {/* 🚨 完全保留你的背景 Video 寫法 */}
        {data?.videoUrl && (
          <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-60">
              <source src={data.videoUrl} type="video/mp4" />
            </video>
            {/* 加上這層漸變，讓後面的文字更容易閱讀，且能與第二卡銜接 */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#1a2332]/90" />
          </div>
        )}

        {/* 內容區塊：整體往上提 (mt-[-5vh])，達成註腳效果 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="relative z-10 text-white flex flex-col items-center text-center mt-[-5vh] max-w-5xl"
        >
          {/* 1. 🚨 完全保留你的 LOGO 渲染邏輯，尺寸依照你的 w-[300px] md:w-[450px] */}
          <div className="mb-10 flex flex-col items-center">
            {data?.mainLogo && (
              <img src={urlFor(data.mainLogo).url()} alt="Logo" className="w-[200px] md:w-[350px] lg:w-[450px]" />
            )}
          </div>

          {/* 2. 說明文字：作為 LOGO 的註腳 */}
          <p className={`${leagueSpartan.className} text-xs md:text-sm lg:text-[13px] text-white/80 uppercase tracking-[0.2em] md:tracking-[0.3em] leading-loose font-light`}>
            JAMS Investment is a selective, global pre-professional finance platform that develops and filters high-potential talent through a structured, one-year industry program. We operate as an early-stage talent pipeline for investment banking, private equity, and hedge funds across APAC and the U.S.
          </p>
        </motion.div>

        {/* 向下滾動提示 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-40">
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* =========================================
          第二卡：DATA & STATS (資料庫統計)
      ========================================= */}
      <section className="relative min-h-[100dvh] w-full snap-start snap-always flex items-center justify-center bg-[#5b7a8a] px-4 md:px-12 py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[#1a2332]/80" /> 
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="text-center">
              <h3 className={`${leagueSpartan.className} text-white text-sm md:text-base tracking-[0.3em] font-bold uppercase`}>
                ALUMNI WORLDWIDE
              </h3>
              <p className={`${leagueSpartan.className} text-white/50 text-[10px] tracking-[0.2em] uppercase mt-2`}>
                (Taiwan / Hong Kong / Singapore / Australia / UK / Netherlands / USA / Canada)
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { number: "80", title: "ALUMNI", sub: "total in directory" },
                { number: "30", title: "SCHOOLS", sub: "unique schools represented" },
                { number: "29", title: "MAJORS", sub: "unique majors represented" },
                { number: "53", title: "FIRMS", sub: "derived from experience" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/95 text-[#1a2332] py-8 px-4 flex flex-col items-center justify-center text-center shadow-2xl hover:scale-105 transition-transform duration-500">
                  <span className={`${leagueSpartan.className} text-6xl md:text-7xl font-black mb-1`}>{stat.number}</span>
                  <span className={`${leagueSpartan.className} text-lg font-bold tracking-widest uppercase`}>{stat.title}</span>
                  <span className={`${leagueSpartan.className} text-[9px] text-[#1a2332]/60 tracking-wider uppercase mt-1`}>{stat.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="text-center">
              <h3 className={`${leagueSpartan.className} text-white text-sm md:text-base tracking-[0.3em] font-bold uppercase`}>
                ALUMNI BY MAJOR
              </h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
              {[
                { number: "48%", title: "FINANCE", sub: "" },
                { number: "10%", title: "INT. BUSINESS", sub: "" },
                { number: "5%", title: "ECONOMICS", sub: "" },
                { number: "4%", title: "ACCOUNTING", sub: "" },
                { number: "33%", title: "OTHERS", sub: "(Electrical Engineering / Computer Science / Risk Management...)" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/90 text-[#1a2332] py-8 px-2 flex flex-col items-center justify-center text-center shadow-xl hover:scale-105 transition-transform duration-500">
                  <span className={`${leagueSpartan.className} text-5xl md:text-6xl font-black mb-2`}>{stat.number}</span>
                  <span className={`${leagueSpartan.className} text-xs md:text-sm font-bold tracking-widest uppercase`}>{stat.title}</span>
                  {stat.sub && (
                     <span className={`${leagueSpartan.className} text-[7px] text-[#1a2332]/60 tracking-wider uppercase mt-2 leading-tight px-2`}>{stat.sub}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 預留給 Footer 的吸附點 */}
      <div className="snap-start w-full bg-[#1a2332] h-px pointer-events-none" />
    </div>
  );
}