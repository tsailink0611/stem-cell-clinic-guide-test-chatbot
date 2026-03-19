"use client";

import { useEffect, useState } from "react";
import {
  CHAT_COLORS,
  BUBBLE_SIZE,
  CHAT_Z_INDEX,
  chatLabelByLocale,
  chatAriaByLocale,
  LABEL_FALLBACK_LOCALE,
} from "./constants";

interface FloatingChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  locale: string;
}

export default function FloatingChatButton({
  isOpen,
  onClick,
  locale,
}: FloatingChatButtonProps) {
  const [labelVisible, setLabelVisible] = useState(false);

  // ロケール変更 or チャットを閉じたタイミングでラベルをフェードイン
  useEffect(() => {
    if (isOpen) {
      setLabelVisible(false);
      return;
    }
    const id = setTimeout(() => setLabelVisible(true), 300);
    return () => clearTimeout(id);
  }, [locale, isOpen]);

  const label =
    chatLabelByLocale[locale as keyof typeof chatLabelByLocale] ??
    chatLabelByLocale[LABEL_FALLBACK_LOCALE];
  const aria =
    chatAriaByLocale[locale as keyof typeof chatAriaByLocale] ??
    chatAriaByLocale[LABEL_FALLBACK_LOCALE];

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

      {/* ── チャットアイコンボタン（ホバーはCSS .chat-bubble-icon で管理） ── */}
      <button
        onClick={onClick}
        aria-label={isOpen ? aria.close : aria.open}
        aria-expanded={isOpen}
        aria-controls="chat-panel"
        className="chat-bubble-icon"
        style={{
          pointerEvents: "auto",
          flexShrink: 0,
          width: `${BUBBLE_SIZE}px`,
          height: `${BUBBLE_SIZE}px`,
          borderRadius: "50%",
          background: CHAT_COLORS.bubbleBg,
          border: `1.5px solid ${CHAT_COLORS.gold}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
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
