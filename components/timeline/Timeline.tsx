"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { TabDataTypes, isEntryActive } from "@/components/timeline/types";
import { TimelineData } from "@/components/timeline/TimelineData";
import { TimelineEntry } from "@/components/timeline/TimelineEntry";
import { dateOptions, DateOption, profileImages } from "@/components/timeline/constants";

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
      className="min-h-screen bg-[var(--bg-primary)]" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
    >
      {/* ヘッダーセクション */}
      <section className="w-full">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          {/* タイトルセクション */}
          <motion.div 
            className="py-12"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
          >
            <span className="text-md tracking-widest text-[var(--text-tertiary)] block mb-2">
              RITSUMEISAI 2025
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              タイムライン
            </h1>
          </motion.div>

          {/* 日付セグメントコントロール */}
          <motion.div 
            className="relative mb-6 flex justify-center w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1, ease: "easeOut" } }}
          >
            <div className="w-full max-w-lg">
              <div className="relative grid grid-cols-2 bg-[var(--surface-secondary)] rounded-xl p-1 w-full">
                {/* 選択インジケーター */}
                <motion.div
                  className="absolute inset-y-1 w-[calc(50%-4px)] bg-[var(--bg-tertiary)] rounded-lg"
                  initial={false}
                  animate={{
                    x: selectedDate === dateOptions[0] ? 4 : "calc(100% + 4px)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  style={{ zIndex: 1 }}
                />
                {/* 日付ボタン */}
                {dateOptions.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`relative z-10 py-2.5 text-center font-medium text-sm transition-colors duration-200 flex-1 ${
                      selectedDate === date 
                            ? "text-[var(--brand-primary)]"
                            : "text-[var(--text-primary)]"}
                    }`}
                    style={{ minWidth: 0 }}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* タブナビゲーション */}
          <motion.nav 
            role="tablist" 
            aria-label="会場選択"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2, ease: "easeOut" } }}
            className="w-full my-6"
          >
            <div className="w-full max-w-4xl mx-auto">
              <motion.div className="w-full">
                <div
                  className="
                    grid 
                    grid-cols-2 
                    md:grid-cols-4 
                    gap-4
                    w-full
                  "
                >
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
                          ease: "easeOut"
                        }
                      }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative group w-full h-full flex flex-col items-center justify-center
                        rounded-2xl px-2 py-6 transition-all duration-200
                        ${
                          activeTab === tab.id
                            ? "bg-[var(--bg-tertiary)]"
                            : "bg-[var(--surface-secondary)] hover:bg-[var(--surface-hover)]"
                        }`}
                      style={{
                        minHeight: "92px",
                      }}
                    >
                      {/* アクティブインジケーター */}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-2xl"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                      <div className="relative flex flex-col items-center z-10">
                        <div className="mb-2">
                          <Image
                            src={profileImages[idx % 4]}
                            alt=""
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                        <span className={`text-sm font-medium transition-colors duration-200
                          ${activeTab === tab.id
                            ? "text-[var(--brand-primary)]"
                            : "text-[var(--text-primary)]"}
                        `}>
                          {tab.title}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.nav>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="w-full mt-6">
        <motion.div 
          className="bg-[var(--bg-secondary)] rounded-t-[2rem] min-h-[calc(100vh-280px)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3, ease: "easeOut" } }}
        >
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6">
            {/* 現在アクティブなイベントのセクション */}
            <section className="mb-6">
              <motion.div
                className="rounded-2xl bg-[var(--surface-secondary)] py-5 px-4 text-center flex flex-col items-center justify-center min-h-[64px]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.28, ease: "easeOut" } }}
              >
                {activeEntries.length > 0 ? (
                  <>
                    <span className="text-md font-bold text-[var(--brand-primary)] mb-2 tracking-wide">現在開催中のイベント</span>
                    {/* 複数でも全部表示したいならmapに変更 */}
                    {activeEntries.map((item) => (
                      <div key={item.title + item.startTime} className="w-full flex justify-center text-left">
                        <TimelineEntry item={item} />
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-[var(--text-tertiary)]">
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
                className="space-y-3 pb-16"
              >
                {currentTab.entries.length > 0 ? (
                  currentTab.entries.map((item, idx) => (
                    <React.Fragment key={`${item.title}-${item.startTime}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { 
                            duration: 0.3,
                            delay: 0.6 + (idx * 0.05),
                            ease: "easeOut"
                          }
                        }}
                      >
                        <TimelineEntry item={item} />
                      </motion.div>
                      {/* 最後以外に区切り線 */}
                      {idx !== currentTab.entries.length - 1 && (
                        <div className="w-full h-px my-3 bg-[var(--surface-hover)] opacity-50" />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.6 } }}
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