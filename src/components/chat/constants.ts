// src/components/chat/constants.ts
import type { Locale } from "@/lib/i18n";

/** チャットウィジェット専用カラートークン（モックアップ承認済み） */
export const CHAT_COLORS = {
  /** バブル・ヘッダー共通背景 */
  bubbleBg: '#2C2C2C',
  /** ゴールドリング・アクセント */
  gold: '#B89A6A',
  /** ゴールドホバー時グロー */
  goldGlow: 'rgba(184,154,106,0.25)',
  /** パネル本体背景 */
  panelSurface: '#F7F5F2',
  /** 境界線 */
  border: '#e8e3dd',
  /** ヘッダータイトル文字 */
  headerText: 'rgba(255,255,255,0.92)',
} as const;

/** チャットウィジェット z-index */
export const CHAT_Z_INDEX = 9999;

/** バブルボタンのサイズ(px) */
export const BUBBLE_SIZE = 60;

/**
 * バブルラベル文言（言語別）
 * 言語追加・文言変更はここだけで完結する
 */
export const chatLabelByLocale: Record<Locale, string> = {
  ja: 'ご不明な点がございましたらお気軽にどうぞ',
  zh: '如有任何疑问，欢迎随时咨询',
  en: "Questions? We're happy to help",
  mn: 'Асуулт байвал энд дарна уу',
};

/**
 * ARIAラベル（言語別）
 * スクリーンリーダー向けに各言語で正しいラベルを返す
 */
export const chatAriaByLocale: Record<Locale, {
  open: string;
  close: string;
  dialog: string;
  closePanel: string;
}> = {
  ja: { open: 'チャットを開く', close: 'チャットを閉じる', dialog: 'チャットパネル', closePanel: '閉じる' },
  en: { open: 'Open chat', close: 'Close chat', dialog: 'Chat panel', closePanel: 'Close' },
  zh: { open: '打开聊天', close: '关闭聊天', dialog: '聊天面板', closePanel: '关闭' },
  mn: { open: 'Чат нээх', close: 'Чат хаах', dialog: 'Чатын самбар', closePanel: 'Хаах' },
};

/**
 * パネルヘッダー文言（言語別）
 */
export const chatHeaderByLocale: Record<Locale, string> = {
  ja: '受付・案内サポート',
  en: 'Reception & Guide',
  zh: '接待与导引',
  mn: 'Хүлээн авалт',
};

/**
 * ローディングテキスト（言語別）
 */
export const chatLoadingByLocale: Record<Locale, string> = {
  ja: '接続中...',
  en: 'Connecting...',
  zh: '连接中...',
  mn: 'Холбогдож байна...',
};

/** ラベルが取得できない場合のフォールバック言語 */
export const LABEL_FALLBACK_LOCALE: Locale = 'en';
