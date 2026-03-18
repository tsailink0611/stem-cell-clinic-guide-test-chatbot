# チャットボットウィジェット変更ハンドバック

このドキュメントは、チャットボットウィジェットのデザイン・URL・Dify設定を変更する必要がある場合の手順を提供します。

---

## 1. Difyチャットボット URL を変更する

Difyで新しいチャットボットを作成した場合、または既存のチャットボットの URL が変わった場合の対応です。

### 手順

1. `src/lib/dify-config.ts` を開く

   ```javascript
   export const difyConfig = {
     token: "j0NWlcRF02PvMBdb",              // ← ここを変更
     baseUrl: "https://dify.michiworks.jp",  // ← またはここ
   } as const;
   ```

2. **token を変更**

   Dify管理画面から新しいチャットボットID（token）をコピーして置き換えます。

   ```javascript
   token: "新しいtoken",  // 例: "xyz9876543"
   ```

3. **baseUrl を変更（オプション）**

   Difyサーバーが別のドメインの場合:

   ```javascript
   baseUrl: "https://新しいdifyサーバー.com",
   ```

4. 保存して終了

   ```bash
   npm run build
   npm run dev
   ```

### Dify token の確認方法

Dify管理画面 → チャットボット詳細 → 埋め込みコード内の URL から抽出

```
https://dify.michiworks.jp/chatbot/j0NWlcRF02PvMBdb
                                ↑
                            ここが token
```

---

## 2. デザインを変更する

### バブル・ヘッダーの背景色を変更

`src/components/chat/constants.ts`:

```javascript
export const CHAT_COLORS = {
  bubbleBg: '#2C2C2C',  // ← ここを変更（例：'#1a1a1a'）
  // ...
};
```

### バブルの枠線（ゴールド）を変更

```javascript
export const CHAT_COLORS = {
  gold: '#B89A6A',  // ← ここを変更（例：'#FFD700'）
  // ...
};
```

### パネルの背景を変更

```javascript
export const CHAT_COLORS = {
  panelSurface: '#F7F5F2',  // ← ここを変更（例：'#FFFFFF'）
  // ...
};
```

### 他の色を変更

```javascript
export const CHAT_COLORS = {
  bubbleBg: '#2C2C2C',
  gold: '#B89A6A',
  goldGlow: 'rgba(184,154,106,0.25)',  // ← ホバー時グロー
  panelSurface: '#F7F5F2',
  border: '#e8e3dd',                     // ← パネル枠線
  headerText: 'rgba(255,255,255,0.92)',  // ← ヘッダーテキスト
};
```

### 変更後の確認

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスして、右下のバブルボタンをクリック。デザインが反映されていることを確認します。

---

## 3. チャットパネルのサイズを変更する

### パネルの幅・高さを調整

`src/components/chat/ChatPanel.tsx` の style プロパティを編集:

```javascript
style={{
  // ...
  width: "400px",        // ← ここを変更（例：'500px'）
  height: "75vh",        // ← またはここを変更（例：'80vh'）
  maxHeight: "680px",    // ← 最大高さ
  // ...
}}
```

### バブルボタンのサイズを変更

`src/components/chat/constants.ts`:

```javascript
export const BUBBLE_SIZE = 60;  // ← ここを変更（例：70）
```

### 変更後の確認

```bash
npm run dev
```

パネルを開いて、新しいサイズが反映されていることを確認します。

---

## 4. バブルボタンの位置を変更する

### デスクトップの位置

`src/components/chat/FloatingChatButton.tsx`:

```javascript
style={{
  // ...
  bottom: "24px",  // ← ここを変更（例：'32px'）
  right: "24px",   // ← または左側に配置：left: "24px", right: "auto"
  // ...
}}
```

### チャットパネルの位置

`src/components/chat/ChatPanel.tsx`:

```javascript
style={{
  // ...
  bottom: "96px",  // ← バブル（60px）+ マージン（32px）= 92px推奨
  right: "24px",
  // ...
}}
```

### モバイルの位置

`src/app/globals.css`:

```css
@media (max-width: 639px) {
  #chat-panel {
    right: 16px !important;  /* ← モバイルのマージン */
  }

  .chat-bubble-btn {
    right: 16px !important;
  }
}
```

### 変更後の確認

```bash
npm run dev
```

異なる画面幅（デスクトップ・タブレット・モバイル）でバブルの位置を確認します。

---

## 5. ヘッダーテキストを変更する

現在のヘッダー:
- タイトル: 「受付・案内サポート」
- サブタイトル: 「Stem Cell Clinic Tokyo」

変更する場合は `src/components/chat/ChatPanel.tsx`:

```javascript
<p style={{ ... }}>
  受付・案内サポート  {/* ← ここを変更 */}
</p>

<p style={{ ... }}>
  Stem Cell Clinic Tokyo  {/* ← またはここを変更 */}
</p>
```

### 例：多言語対応

```javascript
const language = 'ja';  // または 'en', 'zh' など

const headerText = {
  ja: { title: '受付・案内サポート', subtitle: 'Stem Cell Clinic Tokyo' },
  en: { title: 'Reception & Guidance', subtitle: 'Stem Cell Clinic Tokyo' },
};

<p>{headerText[language].title}</p>
<p>{headerText[language].subtitle}</p>
```

---

## 6. アニメーション・動作をカスタマイズする

### 開閉アニメーションの速度

`src/components/chat/ChatPanel.tsx`:

```javascript
style={{
  // ...
  transition: isOpen
    ? "transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.22s ease"
                           // ↑ 0.28s = 280ミリ秒。短くするなら 0.15s など
    : "transform 0.2s ease, opacity 0.2s ease",
  // ...
}}
```

