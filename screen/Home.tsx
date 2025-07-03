import { AuroraBackground } from "@/components/ui/aurora-background";
import { Londrina_Shadow, Londrina_Solid } from "next/font/google";

const londrinaShadow = Londrina_Shadow({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
});
const londrinaSolid = Londrina_Solid({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
});

export default function HomeScreen() {
  return (
    <AuroraBackground className="text-white">
      <div className="relative z-10">
        <section className="relative h-svh w-screen">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
            <div className="font-londrina mb-4 px-2 text-6xl md:text-7xl lg:text-10xl">
              <div className={londrinaSolid.className}>
                THE 30TH
              </div>
              <div className={londrinaShadow.className}>
                RITSUMEISAI
              </div>
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl mb-4">
              Remix&sup3;
            </div>
            <div className="mb-1 text-lg sm:text-lg md:text-2xl lg:text-3xl">
              2025.7.5 (Sat) - 2025.7.6 (Sun)
            </div>

          </div>
        </section>
      </div>
    </AuroraBackground>
  );
}