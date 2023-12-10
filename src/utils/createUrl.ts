export function createUrl(path: string) {
  if (path[0] == "/") {
    return `${process.env.DOMAIN}/${path.slice(1)}`;
  }
  return `${process.env.DOMAIN}/${path}`;
}
