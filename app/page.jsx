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
      label: 'ENTER JAMS INVESTMENT'
    },
    { 
      id: 'dip', 
      content: data.dipSection, 
      video: data.dipVideo, 
      link: '/dip',
      label: 'ENTER DIP PROGRAM'
    }
  ];

  return (
    /* 🚨 關鍵：h-screen + overflow-y-scroll + snap-y mandatory 實現自動吸附滾動 */
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black scroll-smooth">
      
      {sections.map((sec) => (
        <section 
          key={sec.id} 
          className="relative h-screen w-full snap-start snap-always flex items-center justify-center overflow-hidden group cursor-pointer"
        >
          {/* 點擊跳轉 */}
          <Link href={sec.link} className="absolute inset-0 z-30"></Link>

          {/* 背景層 */}
          <div className="absolute inset-0 z-0">
            {sec.content.bgType === 'video' && sec.video ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
                <source src={sec.video} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={urlFor(sec.content.bgImage)} 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
                alt="bg" 
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          </div>

          {/* 內容層 (Logo) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-8"
          >
            {sec.content.logo && (
              <img 
                src={urlFor(sec.content.logo)} 
                className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]" 
                alt="logo" 
              />
            )}
            
            {/* 提示字眼 */}
            <div className="mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <span className="text-white/40 tracking-[0.6em] text-xs font-bold uppercase border border-white/20 px-6 py-2 backdrop-blur-md">
                 {sec.label}
               </span>
            </div>
          </motion.div>

          {/* 滾動提示 (只在第一頁顯示) */}
          {sec.id === 'jams' && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-40">
              <div className="w-px h-12 bg-white" />
            </div>
          )}
        </section>
      ))}
    </main>
  );
}