"use client"

import React from "react";
import { motion } from "motion/react";
import { MapPin, Clock } from "lucide-react";
import { Database } from '@/database.types';

type EventView = Database["public"]["Views"]["show_arena_events"]["Row"];

interface TimelineEntryProps {
  item: EventView;
  onClick?: (item: EventView) => void;
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({ item, onClick }) => {
  // カラー番号を取得（c1 -> 1）
  const colorNum = parseInt(item.organizer_color?.replace("c", "") || "1");
  const pointColor = `point_${colorNum > 6 ? (colorNum % 6) + 1 : colorNum}`;
  
  return (
    <motion.article 
      className="relative" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0, transition: { duration: 0.1 } }} 
      exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
    >
      <div className="pb-3">
        <motion.div
          className="relative bg-[var(--bg-secondary)] rounded-2xl pr-4 pl-8 cursor-pointer group transition-all duration-200 hover:bg-[var(--surface-hover)]" 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.4 } }} 
          exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.4 } }}
          onClick={() => onClick?.(item)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span 
            className="absolute left-0 w-[6px] top-1 bottom-1 rounded-full" 
            style={{ backgroundColor: `var(--${pointColor})` }} 
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
                <time dateTime={`${new Date().getFullYear()}-${item.event_date?.replace('/', '-')}T${item.start_time}`}>
                  {item.start_time?.slice(0, 5)} - {item.end_time?.slice(0, 5)}
                </time>
              </motion.div>
            </div>
            {item.status && (
              <motion.span 
                className="inline-block px-2 py-1 text-xs font-medium rounded-lg" 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1, transition: { delay: 0.2, duration: 0.3 } }} 
                exit={{ scale: 0.8, transition: { duration: 0.3 } }} 
                style={{ 
                  backgroundColor: `var(--${pointColor})`, 
                  color: `var(--text-primary)` 
                }}
              >
                {item.status}
              </motion.span>
            )}
          </motion.header>

          <motion.h3 
            className="mb-2 text-lg md:text-xl font-semibold text-[var(--text-primary)]" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }} 
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {item.event_name}
          </motion.h3>

          {item.description && (
            <motion.p 
              className="mb-4 text-sm leading-relaxed text-[var(--text-tertiary)] line-clamp-2" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.3 } }} 
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {item.description}
            </motion.p>
          )}

          {item.venue_name && (
            <motion.footer 
              className="flex items-center text-xs text-[var(--text-secondary)] gap-1" 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.3 } }} 
              exit={{ opacity: 0, y: 5, transition: { duration: 0.3 } }}
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{item.venue_name}</span>
            </motion.footer>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
};