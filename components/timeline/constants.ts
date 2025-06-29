// アニメーション設定
export const tapSpring = { type: "spring" as const, stiffness: 400, damping: 30 };

// 日付オプション
export const dateOptions = ["7/5", "7/6"] as const;
export type DateOption = typeof dateOptions[number];

// プロフィール画像のパス
export const profileImages = ["/red.webp", "/blue.webp", "/yellow.webp", "/green.webp"];