# Chatbot Widget — Design Spec
**Date:** 2026-03-19
**Project:** Stem Cell Clinic Tokyo – Visitor Guide
**Status:** Approved

---

## 1. 背景・目的

現在、Dify公式の埋め込みバブルUI（`embed.min.js`）をそのまま使用しており、デザインが安っぽくサイトの高級感・清潔感を損なっている。これを廃止し、自作の高品位バブル+パネルUIに置き換える。Difyのチャットボット機能自体は継続利用する。

---

## 2. 確定デザイン

### バブルボタン（FloatingChatButton）

| 項目 | 値 |
|------|-----|
| 位置 | 右下固定 `bottom: 24px; right: 24px` |
| サイズ | 60px × 60px（真円） |
| 背景色 | `#2C2C2C`（チャコール） |
| ボーダー | `1.5px solid #B89A6A`（ゴールド） |
| アイコン | 白線画チャットアイコン（Heroicons `chat-bubble-left-right`系） |
| シャドウ | `0 4px 20px rgba(0,0,0,0.18)` |
| ホバー | `scale(1.06)` + `box-shadow: 0 6px 28px rgba(184,154,106,0.25)` |
| アニメーション | transform 0.2s ease |
| z-index | `9999` |
| 初期状態 | 閉じた状態 |

### チャットパネル（ChatPanel）

| 項目 | 値 |
|------|-----|
| 位置 | `bottom: 96px; right: 24px`（PC） |
| 幅 | `400px`（PC） / `calc(100vw - 32px)`（SP） |
| 高さ | `75vh`（PC・SP共通、max: 680px） |
| 角丸 | `20px` |
| 外枠 | `1px solid rgba(184,154,106,0.3)` |
| シャドウ | `0 8px 40px rgba(0,0,0,0.18)` |
| 開閉アニメーション | `translateY(16px) scale(0.97) → translateY(0) scale(1)` + opacity フェード |
| アニメーション時間 | 開: 280ms cubic-bezier(0.22,1,0.36,1) / 閉: 200ms ease |
| 閉じる操作 | パネル外クリック・Escキー・ヘッダー閉じるボタン |

#### パネルヘッダー

| 項目 | 値 |
|------|-----|
| 背景 | `#2C2C2C`（バブルと統一） |
| タイトル | `受付・案内サポート`（color: rgba(255,255,255,0.92), letter-spacing: 0.1em） |
| サブタイトル | `Stem Cell Clinic Tokyo`（color: #B89A6A） |
| 閉じるボタン | 26px真円、border: 1px solid #B89A6A、× アイコン gold |

#### パネル本体

| 項目 | 値 |
|------|-----|
| 背景 | `#F7F5F2`（既存サイトのsurface色） |
| コンテンツ | Dify chatbot iframe（width: 100%, height: 100%） |

---

## 3. Dify接続方式

**方式: iframe直接埋め込み（embed.min.jsを廃止）**

```
iframe src = https://dify.michiworks.jp/chatbot/j0NWlcRF02PvMBdb
```

- `embed.min.js` と `window.difyChatbotConfig` は完全削除
- 既存 `DifyChatbot.tsx` は `next/script` の `afterInteractive` を使用していたが、`output: "export"` 静的エクスポートと非互換であった（`onload` 発火後にスクリプト注入されるため初期化が実行されないケースがあった）。本実装でiframe方式に完全移行し、この問題を根本解消する。
- iframeに `allow="microphone"` を付与。`sandbox` 属性は意図的に付与しない（Dify chatbotの正常動作にはスクリプト実行・フォーム送信等が必要なため）。
- Difyネイティブのバブルボタン（`#dify-chatbot-bubble-button`）は不要になるため、CSS制御も不要

**接続情報の管理:**
- `src/lib/dify-config.ts` に集約（token + baseUrl）
- chatbotURL = `${baseUrl}/chatbot/${token}` として動的生成
- token (`j0NWlcRF02PvMBdb`) はDifyの公開チャットボットURLの一部であり、エンドユーザーが直接アクセスするパブリックな識別子。認証シークレットではないためソースコード管理を許容する。ただし将来的に環境変数化（`NEXT_PUBLIC_DIFY_TOKEN`）への移行は推奨。

---

