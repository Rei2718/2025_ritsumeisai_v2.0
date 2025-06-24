export default function HomeScreen() {
  return (
    // ページ全体を縦方向のフレックスコンテナとし、スクロール可能にする
    <main className="flex flex-col items-center w-full text-secondary bg-background">

      {/* ===== ファーストビュー ===== */}
      <section className="relative flex flex-col items-center w-full h-svh text-center">
        {/* メインコンテンツ */}
        <div className="relative flex flex-col items-center justify-center flex-grow z-10">
          {/* 日付 */}
          <p className="mt-4 mb-1 text-lg md:text-2xl lg:text-3xl">
            2025.7.5 (Sat) - 2025.7.6 (Sun)
          </p>

          {/* サブタイトル */}
          <p className="text-base lg:text-lg">~ TEST TITLE ~</p>
        </div>


      </section>
    </main>
  );
}