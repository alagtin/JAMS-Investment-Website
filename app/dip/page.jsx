"use client"
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

// 1. 字體與 Sanity 設定
const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400', '700'] });

const client = createClient({
  projectId: "hpph885a",
  dataset: "production",
  apiVersion: "2024-04-05",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return source ? builder.image(source).url() : null; }

// --- 跑馬燈組件 ---
const Marquee = ({ images, speed = 40 }) => {
  return (
    <div className="relative flex overflow-hidden py-12 bg-zinc-900/30 border-y border-white/5">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...images, ...images, ...images].map((img, i) => (
          <img key={i} src={urlFor(img)} className="h-12 md:h-16 mx-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all object-contain" />
        ))}
      </motion.div>
    </div>
  );
};

export default function DIPPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDIP = async () => {
      const result = await client.fetch(`*[_type == "dip"][0]{
        ...,
        "videoUrl": backgroundVideo.asset->url
      }`);
      setData(result);
    };
    fetchDIP();
  }, []);

  if (!data) return <div className="bg-black h-screen flex items-center justify-center text-white">Loading DIP Program...</div>;

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black">
      
      {/* --- Section 1: Hero --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {data.backgroundType === 'video' && data.videoUrl ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
            <source src={data.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img src={urlFor(data.backgroundImage)} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          {data.mainLogo && <img src={urlFor(data.mainLogo)} className="w-[350px] md:w-[600px] relative z-10" alt="DIP Logo" />}
        </motion.div>
      </section>

      {/* --- Section 2: Selections (數據與學校 Logo) --- */}
      <section className="py-32 px-8 md:px-24 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          {[
            { label: "ADMITTED", val: data.admittedCount },
            { label: "ADMISSION RATE", val: data.admissionRate },
            { label: "TOTAL APPLICANTS", val: data.totalApplicants }
          ].map((item, i) => (
            <div key={i} className="text-center border-l border-white/20 pl-8">
              <h2 className={`${leagueSpartan.className} text-[13px] tracking-[0.4em] text-white/50 mb-4`}>{item.label}</h2>
              <span className={`${libreCaslon.className} text-6xl md:text-8xl`}>{item.val}</span>
            </div>
          ))}
        </div>
        {data.uniLogos && (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-40">
            {data.uniLogos.map((logo, i) => (
              <img key={i} src={urlFor(logo)} className="h-8 md:h-12 w-full object-contain grayscale" />
            ))}
          </div>
        )}
      </section>

      {/* --- Section 3: Education Planning (複雜時間軸) --- */}
      <section className="py-32 px-8 md:px-24 bg-zinc-950">
        <h2 className={`${libreCaslon.className} text-4xl mb-24 text-center tracking-widest`}>EDUCATION PLANNING</h2>
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="min-w-[800px]">
            {/* 年份橫軸 */}
            <div className="grid grid-cols-5 border-b border-white/10 pb-4 mb-8 text-center text-white/40 text-xs tracking-widest">
              <div>2023</div><div>2024</div><div>2025</div><div>2026</div><div>2027</div>
            </div>
            {/* 時間軸條狀圖 */}
            <div className="space-y-6 relative">
              <div className="h-8 w-[20%] bg-blue-900/50 border-l-2 border-blue-400 flex items-center px-4 text-[10px] uppercase">Undergraduate</div>
              <div className="h-8 w-[40%] translate-x-[20%] bg-indigo-900/50 border-l-2 border-indigo-400 flex items-center px-4 text-[10px] uppercase">DIP Core Training</div>
              <div className="h-8 w-[30%] translate-x-[50%] bg-purple-900/50 border-l-2 border-purple-400 flex items-center px-4 text-[10px] uppercase">Market Internship</div>
              <div className="h-8 w-[20%] translate-x-[80%] bg-zinc-800 border-l-2 border-white flex items-center px-4 text-[10px] uppercase">Master/Career</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Topics (文字列表區) --- */}
      <section className="py-32 px-8 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 max-w-6xl mx-auto">
          <div>
            <h3 className={`${libreCaslon.className} text-2xl mb-8 border-b border-white/10 pb-4`}>Technical Mastery</h3>
            <ul className={`${leagueSpartan.className} space-y-4 text-white/60 tracking-wider text-sm`}>
              <li>• Financial Statement Analysis & Forensic Accounting</li>
              <li>• Valuation Modeling (DCF, LBO, Comps)</li>
              <li>• M&A Structuring and Deal Analysis</li>
              <li>• Portfolio Management & Asset Allocation</li>
            </ul>
          </div>
          <div>
            <h3 className={`${libreCaslon.className} text-2xl mb-8 border-b border-white/10 pb-4`}>Industry Insight</h3>
            <ul className={`${leagueSpartan.className} space-y-4 text-white/60 tracking-wider text-sm`}>
              <li>• Global Macro & Fixed Income Strategy</li>
              <li>• Equity Research Methodology</li>
              <li>• Private Equity & Venture Capital Landscape</li>
              <li>• Derivative Strategies & Risk Management</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- Section 5: Mentors & Speakers --- */}
      <section className="py-32 bg-zinc-950">
        <div className="px-8 md:px-24 text-center mb-16">
          <h2 className={`${libreCaslon.className} text-4xl mb-4`}>GLOBAL NETWORK</h2>
          <p className={`${leagueSpartan.className} text-white/40 tracking-[0.3em] text-xs`}>CONNECTING TALENTS WITH TOP-TIER FIRMS</p>
        </div>

        {/* Mentor Logos */}
        <div className="mb-24 px-8 md:px-24">
          <h4 className="text-center text-[10px] tracking-[0.5em] text-white/30 mb-8 uppercase">Mentor From</h4>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50">
             {data.mentorLogos?.map((logo, i) => (
                <img key={i} src={urlFor(logo)} className="h-10 object-contain" />
             ))}
          </div>
        </div>

        {/* Guest Speaker Marquee (跑馬燈) */}
        <div className="py-12">
          <h4 className="text-center text-[10px] tracking-[0.5em] text-white/30 mb-8 uppercase">Guest Speakers From (Marquee)</h4>
          {data.speakerLogos && <Marquee images={data.speakerLogos} speed={30} />}
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-16 text-center border-t border-white/5">
        <p className={`${leagueSpartan.className} text-[10px] text-white/20 tracking-[0.5em]`}>© 2026 JAMS INVESTMENT. ALL RIGHTS RESERVED.</p>
      </footer>

    </div>
  );
}