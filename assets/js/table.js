const DATA_URL = new URL("../../data/hangul.json", import.meta.url);

const SECTIONS = [
  { key: "basic_consonants", title: "基本子音", advanced: false },
  { key: "basic_vowels", title: "基本母音", advanced: false },
  { key: "double_consonants", title: "雙子音", advanced: true },
  { key: "compound_vowels", title: "複合母音", advanced: true },
];

function renderCell(letter) {
  const cell = document.createElement("div");
  cell.className = "letter-cell";
  cell.setAttribute("role", "listitem");

  const ch = document.createElement("span");
  ch.className = "letter-char";
  ch.textContent = letter.char;
  cell.appendChild(ch);

  if (letter.roman) {
    const ro = document.createElement("span");
    ro.className = "letter-roman";
    ro.textContent = letter.roman;
    cell.appendChild(ro);
  }

  if (letter.ipa) {
    const ipa = document.createElement("span");
    ipa.className = "letter-ipa";
    ipa.textContent = letter.ipa;
    cell.appendChild(ipa);
  }

  return cell;
}

async function init() {
  const res = await fetch(DATA_URL);
  const data = await res.json();
  const letters = data.letters_table || [];
  const root = document.getElementById("table-sections");

  SECTIONS.forEach(({ key, title, advanced }) => {
    const section = document.createElement("section");
    section.className = "table-section";

    const heading = document.createElement("h2");
    heading.className = "table-section-title";
    heading.appendChild(document.createTextNode(title));
    if (advanced) {
      const tag = document.createElement("span");
      tag.className = "section-tag";
      tag.textContent = "進階";
      heading.appendChild(tag);
    }
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "letter-grid";
    grid.setAttribute("role", "list");

    letters
      .filter((L) => L.section === key)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .forEach((L) => grid.appendChild(renderCell(L)));

    section.appendChild(grid);
    root.appendChild(section);
  });
}

init().catch((err) => {
  console.error("Failed to load table data", err);
});
