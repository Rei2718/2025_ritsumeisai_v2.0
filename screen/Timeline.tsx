"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Users, Clock } from "lucide-react";
import { TabDataTypes } from "@/components/timeline/types";
import { TimelineData } from "@/components/timeline/TimelineData";

interface TimelineProps {
  data?: TabDataTypes[];
}

export const Timeline = ({ data = TimelineData }: TimelineProps) => {
  const [activeTab, setActiveTab] = useState<string>("conference");
  const currentTab = data.find(tab => tab.id === activeTab) || data[0];

  return (
    <div className="overflow-hidden">
      {/* ヘッダーセクション */}
      <section className="max-w-6xl mx-auto">
        <header className="flex items-center justify-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl text-center text-[var(--ghost_white)]">
              Event Schedule
            </h2>
          </motion.div>
        </header>

        {/* タブナビゲーション */}
        <div className="bg-[var(--honeydew)] rounded-t-4xl">
          <motion.div
            className="text-center pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <nav className="flex justify-center gap-2 py-6">
              {data.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-4 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon
                      className={`h-6 w-6 transition-colors duration-300 ${
                        isActive
                          ? "text-[var(--ghost_white)] animate-bounce"
                          : "text-[var(--muted_white)]"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        </div>
      </section>

      {/* タイムラインメインコンテンツ */}
      <main className="w-full bg-[var(--eeire_black)] rounded-t-4xl -translate-y-8 -mb-8 pb-16">
        <div className="max-w-4xl w-11/12 mx-auto py-6">
          {/* 統計カード */}
          <div className="relative mx-auto bg-[var(--dark_black)] rounded-4xl mb-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="mx-auto w-full max-w-[640px] z-10"
              >
                <div className="w-10/12 mx-auto h-28">
                  <div className="grid grid-cols-3 gap-x-8 w-full h-full">
                    <div className="place-self-center text-center">
                      <div className="text-3xl leading-none tracking-tight">
                        {currentTab.stats.sessions}
                      </div>
                      <div className="mt-1 text-sm">Sessions</div>
                    </div>
                    <div className="place-self-center text-center">
                      <div className="text-3xl leading-none tracking-tight">
                        {currentTab.stats.attendees}
                      </div>
                      <div className="mt-1 text-sm">Attendees</div>
                    </div>
                    <div className="place-self-center text-center">
                      <div className="text-3xl leading-none tracking-tight">
                        {currentTab.stats.duration}
                      </div>
                      <div className="mt-1 text-sm">Duration</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* タイムラインエントリー */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentTab.entries.map((item, idx) => (
                  <motion.article
                    key={`${activeTab}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-3xl p-6 transition-transform duration-300 group-hover:-translate-y-1">
                      {/* アクセントライン */}
                      <span
                        className="absolute left-0 top-5 bottom-5 w-[6px] rounded-full transition-colors duration-300"
                        style={{ backgroundColor: `var(--${item.pointColor})` }}
                      />

                      <div className="pl-7 md:pl-8 md:p-6">
                        {/* ヘッダー */}
                        <header className="grid grid-cols-2 items-center mb-3">
                          <div className="flex items-center text-sm text-[var(--muted_white)]">
                            <Clock className="h-3.5 w-3.5 mr-2" />
                            {item.startTime} – {item.endTime}
                          </div>
                          <div className="text-right">
                            <span
                              className="inline-block px-2 py-1 text-xs rounded-lg text-[var(--eeire_black)]"
                              style={{ backgroundColor: `var(--${item.pointColor})` }}
                            >
                              {item.labels[0]}
                            </span>
                          </div>
                        </header>

                        {/* タイトル */}
                        <h3 className="mb-2 text-lg md:text-xl tracking-tight text-[var(--ghost_white)]">
                          {item.title}
                        </h3>

                        {/* 説明文 */}
                        <p className="hidden md:block text-sm leading-relaxed text-[var(--ghost_white)]/50 mb-4">
                          {item.description}
                        </p>

                        {/* フッター */}
                        <footer className="grid grid-cols-2 items-center">
                          <div className="text-xs text-[var(--muted_white)]">
                            {item.attendees && (
                              <span className="inline-flex items-center mr-3">
                                <Users className="h-3.5 w-3.5 mr-1.5" />
                                {item.attendees} attendees
                              </span>
                            )}
                            {item.location && (
                              <span className="hidden md:inline">
                                {item.location}
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg transition-colors duration-200 text-[var(--ghost_white)]"
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </footer>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export function TimelineDemo() {
  return <Timeline />;
}
