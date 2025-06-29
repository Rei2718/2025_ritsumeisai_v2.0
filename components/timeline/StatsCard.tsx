"use client"

import React from "react";
import { motion } from "motion/react";
import { tapSpring } from "@/components/timeline/constants";

interface StatsCardProps {
  label: string;
  value: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value }) => (
  <motion.div 
    initial={{ scale: 1 }} 
    whileHover={{ scale: 1.02, transition: tapSpring }} 
    className="flex flex-col items-center"
  >
    <p className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{value}</p>
    <p className="text-xs md:text-sm text-[var(--text-secondary)]">{label}</p>
  </motion.div>
);