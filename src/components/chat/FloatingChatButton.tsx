"use client";

import { useEffect, useState } from "react";
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
function detectLocale(): string {
  if (typeof window === "undefined") return LABEL_FALLBACK_LOCALE;
  const seg = window.location.pathname.split("/")[1] ?? "";
  return seg in chatLabelByLocale ? seg : LABEL_FALLBACK_LOCALE;
}

export default function FloatingChatButton({
  isOpen,
  onClick,
}: FloatingChatButtonProps) {
  const [locale, setLocale] = useState(LABEL_FALLBACK_LOCALE);
  const [labelVisible, setLabelVisible] = useState(false);

  // クライアント側でロケールを検出 & パス変更時にも追従
  useEffect(() => {
    const update = () => setLocale(detectLocale());
    update();

    // Next.js client navigation で popstate が発火する
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  // 初回表示時に軽くフェードインする演出
  useEffect(() => {
    const id = setTimeout(() => setLabelVisible(true), 400);
    return () => clearTimeout(id);
  }, []);

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
        gap: "10px",
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
          padding: "6px 14px",
          borderRadius: "20px",
          background: "#FFFFFF",
          border: "1px solid #e8e3dd",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          color: "#3a3a3a",
          fontSize: "13px",
          fontWeight: 400,
          letterSpacing: "0.02em",
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
