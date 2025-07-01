import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import HomeScreen from "@/screen/Home";
import TimelineScreen from '@/screen/Timeline';
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsGrid,
  BsGridFill,
  BsBroadcast,
  BsMusicNoteList,
  BsSearch,
} from "react-icons/bs";

export default function Home() {
  return (
    <Tabs
      defaultValue="home"
      className="w-full mx-auto"
    >
      <TabsContent value="home" className="w-full">
        <HomeScreen />
      </TabsContent>
      <TabsContent value="new" className="w-full">
        <TimelineScreen />
      </TabsContent>
      <TabsContent value="radio" className="w-full">
        <HomeScreen />
      </TabsContent>
      <TabsContent value="library" className="w-full">
        <HomeScreen />
      </TabsContent>
      <TabsContent value="search" className="w-full">
        <HomeScreen />
      </TabsContent>

      {/* Apple HIG準拠の改善を加えたタブバー */}
      <TabsList className="fixed bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)] px-4 py-3 transform translate-x-0 w-full z-20 grid grid-cols-[4fr_auto] bg-transparent">
        {/* メインナビゲーション - 元のデザインを維持 */}
        <div className="relative grid grid-cols-4 rounded-full h-[52px] ml-2 mr-1 border border-[var(--ghost_white)]/10 backdrop-blur-xs bg-[var(--surface-primary)]">
          <TabsTrigger
            value="home"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="ホーム"
          >
            <BsHouseDoor className="scale-160 group-data-[state=active]:hidden" />
            <BsHouseDoorFill className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="new"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="新着"
          >
            <BsGrid className="scale-160 group-data-[state=active]:hidden" />
            <BsGridFill className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="radio"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="ラジオ"
          >
            <BsBroadcast className="scale-160" />
          </TabsTrigger>

          <TabsTrigger
            value="library"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
            aria-label="ライブラリ"
          >
            <BsMusicNoteList className="scale-160" />
          </TabsTrigger>
        </div>

        {/* 検索ボタン - 元のデザインを維持しつつ改善 */}
        <DropdownMenu>
          <div className="relative w-12 grid place-items-center ml-1 mr-2">
            <DropdownMenuTrigger asChild>
              <div className="rounded-full backdrop-blur-xl bg-[var(--eeire_black)] w-12 h-12 grid place-items-center shadow-sm">
                <TabsTrigger
                  value="search"
                  className="group w-full h-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] border border-[var(--ghost_white)]/10"
                  aria-label="検索"
                >
                  <BsSearch className="scale-160" />
                </TabsTrigger>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end">
              <DropdownMenuLabel>パネルの位置</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem value="top">上部</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">下部</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">右側</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      </TabsList>
    </Tabs>
  );
}