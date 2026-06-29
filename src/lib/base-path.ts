export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path: string): string {
  if (/^(https?:)?\/\//i.test(path) || /^(data|blob):/i.test(path)) {
    return path;
  }
  if (!path.startsWith("/")) {
    return `${basePath}/${path}`;
  }
  return `${basePath}${path}`;
}
