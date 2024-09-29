import Link from "next/link";
import { CompareVideos } from "./_ui";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const videoIds = (searchParams?.videoIds || "").split(",");

  return (
    <section className="py-10 h-full">
      <div className="max-w-7xl mx-auto px-2 md:px-4 h-full">
        {!videoIds || videoIds.length < 2 ? (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">
              Proszę wybrać przynajmniej 2 filmy do porównania
            </h1>
            <h2>
              Możesz wybrać filmy, klikając na nie w sekcji{" "}
              <Link className="underline hover:underline" href="/videos">
                Twoje wideo
              </Link>{" "}
              lub klikając w przycisk &quot;Porównaj wideo&quot; na stronie
              pojedynczego wideo.
            </h2>
          </div>
        ) : (
          <CompareVideos videoIds={videoIds} />
        )}
      </div>
    </section>
  );
}
