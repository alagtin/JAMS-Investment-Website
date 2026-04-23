"use client"
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

// 1. 字體與 Sanity 設定
const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
// 🚨 修正：加載更多 Spartan 的字重，確保可以做到極粗與極細
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['100', '200', '400', '700', '900'] });

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
  const { scrollYProgress } = useScroll();
  
  const blurValue = useTransform(scrollYProgress, [0, 0.15], [0, 15]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.15], [0.6, 0.3]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamQuery = `*[_type == "team"] | order(order asc)`;
        const resultTeam = await client.fetch(teamQuery);
        setTeamMembers(resultTeam);

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
      
      {/* 🚨 修正后的全螢幕 Hero Section (嚴格對齊位置與比例) */}
      <section className="relative h-screen w-full flex flex-col items-start justify-center overflow-hidden bg-black px-8 md:px-24">
        
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        
        {/* 🚨 修正后的文字區塊 (motion.div)：垂直居中、左對齊 */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white flex flex-col items-start gap-3 w-full"
        >
          {/* 🚨 修正：徹底拔掉 serif，改為Spartan，全大寫，font-black */}
          <h1 className={`${leagueSpartan.className} text-8xl md:text-[9rem] lg:text-[11rem] font-black uppercase tracking-[0.1em] leading-none`}>
            TEAMS
          </h1>
          {/* 🚨 修正：改為Spartan，全大寫，font-extralight */}
          <p className={`${leagueSpartan.className} text-sm md:text-base font-extralight uppercase tracking-[0.4em] text-white/60 leading-loose`}>
            THE DRIVING FORCE BEHIND JAMS INVESTMENT
          </p>
        </motion.div>
      </section>

      {/* 成員展示區 (保持不變) */}
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
                className={`${colSpan} flex flex-col items-center`}
              >
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