"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Theater, Music, Sparkles, Building, Clock } from "lucide-react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TimelineEntry } from "./TimelineEntry";
import { Database } from '@/database.types';
import { createClient } from "@/supabase/client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

// ビューの型定義
type EventView = Database["public"]["Views"]["show_arena_events"]["Row"];

// データの型定義
interface TimelineData {
  arena: EventView[];
  subArena: EventView[];
  kotan: EventView[];
  assembly: EventView[];
}

const VENUES = [
  { id: "arena", name: "アリーナ", icon: Theater },
  { id: "subArena", name: "サブアリーナ", icon: Music },
  { id: "kotan", name: "コタン", icon: Sparkles },
  { id: "assembly", name: "アッセンブリー", icon: Building },
] as const;

type VenueId = typeof VENUES[number]["id"];

const dateOptions = ["7/5", "7/6"] as const;
type DateOption = typeof dateOptions[number];

// アクティブなイベントを判定
export function isEntryActive(event: EventView): boolean {
  if (!event.start_time || !event.end_time || !event.event_date) return false;
  
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentDate = now.getDate();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  const [eventMonth, eventDate] = event.event_date.split("/").map(Number);
  
  if (currentMonth !== eventMonth || currentDate !== eventDate) {
    return false;
  }
  
  const [startH, startM] = event.start_time.split(":").map(Number);
  const [endH, endM] = event.end_time.split(":").map(Number);
  
  const start = startH * 60 + startM;
  const end = endH * 60 + endM;
  
  return currentMinutes >= start && currentMinutes <= end;
}

