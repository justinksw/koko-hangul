import { highlightWord } from "./highlight.js";

const DATA_URL = new URL("../../data/hangul.json", import.meta.url);

let pool = [];
let lettersByChar = new Map();
let lastId = null;

function pickRandom(excludeId) {
  const candidates = excludeId
    ? pool.filter((item) => item.id !== excludeId)
    : pool.slice();
  if (!candidates.length) {
    return pool[0] || null;
  }
  const idx = Math.floor(Math.random() * candidates.length);
  return candidates[idx];
}

function letterMetaForChar(char) {
  return lettersByChar.get(char) || null;
}

function renderCharMeta(item) {
  const metaEl = document.getElementById("char-meta");
  const letter = letterMetaForChar(item.char);
  const roman = (letter && letter.roman) || "";
  const ipa = item.ipa || (letter && letter.ipa) || "";

  metaEl.innerHTML = "";
  metaEl.hidden = !roman && !ipa;

  if (roman) {
    metaEl.appendChild(document.createTextNode(roman));
  }
  if (ipa) {
    if (roman) {
      metaEl.appendChild(document.createTextNode(" · "));
    }
    const ipaSpan = document.createElement("span");
    ipaSpan.className = "char-ipa";
    ipaSpan.textContent = ipa;
    metaEl.appendChild(ipaSpan);
  }
}

function renderItem(item) {
  const charEl = document.getElementById("char-main");
  const summaryEl = document.getElementById("summary-zh");
  const listEl = document.getElementById("vocab-list");

  if (!item) return;

  charEl.textContent = item.char;
  renderCharMeta(item);
  summaryEl.textContent = item.summary_zh || "";

  listEl.innerHTML = "";
  (item.vocab || []).forEach((v) => {
    const li = document.createElement("li");
    li.className = "vocab-row";

    const wordSpan = document.createElement("span");
    wordSpan.className = "vocab-word";
    wordSpan.innerHTML = highlightWord(v.word, v.highlight);

    if (v.ipa) {
      const ipaSpan = document.createElement("span");
      ipaSpan.className = "vocab-ipa";
      ipaSpan.textContent = v.ipa;
      li.appendChild(wordSpan);
      li.appendChild(ipaSpan);
    } else {
      li.appendChild(wordSpan);
    }

    const meaningSpan = document.createElement("span");
    meaningSpan.className = "vocab-meaning";
    meaningSpan.textContent = v.meaning_zh || "";
    li.appendChild(meaningSpan);
    listEl.appendChild(li);
  });

  lastId = item.id;
}

async function init() {
  const res = await fetch(DATA_URL);
  const data = await res.json();
  pool = data.random_pool || [];
  (data.letters_table || []).forEach((L) => {
    lettersByChar.set(L.char, L);
  });

  document.getElementById("btn-next").addEventListener("click", () => {
    renderItem(pickRandom(lastId));
  });

  renderItem(pickRandom(null));
}

init().catch((err) => {
  console.error("Failed to load practice data", err);
});
