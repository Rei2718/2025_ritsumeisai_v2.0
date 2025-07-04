"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Theater, Music, Sparkles, Building, MapPin, Clock } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TimelineEntry } from "./TimelineEntry";
import { Database } from '@/database.types';
import { createClient } from "@/supabase/client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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
function isEntryActive(event: EventView): boolean {
  if (!event.start_time || !event.end_time || !event.event_date) return false;
  
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // JavaScriptの月は0ベースなので+1
  const currentDate = now.getDate();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // イベントの日付を解析（"7/5" -> month: 7, date: 5）
  const [eventMonth, eventDate] = event.event_date.split("/").map(Number);
  
  // 日付が一致しない場合はfalse
  if (currentMonth !== eventMonth || currentDate !== eventDate) {
    return false;
  }
  
  // 時間の判定
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

  // リアルタイム監視
  useEffect(() => {
    const supabase = createClient();
    
    // eventsテーブルの変更を監視
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
          // イベントテーブルに変更があった場合、全てのビューのデータを再取得
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

    // クリーンアップ
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-[var(--bg-secondary)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
    >
      {/* ヘッダー + ナビゲーション */}
      <AuroraBackground className="pb-20">
        <section className="w-full min-h-52">
          <div className="max-w-max mx-auto px-4 md:px-6 lg:px-8">
            {/* タイトルセクション（左寄せ） */}
            <motion.div
              className="py-12 md:py-18 lg:py-24 text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <span className="text-sm tracking-widest text-[var(--text-tertiary)] block mb-2">
                RITSUMEISAI 2025
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
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
                      className={`relative group transition-all duration-200 ease-out px-3 py-2 rounded-full whitespace-nowrap ${
                        activeTab === venue.id
                          ? "bg-[var(--brand-primary)] text-[var(--bg-primary)]"
                          : "bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`}
                    >
                      <span className="text-sm font-medium">{venue.name}</span>
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
          className="bg-[var(--bg-secondary)] rounded-t-[2rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.18, delay: 0.12, ease: "easeOut" },
          }}
        >
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
            <div className="relative grid grid-cols-2 mb-4 md:mb-6 lg:mb-8 mx-2 md:mx-3 lg:mx-4">
              {/* ベース下線 */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--surface-hover)] rounded-full" />

              {/* アクティブインジケーター */}
              <motion.div
                className="absolute bottom-0 h-0.5 bg-[var(--text-primary)]"
                initial={false}
                animate={{
                  x: selectedDate === dateOptions[0] ? "0%" : "100%",
                  width: "50%",
                }}
                transition={{ type: "spring", stiffness: 600, damping: 25 }}
              />

              {/* 日付ボタン */}
              {dateOptions.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className="relative pb-2 md:pb-4 lg:pb-6 text-center font-medium text-sm transition-colors duration-150 ease-out"
                >
                  <span
                    className={`transition-colors duration-150 ease-out ${
                      selectedDate === date
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-tertiary)]"
                    }`}
                  >
                    {date}
                  </span>
                </button>
              ))}
            </div>

            {/* 現在アクティブなイベント */}
            <section className="pb-12 md:pb-18 lg:pb-24">
              <motion.div
                className="rounded-2xl bg-[var(--surface-secondary)] p-4 md:p-6 lg:p-8 min-h-[64px]"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.15, delay: 0.1, ease: "easeOut" },
                }}
              >
                {activeEntries.length > 0 ? (
                  <>
                    <h3 className="text-md font-bold text-[var(--brand-primary)] mb-4 md:mb-6 lg:mb-8 tracking-wide text-center">
                      現在開催中のイベント
                    </h3>
                    <div className="grid gap-3">
                      {activeEntries.map((item) => (
                        <motion.div
                          key={item.event_id}
                          className="grid grid-cols-[1fr_auto] items-center gap-4 py-3 px-4 rounded-xl bg-[var(--bg-primary)]/50 backdrop-blur-sm transition-all duration-150 ease-out hover:bg-[var(--bg-primary)]/70"
                          whileHover={{ scale: 1.008 }}
                          whileTap={{ scale: 0.995 }}
                        >
                          <div className="grid gap-1">
                            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                              {item.event_name}
                            </h4>
                            <div className="text-xs text-[var(--text-secondary)]">
                              {item.start_time?.slice(0, 5)} - {item.end_time?.slice(0, 5)}
                            </div>
                          </div>
                          <div className="text-right grid gap-1">
                            {item.venue_name && (
                              <div className="text-xs text-[var(--text-tertiary)]">
                                {item.venue_name}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-[var(--text-tertiary)] text-center">
                    現在開催中のイベントはありません
                  </p>
                )}
              </motion.div>
            </section>

            {/* タイムラインエントリー（区切り線付き） */}
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
                          onClick={setSelectedEvent}
                        />
                      </motion.div>
                      {idx !== currentVenueData.entries.length - 1 && (
                        <div className="w-full h-px bg-[var(--surface-hover)] opacity-50 mb-3" />
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
                    className="text-center py-12"
                  >
                    <p className="text-[var(--text-tertiary)]">
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
      <Drawer open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DrawerContent 
          style={{ 
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          <DrawerHeader className="text-left px-4 md:px-6 lg:px-8 pt-8 md:pt-12 lg:pt-16">
            <div className="flex justify-start space-x-0">

              <DrawerTitle className="text-2xl md:text-3xl text-left" style={{ color: 'var(--text-primary)' }}>
                {selectedEvent?.event_name}
              </DrawerTitle>
            </div>

            <DrawerDescription className="text-left pt-2 md:pt-3 lg:pt-4" style={{ color: 'var(--text-secondary)' }}>
              {"Presented by : " + selectedEvent?.organizer_name}
            </DrawerDescription>
            <div className="flex justify-start space-x-4 pt-2 md:pt-3 lg:pt-4">
              {/* 時間情報 */}
              <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Clock className="w-4 h-4" />
                <span>
                  {selectedEvent?.event_date} {selectedEvent?.start_time?.slice(0, 5)} - {selectedEvent?.end_time?.slice(0, 5)}
                </span>
              </div>

              {/* 会場情報 */}
              {selectedEvent?.venue_name && (
                <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <MapPin className="w-4 h-4" />
                  <span>{selectedEvent.venue_name}</span>
                </div>
              )}
            </div>
          </DrawerHeader>

          <div className="px-4 md:px-6 lg:px-8">
            {/* 説明文 */}
            {selectedEvent?.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  詳細
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {selectedEvent.description}
                </p>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
}