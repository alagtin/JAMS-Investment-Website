"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400', '700', '900'] });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-04-05",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return source ? builder.image(source).url() : null; }

// 領英圖標組件
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.77-.773 1.77-1.729V1.729C24 .774 23.203 0 22.225 0z" />
  </svg>
);

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamQuery = `*[_type == "team"] | order(order asc) { _id, name, role, school, linkedInUrl, image }`;
        const resultTeam = await client.fetch(teamQuery);
        setTeamMembers(resultTeam);

        const dipQuery = `*[_type == "dip"][0]{ ..., "videoUrl": backgroundVideo.asset->url }`;
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
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black px-8 md:px-24">
        {heroData?.backgroundType === 'video' && heroData.videoUrl ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-85">
            <source src={heroData.videoUrl} type="video/mp4" />
          </video>
        ) : (
          heroData?.backgroundImage && (
            <img src={urlFor(heroData.backgroundImage)} className="absolute inset-0 w-full h-full object-cover opacity-85" alt="hero bg" />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        
        {/* 🚨 標題區塊：比例大幅修正，不再過度放大 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="relative z-10 text-white flex flex-col items-center justify-center text-center"
        >
          {/* MEET OUR：比例稍微縮小，與下方 TEAMS 達成平衡 */}
          <h2 className={`${libreCaslon.className} text-xl md:text-3xl lg:text-4xl tracking-[0.2em] mb-1 md:mb-2`}>
            MEET OUR
          </h2>
          {/* TEAMS：從荒謬的 11rem 縮小到合理的 7rem 左右，保持氣場但不突兀 */}
          <h1 className={`${leagueSpartan.className} text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-wide leading-none drop-shadow-xl`}>
            TEAMS
          </h1>
        </motion.div>
      </section>

      {/* 2. 成員展示區 */}
      <section className="relative z-10 px-8 md:px-24 py-32 selection:bg-blue-900 selection:text-white">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-24 max-w-[1400px] mx-auto">
          {teamMembers.map((member) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group w-full sm:w-[calc(50%-24px)] lg:w-[calc(25%-36px)] max-w-[320px]"
            >
              <div className="relative aspect-[4/5] w-full bg-[#820000] border-4 border-[#820000] group mb-8 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03]">
                {member.linkedInUrl ? (
                  <a href={member.linkedInUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                      <LinkedInIcon />
                    </div>
                    {member.image && (
                      <img 
                        src={urlFor(member.image)} 
                        className="h-full w-full object-cover grayscale-0 filter contrast-[0.95] saturate-[0.85] brightness-[1.02] transition-transform duration-1000 group-hover:scale-110"
                        alt={member.name}
                      />
                    )}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </a>
                ) : (
                  <div className="w-full h-full">
                    {member.image && (
                      <img src={urlFor(member.image)} className="h-full w-full object-cover filter contrast-[0.95] saturate-[0.85] brightness-[1.02]" alt={member.name} />
                    )}
                  </div>
                )}
              </div>
              
              {/* 🚨 名字：從 text-2xl/3xl 縮小到優雅的 text-lg md:text-xl */}
              <h3 className={`${libreCaslon.className} text-lg md:text-xl tracking-wide mb-2 text-center uppercase`}>
                {member.name}
              </h3>
              <p className={`${leagueSpartan.className} text-[11px] font-bold tracking-[0.3em] text-white/70 uppercase text-center mb-1`}>
                {member.role}
              </p>
              {member.school && (
                <p className={`${leagueSpartan.className} text-[10px] tracking-[0.2em] text-white/40 uppercase text-center italic leading-relaxed px-4`}>
                  {member.school}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}