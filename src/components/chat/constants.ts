// src/components/chat/constants.ts

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
 * チャットボタン横に表示する吹き出しラベル文言
 * - 言語追加・文言変更はここだけで完結する
 * - キーは i18n.ts の Locale と一致させること
 */
export const chatLabelByLocale: Record<string, string> = {
  ja: 'ご質問はこちら',
  zh: '点击咨询',
  en: 'Ask us',
  mn: 'Асуух бол энд дарна уу',
} as const;

/** ラベルが取得できない場合のフォールバック言語 */
export const LABEL_FALLBACK_LOCALE = 'en';
