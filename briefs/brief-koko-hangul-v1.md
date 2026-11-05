# koko-hangul · design brief v1

**Celine · Designer** · 2026-11-05  
報告先: Sua →（Justin visual OK 後）Jessie  
根拠: `koko-hangul-plan-v1.md`（locked）＋ `substance-hangul-v1.yaml`（Koko・中身ロック）  
この brief は **繁中 UI／レイアウト／トーン／文言**のみ。教材データは触らない。コードは書かない。Jessie は Justin／Sua が振ってから。

Repo 目標: `justinksw/koko-hangul` · https://justinksw.github.io/koko-hangul/（未作成・Jessie）

---

## 0. Direction note（Justin 確認用）

| 項目 | 提案 |
|------|------|
| ゴール | 初心者がハングル字母を覚える静的練習サイト。デフォルトはランダム1字＋語彙。全文表は別ページ。 |
| 読者 | Justin のみ想定（公開でも自分優先） |
| トーン | **KR 学習ツール** — はっきり・落ち着き・ハングル本体が主役。momo-jp の紙ノート感とは別（クリーム罫線に寄せない）。AI 臭いコピー禁止。 |
| 画面 | (1) `/` 練習＝ランダム (2) `/table/` 字表 |
| 言語 | chrome・ナビ・ボタン・説明＝**繁體中文**。ハングル字母・語彙はそのまま。ローマ字は表の補助のみ。 |
| 触らない | ログイン／進捗／SRS／音声合成／クイズ採点（v1 外） |
| ビジュアル方向 | **D · 清墨練習** — ほぼ白〜ごく薄い冷灰地、濃い墨字、アクセントは一点の深い青（Koko flower/blue に寄せた静かな青。緑・紫グラデ無し）。大きな字母＋短い繁中要約＋語彙リスト。 |

**Justin へ（Sua 渡し）:** Direction **D 清墨練習** でよいか一声。OK 後に Jessie へ design-build-handoff。モック HTML は求められていないので brief のみ。ピクセル調整は PREVIEW punch。

---

## 1. 情報設計

```
/ (index · デフォルト)
  ├─ サイトヘッダー（短名・ナビ）
  ├─ 練習パネル
  │    ├─ 大ハングル（char）
  │    ├─ ローマ字補助（letters_table の roman・任意表示）
  │    ├─ summary_zh（1〜2行）
  │    ├─ 語彙リスト（5行・highlight）
  │    └─ 「產生」ボタン（主CTA）
  └─ （任意）小さく「字表へ」

/table/
  ├─ 同ヘッダー・ナビ
  ├─ セクション見出し ×4
  └─ 字母グリッド／行（40項目）
```

データ源（Jessie）: substance → JSON 等。フィールドは Koko YAML を正とする。

| 源 | 件数 | 使い所 |
|----|------|--------|
| `letters_table` | 40 | `/table/` 全文。section: basic_consonants 14 / basic_vowels 10 / double_consonants 5 / compound_vowels 11 |
| `random_pool` | 24（各 vocab 5＝120） | index のみ。basic 子音＋母音。雙子音・複合母音は表だけ |

ランダム: 初回ロードで1件表示。產生で次件。直前 `id` と同一は避ける。

---

## 2. ワイヤー（文字図）

### 2.1 index（390 基準）

```
┌─────────────────────────────┐
│ 韓文字母練習          練習 字表 │  ← ナビ：現在＝練習を強調
├─────────────────────────────┤
│                             │
│            ㄱ               │  ← 大ハングル ~96–120px
│           g/k               │  ← roman 補助・secondary
│                             │
│  讀音介乎 g／k。字首常偏軟…   │  ← summary_zh · 本文サイズ
│                             │
│  相關詞彙                    │  ← 小見出し
│  ┌─────────────────────┐   │
│  │ 가̲방          書包   │   │  ← highlight 部分だけ強調
│  │ 가̲다          去     │   │
│  │ 고̲기          肉     │   │
│  │ …                    │   │
│  └─────────────────────┘   │
│                             │
│      ┌───────────┐          │
│      │   產生    │          │  ← 主ボタン ≥48px 高・幅広め
│      └───────────┘          │
└─────────────────────────────┘
```

