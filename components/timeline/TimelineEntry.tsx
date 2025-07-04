"use client"

import React from "react";
import { motion } from "motion/react";
import { Clock, ArrowUpRight } from "lucide-react";
import { Database } from '@/database.types';
import { cn } from "@/lib/utils";

type EventView = Database["public"]["Views"]["show_arena_events"]["Row"];

interface TimelineEntryProps {
  item: EventView;
  onClick?: (item: EventView) => void;
  isActive?: boolean;
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({ item, onClick, isActive = false }) => {
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
          className={cn(
            "relative rounded-2xl pr-4 pl-8 cursor-pointer group transition-all duration-200",
            isActive && "slow-pulse"
          )}
          style={{ 
            backgroundColor: isActive ? 'rgba(255, 235, 59, 0.2)' : 'var(--bg-secondary)',
            borderColor: isActive ? 'rgba(255, 235, 59, 0.4)' : 'transparent',
          }}
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
            className="flex justify-between items-center mb-3 text-base" 
            style={{ color: 'var(--text-secondary)' }}
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
                className="inline-block px-3 py-1.5 text-base font-medium rounded-lg" 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1, transition: { delay: 0.2, duration: 0.3 } }} 
                exit={{ scale: 0.8, transition: { duration: 0.3 } }} 
                style={{ 
                  backgroundColor: `var(--${pointColor})`, 
                  color: `var(--bg-primary)` 
                }}
              >
                {item.status}
              </motion.span>
            )}
          </motion.header>

          <div className="grid grid-cols-[1fr_auto] gap-4 items-end">
            <div>
              <motion.h3 
                className="mb-3 text-lg md:text-xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }} 
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                {item.event_name}
              </motion.h3>

              {item.description && (
                <motion.p 
                  className="mb-4 text-base leading-relaxed line-clamp-2"
                  style={{ color: 'var(--text-tertiary)' }}
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.3 } }} 
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                  {item.description}
                </motion.p>
              )}
            </div>

            {/* 矢印アイコン */}
            <motion.div 
              className="p-2.5 rounded-lg mb-4"
              style={{ 
                backgroundColor: 'var(--surface-hover)',
                color: 'var(--text-primary)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.5, duration: 0.3 }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};