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

// 🚨 領英 SVG ICON (右上角用)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current opacity-80 backdrop-blur-sm p-0.5 rounded-sm" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.77-.773 1.77-1.729V1.729C24 .774 23.203 0 22.225 0z" />
  </svg>
);

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 抓取團隊成員 (排序，確保包含 linkedInUrl 和 school 欄位)
        // 🚨 後台Schema需有名為 'linkedInUrl' 的 String 欄位
        const teamQuery = `*[_type == "team"] | order(order asc) { _id, name, role, school, linkedInUrl, image }`;
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
      
      {/* 1. HERO SECTION (亮麗、左對齊) */}
      <section className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-black px-8 md:px-24">
        {heroData?.backgroundType === 'video' && heroData.videoUrl ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-85">
            <source src={heroData.videoUrl} type="video/mp4" />
          </video>
        ) : (
          heroData?.backgroundImage && (
            <img src={urlFor(heroData.backgroundImage)} className="absolute inset-0 w-full h-full object-cover opacity-85" alt="hero bg" />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative z-10 text-white flex flex-col items-start gap-4">
          <h1 className={`${leagueSpartan.className} text-7xl md:text-9xl font-black uppercase tracking-[0.2em] leading-none`}>Teams</h1>
          <p className={`${leagueSpartan.className} text-[13px] font-normal uppercase tracking-[0.4em] text-white/70 leading-relaxed`}>THE DRIVING FORCE BEHIND JAMS INVESTMENT</p>
        </motion.div>
      </section>

      {/* 2. 成員展示區 - 🚨 修正：徹底嚴格對齊，全卡滿版照片，補回領英與校名 */}
      <section className="relative z-10 px-8 md:px-24 py-32 selection:bg-blue-900 selection:text-white">
        {/* 🚨 修正：統一格線 cols-4，確保所有人的框框尺寸一模一樣 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
          {teamMembers.map((member) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group md:col-span-1" // 🚨 修正：統一佔 1 格，尺寸絕對對齊
            >
              {/* 🚨 修正：領英連結容器 - 整張照片區塊都是超聯結 */}
              {member.linkedInUrl ? (
                <a 
                  href={member.linkedInUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative aspect-[4/5] w-full bg-[#820000] border-4 border-[#820000] group mb-8 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] cursor-pointer"
                >
                  {/* 🚨 修正：右上角領英 ICON */}
                  <div className="absolute top-4 right-4 z-20 transition-opacity opacity-0 group-hover:opacity-100">
                    <LinkedInIcon />
                  </div>

                  <div className="relative w-full h-full overflow-hidden">
                    {member.image && (
                      <img 
                        src={urlFor(member.image)} 
                        // 🚨 修正：照片彩色(grayscale-0) + 滿版填滿(w-full h-full object-cover) + 日系濾鏡
                        className="h-full w-full object-cover grayscale-0 filter contrast-[0.95] saturate-[0.9] brightness-[1.02] sepia-[0.05] transition-transform duration-1000 group-hover:scale-105"
                        alt={member.name}
                      />
                    )}
                    {/* 微光覆蓋層 */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </a>
              ) : (
                // 若無領英連結，則顯示不具連結的照片方框
                <div className="relative aspect-[4/5] w-full bg-[#820000] border-4 border-[#820000] group mb-8 shadow-2xl overflow-hidden">
                  <div className="relative w-full h-full overflow-hidden">
                    {member.image && (
                      <img 
                        src={urlFor(member.image)} 
                        className="h-full w-full object-cover grayscale-0 filter contrast-[0.95] saturate-[0.9] brightness-[1.02] sepia-[0.05] transition-transform duration-1000 group-hover:scale-105"
                        alt={member.name}
                      />
                    )}
                  </div>
                </div>
              )}
              
              {/* 姓名 (Caslon) */}
              <h3 className={`${libreCaslon.className} text-2xl md:text-2.5xl tracking-wide mb-2 text-center uppercase`}>{member.name}</h3>
              {/* 職稱 (Spartan 粗體) */}
              <p className={`${leagueSpartan.className} text-[11px] font-bold tracking-[0.3em] text-white/70 uppercase text-center mb-1`}>{member.role}</p>
              {/* 🚨 修正：補回校名顯示 (Spartan 正常體，淺灰色) */}
              {member.school && (
                <p className={`${leagueSpartan.className} text-[10px] tracking-[0.2em] text-white/40 uppercase text-center italic leading-relaxed px-4`}>{member.school}</p>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}