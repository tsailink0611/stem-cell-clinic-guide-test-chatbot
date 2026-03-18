"use client";

import { CHAT_COLORS, BUBBLE_SIZE, CHAT_Z_INDEX } from "./constants";

interface FloatingChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function FloatingChatButton({ isOpen, onClick }: FloatingChatButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "チャットを閉じる" : "チャットを開く"}
      aria-expanded={isOpen}
      aria-controls="chat-panel"
      className="chat-bubble-btn"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
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
        zIndex: CHAT_Z_INDEX,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        padding: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.06)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 28px ${CHAT_COLORS.goldGlow}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.18)";
      }}
    >
      {isOpen ? (
        /* 閉じるアイコン（×） */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      ) : (
        /* チャットアイコン */
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )}
    </button>
  );
}
