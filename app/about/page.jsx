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
  const data = await client.fetch(`*[_type == "about"][0]{ "videoUrl": heroVideo.asset->url, mainLogo }`);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {data?.videoUrl && (
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-60">
            <source src={data.videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="relative z-10 flex h-full items-center justify-center">
        {data?.mainLogo && (
          <img src={urlFor(data.mainLogo).url()} alt="Logo" className="w-[300px] md:w-[450px]" />
        )}
      </div>
    </main>
  );
}