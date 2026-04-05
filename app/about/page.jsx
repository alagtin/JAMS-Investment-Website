// app/page.jsx
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: "hpph885a",
  dataset: "production",
  apiVersion: "2024-04-05",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) { return builder.image(source); }

export default async function HeroSection() {
  const data = await client.fetch(`*[_type == "about"][0]{
    "videoUrl": heroVideo.asset->url,
    mainLogo
  }`);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black antialiased">
      
      {/* 1. 背景影片 (z-0) */}
      {data?.videoUrl && (
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-60">
            <source src={data.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>
      )}

      {/* 2. 中間 Logo (z-10) */}
      <div className="relative z-10 flex h-full items-center justify-center">
        {data?.mainLogo && (
          <div className="relative flex items-center justify-center">
            {/* 將光暈 h/w 從 64/64 縮小為 56/56 */}
            <div className="absolute h-56 w-56 bg-white/20 blur-[100px] rounded-full" />
            
            {/* 3. 修改處：縮小 Logo 尺寸 */}
            {/* 從 w-[320px] md:w-[480px] */}
            {/* 縮小為 w-[260px] md:w-[380px] */}
            <img 
              src={urlFor(data.mainLogo).url()} 
              alt="JAMS Logo" 
              className="relative w-[260px] md:w-[380px] drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-1000"
            />
          </div>
        )}
      </div>

    </main>
  );
}