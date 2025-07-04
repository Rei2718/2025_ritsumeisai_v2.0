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

// Type definitions
type SideTypographyProps = {
  position: 'left' | 'right';
  text: string;
};

// Side decoration components
const SideTypography = ({ position, text }: SideTypographyProps) => (
  <div className={`flex flex-col justify-between items-center py-24 ${position === 'left' ? 'pl-2' : 'pr-2'} w-[30px]`}>
    {position === 'left' && (
      <>
        <SideDots />
        <VerticalLine />
        <span className='text-sm transform -rotate-90 my-16 whitespace-nowrap' style={{ color: 'var(--text-tertiary)' }}>{text}</span>
        <SideDots />
      </>
    )}
    {position === 'right' && (
      <>
        <span className='text-sm transform rotate-90 my-16 whitespace-nowrap' style={{ color: 'var(--text-tertiary)' }}>{text}</span>
        <SideDots />
        <VerticalLine />
        <SideDots />
      </>
    )}
  </div>
);

const SideDots = () => (
  <div className='flex flex-col items-center'>
    <div className='h-1.5 w-1.5 rounded-full mb-2' style={{ backgroundColor: 'var(--text-tertiary)' }}></div>
    <div className='h-1.5 w-1.5 rounded-full mb-2' style={{ backgroundColor: 'var(--text-tertiary)' }}></div>
    <div className='h-1.5 w-1.5 rounded-full' style={{ backgroundColor: 'var(--text-tertiary)' }}></div>
  </div>
);

const VerticalLine = () => <div className='h-32 w-[0.05rem]' style={{ backgroundColor: 'var(--border-default)' }}></div>;

export default function HomeScreen() {
  return (
    <AuroraBackground className="text-[var(--text-primary)]">
      <div className="relative min-h-screen flex items-center justify-center">

        {/* Side decorations */}
        <div className='fixed top-0 left-0 w-full h-full z-20 flex justify-between pointer-events-none'>
          <SideTypography position="left" text="RITSUMEIKAN KEISHO" />
          <SideTypography position="right" text="RITSUMEIKAN KEISHO" />
        </div>

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
            <div className="mb-1 text-lg sm:text-lg md:text-2xl lg:text-3xl">
              2025.7.5 (Sat) - 2025.7.6 (Sun)
            </div>
            <div className="text-lg sm:text-lg md:text-2xl lg:text-3xl">
              ～ Remix&sup3; ～
            </div>

          </div>
        </section>
      </div>
    </AuroraBackground>
  );
}