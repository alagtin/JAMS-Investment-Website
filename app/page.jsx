"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';

const client = createClient({
  projectId: "hpph885a",
  dataset: "production",
  apiVersion: "2024-04-05",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return source ? builder.image(source).url() : null; }

export default function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchHome = async () => {
      const result = await client.fetch(`*[_type == "homepage"][0]{
        ...,
        "jamsVideo": jamsSection.bgVideo.asset->url,
        "dipVideo": dipSection.bgVideo.asset->url
      }`);
      setData(result);
    };
    fetchHome();
  }, []);

  if (!data) return <div className="bg-black h-screen" />;

  const sections = [
    { 
      id: 'jams', 
      content: data.jamsSection, 
      video: data.jamsVideo, 
      link: '/about',
      label: 'LEARN MORE ABOUT JAMS'
    },
    { 
      id: 'dip', 
      content: data.dipSection, 
      video: data.dipVideo, 
      link: '/dip',
      label: 'EXPLORE DIP PROGRAM'
    }
  ];

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black scroll-smooth no-scrollbar">
      {sections.map((sec) => (
        <section 
          key={sec.id} 
          className="relative h-screen w-full snap-start snap-always flex items-center justify-center overflow-hidden group"
        >
          {/* 點擊整區跳轉 */}
          <Link href={sec.link} className="absolute inset-0 z-30 cursor-pointer"></Link>

          {/* 背景層 */}
          <div className="absolute inset-0 z-0">
            {sec.content.bgType === 'video' && sec.video ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
                <source src={sec.video} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={urlFor(sec.content.bgImage)} 
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2000ms]" 
                alt="bg" 
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
          </div>

          {/* 內容層 (Logo) - 🚨 這裡比例縮小了 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-8"
          >
            {sec.content.logo && (
              <img 
                src={urlFor(sec.content.logo)} 
                // 🚨 重點：將 max-w 鎖定在 350px-500px 之間，這才是 ABOUT 頁面的優雅比例
                className="w-full max-w-[320px] md:max-w-[450px] lg:max-w-[500px] object-contain mx-auto transition-all duration-700" 
                alt="logo" 
              />
            )}
            
            {/* 提示字眼 */}
            <div className="mt-16 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
               <span className="text-white/50 tracking-[0.6em] text-[10px] font-bold uppercase border border-white/10 px-8 py-3 backdrop-blur-sm hover:bg-white hover:text-black transition-colors">
                 {sec.label}
               </span>
            </div>
          </motion.div>

          {/* 滾動提示 */}
          {sec.id === 'jams' && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-30">
              <motion.div 
                animate={{ y: [0, 15, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-px h-16 bg-gradient-to-b from-white to-transparent" 
              />
            </div>
          )}
        </section>
      ))}
    </main>
  );
}