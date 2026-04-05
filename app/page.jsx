// app/page.jsx
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
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
    <main className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* 1. 背景影片 */}
      {data?.videoUrl && (
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-60">
            <source src={data.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>
      )}

      {/* 2. 中間 Logo */}
      <div className="relative z-10 flex h-full items-center justify-center">
        {data?.mainLogo && (
          <div className="relative flex items-center justify-center">
            {/* Logo 後方的微光暈 */}
            <div className="absolute h-56 w-56 bg-white/20 blur-[100px] rounded-full" />
            <img 
              src={urlFor(data.mainLogo).url()} 
              alt="JAMS Logo" 
              className="relative w-[260px] md:w-[380px] drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            />
          </div>
        )}
      </div>

    </main>
  );
}