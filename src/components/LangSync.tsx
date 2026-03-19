"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";

/**
 * URLパスからlocaleを検出し、document.documentElement.langを同期するクライアントコンポーネント。
 * Next.js App Routerではルートレイアウトのhtml langが静的固定になるため、
 * クライアントサイドでスクリーンリーダー向けに正しいlangを反映する。
 */
export default function LangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const seg = pathname.split("/")[1] ?? "";
    const lang = isValidLocale(seg) ? seg : "en";
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [pathname]);

  return null;
}
