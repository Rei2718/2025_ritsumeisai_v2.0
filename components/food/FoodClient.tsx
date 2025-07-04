"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { createClient } from "@/supabase/client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Database } from '@/database.types';
import { cn } from "@/lib/utils";
import { CarouselPlugin } from "./Foodcarousel";

type Vendor = Database["public"]["Tables"]["food_vendors"]["Row"];
type VendorWithItems = Database["public"]["Views"]["vendor_with_items"]["Row"];

interface FoodClientProps {
  vendors: Vendor[];
}

export default function FoodClient({ vendors }: FoodClientProps) {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [vendorItems, setVendorItems] = useState<VendorWithItems[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // 店舗選択時に商品を取得
  useEffect(() => {
    if (!selectedVendor) {
      setVendorItems([]);
      return;
    }

    const fetchItems = async () => {
      setLoadingItems(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("vendor_with_items")
        .select("*")
        .eq("vendor_id", selectedVendor.id)
        .order("item_display_order", { ascending: true });

      if (!error && data) {
        setVendorItems(data);
      }
      setLoadingItems(false);
    };

    fetchItems();
  }, [selectedVendor]);

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;

  // 店舗ごとのアイテムをグループ化
  const uniqueItems = useMemo(() => {
    const itemMap = new Map();
    vendorItems.forEach(item => {
      if (item.item_id && !itemMap.has(item.item_id)) {
        itemMap.set(item.item_id, item);
      }
    });
    return Array.from(itemMap.values());
  }, [vendorItems]);

  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
    >
        {/* ヘッダー */}
        <AuroraBackground className="pb-20">
            <section className="w-full min-h-40">
                <div className="max-w-max mx-auto px-4 md:px-6 lg:px-8 overflow-x-auto">
                    {/* タイトルセクション */}
                    <motion.div
                        className="py-12 md:py-18 lg:py-24 text-left min-w-[400px]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    >
                        <span className="text-sm tracking-widest block mb-2" style={{ color: 'var(--text-tertiary)' }}>
                            RITSUMEISAI 2025
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
                            フード
                        </h1>
                    </motion.div>
                </div>
                <CarouselPlugin />
            </section>
        </AuroraBackground>

      {/* メインコンテンツ */}
      <main className="w-full -translate-y-20">
        <motion.div
          className="rounded-t-[2rem]"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.18, delay: 0.12, ease: "easeOut" },
          }}
        >
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
            {/* 店舗グリッド */}
            {vendors.length > 0 ? (
              <motion.div
                key="vendor-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {vendors.map((vendor, idx) => (
                  <motion.article
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.18,
                        delay: idx * 0.03,
                        ease: [0.22, 0.61, 0.36, 1],
                      },
                    }}
                    className="relative"
                  >
                    <motion.div
                      className="relative rounded-2xl pr-4 pl-8 cursor-pointer group"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedVendor(vendor)}
                    >
                      {/* 左側のバー（タイムラインスタイル） */}
                      <span 
                        className="absolute left-0 w-[6px] top-1 bottom-1 rounded-full" 
                        style={{ backgroundColor: 'var(--point_3)' }}
                        aria-hidden="true" 
                      />

                      <div className="py-4">
                        {/* タイトル */}
                        <h3 className="font-semibold truncate mb-1" style={{ color: 'var(--text-primary)' }}>
                          {vendor.vendor_name}
                        </h3>
                        
                        {/* 説明文 - 最大幅使用 */}
                        {vendor.description && (
                          <p className="text-sm mb-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {vendor.description}
                          </p>
                        )}
                        
                        {/* ブース番号とアイコンを横並び */}
                        <div className="grid grid-cols-[1fr_auto] gap-4 items-end">
                          {vendor.booth_number && (
                            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                              {vendor.booth_number}
                            </p>
                          )}
                          
                          {/* 矢印アイコン */}
                          <motion.div 
                            className="p-2 rounded-lg"
                            style={{ 
                              backgroundColor: 'var(--surface-hover)',
                              color: 'var(--text-primary)'
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p style={{ color: 'var(--text-tertiary)' }}>
                  該当する店舗が見つかりませんでした
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* 店舗詳細Drawer */}
      <Drawer open={!!selectedVendor} onOpenChange={(open) => !open && setSelectedVendor(null)}>
        <DrawerContent 
          className={cn(
            "max-h-[90svh] overflow-hidden",
            selectedVendor?.main_image_url && "[&>div:first-child]:bg-white/80"
          )}
          style={{ 
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          {/* 背景画像（ヘッダー部分のみ） */}
          {selectedVendor?.main_image_url && (
            <div className="absolute inset-x-0 top-0 h-[280px] overflow-hidden rounded-t-[2rem]">
              <Image
                src={selectedVendor.main_image_url}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              {/* グラデーションオーバーレイ */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))'
                }}
              />
            </div>
          )}
          
          <DrawerHeader className="text-left p-0 flex-shrink-0 relative h-[280px] flex flex-col justify-end px-4 md:px-6 lg:px-8">
            {/* コンテンツ */}
            <div className="relative z-10 mb-4 md:mb-6 lg:mb-8">
              <DrawerTitle 
                className={cn(
                  "text-2xl md:text-3xl text-left",
                  selectedVendor?.main_image_url && "drop-shadow-lg"
                )}
                style={{
                  color: selectedVendor?.main_image_url 
                    ? 'var(--ghost_white)' 
                    : 'var(--text-primary)'
                }}
              >
                {selectedVendor?.vendor_name}
              </DrawerTitle>
              <DrawerDescription 
                className={cn(
                  "text-left mt-1",
                  selectedVendor?.main_image_url && "drop-shadow-md"
                )}
                style={{
                  color: selectedVendor?.main_image_url 
                    ? 'var(--alice_blue)' 
                    : 'var(--text-secondary)'
                }}
              >
                {selectedVendor?.description}
              </DrawerDescription>
            </div>
          </DrawerHeader>

          {/* スクロール可能なコンテンツエリア */}
          <div 
            className="flex-grow overflow-y-auto px-4 md:px-6 lg:px-8"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            {/* 店舗情報 */}
            {selectedVendor && selectedVendor.location && (
              <div className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedVendor.location}</span>
                </div>
              </div>
            )}

            {/* メニュー */}
            <h3 className="text-lg font-semibold mb-4 text-left" style={{ color: 'var(--text-primary)' }}>
              メニュー
            </h3>

            {loadingItems ? (
              <div className="text-center py-8">
                <div 
                  className="inline-block animate-spin rounded-full h-8 w-8 border-b-2"
                  style={{ borderColor: 'var(--brand-primary)' }}
                ></div>
              </div>
            ) : uniqueItems.length > 0 ? (
              <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {uniqueItems.map((item) => (
                  <div
                    key={item.item_id}
                    className="grid grid-cols-[1fr_auto] gap-4 py-3 items-center"
                  >
                    <span className="text-left" style={{ color: 'var(--text-primary)' }}>
                      {item.item_name}
                    </span>
                    <span className="font-semibold text-right" style={{ color: 'var(--brand-primary)' }}>
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>
                メニュー情報がありません
              </p>
            )}
          </div>

          <DrawerFooter className="px-6 pb-6 flex-shrink-0">
            <DrawerClose asChild>
              <button 
                className="w-full py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-primary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
                }}
              >
                閉じる
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
}