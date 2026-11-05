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

function romanForChar(char) {
  const letter = lettersByChar.get(char);
  return letter && letter.roman ? letter.roman : "";
}

function renderItem(item) {
  const charEl = document.getElementById("char-main");
  const romanEl = document.getElementById("char-roman");
  const summaryEl = document.getElementById("summary-zh");
  const listEl = document.getElementById("vocab-list");

  if (!item) return;

  charEl.textContent = item.char;
  const roman = romanForChar(item.char);
  romanEl.textContent = roman;
  romanEl.hidden = !roman;
  summaryEl.textContent = item.summary_zh || "";

  listEl.innerHTML = "";
  (item.vocab || []).forEach((v) => {
    const li = document.createElement("li");
    li.className = "vocab-row";
    const wordSpan = document.createElement("span");
    wordSpan.className = "vocab-word";
    wordSpan.innerHTML = highlightWord(v.word, v.highlight);
    const meaningSpan = document.createElement("span");
    meaningSpan.className = "vocab-meaning";
    meaningSpan.textContent = v.meaning_zh || "";
    li.appendChild(wordSpan);
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

  const btn = document.getElementById("btn-generate");
  btn.addEventListener("click", () => {
    renderItem(pickRandom(lastId));
  });

  renderItem(pickRandom(null));
}

init().catch((err) => {
  console.error("Failed to load practice data", err);
});
