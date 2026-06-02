const STORAGE_KEY = "darhous:automation:saved";

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeIds(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function getSaved(): string[] {
  return readIds();
}

export function isSaved(id: string): boolean {
  return readIds().includes(id);
}

export function toggleSaved(id: string): boolean {
  const ids = readIds();
  const idx = ids.indexOf(id);
  if (idx === -1) {
    writeIds([...ids, id]);
    return true;
  }
  writeIds(ids.filter((x) => x !== id));
  return false;
}
