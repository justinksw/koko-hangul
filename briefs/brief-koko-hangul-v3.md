# koko-hangul · design brief v3

**Celine · Designer** · 2026-11-05  
報告先: Sua →（brief＋substance-v3 揃い後）Jessie  
根拠: `brief-koko-hangul-v2.md` ＋ Justin「詞彙也需要注音」→ 例詞に roman  
範囲: **v2 の punch**（例詞行階層・データ欄のみ）。色・Direction D+・文言ロックは v2 継承。コード書かない。LIVE HOLD。

Repo: `justinksw/koko-hangul` · PREVIEW https://justinksw.github.io/koko-hangul/

---

## 0. なぜ醜く見えたか（v1 PREVIEW 診断）

実装は brief-v1 トークンどおりだが、結果が **薄い SaaS カード** に寄った:

1. **白い枠カード一枚**が冷灰地に浮き、字母〜ボタンまで同じ面 → 階層が無い  
2. **產生が全幅アクセント塗り** → 「生成アプリ」感。教材フラッシュカードに見えない  
3. **字母の下に roman だけ** → 補助が貧弱。summary と語彙の間も一本線リストで教材感が薄い  
4. **文言が硬い** — 產生／相關詞彙／韓文字母練習／長めの表イントロが AI・製品コピー寄り  
5. **余白が均一**（24/20）でリズムが無く、字サイズ差も弱い  

v2 = Direction **D+ · 清墨教材**（D の冷紙＋青一点は維持。階層・字・文言・IPA を上げる）。

---

## 1. Direction（ロック）

| 項目 | v2 |
|------|-----|
| トーン | 静かな **教材カード**。ハングルが主役。宣伝・生成ツールに見せない |
| 色 | 冷灰紙は維持しつつ、面を分け、アクセントはナビ現在＋小さなアクションのみ |
| 字 | 字母もっと大きくはっきり。繁中本文は落ち着いた教科書サイズ。IPA は小さく等幅寄り |
| 文言 | 自然な繁中（下表）。英語スローガン・智能學習系禁止は継続 |
| 新 | **IPA**（字母・語彙）＋例詞の **roman（注音）**。Koko substance-**v3** が埋める |

Justin へ: v3 は v2 見た目のまま、例詞にローマ字注音を足す。visual は実装後。いまは brief のみ。

---

## 2. 情報設計（v2 継承＋例詞 roman）

```
/ (練習 · デフォルト)
  ├─ ヘッダー（短名＋ナビ）
  ├─ 字母ブロック（枠なし／薄い well）
  │    ├─ 大ハングル char
  │    ├─ 補助行: roman · IPA
  │    └─ summary_zh
  ├─ 例詞リスト（見出し＋5行・highlight＋各行 roman＋IPA）
  └─ 次へボタン

/table/
  ├─ 同ヘッダー
  ├─ 短い導入1行
  └─ 4セクション格子（char ＋ roman · IPA）
```

| 源 | 件数 | 備考 |
|----|------|------|
| `letters_table` | 40 | 字表。`roman` ＋ **`ipa`**（Koko v2/v3） |
| `random_pool` | 24×5 | 練習。エントリ `ipa`。各 vocab: **`roman`**（注音・v3 新）＋ **`ipa`** ＋ highlight |

ランダム・同一回避は v1 どおり。`roman`／`ipa` 欠落時は **その欄だけ出さない**（空スロットや「—」を並べない）。

---

## 3. ワイヤー（390）

### 3.1 練習

```
┌─────────────────────────────┐
│ 韓語字母            練習  字表 │  ← セグメント風ナビ（pill）
├─────────────────────────────┤
│                             │
│            ㄱ               │  ← ~112–128px · 中央
│        g/k  ·  /k/          │  ← roman · IPA（13–14px secondary）
│                             │
│  讀音介乎 g／k。字首常偏軟…   │  ← summary · 左右揃え・やや狭い measure
│                             │
│  例詞                        │
│  가방  gabang  /ka.baŋ/  書包 │  ← 4欄: 語｜罗马字｜IPA｜意
│  가다  gada    /ka.da/   去   │     highlight は語（ハングル）の中だけ
│  …                          │
│                             │
│         ┌─────────┐         │
│         │ 下一個  │         │  ← 半幅〜最大 240px・中央。枠ボタン推奨
│         └─────────┘         │
└─────────────────────────────┘
```

