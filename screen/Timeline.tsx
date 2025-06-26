"use client";

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
    <div className="font-sans bg-[var(--alice_blue)] min-h-screen">
      {/* Gold header section with title and tabs */}
      <section className="w-full bg-[var(--ghost_white)] rounded-b-[28px]">
        <div className="mx-auto w-11/12 max-w-6xl">
          {/* Header */}
          <header className="py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl text-center text-[var(--eeire_black)]">
                Event Schedule
              </h2>
            </motion.div>
          </header>

          {/* Tab Icons - using text-align and inline-block instead of flex */}
          <motion.div 
            className="text-center pb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {data.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="inline-block px-4 mx-2 rounded-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon
                    className={`h-6 w-6 transition-colors duration-300 ${
                      isActive ? "text-[var(--vanila)] animate-bounce" : "text-[var(--eeire_black)]"
                    }`}
                  />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Stats Card positioned to overlap */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="absolute left-1/2 -top-14 -translate-x-1/2 w-full max-w-[640px] z-10"
                style={{ transform: "translateX(-50%) translateY(50%)" }}
              >
                <div className="rounded-[28px] bg-[var(--honeydew)] h-28">
                  {/* Using CSS Grid instead of flex for 3-column layout */}
                  <div className="grid grid-cols-3 h-full w-full max-w-[560px] mx-auto px-6">
                    <div className="text-center place-self-center border-r border-[var(--muted)]">
                      <div className="text-3xl font-light leading-none tracking-tight text-[var(--ghost_white)]">
                        {currentTab.stats.sessions}
                      </div>
                      <div className="mt-1 text-sm text-[var(--vanila)]">
                        Sessions
                      </div>
                    </div>
                    <div className="text-center place-self-center border-r border-[var(--muted)]">
                      <div className="text-3xl font-light leading-none tracking-tight text-[var(--ghost_white)]">
                        {currentTab.stats.attendees}
                      </div>
                      <div className="mt-1 text-sm text-[var(--vanila)]">
                        Attendees
                      </div>
                    </div>
                    <div className="text-center place-self-center">
                      <div className="text-3xl font-light leading-none tracking-tight text-[var(--ghost_white)]">
                        {currentTab.stats.duration}
                      </div>
                      <div className="mt-1 text-sm text-[var(--vanila)]">
                        Duration
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Timeline wrapper (black with rounded bottom) */}
      <main className="w-full bg-[var(--alice_blue)] rounded-b-[32px] pb-20">
        <div className="relative mx-auto w-11/12 max-w-4xl">
          {/* Timeline list with extra top padding for overlapping stats card */}
          <div className="pt-20 space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentTab.entries.map((item, idx) => {
                  return (
                    <motion.article
                      key={`${activeTab}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="relative group mb-3"
                    >
                      <div className="relative overflow-hidden transition-all duration-300 bg-[var(--honeydew)] rounded-[20px] hover:-translate-y-1">
                        {/* Accent line - Point Color */}
                        <span
                          className="absolute left-0 top-5 bottom-5 w-1.5 rounded-full transition-all duration-300 group-hover:w-2"
                          style={{ alice_blueColor: `var(--${item.pointColor})` }}
                        />

                        <div className="p-5 pl-7 md:p-6 md:pl-8">
                          {/* Header using CSS Grid instead of flex */}
                          <header className="mb-3 grid grid-cols-2 items-center">
                            <div className="text-sm text-[var(--vanila)]/60">
                              <Clock className="inline-block h-3.5 w-3.5 mr-2 align-text-bottom" />
                              {item.startTime} – {item.endTime}
                            </div>
                            <div className="text-right">
                              <span
                                className="px-3 py-1 text-xs rounded-[8px] text-[var(--honeydew)]"
                                style={{ alice_blueColor: `var(--${item.pointColor})` }}
                              >
                                {item.labels[0]}
                              </span>
                            </div>
                          </header>

                          <h3 className="mb-2 text-lg md:text-xl tracking-tight text-[var(--vanila)]">
                            {item.title}
                          </h3>

                          <p className="hidden md:block text-sm leading-relaxed text-[var(--vanila)]/60 mb-4">
                            {item.description}
                          </p>

                          {/* Footer using CSS Grid instead of flex */}
                          <footer className="grid grid-cols-2 items-center">
                            <div className="text-xs text-[var(--vanila)]/60">
                              {item.attendees && (
                                <span className="inline-block mr-3">
                                  <Users className="inline-block h-3.5 w-3.5 mr-1.5 align-text-bottom" />
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
                                className="p-2 rounded-lg bg-[var(--honeydew)] hover:bg-[var(--vanila)]/10 transition-colors duration-200"
                                style={{ color: `var(--${item.pointColor})` }}
                              >
                                <ArrowUpRight className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </footer>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

/* Demo wrapper */
export function TimelineDemo() {
  return <Timeline />;
}