## 4. コンポーネント設計

```
src/components/chat/
  ├── FloatingChatWidget.tsx   # 親コンポーネント（isOpen状態管理）
  ├── FloatingChatButton.tsx   # バブルボタン（表示/クリック）
  ├── ChatPanel.tsx            # パネル外枠・ヘッダー・開閉制御
  ├── DifyIframe.tsx           # Dify iframe ラッパー
  └── index.ts                 # re-export
```

### 各コンポーネントの責務

| コンポーネント | 責務 |
|---------------|------|
| `FloatingChatWidget` | `isOpen` 状態保持・Button/Panel の統合レイアウト |
| `FloatingChatButton` | バブルの表示・スタイル・aria属性・クリックハンドラ受け取り |
| `ChatPanel` | パネル外枠・ヘッダー・開閉アニメーション・外クリック/Escで閉じる |
| `DifyIframe` | iframe生成・src URL組み立て・allow属性 |

#### アクセシビリティ
- `FloatingChatButton` に `aria-label="チャットを開く/閉じる"` と `aria-expanded={isOpen}` を付与
- フォーカストラップは今回スコープ外（Dify iframeが独自にフォーカス管理するため）

### グローバルレイアウト統合

`src/app/layout.tsx` にて:
- 既存 `<DifyChatbot />` を `<FloatingChatWidget />` に置換
- `FloatingChatWidget` は `"use client"` クライアントコンポーネント

---

## 5. カラートークン（デザイントークン）

既存 `tailwind.config.ts` の実値（仕様書はこの値を正とする）:

```ts
primary:   '#1a2332'
accent:    '#b8977e'  // ブロンズ寄りのゴールド（tailwind.config.ts実値）
surface:   '#faf9f7'
border:    '#e8e3dd'
```

追加トークン（チャットUI専用、ローカル定数として `chat/constants.ts` に管理）:
```ts
chatBubbleBg:    '#2C2C2C'  // チャコール（バブル・ヘッダー共通）
chatBorderGold:  '#B89A6A'  // ゴールドリング（モックアップ確認済み）
chatSurface:     '#F7F5F2'  // パネル本体背景（サイト表面色に準拠）
```

> **注意:** `chatBorderGold` (#B89A6A) はモックアップでユーザー承認済みの色。tailwindの `accent` (#b8977e) より黄金寄り。意図的に別値を採用。

---

## 6. レスポンシブ挙動

| ブレークポイント | パネル幅 | 位置 |
|----------------|---------|------|
| PC（≥640px） | 400px | パネル: bottom: 96px, right: 24px / バブル: bottom: 24px, right: 24px |
| SP（<640px） | calc(100vw - 32px) | パネル: bottom: 96px, right: 16px / バブル: bottom: 24px, right: 16px |

- スマホでもバブルは右下固定（既存UIとの干渉なし）
- キーボード表示時のスクロール対応: `height: 75vh`（固定pxではなくvhで対応）

---

## 7. 削除対象

| ファイル | 変更内容 |
|---------|---------|
| `src/components/DifyChatbot.tsx` | 完全削除（または空にする） |
| `src/app/layout.tsx` | `<DifyChatbot />` を `<FloatingChatWidget />` に置換 |

---

## 8. 追加ファイル一覧

| ファイル | 内容 |
|---------|------|
| `src/components/chat/FloatingChatWidget.tsx` | 親コンポーネント（状態管理） |
| `src/components/chat/FloatingChatButton.tsx` | バブルボタン |
| `src/components/chat/ChatPanel.tsx` | チャットパネル |
| `src/components/chat/DifyIframe.tsx` | Dify iframe |
| `src/components/chat/constants.ts` | カラートークン等の定数 |
| `src/components/chat/index.ts` | re-export |
| `docs/chatbot-widget-implementation.md` | 実装仕様ドキュメント |
| `docs/chatbot-widget-handover.md` | 引き継ぎ資料 |

---

## 9. 非機能要件

- `output: "export"` 静的エクスポート対応（`next/script` 非依存）
- APIキー・秘密情報のハードコード禁止（`dify-config.ts` で集約）
- 既存ページ・多言語導線・言語選択UIへの影響ゼロ
- z-index: `9999`（既存UIとの干渉回避）
