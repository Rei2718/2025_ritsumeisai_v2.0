import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeScreen from "@/screen/Home";
import { TimelineDemo } from "@/screen/Timeline";
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
        <TimelineDemo />
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

      <TabsList className="w-11/12 max-w-lg mx-auto fixed bottom-4 left-1/2 -translate-x-1/2 z-20 grid grid-cols-[1fr_auto] gap-3 bg-transparent">
        {/* Main navigation controls */}
        <div className="grid grid-cols-4 place-items-center rounded-full bg-[var(--primary)]">
          <TabsTrigger
            value="home"
            className="group h-12 w-12 rounded-full transition-all duration-200 ease-in-out text-[var(--muted)]/60 data-[state=active]:text-[var(--primary-foreground)]"
          >
            <BsHouseDoor className="scale-140 group-data-[state=active]:hidden" />
            <BsHouseDoorFill className="scale-140 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="new"
            className="group h-12 w-12 rounded-full transition-all duration-200 ease-in-out text-[var(--muted)]/60 data-[state=active]:text-[var(--primary-foreground)]"
          >
            <BsGrid className="scale-140 group-data-[state=active]:hidden" />
            <BsGridFill className="scale-140 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="radio"
            className="group h-12 w-12 rounded-full transition-all duration-200 ease-in-out text-[var(--muted)]/60 data-[state=active]:text-[var(--primary-foreground)]"
          >
            <BsBroadcast className="scale-140 group-data-[state=active]:hidden" />
            <BsBroadcast className="scale-140 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="library"
            className="group h-12 w-12 rounded-full transition-all duration-200 ease-in-out text-[var(--muted)]/60 data-[state=active]:text-[var(--primary-foreground)]"
          >
            <BsMusicNoteList className="scale-140 group-data-[state=active]:hidden" />
            <BsMusicNoteList className="scale-140 hidden group-data-[state=active]:block" />
          </TabsTrigger>
        </div>

        {/* Search button */}
        <div className="grid place-items-center rounded-full backdrop-blur-xl bg-[var(--primary)]">
          <TabsTrigger
            value="search"
            className="group h-12 w-12 rounded-full transition-all duration-200 ease-in-out text-[var(--muted)]/60 data-[state=active]:text-[var(--primary-foreground)]"
          >
            <BsSearch className="scale-140 group-data-[state=active]:hidden" />
            <BsSearch className="scale-140 hidden group-data-[state=active]:block" />
          </TabsTrigger>
        </div>
      </TabsList>
    </Tabs>
  );
}