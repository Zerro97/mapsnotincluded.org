export default function hash(str: string) {
  str = str.toLowerCase();
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = char + (hash << 6) + (hash << 16) - hash;
  }

  // Return as an unsigned 32-bit integer
  return hash >>> 0;
}
