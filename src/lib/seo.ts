export const SITE_URL = "https://www.sheshaanglobal.com";
export const SITE_NAME = "Sheshaan Global";
export const SITE_UPDATED = "2026-10-10";
export const DEFAULT_OG_IMAGE = "https://www.sheshaanglobal.com/logo.png";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function seoTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export const DEFAULT_KEYWORDS = [
  "Indian agricultural exporter",
  "agri commodity exporter India",
  "onion exporter India",
  "green chillies exporter India",
  "basmati rice exporter India",
  "spices exporter India",
  "pulses exporter India",
  "APEDA exporter",
  "IEC certified exporter",
  "Sheshaan Global",
].join(", ");
