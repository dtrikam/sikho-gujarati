/**
 * Tiny progress store backed by localStorage.
 *
 * Designed for React's `useSyncExternalStore`, which avoids hydration
 * mismatches: the server (and first client render) see an empty state, then
 * React re-renders with the saved progress once it's available.
 *
 * Shape: { [categoryId]: learnedItemId[] }
 */

export type ProgressState = Readonly<Record<string, readonly string[]>>;

const STORAGE_KEY = "sikho-gujarati:progress:v1";
const EMPTY: ProgressState = Object.freeze({});

let state: ProgressState | null = null;
const listeners = new Set<() => void>();

function parse(raw: string | null): ProgressState {
  if (!raw) return EMPTY;
  try {
    const value: unknown = JSON.parse(raw);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as ProgressState;
    }
  } catch {
    // Corrupt data — fall through and start fresh.
  }
  return EMPTY;
}

function load(): ProgressState {
  if (state === null) {
    try {
      state = parse(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      // Storage can be unavailable (e.g. some private browsing modes).
      state = EMPTY;
    }
  }
  return state;
}

function commit(next: ProgressState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Keep working in-memory if storage is full/unavailable.
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  // Keep multiple open tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      state = parse(event.newValue);
      listener();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export const getSnapshot = load;
export const getServerSnapshot = (): ProgressState => EMPTY;

export function setLearned(
  categoryId: string,
  itemId: string,
  learned: boolean,
) {
  const current = load();
  const ids = new Set(current[categoryId] ?? []);
  if (ids.has(itemId) === learned) return;

  if (learned) ids.add(itemId);
  else ids.delete(itemId);

  commit({ ...current, [categoryId]: [...ids] });
}

export function resetCategory(categoryId: string) {
  const current = load();
  if (!current[categoryId]?.length) return;
  commit({ ...current, [categoryId]: [] });
}
