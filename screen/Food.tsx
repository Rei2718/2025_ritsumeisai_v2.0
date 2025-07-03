import FoodClient from "@/components/food/FoodClient";
import { createClient } from "@/supabase/client";
import { Suspense } from "react";

export default async function FoodScreen() {
  const supabase = await createClient();

  const { data: vendors, error } = await supabase
    .from("food_vendors")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching vendors:", error);
    return <div>エラーが発生しました</div>;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-secondary)]" />}>
      <FoodClient vendors={vendors || []} />
    </Suspense>
  );
}