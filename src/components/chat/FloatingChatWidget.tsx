"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import FloatingChatButton from "./FloatingChatButton";
import ChatPanel from "./ChatPanel";
import { chatLabelByLocale, LABEL_FALLBACK_LOCALE } from "./constants";

/**
 * URLパスから現在のロケールを検出する
 * 例: /en/menu → "en", /zh → "zh", / → fallback
 */
function detectLocaleFromPath(pathname: string): string {
  const seg = pathname.split("/")[1] ?? "";
  return seg in chatLabelByLocale ? seg : LABEL_FALLBACK_LOCALE;
}

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <FloatingChatButton isOpen={isOpen} onClick={handleToggle} locale={locale} />
      <ChatPanel isOpen={isOpen} onClose={handleClose} locale={locale} />
    </>
  );
}
