import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import { Libre_Caslon_Text, League_Spartan } from 'next/font/google';

// 1. 強迫 Vercel 不要用緩存，每次都要現場抓
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const libreCaslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['700'] });
const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400'] });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: "2024-04-05",
  useCdn: false, // 關閉 CDN，直接抓資料庫
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return source ? builder.image(source).url() : null; }

export default async function TeamsPage() {
  // 2. 伺服器端直接抓取
  const query = `*[_type == "team"] | order(order asc)`;
  const teamMembers = await client.fetch(query);

  // 【防呆檢查】如果抓不到人，畫面會顯示這行字，方便你除錯
  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <p>資料庫目前是空的，或者是資料還在「草稿 (Draft)」狀態未發布。</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* 背景層 */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" 
          className="h-full w-full object-cover opacity-40 blur-sm"
          alt="background"
        />
      </div>

      {/* 標題 */}
      <section className="relative z-10 h-[40vh] flex items-center justify-center">
        <h1 className={`${libreCaslon.className} text-7xl md:text-9xl uppercase`}>Teams</h1>
      </section>

      {/* 成員列表 (3+4 佈局) */}
      <section className="relative z-10 px-8 md:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 gap-x-12">
          {teamMembers.map((member, index) => {
            const colSpan = index < 3 ? "md:col-span-4" : "md:col-span-3";
            const imageUrl = urlFor(member.image);
            
            return (
              <div key={member._id} className={`${colSpan} flex flex-col items-center`}>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 mb-8 shadow-2xl">
                  {imageUrl ? (
                    <img src={imageUrl} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={member.name} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500">No Image</div>
                  )}
                </div>
                <h3 className={`${libreCaslon.className} text-2xl text-center uppercase`}>{member.name}</h3>
                <p className={`${leagueSpartan.className} text-[11px] text-white/50 text-center uppercase tracking-[0.3em]`}>{member.role}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}