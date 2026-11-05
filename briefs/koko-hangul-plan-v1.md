# koko-hangul plan v1

- Date: 2026-11-05
- Owner window: Sua
- Repo: `justinksw/koko-hangul` (public GitHub Pages)
- Live URL (target): https://justinksw.github.io/koko-hangul/
- Audience: Justin personal Korean hangul practice (momo-jp と別ハブ)

## 目的

初心者がハングル文字を覚えられる静的サイト。ランダムに1文字（または1音節単位）を出し、関連語彙で定着。全文表で一覧も見られる。

## ページ構成

| Path | 内容 | 備考 |
|------|------|------|
| `/` (index) | ランダム生成 | **デフォルト** |
| `/table/` または同等サブ | ハングル全文表 | ナビから到達 |

ナビ: 繁中ラベルで「練習 / 字表」など（文言はCelineが最終）。

## Generate 仕様（index）

- 大きな「產生」ボタン（繁中）。クリックで新しいランダムハングルを出す。
- 表示: 大きなハングル本体 ＋ 短い読み／分類メモ（Kokoが用意する要約フィールド）＋ 関連語彙リスト。
- 初回ロード時も1件表示してよい（空画面にしない）。
- 同一連続は避ける（直前と違うものを出す）程度で十分。

## 語彙ハイライト仕様

- 各語彙行: ハングル語 ＋ 繁中意味（必要ならローマ字は任意）。
- **対象ハングル（今回生成された文字／jamo）が語の中でどこに出るか、視覚ハイライト**（色／太字など。見た目はCeline）。
- ハイライト対象スパンはデータ側で指定できる形にする（例: `highlight: ["가"]` または start/end index。Kokoが埋める）。

## UI

- すべて繁体字中国語（ボタン・ナビ・見出し・説明）。ハングル本体と韓国語語彙はそのまま。
- モバイル優先。AI臭いコピー禁止。
- ピクセル／トーン → Celine。実装 → Jessie。

## データ形（Kokoが埋める）

### A. 全文表（table）

各エントリ最低:

```yaml
id: "ㄱ"           # 安定ID
char: "ㄱ"         # 表示文字
kind: "consonant"  # consonant | vowel | compound | syllable などKokoが決める分類
name_zh: "…"       # 繁中呼び名／短い説明
roman: "g/k"       # 任意
order: 1           # 表の並び
```

表は「子音／母音／…」セクション分け可。範囲はKokoが初心者向けに決める（基本字母必須。複合・バッチはKoko判断でメモに注記）。

### B. ランダム用プール＋語彙

各エントリ最低:

```yaml
id: "ga"
char: "가"              # 生成で出す本体（字母単体でも音節でも可・Kokoが統一）
summary_zh: "…"         # 1〜2行の繁中要約（どう読む／仲間）
vocab:
  - word: "가방"
    meaning_zh: "袋子"
    highlight: ["가"]   # word内でハイライトする部分（必須）
  - word: "가다"
    meaning_zh: "去"
    highlight: ["가"]
```

- 各 `char` に語彙 **最低3件**（できれば5）。
- 語彙は初級寄り。繁中意味必須。
- ファイル置き場案（Jessie実装時に合わせてよい）: `data/jamo.json` / `data/vocab.json` または単一 `data/hangul.json`。Kokoはまず briefs 下に MD/YAML で納品してよい。

## 役割

| Who | Do |
|-----|----|
| Sua | このメモ・窓口・調整 |
| Koko | 表データ＋要約＋語彙＋ハイライト欄。デザイン／コード触らない |
| Celine | 繁中UI／レイアウト。コード書かない |
| Jessie | 実装・Pages preview→acceptance→live |

Momoなし。Beatriceなし。momo-jpと別repo。

## 成功条件

1. index で產生ボタン → 毎回新しいハングル＋語彙（ハイライトあり）
2. サブページで全文表が見られる
3. UI文言が繁中
4. justinksw.github.io/koko-hangul/ で公開（preview→Justin OK→live）

## 報告先

すべて Sua。Justin へは Sua がラップ。

## 書かない（このメモ）

- ピクセル／色（→Celine）
- ビルド実装詳細（→Jessie）
- 実際のハングル教材中身（→Koko）
