"use client"

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TabDataTypes } from "@/components/timeline/types";
import { TimelineData } from "@/components/timeline/TimelineData";
import { TabButton } from "@/components/timeline/TabButton";
import { StatsCard } from "@/components/timeline/StatsCard";
import { TimelineEntry } from "@/components/timeline/TimelineEntry";
import { dateOptions, DateOption } from "@/components/timeline/constants";

interface TimelineProps {
  data?: TabDataTypes[];
}

export const Timeline: React.FC<TimelineProps> = () => {
  const [selectedDate, setSelectedDate] = useState<DateOption>(dateOptions[0]);
  const [activeTab, setActiveTab] = useState<string>(TimelineData[0].id);

  const filteredData = useMemo(
    () =>
      TimelineData.map((tab) => ({
        ...tab,
        entries: tab.entries.filter((entry) => entry.date === selectedDate),
      })),
    [selectedDate]
  );

  const currentTab = useMemo(
    () => filteredData.find((tab) => tab.id === activeTab) || filteredData[0],
    [activeTab, filteredData]
  );

  return (
    <motion.div 
      className="overflow-hidden bg-[var(--bg-primary)]" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} 
      exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
    >
      <section aria-labelledby="timeline-heading" className="w-full">
        <div className="max-w-6xl mx-auto text-left px-4 md:px-6 lg:px-8">
          <motion.div 
            className="py-10" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} 
            exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
          >
            <span className="text-xs md:text-sm uppercase tracking-wider text-[var(--text-secondary)] block">
              RITSUMEISAI 2025
            </span>
            <h2 id="timeline-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight">
              タイムライン
            </h2>
          </motion.div>

          {/* 日付スイッチャー */}
          <div className="w-full flex bg-[var(--surface-secondary)] rounded-full overflow-hidden mb-6">
            {dateOptions.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-1 py-2 text-center transition ${
                  selectedDate === date 
                    ? "text-[var(--brand-primary)]" 
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          {/* ナビゲーションタブ */}
          <nav role="tablist" aria-label="Event locations" className="relative">
            <div className="overflow-x-auto scrollbar-hide mb-6">
              <motion.ul
                className="flex snap-x snap-mandatory"
                initial={{ x: -50 }}
                animate={{ x: 0, transition: { duration: 0.6 } }}
                exit={{ x: -50, transition: { duration: 0.6 } }}
              >
                {filteredData.map((tab, idx) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    index={idx}
                  />
                ))}
              </motion.ul>
            </div>
            {/* 左側のフェード効果 */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-8 md:w-12 lg:w-16 pointer-events-none z-10"
              style={{
                background: `linear-gradient(to right, var(--bg-primary), transparent)`
              }}
            />
            {/* 右側のフェード効果 */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-8 md:w-12 lg:w-16 pointer-events-none z-10"
              style={{
                background: `linear-gradient(to left, var(--bg-primary), transparent)`
              }}
            />
          </nav>
        </div>
      </section>

      <main className="w-full bg-[var(--surface-secondary)] rounded-t-3xl pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
          <motion.div 
            className="grid grid-cols-3 gap-6 p-6 rounded-2xl mb-4 text-center bg-[var(--bg-secondary)]" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} 
            exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
          >
            <StatsCard label="公演数" value={currentTab.stats.sessions} />
            <StatsCard label="公演時間" value={currentTab.stats.duration} />
            <StatsCard label="参加者数" value={currentTab.stats.attendees} />
          </motion.div>

          <AnimatePresence mode="wait"> 
            <motion.div 
              role="tabpanel" 
              id={`tabpanel-${activeTab}`} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} 
              exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
            >
              {currentTab.entries.map((item) => (
                <TimelineEntry key={item.title + item.startTime} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
};