### ホバー時の拡大率

`src/components/chat/FloatingChatButton.tsx`:

```javascript
onMouseEnter={(e) => {
  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.06)";
                                                                    // ↑ 1.06 = 6%拡大
                                                                    // 1.1 = 10%拡大 など
}}
```

### パネルが開かないようにする

`src/app/layout.tsx`:

```javascript
{/* <FloatingChatWidget /> をコメントアウト */}
{/* <FloatingChatWidget /> */}
```

またはフラグで制御:

```javascript
{process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true' && <FloatingChatWidget />}
```

`.env.local`:
```
NEXT_PUBLIC_ENABLE_CHAT=true
```

---

## 7. Difyチャットボット自体を変更する

Dify側でボットの応答内容・設定を変更した場合は、このリポジトリ側の変更は不要です。

### Dify管理画面で行う操作（このリポジトリの範囲外）

- チャットボット Q&A を追加・編集
- 回答テンプレートをカスタマイズ
- ナレッジベースを更新
- インテグレーションを追加（例：Webhook、外部API連携）

### token が変わった場合のみ対応

Difyで新しいチャットボットを公開するなど、token が変わった場合:

1. 「[1. Difyチャットボット URL を変更する](#1-difyチャットボット-url-を変更する)」を参照
2. `src/lib/dify-config.ts` を更新

---

## トラブルシューティング

### バブルボタンが表示されない

**原因**: CSS競合またはz-index値が足りない

**解決**:
1. ブラウザの Developer Tools でボタンの `z-index` を確認
2. `constants.ts` の `CHAT_Z_INDEX = 9999` より大きな値がないか確認
3. 親要素に `position: relative` がある場合は削除検討

```bash
# ブラウザコンソール
console.log(getComputedStyle(document.querySelector('.chat-bubble-btn')).zIndex);
```

### チャットパネルが開かない

**原因**: React状態が更新されていない、または javascript エラー

**解決**:
1. ブラウザの Console タブでエラーを確認
2. React DevTools でコンポーネント状態を確認

```bash
npm run build  # TypeScriptエラーを確認
npm run dev    # ローカルで再テスト
```

### iframe が表示されない（白い画面）

**原因**: iframe の src が無効、または CORS/CSP 制限

**解決**:
1. Dify token が正しいか確認

   ```javascript
   // src/lib/dify-config.ts
   console.log(difyConfig);  // トークンが表示される
   ```

2. Dify側がオンラインか確認

   ```bash
   curl https://dify.michiworks.jp/chatbot/j0NWlcRF02PvMBdb
   ```

3. Mixed Content エラーが出ていないか確認（HTTPS の中で HTTP を読み込んでいないか）

### レスポンシブが効かない

**原因**: CSS ルールが優先度に負けている

**解決**:
```css
@media (max-width: 639px) {
  #chat-panel {
    right: 16px !important;  /* !important を付ける */
  }
}
```

---

## デプロイ後の確認チェックリスト

デプロイ後は以下を確認します:

- [ ] バブルボタンが右下に表示されている
- [ ] バブルをクリックするとパネルが開く
- [ ] パネルの Dify チャットが応答する
- [ ] Esc キーでパネルが閉じる
- [ ] パネルの外側をクリックすると閉じる
- [ ] モバイル（スマートフォン）でもバブルが表示される
- [ ] モバイルでパネルが全幅に近い形で表示される
- [ ] 複数回の開閉でエラーが出ない

---

## 関連ファイルリファレンス

| ファイル | 役割 |
|---------|------|
| `src/components/chat/FloatingChatWidget.tsx` | 状態管理（開閉） |
| `src/components/chat/FloatingChatButton.tsx` | バブルボタン（位置・サイズ・色） |
| `src/components/chat/ChatPanel.tsx` | パネル本体（位置・サイズ・ヘッダーテキスト） |
| `src/components/chat/DifyIframe.tsx` | iframe 設定（allow属性など） |
| `src/components/chat/constants.ts` | カラートークン・定数 |
| `src/lib/dify-config.ts` | Dify設定（URL・token） |
| `src/app/layout.tsx` | グローバル配置 |
| `src/app/globals.css` | レスポンシブ対応（モバイル） |

---

## よくある質問（FAQ）

**Q: 複数の異なるチャットボットを表示したい**

A: `dify-config.ts` で複数の設定を定義し、環境変数で切り替えます

```javascript
export const difyConfig = {
  token: process.env.NEXT_PUBLIC_DIFY_TOKEN || "j0NWlcRF02PvMBdb",
  baseUrl: process.env.NEXT_PUBLIC_DIFY_BASE_URL || "https://dify.michiworks.jp",
};
```

**Q: チャットを最初から開いた状態にしたい**

A: `FloatingChatWidget.tsx` を編集

```javascript
const [isOpen, setIsOpen] = useState(true);  // true にする
```

**Q: バブルをページの左側に配置したい**

A: `FloatingChatButton.tsx` を編集

```javascript
style={{
  // ...
  right: "auto",  // 削除
  left: "24px",   // 追加
  // ...
}}
```

**Q: チャットボットを特定のページだけ表示したい**

A: `layout.tsx` の代わりに、特定ページのファイルに `<FloatingChatWidget />` を配置

```javascript
// pages/contact/page.tsx のみに配置
export default function ContactPage() {
  return (
    <>
      <h1>Contact</h1>
      <FloatingChatWidget />  {/* このページだけ */}
    </>
  );
}
```

---

**最終更新**: 2026-03-19
**バージョン**: Next.js 15.5.13
**対象者**: 営業・マーケティング・PM（開発者以外でも使用可能）