export default function TimelineClient({ data: initialData }: { data: TimelineData }) {
  const [selectedDate, setSelectedDate] = useState<DateOption>(dateOptions[0]);
  const [activeTab, setActiveTab] = useState<VenueId>("arena");
  const [selectedEvent, setSelectedEvent] = useState<EventView | null>(null);
  const [data, setData] = useState<TimelineData>(initialData);

  // 現在の会場データ
  const currentVenueData = useMemo(() => {
    const venue = VENUES.find(v => v.id === activeTab);
    return {
      ...venue!,
      entries: data[activeTab].filter(event => event.event_date === selectedDate),
      stats: {
        sessions: `${data[activeTab].filter(event => event.event_date === selectedDate).length}本`,
        attendees: "未定",
        duration: activeTab === "subArena" ? "各15分" : activeTab === "kotan" ? "各20分" : "各25分"
      }
    };
  }, [data, activeTab, selectedDate]);

  // アクティブなイベント
  const activeEntries = useMemo(
    () => currentVenueData.entries.filter(isEntryActive),
    [currentVenueData.entries]
  );

  // イベント選択ハンドラー
  const handleEventSelect = useCallback((event: EventView) => {
    setSelectedEvent(event);
  }, []);

  const handleDrawerClose = useCallback((open: boolean) => {
    if (!open) setSelectedEvent(null);
  }, []);

  // リアルタイム監視
  useEffect(() => {
    const supabase = createClient();
    
    const channel = supabase
      .channel('events_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
        },
        async () => {
          const [arena, subArena, kotan, assembly] = await Promise.all([
            supabase.from("show_arena_events").select("*"),
            supabase.from("show_subarena_events").select("*"), 
            supabase.from("show_kotan_events").select("*"),
            supabase.from("show_assembly_events").select("*"),
          ]);

          setData({
            arena: arena.data || [],
            subArena: subArena.data || [],
            kotan: kotan.data || [],
            assembly: assembly.data || [],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ActiveEventEntry コンポーネント
  const ActiveEventEntry: React.FC<{ item: EventView }> = ({ item }) => {
    // カラー番号を取得（c1 -> 1）
    const colorNum = parseInt(item.organizer_color?.replace("c", "") || "1");
    const pointColor = `point_${colorNum > 6 ? (colorNum % 6) + 1 : colorNum}`;
    
    return (
      <motion.div
        className="relative rounded-2xl pr-4 pl-8 cursor-pointer group transition-all duration-200"
        onClick={() => handleEventSelect(item)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span 
          className="absolute left-0 w-[6px] top-1 bottom-1 rounded-full" 
          style={{ backgroundColor: `var(--${pointColor})` }} 
          aria-hidden="true" 
        />

        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
          <div className="grid gap-1">
            <div className="flex items-center gap-2 text-base" style={{ color: 'var(--text-secondary)' }}>
              <Clock className="w-4 h-4" aria-hidden="true" />
              <time dateTime={`${new Date().getFullYear()}-${item.event_date?.replace('/', '-')}T${item.start_time}`}>
                {item.start_time?.slice(0, 5)} - {item.end_time?.slice(0, 5)}
              </time>
            </div>
            
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {item.event_name}
            </h3>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
    >
      {/* ヘッダー + ナビゲーション */}
      <AuroraBackground className="pb-20">
        <section className="w-full min-h-52">
          <div className="max-w-max mx-auto px-4 md:px-6 lg:px-8">
            {/* タイトルセクション */}
            <motion.div
              className="py-12 md:py-18 lg:py-24 text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <span 
                className="text-base tracking-widest block mb-2"
                style={{ color: 'var(--text-tertiary)' }}
              >
                RITSUMEISAI 2025
              </span>
              <h1 
                className="text-3xl md:text-4xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                タイムライン
              </h1>
            </motion.div>

            {/* タブナビゲーション */}
            <motion.nav
              role="tablist"
              aria-label="会場選択"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.2, delay: 0.1, ease: "easeOut" },
              }}
              className="w-full mb-4 md:mb-6 lg:mb-8"
            >
              <div className="overflow-x-auto">
                <div className="inline-grid grid-flow-col gap-2 justify-center">
                  {VENUES.map((venue, idx) => (
                    <motion.button
                      key={venue.id}
                      role="tab"
                      aria-selected={activeTab === venue.id}
                      aria-controls={`panel-${venue.id}`}
                      id={`tab-${venue.id}`}
                      onClick={() => setActiveTab(venue.id)}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.15,
                          delay: 0.15 + idx * 0.025,
                          ease: "easeOut",
                        },
                      }}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "relative group transition-all duration-200 ease-out px-4 py-2.5 rounded-full whitespace-nowrap",
                        activeTab === venue.id
                          ? "bg-[var(--brand-primary)] text-[var(--bg-primary)]"
                          : "bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      )}
                    >
                      <span className="text-base font-medium">{venue.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.nav>
          </div>
        </section>
      </AuroraBackground>

      {/* メインコンテンツ */}
      <main className="w-full -translate-y-20">
        <motion.div
          className="rounded-t-[2rem]"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.18, delay: 0.12, ease: "easeOut" },
          }}
        >
          <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
            {/* 日付選択タブ */}
            <div className="relative grid grid-cols-2 mb-8 md:mb-12 lg:mb-16 mx-4">
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--surface-hover)' }}
              />
              <motion.div
                className="absolute bottom-0 h-0.5"
                style={{ backgroundColor: 'var(--text-primary)' }}
                initial={false}
                animate={{
                  x: selectedDate === dateOptions[0] ? "0%" : "100%",
                  width: "50%",
                }}
                transition={{ type: "spring", stiffness: 600, damping: 25 }}
              />
              {dateOptions.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className="relative pb-4 text-center font-medium text-base transition-colors duration-150 ease-out"
                >
                  <span
                    className={cn(
                      "transition-colors duration-150 ease-out",
                      selectedDate === date
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-tertiary)]"
                    )}
                  >
                    {date}
                  </span>
                </button>
              ))}
            </div>

            {/* 現在アクティブなイベント */}
            {activeEntries.length > 0 && (
              <section className="pb-12 md:pb-16 lg:pb-20">
                <motion.div
                  className="rounded-2xl p-6 md:p-8 lg:p-10"
                  style={{ backgroundColor: 'var(--surface-secondary)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.15, delay: 0.1, ease: "easeOut" },
                  }}
                >
                  <h3 
                    className="text-lg font-semibold mb-6 tracking-wide text-center"
                    style={{ color: 'var(--brand-primary)' }}
                  >
                    現在開催中のイベント
                  </h3>
                  <div className="grid gap-3">
                    {activeEntries.map((item) => (
                      <ActiveEventEntry key={item.event_id} item={item} />
                    ))}
                  </div>
                </motion.div>
              </section>
            )}

            {/* タイムラインエントリー */}
            <AnimatePresence mode="sync">
              <motion.div
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                key={`${activeTab}-${selectedDate}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
              >
                {currentVenueData.entries.length > 0 ? (
                  currentVenueData.entries.map((item, idx) => (
                    <React.Fragment key={item.event_id}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.18,
                            delay: idx * 0.02,
                            ease: [0.22, 0.61, 0.36, 1],
                          },
                        }}
                      >
                        <TimelineEntry 
                          item={item} 
                          onClick={handleEventSelect}
                          isActive={isEntryActive(item)}
                        />
                      </motion.div>
                      {idx !== currentVenueData.entries.length - 1 && (
                        <div 
                          className="w-full h-px opacity-50 mb-3"
                          style={{ backgroundColor: 'var(--surface-hover)' }}
                        />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15, delay: 0 },
                    }}
                    className="text-center py-16"
                  >
                    <p 
                      className="text-base"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      この日程の公演はありません
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* イベント詳細Drawer */}
      <Drawer open={!!selectedEvent} onOpenChange={handleDrawerClose}>
        <DrawerContent 
          className={cn(
            "max-h-[90svh] overflow-hidden",
            selectedEvent?.image_url && "[&>div:first-child]:bg-white/80"
          )}
          style={{ 
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          {/* 背景画像 */}
          {selectedEvent?.image_url && (
            <div className="absolute inset-x-0 top-0 h-[280px] overflow-hidden rounded-t-[2rem]">
              <Image
                src={selectedEvent.image_url}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))'
                }}
              />
            </div>
          )}
          
          <DrawerHeader className="text-left p-0 flex-shrink-0 relative h-[280px] flex flex-col justify-end px-4 md:px-6 lg:px-8">
            <div className="relative z-10 mb-4 md:mb-6 lg:mb-8">
              <DrawerTitle 
                className={cn(
                  "text-2xl md:text-3xl text-left",
                  selectedEvent?.image_url && "drop-shadow-lg"
                )}
                style={{
                  color: selectedEvent?.image_url 
                    ? 'var(--ghost_white)' 
                    : 'var(--text-primary)'
                }}
              >
                {selectedEvent?.event_name}
              </DrawerTitle>
              <DrawerDescription 
                className={cn(
                  "text-left mt-2 text-base",
                  selectedEvent?.image_url && "drop-shadow-md"
                )}
                style={{
                  color: selectedEvent?.image_url 
                    ? 'var(--alice_blue)' 
                    : 'var(--text-secondary)'
                }}
              >
                {"Presented by : " + selectedEvent?.organizer_name}
              </DrawerDescription>
              
              <div className="flex items-center gap-4 mt-4">
                <div 
                  className={cn(
                    "flex items-center gap-1 text-base",
                    selectedEvent?.image_url && "drop-shadow"
                  )}
                  style={{ 
                    color: selectedEvent?.image_url 
                      ? 'var(--alice_blue)' 
                      : 'var(--text-secondary)' 
                  }}
                >
                  <Clock className="w-4 h-4" />
                  <span>
                    {selectedEvent?.event_date} {selectedEvent?.start_time?.slice(0, 5)} - {selectedEvent?.end_time?.slice(0, 5)}
                  </span>
                </div>
              </div>
            </div>
          </DrawerHeader>

          {/* スクロール可能なコンテンツエリア */}
          <div 
            className="flex-grow overflow-y-auto px-4 md:px-6 lg:px-8 py-6"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            {selectedEvent?.description && (
              <div>
                <h3 
                  className="text-lg font-medium mb-3 text-left"
                  style={{ color: 'var(--text-primary)' }}
                >
                  詳細
                </h3>
                <p 
                  className="text-base leading-relaxed whitespace-pre-wrap"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {selectedEvent.description}
                </p>
              </div>
            )}
          </div>

          <DrawerFooter className="px-6 pb-6 flex-shrink-0">
            <DrawerClose asChild>
              <button 
                className="w-full py-3 rounded-lg transition-colors text-base font-medium"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-primary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
                }}
              >
                閉じる
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
}