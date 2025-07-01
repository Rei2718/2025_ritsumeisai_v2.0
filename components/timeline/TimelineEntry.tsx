"use client"

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";
import { TabDataTypes } from "@/components/timeline/types";
import { tapSpring } from "@/components/timeline/constants";

interface TimelineEntryProps {
  item: TabDataTypes['entries'][0];
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({ item }) => (
  <motion.article 
    className="relative" 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} 
    exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
  >
    <div className="pb-3">
      <motion.div
        className="relative bg-[var(--bg-secondary)] rounded-2xl pr-4 pl-8" 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.4 } }} 
        exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.4 } }}
      >
        <span 
          className="absolute left-0 w-[6px] top-1 bottom-1 rounded-full" 
          style={{ backgroundColor: `var(--${item.pointColor})` }} 
          aria-hidden="true" 
        />

        <motion.header 
          className="flex justify-between items-center mb-2 text-[var(--text-secondary)] text-sm" 
          initial={{ opacity: 0, y: -5 }} 
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3 } }} 
          exit={{ opacity: 0, y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex items-center gap-2" 
              initial={{ x: -10 }} 
              animate={{ x: 0, transition: { delay: 0.1, duration: 0.3 } }} 
              exit={{ x: -10, transition: { duration: 0.3 } }}
            >
              <Clock className="w-4 h-4" aria-hidden="true" />
              <time dateTime={`${new Date().getFullYear()}-${item.date.replace('/', '-')}T${item.startTime}`}>
                {item.startTime} – {item.endTime}
              </time>
            </motion.div>
          </div>
          <motion.span 
            className="inline-block px-2 py-1 text-xs font-medium rounded-lg" 
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1, transition: { delay: 0.2, duration: 0.3 } }} 
            exit={{ scale: 0.8, transition: { duration: 0.3 } }} 
            style={{ 
              backgroundColor: `var(--${item.pointColor})`, 
              color: `var(--text-primary)` 
            }}
          >
            {item.classroom || item.labels[0]}
          </motion.span>
        </motion.header>

        <motion.h3 
          className="mb-2 text-lg md:text-xl font-semibold text-[var(--text-primary)]" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }} 
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {item.title}
        </motion.h3>

        <motion.p 
          className="mb-4 text-sm leading-relaxed text-[var(--text-tertiary)]" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.3 } }} 
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {item.description}
        </motion.p>

        <motion.footer 
          className="flex justify-between items-center" 
          initial={{ opacity: 0, y: 5 }} 
          animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.3 } }} 
          exit={{ opacity: 0, y: 5, transition: { duration: 0.3 } }}
        >
          {item.location && (
            <motion.div 
              className="flex items-center text-xs text-[var(--text-secondary)] gap-1" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.3 } }} 
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{item.location}</span>
            </motion.div>
          )}
          <motion.button 
            className="p-2 rounded-lg bg-[var(--surface-hover)] text-[var(--text-primary)]" 
            aria-label={`View details for ${item.title}`} 
            initial={{ scale: 1 }} 
            whileHover={{ scale: 1.1, transition: tapSpring }} 
            whileTap={{ scale: 0.95, transition: tapSpring }}
          >
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        </motion.footer>
      </motion.div>
    </div>
  </motion.article>
);