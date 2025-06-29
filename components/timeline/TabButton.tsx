"use client"

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { TabDataTypes } from "@/components/timeline/types";
import { tapSpring, profileImages } from "@/components/timeline/constants";

interface TabButtonProps {
  tab: TabDataTypes;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export const TabButton: React.FC<TabButtonProps> = ({ tab, isActive, onClick, index }) => (
  <motion.button
    role="tab"
    aria-selected={isActive}
    aria-controls={`panel-${tab.id}`}
    id={`tab-${tab.id}`}
    onClick={onClick}
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.05, transition: tapSpring }}
    whileTap={{ scale: 0.95, transition: tapSpring }}
    className={`snap-center flex-shrink-0 flex items-center space-x-2 p-3 rounded-full backdrop-blur-sm transition mx-1.5 first:ml-0 last:mr-0 bg-[var(--surface-secondary)] ${
      isActive ? "text-[var(--brand-primary)]" : "text-[var(--text-primary)]"
    }`}
  >
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05, transition: tapSpring }}
      whileTap={{ scale: 0.95, transition: tapSpring }}
      className="w-8 h-8 rounded-full overflow-hidden"
    >
      <Image
        src={profileImages[index % 4]}
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