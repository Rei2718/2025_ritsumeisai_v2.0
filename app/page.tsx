import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeScreen from "@/screen/Home";
import TimelineScreen from '@/screen/Timeline';
import {
  BsHouseDoor,
  BsHouseDoorFill,
} from "react-icons/bs";
import { MdFastfood, MdGroups, MdOutlineFastfood, MdOutlineGroups } from "react-icons/md";
import { GoClock, GoClockFill } from 'react-icons/go';
import FoodScreen from "@/screen/Food";
import ClassScreen from "@/screen/Classs";

export default function Home() {
  return (
    <Tabs
      defaultValue="home"
      className="w-full mx-auto"
    >
      {/* タブコンテンツ */}
{/* タブコンテンツ */}
      <TabsContent value="home" className="w-full">
        <HomeScreen />
      </TabsContent>

      <TabsContent value="time" className="w-full">
        <TimelineScreen />
      </TabsContent>

      <TabsContent value="class" className="w-full">
        <ClassScreen />
      </TabsContent>

      <TabsContent value="food" className="w-full">
        <FoodScreen />
      </TabsContent>

      {/* 
      <TabsContent value="menu" className="w-full">
        <ComingSoonScreen />
      </TabsContent>
      */}

      {/* ボトムタブナビゲーション */}
      <TabsList className="fixed bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)] p-4 md:p-6 lg:p-8 w-full z-20 grid grid-cols-1 bg-transparent max-w-xl mx-auto">
        {/* grid!!!!!!!!!!!!! */}
        <div className="grid grid-cols-4 rounded-full h-[52px] border border-[var(--ghost_white)]/10 backdrop-blur-xs bg-[var(--surface-primary)]">

          {/* ホームタブ */}
          <TabsTrigger
            value="home"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="ホーム"
          >
            <BsHouseDoor className="scale-140 group-data-[state=active]:hidden" />
            <BsHouseDoorFill className="scale-140 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          {/* タイムラインタブ */}
          <TabsTrigger
            value="time"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="タイムライン"
          >
            <GoClock className="scale-140 group-data-[state=active]:hidden" />
            <GoClockFill className="scale-140 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          {/* クラス企画タブ */}
          <TabsTrigger
            value="class"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="クラス企画"
          >
            <MdOutlineGroups className="scale-140 group-data-[state=active]:hidden" />
            <MdGroups className="scale-140 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          {/* フードタブ */}
          <TabsTrigger
            value="food"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="フード"
          >
            <MdOutlineFastfood className="scale-140 group-data-[state=active]:hidden" />
            <MdFastfood className="scale-140 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          {/* メニュータブ
          <TabsTrigger
            value="menu"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="メニュー"
          >
            <HiMenuAlt3 className="scale-140" />
          </TabsTrigger>
          */}
        </div>
      </TabsList>
    </Tabs>
  );
}