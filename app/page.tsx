import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeScreen from "@/screen/Home";
import TimelineScreen from '@/screen/Timeline';
import ComingSoonScreen from "@/screen/CommingSoon";
import {
  BsHouseDoor,
  BsHouseDoorFill,
} from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdFastfood, MdOutlineFastfood } from "react-icons/md";
import { GoClock, GoClockFill } from 'react-icons/go';
import FoodScreen from "@/screen/Food";

export default function Home() {
  return (
    <Tabs
      defaultValue="home"
      className="w-full mx-auto"
    >
      {/* タブコンテンツ */}
      <TabsContent value="home" className="w-full">
        <HomeScreen />
      </TabsContent>

      <TabsContent value="time" className="w-full">
        <TimelineScreen />
      </TabsContent>

      <TabsContent value="food" className="w-full">
        <FoodScreen />
      </TabsContent>

      <TabsContent value="menu" className="w-full">
        <ComingSoonScreen />
      </TabsContent>

      {/* ボトムタブナビゲーション */}
      <TabsList className="fixed bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)] p-4 md:p-6 lg:p-8 w-full z-20 grid grid-cols-1 bg-transparent max-w-xl mx-auto">
        <div className="grid grid-cols-4 rounded-full h-[52px] border border-[var(--ghost_white)]/10 backdrop-blur-xs bg-[var(--surface-primary)]">

          {/* ホームタブ */}
          <TabsTrigger
            value="home"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="ホーム"
          >
            <BsHouseDoor className="scale-160 group-data-[state=active]:hidden" />
            <BsHouseDoorFill className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          {/* タイムラインタブ */}
          <TabsTrigger
            value="time"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="タイムライン"
          >
            <GoClock className="scale-160 group-data-[state=active]:hidden" />
            <GoClockFill className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          {/* フードタブ */}
          <TabsTrigger
            value="food"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="フード"
          >
            <MdOutlineFastfood className="scale-160 group-data-[state=active]:hidden" />
            <MdFastfood className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          {/* メニュータブ */}
          <TabsTrigger
            value="menu"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="メニュー"
          >
            <HiMenuAlt3 className="scale-160" />
          </TabsTrigger>
        </div>
      </TabsList>
    </Tabs>
  );
}