"use client"
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hpph885a",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-04-05",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return source ? builder.image(source).url() : null; }

export default function HomePage() {
  const [data, setData] = useState(null);
  const topRef = useRef(null);

  // 🚨 修正：使用 useLayoutEffect 在瀏覽器繪製前強制回頂端
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('snap-y', 'snap-mandatory');
    return () => {
      document.documentElement.classList.remove('snap-y', 'snap-mandatory');
    };
  }, []);

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

  // 🚨 當資料載入完畢，再次強制確保在頂部
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 50);
    }
  }, [data]);

  if (!data) return <div className="bg-black h-[100dvh] w-full" />;

  const sections = [
    { id: 'jams', content: data.jamsSection, video: data.jamsVideo, link: '/about', label: 'LEARN MORE ABOUT JAMS' },
    { id: 'dip', content: data.dipSection, video: data.dipVideo, link: '/dip', label: 'EXPLORE DIP PROGRAM' }
  ];

  return (
    <div className="w-full bg-black flex flex-col">
      {/* 🚨 隱形頂部錨點：強迫瀏覽器開局就看這裡 */}
      <div ref={topRef} className="absolute top-0 h-px w-px pointer-events-none snap-start" />

      {sections.map((sec) => (
        <section 
          key={sec.id} 
          className="relative h-[100dvh] w-full snap-start snap-always flex items-center justify-center overflow-hidden group"
        >
          <Link href={sec.link} className="absolute inset-0 z-30 cursor-pointer" />
          
          <div className="absolute inset-0 z-0">
            {sec.content?.bgType === 'video' && sec.video ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-85">
                <source src={sec.video} type="video/mp4" />
              </video>
            ) : (
              sec.content?.bgImage && (
                <img src={urlFor(sec.content.bgImage)} className="w-full h-full object-cover opacity-85 transition-transform duration-[3000ms] group-hover:scale-105" alt="bg" />
              )
            )}
            <div className="absolute inset-0 bg-black/30" /> 
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-8">
            {sec.content?.logo && (
              <img src={urlFor(sec.content.logo)} className="w-full max-w-[320px] md:max-w-[450px] lg:max-w-[500px] object-contain mx-auto" alt="logo" />
            )}
            <div className="mt-16 opacity-0 group-hover:opacity-100 transition-all duration-700">
               <span className="text-white/80 tracking-[0.6em] text-[10px] font-bold uppercase border border-white/30 px-8 py-3 backdrop-blur-sm">
                 {sec.label}
               </span>
            </div>
          </motion.div>
          
          {sec.id === 'jams' && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-40">
              <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
            </div>
          )}
        </section>
      ))}

      {/* 🚨 關鍵：將 Footer 的停車位寫在首頁內部，這樣它只會影響首頁，不會讓其他頁面一進去就跳到底部 */}
      <div className="snap-start w-full bg-black h-px pointer-events-none" />
    </div>
  );
}