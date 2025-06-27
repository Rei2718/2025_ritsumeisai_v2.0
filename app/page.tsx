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
        <div className="grid grid-cols-4 rounded-full h-full ml-2 mr-1 border border-[var(--ghost_white)]/10 backdrop-blur-xs bg-transparent">
          <TabsTrigger
            value="home"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
          >
            <BsHouseDoor className="scale-160 group-data-[state=active]:hidden" />
            <BsHouseDoorFill className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="new"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
          >
            <BsGrid className="scale-160 group-data-[state=active]:hidden" />
            <BsGridFill className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="radio"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
          >
            <BsBroadcast className="scale-160 group-data-[state=active]:hidden" />
            <BsBroadcast className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>

          <TabsTrigger
            value="library"
            className="group w-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] py-3"
          >
            <BsMusicNoteList className="scale-160 group-data-[state=active]:hidden" />
            <BsMusicNoteList className="scale-160 hidden group-data-[state=active]:block" />
          </TabsTrigger>
        </div>

        {/* Search button with fixed width */}
        <DropdownMenu>
          <div className="w-12 grid place-items-center ml-1 mr-2">
            <DropdownMenuTrigger asChild>
              <div className="rounded-full backdrop-blur-xl bg-[var(--eeire_black)] w-12 h-12 grid place-items-center">
                <TabsTrigger
                  value="search"
                  className="group w-full h-full rounded-full transition-all duration-200 ease-in-out text-[var(--muted_white)] data-[state=active]:text-[var(--honeydew)] border border-[var(--ghost_white)]/10"
                >
                  <BsSearch className="scale-160 group-data-[state=active]:hidden" />
                  <BsSearch className="scale-160 hidden group-data-[state=active]:block" />
                </TabsTrigger>
              </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup>
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
          </div>
        </DropdownMenu>
      </TabsList>
    </Tabs>
  );
}