- **字母ブロック:** 外側の太い白カードをやめる。page 地のまま、またはごく薄い well（`#EEF1F5`）で字母＋補助だけ囲む。summary／例詞はカード外。  
- **例詞:** **語｜罗马字｜IPA｜意** の4欄。行間 padding 14–16。区切り hairline。右端意味は secondary。  
  - 語（ハングル）19px・highlight 可  
  - 罗马字 12–13px secondary（UI 字・イタリック可）  
  - IPA 12–13px secondary mono  
  - 意 14–15px secondary・右寄せ  
  - **320px:** 4欄が詰まるときは 上段「語＋意」、下段「罗马字 · IPA」（折り返し2行）を許容。大改レイアウト不要。  
- **ボタン:** 全幅塗りをやめる。中央寄せ・min-height 48・左右 padding 28。**塗りより枠＋accent 字**（または薄い fill `#E8F0F7`＋accent 字）を推奨。押した感じは subtle。

### 3.2 字表

```
│ 韓語字母            練習  字表 │
│ 基本二十四個先記；雙子音、複合母音之後再看即可。 │
│ 基本子音                     │
│ ┌──┐ ┌──┐ ┌──┐              │
│ │ㄱ │ │ㄴ │ …               │  ← セル: 大 char
│ │g/k│ │ n │                  │     下: roman
│ │/k/│ │/n/│                  │     その下: IPA さらに小さく
```

進階セクション見出し: **雙子音**／**複合母音**（「進階」は見出し横に小さく、括弧長文にしない）。

---

## 4. UI 文言（v2 ロック・自然な繁中）

| 場所 | v1（廃止寄り） | **v2** |
|------|----------------|--------|
| サイト名 | 韓文字母練習 | **韓語字母** |
| 副標 | koko-hangul | **出さない**（URL／repo 名は UI に不要） |
| ナビ | 練習 / 字表 | **練習** / **字表**（維持） |
| 主ボタン | 產生 | **下一個** |
| 語彙見出し | 相關詞彙 | **例詞** |
| 表導入 | 先記基本24個字母；雙子音與複合母音可稍後再記。 | **基本二十四個先記；雙子音、複合母音之後再看即可。** |
| セクション | 基本子音／基本母音／雙子音（進階）／複合母音（進階） | **基本子音**／**基本母音**／**雙子音**／**複合母音**（進階は別小ラベル可） |
| PREVIEW バー（Jessie） | PREVIEW · 預覽版（非正式上線） | **預覽** のみ短く（英字 PREVIEW 重複しない） |

**禁止（追加）:** 產生、生成、相關詞彙、智能、一鍵、Unlock、Master、Explore、Dive、讓我們、開始你的學習之旅、koko-hangul をタイトル横に出すこと。

データフィールド（Koko・改変しない）: `summary_zh` · `meaning_zh` · `name_zh` · `char` · `word` · `roman`（字母・**例詞**）· **`ipa`**。

---

## 5. 注音・IPA 表示仕様

### 5.1 データ（Koko substance-v3 想定）

```yaml
# letters_table / random_pool エントリ
ipa: "/k/"          # 字母の代表発音。スラッシュ有無は Koko 統一

# vocab 行（v3）
- word: 가방
  roman: gabang     # 注音・Justin 要求。表記は Koko 統一（空白なし推奨）
  meaning_zh: 書包
  highlight: [가]
  ipa: "/ka.baŋ/"   # 語全体
```

- 空・欠落 → その IPA スパンを DOM に出さない。  
- UI ラベル「IPA」「音標」は **出さない**（記号 `/…/` で足りる）。教材っぽく静かに。

### 5.2 見た目

| 場所 | スタイル |
|------|----------|
| 字母下 | `roman` の右に中黒 `·` または細い縦線、続けて `ipa`。同一行。13–14px · secondary · `font-family: "SF Mono", "Menlo", "Consolas", ui-monospace, monospace`（無ければ UI 字でも可） |
| 例詞行 | **語｜罗马字｜IPA｜意**。罗马字・IPA は secondary 小字。320 では語＋意の下に「罗马字 · IPA」1行にまとめて可 |
| 字表セル | roman の下に IPA。11–12px。セル min-height を確保し潰れないこと |

---

## 6. ビジュアル（D+ トークン）

