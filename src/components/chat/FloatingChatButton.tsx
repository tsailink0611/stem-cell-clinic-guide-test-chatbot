"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CHAT_COLORS,
  BUBBLE_SIZE,
  CHAT_Z_INDEX,
  chatLabelByLocale,
  LABEL_FALLBACK_LOCALE,
} from "./constants";

interface FloatingChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * URLパスから現在のロケールを検出する
 * 例: /en/menu → "en", /zh → "zh", / → fallback
 */
function detectLocaleFromPath(pathname: string): string {
  const seg = pathname.split("/")[1] ?? "";
  return seg in chatLabelByLocale ? seg : LABEL_FALLBACK_LOCALE;
}

export default function FloatingChatButton({
  isOpen,
  onClick,
}: FloatingChatButtonProps) {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);

  const [labelVisible, setLabelVisible] = useState(false);

  // パス変更のたびにラベルをフェードイン演出
  useEffect(() => {
    setLabelVisible(false);
    const id = setTimeout(() => setLabelVisible(true), 300);
    return () => clearTimeout(id);
  }, [locale]);

  const label = chatLabelByLocale[locale] ?? chatLabelByLocale[LABEL_FALLBACK_LOCALE];

  return (
    <div
      className="chat-bubble-btn"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: CHAT_Z_INDEX,
        pointerEvents: "none",
      }}
    >
      {/* ── 吹き出し型ピルラベル ── */}
      <span
        className="chat-pill-label"
        style={{
          pointerEvents: "auto",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          padding: "10px 20px",
          borderRadius: "24px",
          background: CHAT_COLORS.bubbleBg,
          border: `1px solid ${CHAT_COLORS.gold}`,
          boxShadow: `0 4px 16px rgba(0,0,0,0.15), 0 0 0 1px ${CHAT_COLORS.goldGlow}`,
          color: "#F7F5F2",
          fontSize: "14px",
          fontWeight: 400,
          letterSpacing: "0.04em",
          lineHeight: 1.4,
          opacity: !isOpen && labelVisible ? 1 : 0,
          transform: !isOpen && labelVisible ? "translateX(0)" : "translateX(8px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          userSelect: "none",
        }}
        onClick={onClick}
        aria-hidden={isOpen}
      >
        {label}
      </span>

      {/* ── チャットアイコンボタン ── */}
      <button
        onClick={onClick}
        aria-label={isOpen ? "チャットを閉じる" : "チャットを開く"}
        aria-expanded={isOpen}
        aria-controls="chat-panel"
        style={{
          pointerEvents: "auto",
          flexShrink: 0,
          width: `${BUBBLE_SIZE}px`,
          height: `${BUBBLE_SIZE}px`,
          borderRadius: "50%",
          background: CHAT_COLORS.bubbleBg,
          border: `1.5px solid ${CHAT_COLORS.gold}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          padding: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.06)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            `0 6px 28px ${CHAT_COLORS.goldGlow}`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 4px 20px rgba(0,0,0,0.18)";
        }}
      >
        {isOpen ? (
          /* 閉じるアイコン（×） */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          /* チャットアイコン */
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
