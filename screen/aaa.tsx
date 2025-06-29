"use client"

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Clock, Calendar } from "lucide-react";
import { TabDataTypes } from "@/components/timeline/types";
import { TimelineData } from "@/components/timeline/TimelineData";

const tapSpring = { type: "spring" as const, stiffness: 400, damping: 30 };

// 日付オプション
const dateOptions = ["7/5", "7/6"] as const;
type DateOption = typeof dateOptions[number];

interface TimelineProps { data?: TabDataTypes[]; }

// Tab ボタン
const TabButton: React.FC<{ tab: TabDataTypes; isActive: boolean; onClick: () => void; index: number }> = ({ tab, isActive, onClick, index }) => (
  <motion.button
    role="tab"
    aria-selected={isActive}
    aria-controls={`panel-${tab.id}`}
    id={`tab-${tab.id}`}
    onClick={onClick}
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.05, transition: tapSpring }}
    whileTap={{ scale: 0.95, transition: tapSpring }}
    className={`snap-center flex-shrink-0 flex items-center space-x-2 p-3 rounded-full backdrop-blur-sm transition mx-1.5 first:ml-0 last:mr-0 bg-[var(--surface-secondary)] ${isActive ? "text-[var(--brand-primary)]" : "text-[var(--text-primary)]"}`}
  >
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05, transition: tapSpring }}
      whileTap={{ scale: 0.95, transition: tapSpring }}
      className="w-8 h-8 rounded-full overflow-hidden"
    >
      <Image
        src={["/red.webp","/blue.webp","/yellow.webp","/green.webp"][index % 4]}
        alt={tab.title}
        width={64}
        height={64}
        className="w-full h-full object-cover"
      />
    </motion.div>
    <motion.span initial={{ opacity: 1 }} whileHover={{ opacity: 1 }} className="text-base font-medium">
      {tab.title}
    </motion.span>
  </motion.button>
);

// 統計カード
const StatsCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.02, transition: tapSpring }} className="flex flex-col items-center">
    <p className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{value}</p>
    <p className="text-xs md:text-sm text-[var(--text-secondary)]">{label}</p>
  </motion.div>
);

// タイムラインエントリー
const TimelineEntry: React.FC<{ item: TabDataTypes['entries'][0] }> = ({ item }) => (
  <motion.article className="relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}>
    <div className="py-3">
      <motion.div className="relative bg-[var(--bg-secondary)] rounded-2xl p-4 pl-8" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { duration: 0.4 } }} exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.4 } }}>
        <span className="absolute left-0 w-[6px] top-4 bottom-4 rounded-full" style={{ backgroundColor: `var(--${item.pointColor})` }} aria-hidden="true" />

        <motion.header className="flex justify-between items-center mb-2 text-[var(--text-secondary)] text-sm" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3 } }} exit={{ opacity: 0, y: -5, transition: { duration: 0.3 } }}>
          <div className="flex items-center gap-4">
            {item.date && (
              <motion.div className="flex items-center gap-2" initial={{ x: -10 }} animate={{ x: 0, transition: { duration: 0.3 } }} exit={{ x: -10, transition: { duration: 0.3 } }}>
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>{item.date}</span>
              </motion.div>
            )}
            <motion.div className="flex items-center gap-2" initial={{ x: -10 }} animate={{ x: 0, transition: { delay: 0.1, duration: 0.3 } }} exit={{ x: -10, transition: { duration: 0.3 } }}>
              <Clock className="w-4 h-4" aria-hidden="true" />
              <time dateTime={`${new Date().getFullYear()}-${item.date.replace('/', '-') }T${item.startTime}`}>{item.startTime} – {item.endTime}</time>
            </motion.div>
          </div>
          <motion.span className="inline-block px-2 py-1 text-xs font-medium rounded-lg" initial={{ scale: 0.8 }} animate={{ scale: 1, transition: { delay: 0.2, duration: 0.3 } }} exit={{ scale: 0.8, transition: { duration: 0.3 } }} style={{ backgroundColor: `var(--${item.pointColor})`, color: `var(--text-primary)` }}>
            {item.classroom || item.labels[0]}
          </motion.span>
        </motion.header>

        <motion.h3 className="mb-2 text-lg md:text-xl font-semibold text-[var(--text-primary)]" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>{item.title}</motion.h3>

        <motion.p className="mb-4 text-sm leading-relaxed text-[var(--text-tertiary)]" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>{item.description}</motion.p>

        <motion.footer className="flex justify-between items-center" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.3 } }} exit={{ opacity: 0, y: 5, transition: { duration: 0.3 } }}>
          {item.location && (
            <motion.div className="flex items-center text-xs text-[var(--text-secondary)] gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{item.location}</span>
            </motion.div>
          )}
          <motion.button className="p-2 rounded-lg bg-[var(--surface-hover)] text-[var(--text-primary)]" aria-label={`View details for ${item.title}`} initial={{ scale: 1 }} whileHover={{ scale: 1.1, transition: tapSpring }} whileTap={{ scale: 0.95, transition: tapSpring }}>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        </motion.footer>
      </motion.div>
    </div>
  </motion.article>
);

// メインコンポーネント
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
    <motion.div className="overflow-hidden bg-[var(--bg-primary)]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}>
      <section aria-labelledby="timeline-heading" className="w-full">
        <div className="max-w-6xl mx-auto text-left px-4 md:px-6 lg:px-8 py-8">
          <motion.div className="mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}>
            <span className="text-xs md:text-sm uppercase tracking-wider text-[var(--text-secondary)] block">RITSUMEISAI 2025</span>
            <h2 id="timeline-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight">タイムライン</h2>
          </motion.div>

          {/* 日付スイッチャー */}
          <div className="w-full flex bg-[var(--surface-secondary)] rounded-full overflow-hidden mb-6">
            {dateOptions.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-1 py-2 text-center transition ${selectedDate === date ? "text-[var(--brand-primary)]" : "text-[var(--text-secondary)]"}`}
              >
                {date}
              </button>
            ))}
          </div>

          {/* ナビゲーションタブ */}
          <nav role="tablist" aria-label="Event locations">
            <div className="overflow-x-auto scrollbar-hide">
              <motion.ul
                className="flex snap-x snap-mandatory before:block after:block before:flex-shrink-0 after:flex-shrink-0 before:w-4 after:w-4 md:before:w-6 md:after:w-6 lg:before:w-8 lg:after:w-8"
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
          </nav>
        </div>
      </section>

      <main className="w-full bg-[var(--bg-primary)] rounded-t-3xl pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
          <motion.div className="grid grid-cols-3 gap-6 bg-[var(--surface-secondary)] p-6 rounded-2xl mb-4 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}>
            <StatsCard label="公演数" value={currentTab.stats.sessions} />
            <StatsCard label="公演時間" value={currentTab.stats.duration} />
            <StatsCard label="参加者数" value={currentTab.stats.attendees} />
          </motion.div>

          <AnimatePresence mode="wait"> 
            <motion.div role="tabpanel" id={`tabpanel-${activeTab}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}>
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

export function TimelineDemo() {
  return <Timeline />;
}