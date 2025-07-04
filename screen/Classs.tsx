import ClassClient from "@/components/class/ClassClient";
import { createClient } from "@/supabase/client";
import { Suspense } from "react";
import { Database } from '@/database.types';

type ClassEvent = Database["public"]["Views"]["class_events"]["Row"];

interface ClassData {
  events: ClassEvent[];
}

async function getClassData(): Promise<ClassData> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("class_events")
    .select("*")
    .order("school_level")
    .order("grade")
    .order("class_name");

  if (error) {
    console.error("Error fetching class events:", error);
    return { events: [] };
  }

  return {
    events: data || [],
  };
}

export default async function ClassScreen() {
  const data = await getClassData();
  
  return (
    <Suspense fallback={<div className="min-h-svh bg-[var(--bg-secondary)]" />}>
      <ClassClient data={data} />
    </Suspense>
  );
}