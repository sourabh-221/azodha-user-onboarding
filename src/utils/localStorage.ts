/**
 * Type-safe localStorage helpers.
 * All values are JSON-serialised; parse errors return null instead of throwing.
 * Persists across browser sessions.
 */
export const storage = {
  get(key: string): unknown {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw) as unknown;
    } catch {
      return null;
    }
  },

  set(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage quota exceeded or unavailable — fail silently
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // Fail silently
    }
  },
};

/**
 * Type-safe sessionStorage helpers.
 * All values are JSON-serialised; parse errors return null instead of throwing.
 * Clears automatically when browser tab/session closes.
 */
export const sessionStore = {
  get(key: string): unknown {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw) as unknown;
    } catch {
      return null;
    }
  },

  set(key: string, value: unknown): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage quota exceeded or unavailable — fail silently
    }
  },

  remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch {
      // Fail silently
    }
  },
};
