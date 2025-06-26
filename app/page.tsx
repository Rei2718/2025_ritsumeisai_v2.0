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

      <TabsList className="fixed bottom-2 left-2 right-2 transform translate-x-0 w-auto max-w-xl mx-auto z-20 grid grid-cols-[4fr_auto] bg-transparent">
        {/* Main navigation controls spanning flexible width */}
        <div className="grid grid-cols-4 rounded-full bg-[var(--alice_blue)] h-full ml-2 mr-1">
          <TabsTrigger
            value="home"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted)]/60 data-[state=active]:text-[var(--eeire_black)] py-3"
          >
            <BsHouseDoor className="scale-160 group-data-[state=active]:hidden" />
            <BsHouseDoorFill className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="new"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted)]/60 data-[state=active]:text-[var(--eeire_black)] py-3"
          >
            <BsGrid className="scale-160 group-data-[state=active]:hidden" />
            <BsGridFill className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="radio"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted)]/60 data-[state=active]:text-[var(--eeire_black)] py-3"
          >
            <BsBroadcast className="scale-160 group-data-[state=active]:hidden" />
            <BsBroadcast className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="library"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted)]/60 data-[state=active]:text-[var(--eeire_black)] py-3"
          >
            <BsMusicNoteList className="scale-160 group-data-[state=active]:hidden" />
            <BsMusicNoteList className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>
        </div>

        {/* Search button with fixed width */}
        <div className="w-12 grid place-items-center ml-1 mr-2">
          <div className="rounded-full backdrop-blur-xl bg-[var(--alice_blue)] w-12 h-12 grid place-items-center">
            <TabsTrigger
              value="search"
              className="group w-full h-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted)]/60 data-[state=active]:text-[var(--eeire_black)]"
            >
              <BsSearch className="scale-160 group-data-[state=active]:hidden" />
              <BsSearch className="scale-160 hidden group-data-[state=active]:block" />
            </TabsTrigger>
          </div>
        </div>
      </TabsList>
    </Tabs>
  );
}