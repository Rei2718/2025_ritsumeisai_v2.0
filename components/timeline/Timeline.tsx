"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TabDataTypes, isEntryActive } from "@/components/timeline/types";
import { TimelineData } from "@/components/timeline/TimelineData";
import { TimelineEntry } from "@/components/timeline/TimelineEntry";
import { dateOptions, DateOption } from "@/components/timeline/constants";
import { AuroraBackground } from "@/components/ui/aurora-background";

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

  const activeEntries = useMemo(
    () => currentTab.entries.filter((entry) => isEntryActive(entry)),
    [currentTab.entries]
  );

  return (
    <motion.div
      className="min-h-screen bg-[var(--bg-secondary)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
    >
      {/* ヘッダー + ナビゲーション */}
      <AuroraBackground className="pb-20">
        <section className="w-full">
          <div className="max-w-max mx-auto px-4 md:px-6 lg:px-8">
            {/* タイトルセクション（左寄せ） */}
            <motion.div
              className="py-12 md:py-18 lg:py-24 text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: "easeOut" },
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
                transition: { duration: 0.4, delay: 0.2, ease: "easeOut" },
              }}
              className="w-full mb-4 md:mb-6 lg:mb-8"
            >
              <div className="overflow-x-auto">
                <div className="inline-grid grid-flow-col gap-2 justify-center">
                  {filteredData.map((tab, idx) => (
                    <motion.button
                      key={tab.id}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`panel-${tab.id}`}
                      id={`tab-${tab.id}`}
                      onClick={() => setActiveTab(tab.id)}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.3,
                          delay: 0.3 + idx * 0.05,
                          ease: "easeOut",
                        },
                      }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative group transition-all duration-200 px-3 py-2 rounded-full whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-[var(--brand-primary)] text-[var(--bg-primary)]"
                          : "bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`}
                    >
                      <span className="text-sm font-medium">{tab.title}</span>
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
            transition: { duration: 0.4, delay: 0.3, ease: "easeOut" },
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
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />

              {/* 日付ボタン */}
              {dateOptions.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className="relative pb-2 md:pb-4 lg:pb-6 text-center font-medium text-sm transition-colors duration-200"
                >
                  <span
                    className={`transition-colors duration-200 ${
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
                  transition: { duration: 0.4, delay: 0.28, ease: "easeOut" },
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
                          key={`${item.title}-${item.startTime}`}
                          className="grid grid-cols-[1fr_auto] items-center gap-4 py-3 px-4 rounded-xl bg-[var(--bg-primary)]/50 backdrop-blur-sm transition-all duration-200 hover:bg-[var(--bg-primary)]/70"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="grid gap-1">
                            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                              {item.title}
                            </h4>
                            <div className="text-xs text-[var(--text-secondary)]">
                              {item.startTime} - {item.endTime}
                            </div>
                          </div>
                          <div className="text-right grid gap-1">
                            {item.location && (
                              <div className="text-xs text-[var(--text-tertiary)]">
                                {item.location}
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
            <AnimatePresence mode="wait">
              <motion.div
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {currentTab.entries.length > 0 ? (
                  currentTab.entries.map((item, idx) => (
                    <React.Fragment
                      key={`${item.title}-${item.startTime}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.3,
                            delay: 0.6 + idx * 0.05,
                            ease: "easeOut",
                          },
                        }}
                      >
                        <TimelineEntry item={item} />
                      </motion.div>
                      {idx !== currentTab.entries.length - 1 && (
                        <div className="w-full h-px bg-[var(--surface-hover)] opacity-50 mb-3" />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.3, delay: 0.6 },
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
    </motion.div>
  );
};
