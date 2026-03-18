// src/components/chat/ChatPanel.tsx
"use client";

import { useEffect, useRef } from "react";
import { CHAT_COLORS, CHAT_Z_INDEX } from "./constants";
import DifyIframe from "./DifyIframe";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Escキーで閉じる */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /* パネル外クリックで閉じる */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      /* 少し遅延させてバブルクリックと衝突しないようにする */
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  return (
    <div
      id="chat-panel"
      role="dialog"
      aria-label="チャットパネル"
      aria-hidden={!isOpen}
      ref={panelRef}
      style={{
        position: "fixed",
        bottom: "96px",
        right: "24px",
        width: "400px",
        height: "75vh",
        maxHeight: "680px",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        border: `1px solid rgba(184,154,106,0.3)`,
        display: "flex",
        flexDirection: "column",
        background: CHAT_COLORS.panelSurface,
        zIndex: CHAT_Z_INDEX - 1,
        /* 開閉アニメーション */
        transform: isOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
        transition: isOpen
          ? "transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.22s ease"
          : "transform 0.2s ease, opacity 0.2s ease",
      }}
    >
      {/* ヘッダー */}
      <div
        style={{
          background: CHAT_COLORS.bubbleBg,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <p style={{
            color: CHAT_COLORS.headerText,
            fontSize: "13px",
            fontWeight: 400,
            letterSpacing: "0.1em",
            margin: 0,
          }}>
            受付・案内サポート
          </p>
          <p style={{
            color: CHAT_COLORS.gold,
            fontSize: "10px",
            letterSpacing: "0.08em",
            marginTop: "2px",
            marginBottom: 0,
          }}>
            Stem Cell Clinic Tokyo
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="チャットを閉じる"
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            border: `1px solid ${CHAT_COLORS.gold}`,
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke={CHAT_COLORS.gold} strokeWidth="2.5" strokeLinecap="round"
            aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Dify iframe */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <DifyIframe />
      </div>
    </div>
  );
}
