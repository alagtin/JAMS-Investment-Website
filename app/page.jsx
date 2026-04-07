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
    { id: 'jams', content: data.jamsSection, video: data.jamsVideo, link: '/about', label: 'LEARN MORE ABOUT JAMS' },
    { id: 'dip', content: data.dipSection, video: data.dipVideo, link: '/dip', label: 'EXPLORE DIP PROGRAM' }
  ];

  return (
    /* 🚨 這裡增加了 Snap 容器，並且提高背景亮度 */
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
      {sections.map((sec) => (
        <section key={sec.id} className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden group">
          <Link href={sec.link} className="absolute inset-0 z-30 cursor-pointer" />
          <div className="absolute inset-0 z-0">
            {sec.content.bgType === 'video' && sec.video ? (
              // 🚨 提高亮度：opacity 拉高到 85%
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-85">
                <source src={sec.video} type="video/mp4" />
              </video>
            ) : (
              <img src={urlFor(sec.content.bgImage)} className="w-full h-full object-cover opacity-85" alt="bg" />
            )}
            {/* 🚨 減弱漸變層，讓背景更清晰 */}
            <div className="absolute inset-0 bg-black/30" /> 
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-8">
            {sec.content.logo && (
              <img src={urlFor(sec.content.logo)} className="w-full max-w-[320px] md:max-w-[450px] lg:max-w-[500px] object-contain mx-auto" alt="logo" />
            )}
            <div className="mt-16 opacity-0 group-hover:opacity-100 transition-all duration-700">
               <span className="text-white/80 tracking-[0.6em] text-[10px] font-bold uppercase border border-white/30 px-8 py-3 backdrop-blur-sm">
                 {sec.label}
               </span>
            </div>
          </motion.div>
        </section>
      ))}
    </div>
  );
}