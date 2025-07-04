"use client"

import { useRef, useCallback, useMemo } from "react"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "motion/react"
import { Utensils, Coffee, Pizza, Flame } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

interface FoodItem {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
}

export function CarouselPlugin() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  // フード関連のデモコンテンツ
  const foodItems: FoodItem[] = useMemo(() => [
    {
      id: 1,
      title: "人気メニュー",
      description: "売れ筋ランキングTOP3",
      icon: <Flame className="w-full h-full" />,
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      id: 2,
      title: "新メニュー",
      description: "今年初登場の限定品",
      icon: <Utensils className="w-full h-full" />,
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      id: 3,
      title: "スイーツ",
      description: "甘いもの好き必見",
      icon: <Coffee className="w-full h-full" />,
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      id: 4,
      title: "ピザ",
      description: "手軽に楽しめる一品",
      icon: <Pizza className="w-full h-full" />,
      gradient: "from-green-500/20 to-emerald-500/20"
    },
  ], [])

  const handleMouseEnter = useCallback(() => {
    plugin.current?.stop()
  }, [])

  const handleMouseLeave = useCallback(() => {
    plugin.current?.reset()
  }, [])

  return (
    <motion.div 
      className="mb-4 md:mb-6 lg:mb-8 overflow-hidden min-w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.3, delay: 0.2 }
      }}
    >
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        opts={{
          align: "center",
          loop: true,
          containScroll: "trimSnaps"
        }}
      >
        <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
          {foodItems.map((item) => (
            <CarouselItem key={item.id} className="pl-4 sm:pl-6 md:pl-8 basis-[75%] min-[480px]:basis-[60%] sm:basis-1/2 lg:basis-1/3">
              <motion.div
                className="relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`
                  relative rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5
                  bg-gradient-to-br ${item.gradient}
                  border border-white/10
                  backdrop-blur-sm
                  group cursor-pointer
                  h-full min-h-[100px]
                `}>
                  {/* アイコン */}
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 text-white/80 group-hover:text-white transition-colors">
                      <div className="w-4 h-4 sm:w-5 sm:h-5">
                        {item.icon}
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
                      おすすめ
                    </span>
                  </div>
                  
                  {/* テキスト */}
                  <h3 className="font-semibold text-white/90 mb-0.5 sm:mb-1 text-sm sm:text-base leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/60 line-clamp-1">
                    {item.description}
                  </p>

                  {/* ホバーエフェクト */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </motion.div>
  )
}