"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

// 1. 字體與 Sanity 設定
const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400', '700', '900'] });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-04-05",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return source ? builder.image(source).url() : null; }

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 抓取團隊成員 (確保抓取所有欄位)
        const teamQuery = `*[_type == "team"] | order(order asc)`;
        const resultTeam = await client.fetch(teamQuery);
        setTeamMembers(resultTeam);

        // 抓取 DIP 頁面的資料 (借用 Hero背景設定)
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
      
      {/* 1. HERO SECTION - 亮度調高為 85% */}
      <section className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-black px-8 md:px-24">
        
        {/* 背景層 */}
        {heroData?.backgroundType === 'video' && heroData.videoUrl ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-85">
            <source src={heroData.videoUrl} type="video/mp4" />
          </video>
        ) : (
          heroData?.backgroundImage && (
            <img src={urlFor(heroData.backgroundImage)} className="absolute inset-0 w-full h-full object-cover opacity-85" alt="hero background" />
          )
        )}
        
        {/* 背景漸變層 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        
        {/* 標題排版：左對齊、大粗+小細 */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white flex flex-col items-start gap-4"
        >
          <h1 className={`${leagueSpartan.className} text-7xl md:text-9xl font-black uppercase tracking-[0.2em] leading-none`}>
            Teams
          </h1>
          <p className={`${leagueSpartan.className} text-[13px] font-normal uppercase tracking-[0.4em] text-white/70 leading-relaxed`}>
            THE DRIVING FORCE BEHIND JAMS INVESTMENT
          </p>
        </motion.div>
      </section>

      {/* 2. 成員展示區 - 導入紅色底卡、彩色照片、日系濾鏡、校名 */}
      <section className="relative z-10 px-8 md:px-24 py-32 selection:bg-blue-900 selection:text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
          {teamMembers.map((member, index) => {
            const colSpan = index < 3 ? "md:col-span-4" : "md:col-span-3";
            
            return (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`${colSpan} flex flex-col items-center group`}
              >
                {/* 🚨 修正：相片容器墊上 #820000 色卡 (Padding 創造邊框感) */}
                <div className="relative aspect-[4/5] w-full bg-[#820000] p-4 group mb-8 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative w-full h-full overflow-hidden">
                    {member.image && (
                      <img 
                        src={urlFor(member.image)} 
                        // 🚨 修正：彩色(grayscale-0) + 日系濾鏡(低對比、低飽和、微暖)
                        className="h-full w-full object-cover grayscale-0 filter contrast-[0.9] saturate-[0.8] brightness-[1.05] sepia-[0.05] transition-transform duration-700 group-hover:scale-105"
                        alt={member.name}
                      />
                    )}
                    {/* 覆蓋層讓照片更有清透感 */}
                    <div className="absolute inset-0 bg-white/5 opacity-30 group-hover:opacity-0 transition-opacity" />
                  </div>
                </div>
                
                {/* 姓名 (Caslon) */}
                <h3 className={`${libreCaslon.className} text-2xl tracking-wide mb-2 text-center uppercase`}>
                  {member.name}
                </h3>

                {/* 職稱 (Spartan 粗體) */}
                <p className={`${leagueSpartan.className} text-[11px] font-bold tracking-[0.3em] text-white/70 uppercase text-center mb-1`}>
                  {member.role}
                </p>

                {/* 🚨 修正：補回校名顯示 (Spartan 正常體) */}
                {member.school && (
                  <p className={`${leagueSpartan.className} text-[10px] tracking-[0.2em] text-white/40 uppercase text-center italic`}>
                    {member.school}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}