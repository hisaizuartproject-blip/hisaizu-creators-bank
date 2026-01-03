export function normalizeInstagram(input?: string | null): string | null {
  if (!input) return null;
  const raw = input.trim();
  if (!raw) return null;

  if (raw.startsWith("@")) {
    return `https://www.instagram.com/${raw.slice(1)}/`;
  }
  if (!raw.includes("/") && !raw.includes(".")) {
    return `https://www.instagram.com/${raw}/`;
  }
  if (raw.includes("instagram.com")) {
    return raw.endsWith("/") ? raw : `${raw}/`;
  }
  return null;
}