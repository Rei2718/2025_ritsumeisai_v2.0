"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { School, Users, Clock, MapPin, ArrowUpRight, Calendar } from "lucide-react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Database } from '@/database.types';
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
type ClassEvent = Database["public"]["Views"]["class_events"]["Row"];

interface ClassData {
  events: ClassEvent[];
}

// 学年の定義
const GRADES = [
  { id: "middle1", name: "中学1年", schoolLevel: "middle", grade: 1, icon: School },
  { id: "middle2", name: "中学2年", schoolLevel: "middle", grade: 2, icon: School },
  { id: "middle3", name: "中学3年", schoolLevel: "middle", grade: 3, icon: School },
  { id: "high1", name: "高校1年", schoolLevel: "high", grade: 1, icon: Users },
  { id: "high2", name: "高校2年", schoolLevel: "high", grade: 2, icon: Users },
  { id: "high3", name: "高校3年", schoolLevel: "high", grade: 3, icon: Users },
] as const;

type GradeId = typeof GRADES[number]["id"];

// クラスごとにイベントをグループ化する関数
const groupEventsByClass = (events: ClassEvent[]) => {
  const grouped = new Map<string, ClassEvent[]>();
  
  events.forEach(event => {
    if (!event.organizer_id) return;
    const key = `${event.organizer_id}`;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    if (event.event_id) {
      grouped.get(key)!.push(event);
    }
  });
  
  return grouped;
};

// クラス表示名を生成
const getClassDisplayName = (classEvent: ClassEvent) => {
  const prefix = classEvent.school_level === "middle" ? "中" : "高";
  const grade = classEvent.grade || "？";
  const className = classEvent.class_name || "？";
  return `${prefix}${grade}-${className}`;
};

// 企画ごとにグループ化（同じ企画名の異なる日程をまとめる）
const groupEventsByName = (events: ClassEvent[]) => {
  const grouped = new Map<string, ClassEvent[]>();
  
  events.forEach(event => {
    if (!event.event_name) return;
    if (!grouped.has(event.event_name)) {
      grouped.set(event.event_name, []);
    }
    grouped.get(event.event_name)!.push(event);
  });
  
  return grouped;
};

