"use client";

import { useState } from "react";
import { difyConfig } from "@/lib/dify-config";
import { CHAT_COLORS } from "./constants";

/* Dify iframe 内の非表示にしたい要素の高さ（px）
 * DIFY_HEADER_H: 青いボット名ヘッダー
 * DIFY_FOOTER_H: "Powered by Dify" フッター
 * クロスオリジン制限のため JS で操作不可 → CSS クリップで対応
 */
const DIFY_HEADER_H = 58;
const DIFY_FOOTER_H = 48;

export default function DifyIframe() {
  const src = `${difyConfig.baseUrl}/chatbot/${difyConfig.token}`;
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* ローディング表示 */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: CHAT_COLORS.panelSurface,
            gap: "12px",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke={CHAT_COLORS.gold}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p style={{ fontSize: "12px", color: "#8a96a3", letterSpacing: "0.04em", margin: 0 }}>
            接続中...
          </p>
        </div>
      )}

      <iframe
        src={src}
        allow="microphone"
        title="Clinic Guide Assistant"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          /* Difyヘッダーとフッターの分だけ高さを増やし、上にずらしてクリップ */
          height: `calc(100% + ${DIFY_HEADER_H + DIFY_FOOTER_H}px)`,
          marginTop: `-${DIFY_HEADER_H}px`,
          border: "none",
          display: "block",
          opacity: loaded ? 1 : 0,
        }}
      />
    </div>
  );
}
