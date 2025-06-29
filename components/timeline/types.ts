import { LucideIcon } from "lucide-react";

export type PointColor = "point_1" | "point_2" | "point_3" | "point_4" | "point_5" | "point_6";

export interface TimelineDataTypes {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  labels: string[];
  location?: string;
  pointColor: PointColor;
  date: string;
  classroom?: string;
  pr?: string;
  poster?: string;
}

export interface TabDataTypes {
  id: string;
  title: string;
  icon: LucideIcon;
  stats: {
    sessions: string;
    attendees: string;
    duration: string;
  };
  entries: TimelineDataTypes[];
}