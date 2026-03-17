# 01 Requirements (Current Version)

> このファイルは**現時点の最新版要件**である。
> 仕様は現場ヒアリング・クライアント確認・運用検証により更新される可能性がある。
> 実装時は必ず `00_project_principles.md` と `02_open_questions.md` を確認し、未確定事項を確定仕様として扱わないこと。

---

## 1. プロジェクト概要
幹細胞クリニック東京向けに、外国人患者が NFC カードまたは NFC タグをタッチすると、多言語案内サイトへアクセスできる仕組みを構築する。

このサイトは、既存公式サイトを再現するものではなく、**外国人患者の来院案内・受付補助・導線整理**を目的とした独立サイトである。

---

## 2. 目的

### 主目的
- 外国人患者への初期案内品質の向上
- 来院時の不安軽減
- 受付スタッフ・医師・看護師の説明負荷軽減
- 言語の壁による案内ロスの削減
- 来院導線、予約導線、アクセス導線の明確化

### 副目的
- クリニックの信頼感向上
- 多言語対応の見える化
- 将来的な他院展開テンプレート化

---

## 3. 対象ユーザー

### 外部ユーザー
- 英語話者の患者
- 中国語話者の患者
- モンゴル語話者の患者
- 日本語がほぼ分からない来院者

### 内部ユーザー
- 受付スタッフ
- 医師
- 看護師
- サポートチーム

---

## 4. スコープ

### 対象範囲
- NFC タッチでアクセスする多言語案内サイト
- スマホ最適化された閲覧用サイト
- 言語別ページ構成
- 来院導線、基本メニュー案内、FAQ、アクセス、注意事項
- スタッフ提示用フレーズ画面
- 外部リンクによる予約導線

### 対象外
- ログイン機能
- 顧客管理
- 問診データ保存
- 電子カルテ連携
- 決済
- 予約システム内製
- チャット機能
- 自動翻訳APIのリアルタイム実装
- 医療判断や診断を行う機能

---

## 5. 採用する既存情報（現時点）
既存資料から、初期版に採用する情報は以下。

- クリニック名
- 所在地
- 電話番号
- メールアドレス
- 診療時間
- 最寄り駅とアクセス
- 完全予約制
- 無料カウンセリング
- 個室対応
- 初回所要時間の目安
- 中国語対応可
- メニューの大分類
- 予約導線

### 初期版で採用しない情報
- コラム本文
- 長文医療解説
- SEO目的の詳細テキスト
- 既存サイトの販促コピー
- 効果を強く断定する表現
- 理論説明の深掘り

---

## 6. 対応言語
初期対応言語は以下。

- English
- 中文
- Монгол хэл
- 日本語（内部確認用。公開有無は未確定）

---

## 7. サイト構成

### トップレベル
- `/` 言語選択
- `/en`
- `/zh`
- `/mn`
- `/ja`（任意）

### 各言語のページ
- Top / Welcome
- About the Clinic
- Treatments / Menu
- Visit Flow
- Important Notes
- FAQ
- Access / Contact
- Help for Staff

URL例：

- `/en/about`
- `/en/menu`
- `/en/flow`
- `/en/notes`
- `/en/faq`
- `/en/access`
- `/en/help`

中国語・モンゴル語も同様に分岐する。

---

## 8. ページ別要件

### 8.1 Top / Welcome
目的：
- サイトの用途を即時理解させる
- 主要導線へ迷わず誘導する

表示内容：
- クリニック名
- 短い案内文
- 主要CTA
  - First visit
  - Treatments
  - Access
  - FAQ
  - Show this to staff

### 8.2 About the Clinic
表示内容：
- 再生医療専門クリニックであること
- 無料カウンセリング
- 完全予約制
- 個室対応
- 中国語対応可
- アクセスの良さ
- 初回所要時間の目安

### 8.3 Treatments / Menu
表示方針：
- 詳細医学説明ではなく、大分類の理解を目的とする
- 効果断定は避ける
- 詳細はカウンセリングへ誘導する

初期掲載候補：
- Beauty / Anti-aging
- Hair Regeneration
- Knee / Joint-related treatment
- Chronic Pain
- Fatigue Recovery

### 8.4 Visit Flow
表示候補：
1. Reservation / Arrival
2. Reception
3. Consultation
4. Doctor / Nurse explanation
5. Treatment if applicable
6. Payment / Next reservation