- 產生は画面下部固定でも、コンテンツ末でも可。**推奨: 語彙の直下（スクロール1画面内に収まるよう）**。長い summary でもボタンが隠れすぎないよう、viewport 390 で「字母＋要約先頭＋產生」が見えることを優先。
- 空状態なし（常に1件）。ローディングは瞬時でよい（静的データ）。

### 2.2 table（390）

```
┌─────────────────────────────┐
│ 韓文字母練習          練習 字表 │
├─────────────────────────────┤
│ 基本子音                     │
│ ㄱ g/k   ㄴ n   ㄷ d/t  …   │  ← 2〜4列グリッド
│                             │
│ 基本母音                     │
│ ㅏ a    ㅑ ya   …           │
│                             │
│ 雙子音（進階）               │
│ ㄲ …                        │
│                             │
│ 複合母音（進階）             │
│ ㅐ …                        │
└─────────────────────────────┘
```

各セル最低: **大めの char** ＋ 下に roman（小さく）。`name_zh` はセル内に入れず、**タップ／フォーカスで詳細**または行の副ラベル。モバイルでは:

- **推奨 A（シンプル）:** グリッドは `char`＋`roman` のみ。セクション見出しの下に1行説明は不要（meta の scope はページ先頭に短く1回で可）。
- セルタップで下に展開して `name_zh` を出すのは任意（v1 は無しでも可）。v1 acceptance は「見える・読める」で足りる。

セクション順（substance `order`）:

1. 基本子音  
2. 基本母音  
3. 雙子音  
4. 複合母音  

進階2セクションは見出しに **（進階）** を付け、ランダム練習に出ないことを匂わせる（長文説明不要）。

---

## 3. UI 文言ロック（繁中）

| 場所 | 文言 |
|------|------|
| サイト名（ヘッダー） | **韓文字母練習** |
| 副標（任意・小さく） | koko-hangul |
| ナビ・練習 | **練習** |
| ナビ・字表 | **字表** |
| 主ボタン | **產生** |
| 語彙見出し | **相關詞彙** |
| 表セクション | **基本子音** / **基本母音** / **雙子音** / **複合母音** |
| 進階注（セクション横または下） | **進階** または見出し内「雙子音（進階）」 |
| 表ページ先頭（任意1行） | **先記基本24個字母；雙子音與複合母音可稍後再記。** |
| 戻る相当 | ナビで十分。詳細モーダルが無いので「返回」不要 |

**禁止:** Unlock / Master Hangul / AI-powered / 智能學習 / 一鍵精通 / Explore / Dive in / 讓我們開始吧（煽り）/ 英語スローガン全般。

データ由来（書き換えない）: `summary_zh` · `meaning_zh` · `name_zh` · `char` · `word` · `roman`。

---

## 4. ハイライト仕様（見た目）

- 語彙行レイアウト: 左に **word**（ハングル）、右に **meaning_zh**（繁中）。1行・折り返し可。
- `highlight` 配列の各文字列が `word` 内に出現する部分を強調。  
  **推奨:** 背景薄いアクセント（例 `#D6E4F0`）＋字は ink のまま、または **font-weight 700** のみ。色覚のため **太字＋背景**の二重が安全。
- highlight が複数・重複してもすべて印。マッチしない（データ不整合）場合は行全体を普通表示し、デザイン側で黙ってスキップ（教材は触らない・コンソール警告は Jessie 任意）。
- ローマ字列は語彙行に出さない（v1）。表セルの roman のみ。

---

## 5. ビジュアル（Direction D · 清墨練習）

