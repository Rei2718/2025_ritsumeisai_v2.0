import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeScreen from "@/screen/Home";
import TimelineScreen from '@/screen/Timeline';
import {
  BsHouseDoor,
  BsHouseDoorFill,
} from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdFastfood, MdOutlineFastfood } from "react-icons/md";
import { GoClock, GoClockFill } from 'react-icons/go';
import ComingSoonScreen from "@/screen/CommingSoon";

export default function Home() {
  return (
    <Tabs
      defaultValue="home"
      className="w-full mx-auto"
    >
      <TabsContent value="home" className="w-full">
        <HomeScreen />
      </TabsContent>
      <TabsContent value="time" className="w-full">
        <TimelineScreen />
      </TabsContent>
      <TabsContent value="radio" className="w-full">
        <ComingSoonScreen />
      </TabsContent>
      <TabsContent value="menu" className="w-full">
        <ComingSoonScreen />
      </TabsContent>

      {/* Apple HIG準拠の改善を加えたタブバー */}
      <TabsList className="fixed bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)] p-4 md:p-6 lg:p-8 transform translate-x-0 w-full z-20 grid grid-cols-[4fr_auto] bg-transparent">
        {/* メインナビゲーション - 元のデザインを維持 */}
        <div className="relative grid grid-cols-4 rounded-full h-[52px] border border-[var(--ghost_white)]/10 backdrop-blur-xs bg-[var(--surface-primary)]">
          <TabsTrigger
            value="home"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="ホーム"
          >
            <BsHouseDoor className="scale-160 group-data-[state=active]:hidden" />
            <BsHouseDoorFill className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="time"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="新着"
          >
            <GoClock className="scale-160 group-data-[state=active]:hidden" />
            <GoClockFill className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="radio"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="ラジオ"
          >
            <MdOutlineFastfood className="scale-160 group-data-[state=active]:hidden" />
            <MdFastfood className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="menu"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="メニュー"
          >
            <HiMenuAlt3 className="scale-160 group-data-[state=active]:hidden" />
            <HiMenuAlt3 className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>
        </div>
      </TabsList>
    </Tabs>
  );
}