### 8.5 Important Notes
掲載候補：
- Reservation required
- Consultation is free
- Same-day treatment may be possible
- Treatment availability depends on schedule
- Cancellation without notice may incur a fee
- Details and eligibility are confirmed during consultation
- Suitability depends on individual condition

### 8.6 FAQ
初期FAQ候補：
- Is consultation free?
- Do I need a reservation?
- Can I receive treatment on the same day?
- Who explains the treatment?
- Is Chinese available?
- How long does it take?
- Where is the clinic?
- Is there an extra charge?
- What happens if I cancel?
- Can I make the next reservation at the clinic?

### 8.7 Access / Contact
表示内容：
- 住所
- Google Map リンク
- 最寄り駅
- ビル名 / 階数
- 電話
- メール
- 営業時間
- 予約ボタン

### 8.8 Help for Staff
目的：
- 患者が画面を受付・医師・看護師に見せられるようにする

初期フレーズ候補：
- I have a reservation.
- I do not speak Japanese.
- Please speak slowly.
- I want consultation only.
- It is my first visit.
- I have a question about the treatment.
- I need language assistance.

---

## 9. 外部導線要件
各主要ページ下部に以下の導線を配置する。

- WEB予約
- 電話
- メール

方針：
- 電話ボタンはモバイル発信可能
- メールボタンはメーラー起動
- WEB予約は外部リンク遷移

---

## 10. UI / デザイン要件

### デザイン方針
- 高級感よりも明快さ優先
- 医療機関らしい安心感
- 清潔感
- 白基調
- シンプル
- 大きなボタン
- 長文を避ける
- 画像がなくても成立する構造

### 画面方針
- モバイルファースト
- 1画面目に主要導線を表示
- CTAはスクロール前に見せる
- 高コントラスト
- タップしやすいボタンサイズ

---

## 11. 非機能要件

### 対応デバイス
- スマートフォン最優先
- タブレット対応
- PCでも崩れない

### 表示速度
- NFC タッチ後に高速表示
- 静的配信を前提
- 画像最適化を行う

### 保守性
- 文言とUIを分離する
- 言語別ファイルで管理する
- 将来的に他院展開しやすい構造にする

### セキュリティ
- 個人情報入力なし
- DBなし
- フォーム保存なし
- 外部リンクのみ
- 基本的なフロントエンドセキュリティ対策を行う

### アクセシビリティ
- 画像 alt 設定
- 十分なコントラスト
- 各言語ページで `lang` 属性設定
- アイコン依存にしすぎないUI

---

## 12. 技術要件

### 推奨スタック
- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Static Generation 中心
- Vercel または Cloudflare Pages

### コンテンツ管理
例：

- `content/ja/*.json`
- `content/en/*.json`
- `content/zh/*.json`
- `content/mn/*.json`

または

- `messages/ja.json`
- `messages/en.json`
- `messages/zh.json`
- `messages/mn.json`

### 技術方針
- UIコンポーネントと文言データを分離
- 仮文言は後で差し替え可能にする
- 仮翻訳は明示する
- 管理画面は作らない
- DBは使わない

---

## 13. 文言ポリシー

### 禁止
- 必ず治る
- 確実に改善する
- 他院より優れている
- 医師判断なしに適応を断定する
- 科学的根拠が曖昧な断定表現

### 推奨
- 詳細はカウンセリングで確認
- 状態により異なる
- 当日の可否は状況により異なる
- 医師・看護師が案内する
- 不明点は相談してほしい

---

## 14. 受け入れ基準
初期版完成条件は以下。

1. NFC タッチ導線からトップ表示ができる
2. 3言語ページが存在する
3. 各言語で主要8ページが閲覧できる
4. スマホ表示で崩れない
5. 予約・電話・メール導線が動作する
6. アクセス情報が正しい
7. FAQ が最低5件以上ある
8. Help for Staff ページが使える
9. 医療断定表現がない
10. 文言分離構造で後から更新可能である

---

## 15. 実装時の重要ルール
- 既存サイトのコピーをしない
- コラムを使わない
- 未確定事項を勝手に仕様化しない
- 仮文言・仮翻訳は明示する
- 変更に強い構造を優先する
