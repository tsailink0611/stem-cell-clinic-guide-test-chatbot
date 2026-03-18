# チャットボットウィジェット実装ドキュメント

## 概要

このドキュメントは、Stem Cell Clinic Tokyo訪問者ガイドサイト（Next.js 15）に統合されたDifyチャットボットウィジェットの実装アーキテクチャを説明します。

### 実装方式の変更: embed.min.js から iframe へ

**以前の方式（廃止）**: `next/script` の `afterInteractive` + `embed.min.js`

```javascript
// ❌ 旧方式（問題あり）
<Script src="..." strategy="afterInteractive" />
```

**現在の方式（推奨）**: `iframe` 直接埋め込み

```javascript
// ✅ 新方式（推奨）
<iframe src={`${baseUrl}/chatbot/${token}`} />
```

### なぜ iframe に切り替えたのか

1. **`output: "export"` との相性問題を根本解決**
   - `next/script` の `afterInteractive` 戦略は、Next.js の静的エクスポートモード（`output: "export"`）では動作しません
   - iframe は静的エクスポートに完全対応します

2. **シンプルで保守性が高い**
   - 外部スクリプト読み込みの複雑さがなくなります
   - CSP（Content Security Policy）の設定が最小限で済みます

3. **Dify 側でネイティブサポート**
   - Difyチャットボットはiframeでの埋め込みを推奨インテグレーションとしてサポートしています

---

## コンポーネント構成

```
src/components/chat/
├── FloatingChatWidget.tsx     ← ルートコンポーネント（状態管理）
├── FloatingChatButton.tsx     ← バブルボタン（開閉切り替え）
├── ChatPanel.tsx              ← チャットパネル本体（ヘッダー + iframe）
├── DifyIframe.tsx             ← iframe ラッパー
├── constants.ts               ← カラートークン・定数
└── index.ts                   ← 再エクスポート
```

### 各ファイルの責務

#### 1. **FloatingChatWidget.tsx** - ルートコンポーネント

開閉状態を管理し、ボタンとパネルをorchestrate します。

```javascript
const [isOpen, setIsOpen] = useState(false);
const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);
const handleClose = useCallback(() => setIsOpen(false), []);
```

- 状態: `isOpen` （boolean）
- 子コンポーネント: FloatingChatButton、ChatPanel
- 親: `src/app/layout.tsx` でグローバル配置

#### 2. **FloatingChatButton.tsx** - バブルボタン

ユーザーとの対話エントリーポイント。

- **外観**: 60px × 60px の円形ボタン
- **背景色**: charcoal（`#2C2C2C`）
- **枠線**: gold（`#B89A6A`）1.5px
- **アイコン**: 開いてるときは×、閉じてるときはチャットアイコン
- **ホバー時**: scale（1.06）+ ゴールドグロー
- **位置**: fixed，bottom: 24px，right: 24px
- **z-index**: 9999

#### 3. **ChatPanel.tsx** - チャットパネル本体

パネル全体を管理。ヘッダー + iframe を含みます。

- **サイズ**: 400px × 75vh（最大680px）
- **背景**: `#F7F5F2`（パネルサーフェス）
- **位置**: fixed，bottom: 96px，right: 24px
- **z-index**: 9998（ボタンより下）
- **角丸**: 20px
- **ヘッダー**: charcoal 背景、「受付・案内サポート」+ Stem Cell Clinic Tokyo クレジット
- **閉じるボタン**: ヘッダー内右側（26px × 26px）

**インタラクション**:
- **Escキー**: パネルを閉じる
- **外側クリック**: パネルを閉じる（遅延50msで衝突回避）
- **開閉アニメーション**: cubic-bezier(0.22,1,0.36,1)

#### 4. **DifyIframe.tsx** - iframe ラッパー

Difyチャットボットを埋め込みます。

```javascript
const src = `${difyConfig.baseUrl}/chatbot/${difyConfig.token}`;
<iframe src={src} allow="microphone" ... />
```

- **src**: `https://dify.michiworks.jp/chatbot/j0NWlcRF02PvMBdb`
- **allow**: microphone（音声入力対応）
- **サイズ**: 100% × 100%（親のChatPanelに充填）

#### 5. **constants.ts** - カラートークン・定数

デザイン値を一元管理します。

```javascript
export const CHAT_COLORS = {
  bubbleBg: '#2C2C2C',           // バブル・ヘッダー背景
  gold: '#B89A6A',               // ゴールドアクセント
  goldGlow: 'rgba(184,154,106,0.25)',  // ホバー時グロー
  panelSurface: '#F7F5F2',       // パネル背景
  border: '#e8e3dd',             // 境界線
  headerText: 'rgba(255,255,255,0.92)',  // ヘッダーテキスト
};

export const CHAT_Z_INDEX = 9999;
export const BUBBLE_SIZE = 60;
```

#### 6. **index.ts** - 再エクスポート

```javascript
export { default as FloatingChatWidget } from "./FloatingChatWidget";
export { default as FloatingChatButton } from "./FloatingChatButton";
export { default as ChatPanel } from "./ChatPanel";
export { default as DifyIframe } from "./DifyIframe";
```