| 役割 | Hex | 使いどころ |
|------|-----|------------|
| page | `#F4F5F7` | 背景（v1 よりわずかに沈める） |
| well | `#EEF1F5` | 字母まわりの薄い皿のみ |
| surface | `#FFFFFF` | 使うなら例詞ブロックだけ。全面カード禁止 |
| ink | `#141414` | 大ハングル・見出し |
| secondary | `#5A6570` | roman・IPA・意味・非選択ナビ |
| line | `#DDE1E6` | hairline |
| accent | `#2A5680` | ナビ現在・枠ボタン字／hover（v1 よりわずかに沈静） |
| accent-soft | `#E8F0F7` | 枠ボタン薄い塗り／highlight 以外のソフト面 |
| highlight-bg | `#CFE0F0` | 例詞内ハイライト（少しはっきり） |

字:

- 繁中: `"PingFang TC", "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif` · `lang="zh-Hant"`
- 韓: `"Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif`
- IPA: mono スタック上記  
- 大字母: **clamp(96px, 26vw, 128px)** · weight 500（可能な環境）  
- summary: **16px / 1.7** · max 幅 ~34rem 相当で読みやすく  
- 例詞語: **19px** · 意味 **14–15px**  
- ナビ: **15px** · 現在は soft pill（`accent-soft` 地＋ accent 字）または下線＋字色。v1 の薄い下線だけはやめる  
- ボタン「下一個」: 15–16px W6

装飾: グラデ・イラスト・マスコット無し。角丸は 8–10 に抑え「アプリカード」にしない。

---

## 7. レスポンシブ・タップ

- 基準 390。証明 **320 / 360 / 390 / 430** ＋ desktop max ~600px  
- Chrome ＋ iPhone WebKit  
- 横スクロール無し。大字母・IPA 折り返し可  
- ナビ・字表セル ≥44px。下一個 ≥48px  

---

## 8. Acceptance（v2）

1. `/` 初回1件: 大 char、roman、**ipa（あれば）**、summary_zh、例詞5（highlight＋各行 **roman**＋**ipa** あれば）。  
2. **下一個** で直前と異なる id。全幅塗りボタンではない（枠／soft 中央寄せ）。  
3. UI 文言が §4 v2 表どおり。產生・相關詞彙・サイト副標 koko-hangul・長い PREVIEW 英語重複なし。  
4. ナビ 練習／字表。字表4セクション・40項目。セルに char＋roman＋ipa（あれば）。  
5. IPA 欠落時に空欄や「—」を並べない。  
6. 全面白カード一枚レイアウトでない（字母 well と例詞の階層が目で分かる）。  
7. 320–430 横スクロール無し。コントラスト本文・ボタン字 ≥4.5:1。  
8. desktop Chrome ＋ iPhone WebKit で 7。  
9. 静的 Pages。PREVIEW 短ラベル。LIVE は Justin visual OK 後のみ。  
10. 教材 YAML をデザインで改変しない。substance **v3**（例詞 `roman`＋`ipa`）を正とする。欠落欄は非表示。

---

## 9. Handoff

| To | いつ | 何 |
|----|------|-----|
| Sua | いま | この `brief-koko-hangul-v3.md`。Koko substance-v3（vocab.roman）受領後 Jessie |
| Koko | 並行 | `substance-hangul-v3.yaml`: 各 vocab に **`roman`**（注音）。ipa は v2 継続。報告 Sua |
| Jessie | **brief-v3 ＋ substance-v3 揃ってから** | design-build-handoff → PREVIEW → acceptance → Sua → Justin visual → LIVE。author `justinksw-git-author` |

**パス:**

- `/workspace/koko-hangul/briefs/brief-koko-hangul-v3.md` ← **正**
- `/workspace/koko-hangul/briefs/brief-koko-hangul-v2.md`（旧・D+）
- `/workspace/koko-hangul/briefs/koko-hangul-plan-v1.md`
- substance: v3 待ち（v2 があれば ipa ベース。v1: `substance-hangul-v1.yaml`）

**いま Jessie に振らない**（brief＋substance-v3 揃ってから）。

---

## 10. Self-critique

- v3 は例詞 roman 追加のみ。D+ の色・ボタン・文言は触らない（Justin 大改不要）。  
- 4欄は320で厳しい → 2行フォールバックを acceptance で明示済み。  
- 罗马字と IPA が似て見えると冗長 → 字区別（roman＝UI 字／ipa＝mono）を維持。  
- substance-v3 未着なら Jessie 着手しない。
