import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['300', '400', '600'] });

const client = createClient({
  projectId: "hpph885a",
  dataset: "production",
  apiVersion: "2024-04-05",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return builder.image(source); }

export default async function TeamsPage() {
  // 從後台抓取所有成員資料
  const members = await client.fetch(`*[_type == "team"] | order(_createdAt asc)`);

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-16">
      {/* 頁面大標題 */}
      <h1 className={`${libreCaslon.className} text-white text-5xl mb-16 tracking-widest uppercase text-center`}>
        Our Team
      </h1>

      {/* 成員卡片網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {members.map((m) => (
          <div key={m._id} className="group flex flex-col items-center text-center space-y-6">
            
            {/* 照片容器：加入滑過縮放效果 */}
            <div className="relative w-64 h-80 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              {m.image && (
                <img 
                  src={urlFor(m.image).width(400).url()} 
                  alt={m.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>

            {/* 姓名 (Caslon Bold) */}
            <h2 className={`${libreCaslon.className} text-white text-2xl tracking-wide`}>
              {m.name}
            </h2>

            {/* 職稱 (Spartan) */}
            <p className={`${leagueSpartan.className} text-white/60 text-sm tracking-[0.3em] uppercase font-semibold`}>
              {m.role}
            </p>

            {/* 學校 (Spartan) */}
            <div className={`${leagueSpartan.className} text-white/40 text-[10px] tracking-[0.2em] uppercase`}>
              {m.education?.map((edu, idx) => (
                <span key={idx}>{edu}{idx === 0 && m.education.length > 1 ? " / " : ""}</span>
              ))}
            </div>

            {/* 自我介紹 (Spartan) */}
            <p className={`${leagueSpartan.className} text-white/70 text-sm font-light leading-relaxed max-w-xs`}>
              {m.bio}
            </p>

            {/* LinkedIn 連結 */}
            {m.linkedin && (
              <a 
                href={m.linkedin} 
                target="_blank" 
                className={`${leagueSpartan.className} text-white text-xs tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors`}
              >
                LINKEDIN
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}