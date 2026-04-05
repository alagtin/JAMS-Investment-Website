"use client"
import { motion, useScroll, useTransform } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400'] });

// 模擬 7 位成員資料 (之後你可以在 Sanity 後台新增，現在先用這個測試)
const teamMembers = [
  { name: "Executive Lead", role: "FOUNDER & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  { name: "Senior Analyst", role: "INVESTMENT STRATEGY", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
  { name: "Media Director", role: "CREATIVE DESIGN", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" },
  { name: "Quant Lead", role: "DATA ANALYSIS", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80" },
  { name: "Risk Manager", role: "PORTFOLIO RISK", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" },
  { name: "Legal Counsel", role: "COMPLIANCE", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" },
  { name: "Associate", role: "BUSINESS DEVELOPMENT", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80" },
];

export default function TeamsPage() {
  const { scrollYProgress } = useScroll();
  
  // 背景隨滾動變模糊 (0px -> 15px) 且 變暗 (0.6 -> 0.3)
  const blurValue = useTransform(scrollYProgress, [0, 0.15], [0, 15]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.15], [0.6, 0.3]);

  return (
    <div className="relative min-h-[150vh] bg-black text-white">
      
      {/* 1. 固定背景層：滑動時會模糊 */}
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

      {/* 2. Hero Section */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`${libreCaslon.className} text-7xl md:text-9xl tracking-tighter uppercase`}
        >
          Teams
        </motion.h1>
      </section>

      {/* 3. 7位成員排列：第一排3人，第二排4人 */}
      <section className="relative z-10 px-8 md:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
          
          {teamMembers.map((member, index) => {
            // 關鍵排版邏輯：
            // 前3個 (index 0,1,2) 佔 4 格 (12/3=4)
            // 後4個 (index 3,4,5,6) 佔 3 格 (12/4=3)
            const colSpan = index < 3 ? "md:col-span-4" : "md:col-span-3";
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${colSpan} flex flex-col items-center`}
              >
                {/* 照片容器 */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 group mb-8">
                  <img 
                    src={member.img} 
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                
                {/* 名字與職稱 */}
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