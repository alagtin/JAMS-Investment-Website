"use client"
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

// 1. 字體與 Sanity 設定 (不讓你去別的地方找)
const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400', '700'] });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-04-05",
  useCdn: false, // 確保抓到的是你剛 Publish 的新鮮資料
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return source ? builder.image(source).url() : null; }

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [heroData, setHeroData] = useState(null); // 用於存儲 Hero背景資料
  const { scrollYProgress } = useScroll();
  
  // 背景動畫效果：滾動模糊
  const blurValue = useTransform(scrollYProgress, [0, 0.15], [0, 15]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.15], [0.6, 0.3]);

  // 2. 抓取資料：同時抓取團隊成員與 DIP 的 Hero背景
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 抓取團隊成員 (保持排序)
        const teamQuery = `*[_type == "team"] | order(order asc)`;
        const resultTeam = await client.fetch(teamQuery);
        setTeamMembers(resultTeam);

        // 🚨 修正：抓取 DIP 頁面的資料 (為了借用 Hero背景設定)
        const dipQuery = `*[_type == "dip"][0]{
          ...,
          "videoUrl": backgroundVideo.asset->url
        }`;
        const resultDIP = await client.fetch(dipQuery);
        setHeroData(resultDIP);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      
      {/* 🚨 修正后的全螢幕 Hero Section (借用 DIP 背景打底) */}
      <section className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-black px-8 md:px-24 selection:bg-black selection:text-white">
        
        {/* 背景層 (借用 DIP 頁面的影片/照片設定) */}
        {heroData?.backgroundType === 'video' && heroData.videoUrl ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
            <source src={heroData.videoUrl} type="video/mp4" />
          </video>
        ) : (
          heroData?.backgroundImage && (
            <img src={urlFor(heroData.backgroundImage)} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="hero background" />
          )
        )}
        
        {/* 背景漸變層：確保標題清晰，並能銜接下方米白底色 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        
        {/* 🚨 中間字體排版：左對齊、兩行結構 (模擬用戶圖片) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white flex flex-col items-start gap-4 selection:bg-white selection:text-black"
        >
          {/* 第一行：大、粗、全大寫 (使用 Spartan 粗體) */}
          <h1 className={`${leagueSpartan.className} text-7xl md:text-9xl font-black uppercase tracking-[0.2em] leading-none`}>
            Teams
          </h1>
          {/* 第二行：小、細、全大寫 (使用 Spartan 細體) */}
          <p className={`${leagueSpartan.className} text-[13px] font-normal uppercase tracking-[0.4em] text-white/70 leading-relaxed`}>
            THE DRIVING FORCE BEHIND JAMS INVESTMENT
          </p>
        </motion.div>
      </section>

      {/* 成員展示區：維持 3+4 成員列表排版 (銜接在 Hero 下方) */}
      <section className="relative z-10 px-8 md:px-24 py-32 selection:bg-blue-900 selection:text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
          {teamMembers.map((member, index) => {
            // 前 3 個成員佔 4 格（一行三個），其餘佔 3 格（一行四個）
            const colSpan = index < 3 ? "md:col-span-4" : "md:col-span-3";
            
            return (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`${colSpan} flex flex-col items-center`}
              >
                {/* 照片容器 */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 group mb-8 shadow-2xl">
                  {member.image && (
                    <img 
                      src={urlFor(member.image)} 
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      alt={member.name}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                
                <h3 className={`${libreCaslon.className} text-2xl tracking-wide mb-2 text-center uppercase`}>
                  {member.name}
                </h3>
                <p className={`${leagueSpartan.className} text-[11px] tracking-[0.3em] text-white/50 uppercase text-center`}>
                  {member.role}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}