"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { Store, Search, MapPin, ArrowUpRight } from "lucide-react";
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

type Vendor = Database["public"]["Tables"]["food_vendors"]["Row"];
type VendorWithItems = Database["public"]["Views"]["vendor_with_items"]["Row"];

interface FoodClientProps {
  vendors: Vendor[];
}

export default function FoodClient({ vendors }: FoodClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [vendorItems, setVendorItems] = useState<VendorWithItems[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // 検索フィルタリング
  const filteredVendors = useMemo(() => {
    if (!searchQuery) return vendors;
    
    const query = searchQuery.toLowerCase();
    return vendors.filter(v => 
      v.vendor_name?.toLowerCase().includes(query) ||
      v.description?.toLowerCase().includes(query)
    );
  }, [vendors, searchQuery]);

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
      className="min-h-screen bg-[var(--bg-secondary)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
    >
        {/* ヘッダー */}
        <AuroraBackground className="pb-20">
            <section className="w-full">
            <div className="max-w-max mr-auto px-4 md:px-6 lg:px-8">
                {/* タイトルセクション */}
                <motion.div
                    className="py-12 md:py-18 lg:py-24 text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.2, ease: "easeOut" },
                }}
                >
                    <span className="text-sm tracking-widest text-[var(--text-tertiary)] block mb-2">
                        RITSUMEISAI 2025
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                        フード
                    </h1>
                </motion.div>
            </div>
            </section>
        </AuroraBackground>

      {/* メインコンテンツ */}
      <main className="w-full -translate-y-20">
        <motion.div
          className="bg-[var(--bg-secondary)] rounded-t-[2rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.18, delay: 0.12, ease: "easeOut" },
          }}
        >
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
            {/* 検索バー */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.15, delay: 0.1, ease: "easeOut" },
              }}
              className="mb-8 md:mb-12 lg:mb-16 relative mx-2 md:mx-3 lg:mx-4"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[var(--surface-secondary)] rounded-xl outline-none"
              />
            </motion.div>

            {/* 店舗グリッド */}
            {filteredVendors.length > 0 ? (
              <motion.div
                key="vendor-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 gap-3 mb-20"
              >
                {filteredVendors.map((vendor, idx) => (
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-[var(--bg-tertiary)] rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedVendor(vendor)}
                  >
                    <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 items-center">
                      {/* 左側の画像 */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[var(--surface-secondary)]">
                        {vendor.main_image_url ? (
                          <Image
                            src={vendor.main_image_url}
                            alt={vendor.vendor_name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full grid place-items-center">
                            <Store className="w-8 h-8 text-[var(--text-quaternary)]" />
                          </div>
                        )}
                      </div>

                      {/* 中央のテキスト情報 */}
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[var(--text-primary)] truncate mb-1">
                          {vendor.vendor_name}
                        </h3>
                        <div className="text-sm text-[var(--text-tertiary)] space-y-0.5">
                          {vendor.description && (
                            <p className="truncate">{vendor.description}</p>
                          )}
                          {vendor.location && (
                            <p className="truncate">{vendor.location}</p>
                          )}
                        </div>
                      </div>

                      {/* 右側の矢印アイコン */}
                      <motion.div 
                        className="p-2 rounded-lg bg-[var(--surface-hover)] text-[var(--text-primary)]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.div>
                    </div>

                    {/* ホバーエフェクト */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--brand-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-[var(--text-tertiary)]">
                  該当する店舗が見つかりませんでした
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* 店舗詳細Drawer */}
      <Drawer open={!!selectedVendor} onOpenChange={(open) => !open && setSelectedVendor(null)}>
        <DrawerContent className="max-h-[85vh] bg-[var(--bg-secondary)]">
          <DrawerHeader className="text-left p-0">
            <div className="px-6 pt-6 pb-4">
              <DrawerTitle className="text-2xl md:text-3xl text-[var(--text-primary)] text-left">
                {selectedVendor?.vendor_name}
              </DrawerTitle>
              <DrawerDescription className="text-[var(--text-secondary)] text-left mt-1">
                {selectedVendor?.description}
              </DrawerDescription>
            </div>
            <div className="px-6 pb-4 overflow-y-auto">
                {/* 店舗情報 */}
                {selectedVendor && selectedVendor.location && (
                <div className="mb-6 text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedVendor.location}</span>
                    </div>
                </div>
                )}

                {/* メニュー */}
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 text-left">
                メニュー
                </h3>
                
                {loadingItems ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--brand-primary)]"></div>
                </div>
                ) : uniqueItems.length > 0 ? (
                <div className="divide-y divide-[var(--border-subtle)]">
                    {uniqueItems.map((item) => (
                    <div
                        key={item.item_id}
                        className="grid grid-cols-[1fr_auto] gap-4 py-3 items-center"
                    >
                        <span className="text-[var(--text-primary)] text-left">{item.item_name}</span>
                        <span className="font-semibold text-[var(--brand-primary)] text-right">
                        {formatPrice(item.price)}
                        </span>
                    </div>
                    ))}
                </div>
                ) : (
                <p className="text-center text-[var(--text-tertiary)] py-8">
                    メニュー情報がありません
                </p>
                )}
            </div>
          </DrawerHeader>

          <DrawerFooter className="px-6 pb-6">
            <DrawerClose asChild>
              <button className="w-full py-2 bg-[var(--surface-secondary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                閉じる
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
}