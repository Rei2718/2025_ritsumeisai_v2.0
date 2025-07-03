"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-full flex-col items-center justify-center bg-zinc-950 text-slate-50",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#6366f1_10%,#8b5cf6_15%,#a855f7_20%,#ec4899_25%,#3b82f6_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--aurora-dark":
                "repeating-linear-gradient(100deg,#1e1b4b_0%,#1e1b4b_7%,transparent_10%,transparent_12%,#1e1b4b_16%)",

              "--indigo-500": "#6366f1",
              "--purple-500": "#8b5cf6",
              "--purple-600": "#a855f7",
              "--pink-500": "#ec4899",
              "--blue-500": "#3b82f6",
              "--indigo-950": "#1e1b4b",
              "--black": "#000",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--aurora-dark),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-60 blur-[10px] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--indigo-500)_10%,var(--purple-500)_15%,var(--purple-600)_20%,var(--pink-500)_25%,var(--blue-500)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--aurora-dark:repeating-linear-gradient(100deg,var(--indigo-950)_0%,var(--indigo-950)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--indigo-950)_16%)] after:absolute after:inset-0 after:[background-image:var(--aurora-dark),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-screen after:content-[""]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};