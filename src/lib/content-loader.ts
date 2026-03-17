import type { Locale } from "./i18n";

// 型定義
export interface CommonContent {
  bookOnline: string;
  callUs: string;
  emailUs: string;
  backToTop: string;
  navigation: {
    top: string;
    about: string;
    menu: string;
    flow: string;
    notes: string;
    faq: string;
    access: string;
    help: string;
  };
  changeLang: string;
}

export interface MetaContent {
  siteName: string;
  siteDescription: string;
  pages: Record<string, { title: string; description: string }>;
}

export interface TopContent {
  welcome: string;
  description: string;
  cta: { flow: string; menu: string; access: string; faq: string; help: string };
}

export interface AboutContent {
  title: string;
  intro: string;
  features: { label: string }[];
}

export interface MenuContent {
  title: string;
  note: string;
  categories: { name: string; description: string }[];
  ctaText: string;
}

export interface FlowContent {
  title: string;
  intro: string;
  steps: { step: string; description: string; note?: string }[];
}

export interface NotesContent {
  title: string;
  intro: string;
  items: { text: string }[];
}

export interface FAQContent {
  title: string;
  items: { q: string; a: string }[];
}

export interface AccessContent {
  title: string;
  addressLabel: string;
  phoneLabel: string;
  emailLabel: string;
  hoursLabel: string;
  stationLabel: string;
  mapLinkText: string;
}

export interface HelpContent {
  title: string;
  instruction: string;
  phrases: { text: string; ja: string }[];
}

// fs を使って JSON を読み込む（サーバーコンポーネント用）
import { readFileSync } from "fs";
import { join } from "path";

export function getContent<T>(locale: Locale, page: string): T {
  const filePath = join(process.cwd(), "src", "content", locale, `${page}.json`);
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
