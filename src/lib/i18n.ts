export const locales = ["en", "zh", "mn", "ja"] as const;
export type Locale = (typeof locales)[number];

/** 言語選択UIに表示する言語 */
// TODO_OPERATION_CONFIRM: ja を本番公開時に含めるか（現在は確認用として表示）
export const publicLocales: Locale[] = ["en", "zh", "mn", "ja"];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  mn: "Монгол",
  ja: "日本語",
};

export const localeNativeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文（简体）",
  mn: "Монгол хэл",
  ja: "日本語",
};

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}
