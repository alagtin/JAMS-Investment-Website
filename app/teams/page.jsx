"use client"
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400'] });

// 1. Sanity 設定 - 我直接寫死在這裡
const client = createClient({
  projectId: "hpph885a", // 截圖看到的 Project ID
  dataset: "production",
  apiVersion: "2024-04-05",
  useCdn: false, // 關閉快取，強迫抓最新資料
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return source ? builder.image(source).url() : null; }

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  
  const blurValue = useTransform(scrollYProgress, [0, 0.15], [0, 15]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.15], [0.6, 0.3]);

  // 2. 直接抓資料
  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "team"] | order(order asc)`;
        const result = await client.fetch(query);
        setTeamMembers(result || []);
      } catch (err) {
        console.error("抓取失敗:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="bg-black h-screen flex items-center justify-center text-white">Loading Teams...</div>;

  return (
    <div className="relative min-h-screen bg-black text-white">
      
      {/* 背景圖片 */}
      <motion.div style={{ filter: `blur(${blurValue}px)`, opacity: opacityValue }} className="fixed inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* 標題區 */}
      <section className="relative z-10 h-screen flex items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`${libreCaslon.className} text-7xl md:text-9xl uppercase tracking-tighter`}
        >
          Teams
        </motion.h1>
      </section>

      {/* 團隊名單 (3+4 佈局) */}
      <section className="relative z-10 px-8 md:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
          {teamMembers.length > 0 ? teamMembers.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={index < 3 ? "md:col-span-4" : "md:col-span-3"}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 group mb-8 shadow-2xl">
                {member.image && (
                  <img 
                    src={urlFor(member.image)} 
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                )}
              </div>
              <h3 className={`${libreCaslon.className} text-2xl text-center uppercase`}>{member.name}</h3>
              <p className={`${leagueSpartan.className} text-[11px] text-white/50 text-center uppercase tracking-[0.3em]`}>{member.role}</p>
            </motion.div>
          )) : (
            <div className="col-span-12 text-center text-zinc-500">
              目前沒有已發布的成員資料。
            </div>
          )}
        </div>
      </section>
    </div>
  );
}