import { storage } from '@/utils/localStorage';
import { useState } from 'react';

/**
 * A hook that mirrors a piece of state to localStorage.
 * Falls back gracefully if localStorage is unavailable.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const raw = storage.get(key);
    return raw !== null ? (raw as T) : initialValue;
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    storage.set(key, valueToStore);
  };

  return [storedValue, setValue];
}
