/**
 * Escape HTML and apply highlight spans per substance highlight[] strings.
 */
export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function highlightWord(word, highlights) {
  if (!word) return "";
  if (!highlights || !highlights.length) {
    return escapeHtml(word);
  }

  let segments = [{ text: word, highlight: false }];

  for (const needle of highlights) {
    if (!needle) continue;
    const next = [];
    for (const seg of segments) {
      if (seg.highlight) {
        next.push(seg);
        continue;
      }
      const text = seg.text;
      let pos = 0;
      let found = false;
      while (pos < text.length) {
        const idx = text.indexOf(needle, pos);
        if (idx === -1) break;
        found = true;
        if (idx > pos) {
          next.push({ text: text.slice(pos, idx), highlight: false });
        }
        next.push({ text: needle, highlight: true });
        pos = idx + needle.length;
      }
      if (!found) {
        next.push(seg);
      } else if (pos < text.length) {
        next.push({ text: text.slice(pos), highlight: false });
      }
    }
    segments = next;
  }

  return segments
    .map((s) =>
      s.highlight
        ? `<span class="hl">${escapeHtml(s.text)}</span>`
        : escapeHtml(s.text)
    )
    .join("");
}
