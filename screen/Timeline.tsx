import { createClient } from "@/supabase/server";
import { Suspense } from "react";
import TimelineClient from "@/components/timeline/TimelineClient";
import { Database } from '@/database.types';

type EventView = Database["public"]["Views"]["show_arena_events"]["Row"];

interface TimelineData {
  arena: EventView[];
  subArena: EventView[];
  kotan: EventView[];
  assembly: EventView[];
}

async function getTimelineData(): Promise<TimelineData> {
  const supabase = await createClient();
  
  const [arena, subArena, kotan, assembly] = await Promise.all([
    supabase.from("show_arena_events").select("*"),
    supabase.from("show_subarena_events").select("*"), 
    supabase.from("show_kotan_events").select("*"),
    supabase.from("show_assembly_events").select("*"),
  ]);

  return {
    arena: arena.data || [],
    subArena: subArena.data || [],
    kotan: kotan.data || [],
    assembly: assembly.data || [],
  };
}

export default async function TimelinePage() {
  const data = await getTimelineData();
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-secondary)]" />}>
      <TimelineClient data={data} />
    </Suspense>
  );
}