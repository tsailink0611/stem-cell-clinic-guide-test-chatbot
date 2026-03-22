"use client";

import { useState } from "react";
import { difyConfig } from "@/lib/dify-config";
import { CHAT_COLORS, chatLoadingByLocale, LABEL_FALLBACK_LOCALE } from "./constants";

/* Dify iframe 内の非表示にしたい要素の高さ（px）
 * DIFY_HEADER_H: 青いボット名ヘッダー
 * DIFY_FOOTER_H: "Powered by Dify" フッター
 * クロスオリジン制限のため JS で操作不可 → CSS クリップで対応
 * Dify の UI 変更時はこの値を調整すること
 */
const DIFY_HEADER_H = 68;
const DIFY_FOOTER_H = 48;

/* ロボットアイコン隠蔽オーバーレイの設定
 * ICON_OVERLAY_W: アイコンが表示される左ガター幅（px）
 * ICON_OVERLAY_BOTTOM: 入力欄にかからないよう下端から除外する高さ（px）
 * Dify の UI 変更時はこの値を調整すること
 */
const ICON_OVERLAY_W = 52;
const ICON_OVERLAY_BOTTOM = 64;

interface DifyIframeProps {
  locale: string;
}

export default function DifyIframe({ locale }: DifyIframeProps) {
  const src = `${difyConfig.baseUrl}/chatbot/${difyConfig.token}`;
  const [loaded, setLoaded] = useState(false);

  const loadingText =
    chatLoadingByLocale[locale as keyof typeof chatLoadingByLocale] ??
    chatLoadingByLocale[LABEL_FALLBACK_LOCALE];

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
            {loadingText}
          </p>
        </div>
      )}

      {/* ロボットアイコン隠蔽オーバーレイ
          左ガター部分のみ白で覆う。pointer-events:none でクリック・スクロールは通過する。
          Dify の UI 変更でアイコン位置がずれた場合は ICON_OVERLAY_W / ICON_OVERLAY_BOTTOM を調整 */}
      {loaded && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: `${ICON_OVERLAY_BOTTOM}px`,
            width: `${ICON_OVERLAY_W}px`,
            background: "#ffffff",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
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
