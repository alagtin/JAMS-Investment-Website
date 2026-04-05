"use client"
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400'] });

// 1. Sanity 設定
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-04-05",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return builder.image(source); }

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const { scrollYProgress } = useScroll();
  
  // 2. 隨滾動變化的背景效果：模糊 (0->15px), 亮度 (0.5->0.2)
  const blurValue = useTransform(scrollYProgress, [0, 0.15], [0, 15]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.15], [0.5, 0.2]);

  // 3. 抓取資料並排序 (按 order 欄位從小到大)
  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "team"] | order(order asc)`;
      const result = await client.fetch(query);
      setTeamMembers(result);
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-[150vh] bg-black text-white">
      
      {/* 背景圖片：固定不動 + 滾動模糊 */}
      <motion.div 
        style={{ filter: `blur(${blurValue}px)`, opacity: opacityValue }}
        className="fixed inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" 
          className="h-full w-full object-cover"
          alt="background"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* 第一屏：大標題 */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`${libreCaslon.className} text-7xl md:text-9xl tracking-tighter uppercase`}
        >
          Teams
        </motion.h1>
      </section>

      {/* 成員列表區：3+4 佈局 */}
      <section className="relative z-10 px-8 md:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
          {teamMembers.map((member, index) => {
            // 前 3 個佔 4 格，後 4 個佔 3 格
            const colSpan = index < 3 ? "md:col-span-4" : "md:col-span-3";
            
            return (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${colSpan} flex flex-col items-center`}
              >
                {/* 照片容器：預設黑白，Hover 變彩色 */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 group mb-8 shadow-2xl">
                  {member.image && (
                    <img 
                      src={urlFor(member.image).url()} 
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                
                <h3 className={`${libreCaslon.className} text-2xl tracking-wide mb-2 text-center`}>
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