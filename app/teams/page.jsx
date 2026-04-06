"use client"
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400'] });

const client = createClient({
  projectId: "hpph885a",
  dataset: "production",
  apiVersion: "2024-04-05",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return source ? builder.image(source).url() : null; }

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const { scrollYProgress } = useScroll();
  
  const blurValue = useTransform(scrollYProgress, [0, 0.15], [0, 15]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.15], [0.6, 0.3]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "team"] | order(order asc)`;
      const result = await client.fetch(query);
      setTeamMembers(result);
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      
      {/* 背景層 */}
      <motion.div 
        style={{ filter: `blur(${blurValue}px)`, opacity: opacityValue }}
        className="fixed inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" 
          className="h-full w-full object-cover opacity-50"
          alt="background"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* 標題 */}
      <section className="relative z-10 h-[60vh] flex items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`${libreCaslon.className} text-7xl md:text-9xl uppercase tracking-tighter`}
        >
          Teams
        </motion.h1>
      </section>

      {/* 團隊名單 */}
      <section className="relative z-10 px-8 md:px-24 pb-32">
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
                {/* 照片：如果有領英連結，點擊照片會跳轉 */}
                <a 
                  href={member.linkedinUrl || "#"} 
                  target={member.linkedinUrl ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 group mb-8 shadow-2xl ${member.linkedinUrl ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {member.image && (
                    <img 
                      src={urlFor(member.image)} 
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      alt={member.name}
                    />
                  )}
                  {member.linkedinUrl && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md p-2 rounded-full">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </div>
                  )}
                </a>
                
                {/* 姓名 */}
                <h3 className={`${libreCaslon.className} text-2xl tracking-wide mb-2 text-center uppercase`}>
                  {member.name}
                </h3>
                
                {/* 職稱 */}
                <p className={`${leagueSpartan.className} text-[11px] tracking-[0.3em] text-white/70 uppercase text-center mb-1`}>
                  {member.role}
                </p>

                {/* 學校：使用 Spartan 字體，顏色稍淡 */}
                {member.school && (
                  <p className={`${leagueSpartan.className} text-[9px] tracking-[0.2em] text-white/40 uppercase text-center italic`}>
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