export default function ClassClient({ data }: { data: ClassData }) {
  const [activeTab, setActiveTab] = useState<GradeId>("middle1");
  const [selectedClass, setSelectedClass] = useState<{ classInfo: ClassEvent, events: ClassEvent[] } | null>(null);

  // 現在の学年データ
  const currentGradeData = useMemo(() => {
    const grade = GRADES.find(g => g.id === activeTab);
    const filteredEvents = data.events.filter(
      event => event.school_level === grade?.schoolLevel && event.grade === grade?.grade
    );
    
    // クラスごとにグループ化
    const groupedByClass = groupEventsByClass(filteredEvents);
    
    return {
      ...grade!,
      classes: Array.from(groupedByClass.entries()).map(([, events]) => ({
        classInfo: events[0],
        events: events.filter(e => e.event_id !== null)
      })).filter(c => c.classInfo.organizer_id !== null).sort((a, b) => {
        const aName = a.classInfo.class_name || '';
        const bName = b.classInfo.class_name || '';
        return aName.localeCompare(bName);
      })
    };
  }, [data, activeTab]);

  // クラス選択ハンドラー
  const handleClassSelect = useCallback((classData: { classInfo: ClassEvent, events: ClassEvent[] }) => {
    setSelectedClass(classData);
  }, []);

  const handleDrawerClose = useCallback((open: boolean) => {
    if (!open) setSelectedClass(null);
  }, []);

  // カラー番号を取得
  const getPointColor = (color: string | null) => {
    const colorNum = parseInt(color?.replace("c", "") || "1");
    return `point_${colorNum > 6 ? (colorNum % 6) + 1 : colorNum}`;
  };

  // 日程リストを生成
  const getDateList = (events: ClassEvent[]) => {
    const dates = events.map(e => e.event_date).filter(Boolean);
    const uniqueDates = [...new Set(dates)];
    return uniqueDates.sort().join(', ');
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
                クラス企画
              </h1>
            </motion.div>

            {/* タブナビゲーション */}
            <motion.nav
              role="tablist"
              aria-label="学年選択"
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
                  {GRADES.map((grade, idx) => (
                    <motion.button
                      key={grade.id}
                      role="tab"
                      aria-selected={activeTab === grade.id}
                      aria-controls={`panel-${grade.id}`}
                      id={`tab-${grade.id}`}
                      onClick={() => setActiveTab(grade.id)}
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
                        activeTab === grade.id
                          ? "bg-[var(--brand-primary)] text-[var(--bg-primary)]"
                          : "bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      )}
                    >
                      <span className="text-base font-medium">{grade.name}</span>
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
            {/* クラス一覧 */}
            <AnimatePresence mode="sync">
              <motion.div
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
              >
                {currentGradeData.classes.length > 0 ? (
                  <div className="space-y-3">
                    {currentGradeData.classes.map((classData, idx) => {
                      const pointColor = getPointColor(classData.classInfo.color);
                      // 企画名でグループ化
                      const groupedEvents = groupEventsByName(classData.events);
                      const uniqueEventNames = Array.from(groupedEvents.keys());
                      const firstEventName = uniqueEventNames[0] || "";
                      const firstEventGroup = groupedEvents.get(firstEventName) || [];
                      const dateList = getDateList(firstEventGroup);
                      
                      return (
                        <motion.article
                          key={classData.classInfo.organizer_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.18,
                              delay: idx * 0.03,
                              ease: [0.22, 0.61, 0.36, 1],
                            },
                          }}
                          className="relative"
                        >
                          <motion.div
                            className="relative rounded-2xl pr-4 pl-8 cursor-pointer group"
                            style={{ backgroundColor: 'var(--bg-secondary)' }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleClassSelect(classData)}
                          >
                            {/* 左側のバー */}
                            <span 
                              className="absolute left-0 w-[6px] top-1 bottom-1 rounded-full" 
                              style={{ backgroundColor: `var(--${pointColor})` }}
                              aria-hidden="true" 
                            />

                            <div className="py-4">
                              {/* クラス名 */}
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                                  {getClassDisplayName(classData.classInfo)}
                                </h3>
                                {uniqueEventNames.length > 1 && (
                                  <span 
                                    className="px-2 py-0.5 text-xs rounded-full"
                                    style={{ 
                                      backgroundColor: 'var(--surface-hover)',
                                      color: 'var(--text-secondary)'
                                    }}
                                  >
                                    {uniqueEventNames.length}企画
                                  </span>
                                )}
                              </div>
                              
                              {/* イベント名 */}
                              {firstEventName && (
                                <p className="text-base mb-2" style={{ color: 'var(--text-primary)' }}>
                                  {firstEventName}
                                </p>
                              )}
                              
                              {/* 日時・場所情報 */}
                              <div className="grid grid-cols-[1fr_auto] gap-4 items-end">
                                <div className="flex flex-wrap gap-3 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                                  {dateList && (
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3.5 h-3.5" />
                                      <span>{dateList}</span>
                                    </div>
                                  )}
                                  {firstEventGroup[0]?.venue_name && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-3.5 h-3.5" />
                                      <span>{firstEventGroup[0].venue_name}</span>
                                    </div>
                                  )}
                                </div>
                                
                                {/* 矢印アイコン */}
                                <motion.div 
                                  className="p-2 rounded-lg"
                                  style={{ 
                                    backgroundColor: 'var(--surface-hover)',
                                    color: 'var(--text-primary)'
                                  }}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <ArrowUpRight className="w-4 h-4" />
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.article>
                      );
                    })}
                  </div>
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
                      この学年のクラス企画はありません
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* クラス詳細Drawer */}
      <Drawer open={!!selectedClass} onOpenChange={handleDrawerClose}>
        <DrawerContent 
          className={cn(
            "max-h-[90svh] overflow-hidden",
            selectedClass?.events[0]?.image_url && "[&>div:first-child]:bg-white/80"
          )}
          style={{ 
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          {/* 背景画像（最初のイベントの画像を使用） */}
          {selectedClass?.events[0]?.image_url && (
            <div className="absolute inset-x-0 top-0 h-[280px] overflow-hidden rounded-t-[2rem]">
              <Image
                src={selectedClass.events[0].image_url}
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
                  selectedClass?.events[0]?.image_url && "drop-shadow-lg"
                )}
                style={{
                  color: selectedClass?.events[0]?.image_url 
                    ? 'var(--ghost_white)' 
                    : 'var(--text-primary)'
                }}
              >
                {selectedClass && getClassDisplayName(selectedClass.classInfo)}
              </DrawerTitle>
              {selectedClass && (
                <DrawerDescription 
                  className={cn(
                    "text-left mt-2 text-base",
                    selectedClass?.events[0]?.image_url && "drop-shadow-md"
                  )}
                  style={{
                    color: selectedClass?.events[0]?.image_url 
                      ? 'var(--alice_blue)' 
                      : 'var(--text-secondary)'
                  }}
                >
                  {(() => {
                    const grouped = groupEventsByName(selectedClass.events);
                    const uniqueCount = grouped.size;
                    return uniqueCount === 1 ? "クラス企画" : `${uniqueCount}つの日程で開催`;
                  })()}
                </DrawerDescription>
              )}
            </div>
          </DrawerHeader>

          {/* スクロール可能なコンテンツエリア */}
          <div 
            className="flex-grow overflow-y-auto px-4 md:px-6 lg:px-8 py-6"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            {selectedClass && (() => {
              const groupedEvents = groupEventsByName(selectedClass.events);
              return Array.from(groupedEvents.entries()).map(([eventName, events], idx) => (
                <div key={eventName} className={cn(idx > 0 && "mt-8 pt-8 border-t", "border-[var(--border-subtle)]")}>
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {eventName}
                  </h3>
                  
                  {/* 日程情報 */}
                  <div className="space-y-3 mb-4">
                    {events.map((event) => (
                      <div key={event.event_id} className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.event_date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {event.start_time?.slice(0, 5)} - {event.end_time?.slice(0, 5)}
                          </span>
                        </div>
                        {event.venue_name && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.venue_name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* 説明（最初のイベントから） */}
                  {events[0].description && (
                    <p 
                      className="text-base leading-relaxed whitespace-pre-wrap"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {events[0].description}
                    </p>
                  )}
                </div>
              ));
            })()}
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