---

## Dify 接続設定

### 設定ファイル: `src/lib/dify-config.ts`

```javascript
export const difyConfig = {
  token: "j0NWlcRF02PvMBdb",
  baseUrl: "https://dify.michiworks.jp",
} as const;
```

- **token**: 公開識別子（Difyチャットボットの一意ID）
- **baseUrl**: DifyサーバーURL
- **用途**: DifyIframe.tsxで iframe の src を構築

### iframe URL の生成

```javascript
const src = `${difyConfig.baseUrl}/chatbot/${difyConfig.token}`;
// → https://dify.michiworks.jp/chatbot/j0NWlcRF02PvMBdb
```

---

## グローバル配置

`src/app/layout.tsx` でサイト全体に配置します。

```javascript
import { FloatingChatWidget } from "@/components/chat";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <FloatingChatWidget />  {/* ← すべてのページで自動表示 */}
      </body>
    </html>
  );
}
```

---

## カラートークン一覧

| トークン | 値 | 用途 |
|---------|-----|------|
| `bubbleBg` | `#2C2C2C` | バブルボタン背景、ヘッダー背景 |
| `gold` | `#B89A6A` | ボタン枠線、アクセント、ホバー時グロー |
| `goldGlow` | `rgba(184,154,106,0.25)` | ホバー時のシャドウグロー |
| `panelSurface` | `#F7F5F2` | チャットパネル背景 |
| `border` | `#e8e3dd` | パネル境界線 |
| `headerText` | `rgba(255,255,255,0.92)` | ヘッダータイトル文字 |

---

## レスポンシブ対応

`src/app/globals.css` にモバイル対応ルールを定義します。

```css
@media (max-width: 639px) {
  #chat-panel {
    right: 16px !important;
    width: calc(100vw - 32px) !important;
  }

  .chat-bubble-btn {
    right: 16px !important;
  }
}
```

**対応内容**:
- **パネル幅**: 400px → `calc(100vw - 32px)`（左右16pxのマージン）
- **パネル右端**: 24px → 16px
- **ボタン右端**: 24px → 16px

---

## 環境変数への移行（推奨事項）

現在、token は `dify-config.ts` にハードコードされています。

```javascript
token: "j0NWlcRF02PvMBdb",  // ← ハードコード
```

### 推奨：環境変数で管理する

`.env.local`:
```
NEXT_PUBLIC_DIFY_TOKEN=j0NWlcRF02PvMBdb
NEXT_PUBLIC_DIFY_BASE_URL=https://dify.michiworks.jp
```

更新後の `dify-config.ts`:
```javascript
export const difyConfig = {
  token: process.env.NEXT_PUBLIC_DIFY_TOKEN || "j0NWlcRF02PvMBdb",
  baseUrl: process.env.NEXT_PUBLIC_DIFY_BASE_URL || "https://dify.michiworks.jp",
} as const;
```

**メリット**:
- ステージング環境で異なる token を使用可能
- 本番デプロイ前に token を変更可能
- git の履歴に token が記録されない

**注**: Dify token は公開識別子なため、`NEXT_PUBLIC_` プレフィックス推奨（クライアント側で必要なため）

---

## パフォーマンス・アクセシビリティ

### アクセシビリティ

- **aria-label**: "チャットを開く"/"チャットを閉じる"
- **aria-expanded**: パネル開閉状態を明示
- **aria-controls**: ボタンがパネルを制御することを宣言
- **role="dialog"**: パネルの役割を明示
- **aria-modal**: パネル表示時はモーダルとして宣言
- **aria-hidden**: パネルが非表示時は支援技術から隠す

### パフォーマンス

- **useCallback**: toggle・close ハンドラーをメモ化（不要な再レンダリング防止）
- **lazy iframe load**: iframe は `isOpen` が true のときのみレンダリング対象
- **CSS transition**: GPU加速可能なプロパティ（`transform`, `opacity`）を使用

---

## トラブルシューティング

| 現象 | 原因 | 解決策 |
|------|------|-------|
| バブルが表示されない | z-index競合 | `CHAT_Z_INDEX = 9999` を調整、または親の `position: relative` を削除 |
| iframe が白い画面 | CSP 制限 | Dify URL を meta-tag や next.config.js に許可設定を追加 |
| iframe が読み込まれない | Mixed Content エラー | サイトが HTTPS で、Dify baseUrl も HTTPS であることを確認 |
| パネルが Escで閉じない | イベントリスナー未登録 | `isOpen` が `true` のときのみリスナーが登録されているか確認 |
| レスポンシブが効かない | !important 不足 | globals.css のメディアクエリに `!important` を確認 |

---

## 関連ドキュメント

- [チャットボットウィジェット変更ハンドバック](./chatbot-widget-handover.md) - デザイン・URL・Dify設定の変更方法
- [Dify 公式ドキュメント](https://docs.dify.ai) - Difyチャットボット管理

---

**最終更新**: 2026-03-19
**バージョン**: Next.js 15.5.13
**実装者**: Stem Cell Clinic Tokyo Development Team