| 役割 | Hex | 使いどころ |
|------|-----|------------|
| page | `#F7F8FA` | 背景（冷灰白・紙クリーム禁止） |
| surface | `#FFFFFF` | 語彙カード／字母周りの面 |
| ink | `#1A1A1A` | 本文・大ハングル・ナビ現在 |
| secondary | `#5C6570` | roman・副標・非選択ナビ |
| line | `#E2E5EA` | 区切り |
| accent | `#2F5D8A` | 產生塗り・ナビ現在下線・任意フォーカスリング |
| highlight-bg | `#D6E4F0` | 語彙内ハイライト背景 |

字:

- 繁中 UI: `"PingFang TC", "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif` · `lang="zh-Hant"`
- ハングル: `"Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif`（webfont 必須にしない。システム優先）
- 大字母: **96–120px**（320 では ~80–96）、line-height 1
- summary: **17–18px / 1.65**
- 語彙: ハングル **18–20px**、意味 **15–16px** secondary 可
- 產生: **17px** W6、白字 on accent、角丸 10–12、高さ ≥48、左右 padding 充分（幅 min ~160 またはほぼフル幅）

装飾: ヒーローイラスト・マスコット大写し無し。favicon 可。

---

## 6. レスポンシブ

- モバイル優先。基準 **390px**
- 証明幅: **320 / 360 / 390 / 430** ＋ desktop 中央カラム max ~560–640px
- desktop Chrome ＋ iPhone WebKit（Safari・iOS Chrome）
- 大ハングルがはみ出して横スクロールしない
- 產生タップ高 ≥48px、ナビ・字表セル ≥44px

---

## 7. Acceptance list（計測可）

1. `/` がデフォルト。初回ロードで random_pool から1件（大 char・summary_zh・語彙5・highlight）を表示。
2. **產生** で別 `id` を表示（直前と同一回避）。文言は繁中「產生」。
3. 語彙行に word＋meaning_zh。highlight 指定部分が視覚的に区別できる（太字および／または背景）。
4. ナビ **練習** / **字表** が繁中。現在ページが分かる。`/table/`（または同等）で全文表。
5. 字表が4セクション（基本子音・基本母音・雙子音・複合母音）。letters_table 40項目すべて見える。各項目に char（必須）と roman（あれば）。
6. UI chrome が繁中のみ。§3 禁止コピー無し。教材 YAML 文言をデザインで改変しない。
7. 320–430 で横スクロール無し。タップ高 §6。コントラスト本文 ≥4.5:1、產生白字 on accent ≥4.5:1。
8. desktop Chrome と iPhone WebKit で 7 を満たす。
9. 静的 GitHub Pages。ログイン無し。PREVIEW バッジは Jessie／pages-preview-live。LIVE は Justin OK 後のみ。
10. momo-jp と別 repo・別トーン（清墨。紙ノートクリームにしない）。

---

## 8. Handoff

| To | いつ | 何 |
|----|------|-----|
| Sua | いま | この `briefs/brief-koko-hangul-v1.md`。Justin に Direction D の OK を取る |
| Jessie | Justin OK 後（Sua 経由） | 本 brief ＋ substance。`design-build-handoff` → preview → acceptance → Justin visual → LIVE。報告先 Sua。author: `justinksw-git-author` |
| Koko | 継続 | データのみ。UI 文言追加が必要なら Celine brief 新版 |

**パス（box）:**

- `/workspace/koko-hangul/briefs/brief-koko-hangul-v1.md` ← この版
- `/workspace/koko-hangul/briefs/koko-hangul-plan-v1.md`
- `/workspace/koko-hangul/briefs/substance-hangul-v1.yaml`

**いま Jessie には振らない。**

---

## 9. Self-critique

- 大字母＋5語彙＋產生は390で縦に長い → 產生を語彙直下に置き、余白を詰める。固定フッターは任意（被り注意）。
- highlight が音節単位（가）で字母（ㄱ）と一致しないのはデータ仕様。見た目は「語の中の該当音節」を印すだけでよい（plan どおり）。
- Direction D の青が強すぎると「アプリ宣伝」に寄る → accent はボタンとナビ現在のみ。ハイライトは薄い青背景。
- 字表セルに name_zh を全部出すと密集 → v1 は char＋roman。不足なら punch で展開を足す。
