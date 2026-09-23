/**
 * Resolves frontend asset paths to be 100% compatible with GitHub Pages base deployment URL.
 * 
 * Works across both local Vite dev server ('/') and production GitHub Pages ('/qeq-studio/').
 * Correctly encodes folder/file names containing spaces (e.g. "hero animation images", "hero animation.mp4").
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';

  // Return absolute remote URLs or data/blob URIs untouched
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Get base URL from Vite environment (defaults to '/' in dev, '/qeq-studio/' in prod)
  const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL)
    ? import.meta.env.BASE_URL
    : '/';

  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  // Remove leading slash for clean joining
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // If path is already prefixed with base without leading slash, avoid double prefixing
  const basePrefix = normalizedBase.startsWith('/') ? normalizedBase.slice(1) : normalizedBase;
  if (basePrefix && cleanPath.startsWith(basePrefix)) {
    cleanPath = cleanPath.slice(basePrefix.length);
  }

  // Combine base and clean path
  const fullPath = `${normalizedBase}${cleanPath}`;

  // Use encodeURI so spaces and special characters are safely escaped for the browser (e.g., %20)
  return encodeURI(fullPath);
}

export default getAssetUrl;
