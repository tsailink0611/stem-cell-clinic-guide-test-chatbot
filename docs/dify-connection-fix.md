# Dify 接続復旧手順

**作成日:** 2026-03-19
**対象症状:** Vercel サイトのチャットパネルに「dify.michiworks.jp で接続が拒否されました」と表示される

---

## 現在の読み込み方式

- **方式:** iframe 直接埋め込み（embed.min.js は使用していない）
- **URL:** `https://dify.michiworks.jp/chatbot/j0NWlcRF02PvMBdb`
- **設定ファイル:** `src/lib/dify-config.ts`（token + baseUrl を集約管理）

---

## 問題の主因（2つ）

### 原因1: Cloudflare Tunnel が停止している（Error 1033 / 530）

`cloudflared` サービスが VPS 上で止まっており、Cloudflare から VPS に到達できない状態。

### 原因2: Dify が iframe 埋め込みを拒否している（X-Frame-Options: sameorigin）

Dify の nginx が `X-Frame-Options: sameorigin` を返しており、異なるオリジン（Vercel）からの iframe 表示をブロックしている。

---

## repo 内で修正したファイル

| ファイル | 修正内容 |
|---|---|
| `src/components/chat/DifyIframe.tsx` | ローディング表示を追加。接続失敗時もパネル表示が崩壊しないよう改善。 |

旧 IP（`100.74.224.93` / `162.43.37.106`）は repo 内に存在しない。URL は全て `https://dify.michiworks.jp` で統一済み。

---

## VPS 側で必要な作業

### Step 1: cloudflared を再起動する

```bash
sudo systemctl restart cloudflared
sudo systemctl status cloudflared
```

`Active: active (running)` になっていることを確認。

確認コマンド:
```bash
curl -I https://dify.michiworks.jp/
# HTTP/2 200 が返れば Tunnel 復旧済み
```

---

### Step 2: nginx の X-Frame-Options を修正する

**対象:** Dify の docker 内 nginx 設定
**場所の探し方（VPS で実行）:**
```bash
cd /path/to/dify/docker
find . -path "*/nginx*" -name "*.conf" | head -10
```

通常は `docker/nginx/nginx.conf` または `docker/nginx/conf.d/default.conf` にある。

**修正内容:**

既存の `X-Frame-Options` 行を削除または以下に置き換える:

```nginx
# 削除: add_header X-Frame-Options 'SAMEORIGIN';

# 以下を server {} ブロック内に追加
add_header X-Frame-Options "ALLOWALL" always;
add_header Content-Security-Policy "frame-ancestors https://stem-cell-clinic-guide-test-chatbot-five.vercel.app https://*.vercel.app;" always;
```

> **補足:** `X-Frame-Options` はオリジン指定のホワイトリストをサポートしない仕様のため `ALLOWALL` を設定しつつ、
> `Content-Security-Policy: frame-ancestors` で許可するオリジンを明示する。
> 本番ドメインが決まり次第 `frame-ancestors` に追加すること。

修正後、nginx を再起動:
```bash
docker compose restart nginx
# または全体再起動
docker compose down && docker compose up -d
```

---

### Step 3: 設定反映を確認する

```bash
# X-Frame-Options ヘッダーを確認
curl -I https://dify.michiworks.jp/ | grep -i "x-frame\|content-security"
# X-Frame-Options: ALLOWALL が返ることを確認

# chatbot URL に直接アクセスして表示されることを確認
curl -s -o /dev/null -w "%{http_code}" https://dify.michiworks.jp/chatbot/j0NWlcRF02PvMBdb
# 200 が返れば OK
```

---

## 動作確認手順

1. VPS での上記作業完了後、ブラウザで `https://dify.michiworks.jp/chatbot/j0NWlcRF02PvMBdb` に直接アクセスしてチャット画面が表示されることを確認
2. `https://stem-cell-clinic-guide-test-chatbot-five.vercel.app/` を開き、右下のバブルをクリック
3. チャットパネルが開き、Dify のチャット画面が表示されることを確認
4. Chrome DevTools → Console タブで赤いエラーが出ていないことを確認

---

## まとめ

| 項目 | 状態 |
|---|---|
| repo 内の URL 設定 | 正常（旧 IP なし） |
| 読み込み方式 | iframe（問題なし） |
| 原因1: cloudflared 停止 | **VPS 側対応が必要** |
| 原因2: X-Frame-Options | **VPS 側 nginx 修正が必要** |
| フォールバック表示 | repo 修正済み |
