// Strip Markdown emphasis artifacts and escaped quotes that LLM output often
// contains, so the AI cards render clean plain text.
export function cleanAiText(text) {
  if (!text) return '';
  return String(text)
    .replace(/\\"/g, '"')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .trim();
}
