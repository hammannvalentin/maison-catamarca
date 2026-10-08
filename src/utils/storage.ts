/**
 * Persistent storage helper using IndexedDB with localStorage fallback
 * Prevents QuotaExceededError when uploading and storing images as base64/data URLs.
 */

const DB_NAME = 'maison_cherry_store_db';
const DB_VERSION = 1;
const STORE_NAME = 'app_data';

function openDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') {
      resolve(null);
      return;
    }
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        console.warn('IndexedDB open error:', request.error);
        resolve(null);
      };
    } catch (e) {
      console.warn('IndexedDB error:', e);
      resolve(null);
    }
  });
}

export async function getStoredItem<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const db = await openDB();
    if (db) {
      const val = await new Promise<T | null>((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result !== undefined ? req.result : null);
        req.onerror = () => resolve(null);
      });
      if (val !== null) return val;
    }
  } catch (err) {
    console.warn(`IndexedDB read failed for ${key}:`, err);
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem(key);
    if (local !== null) {
      return JSON.parse(local) as T;
    }
  } catch {
    // Ignore localStorage parse errors
  }

  return defaultValue;
}

export async function setStoredItem<T>(key: string, value: T): Promise<void> {
  // 1. Save in IndexedDB (no quota limit)
  try {
    const db = await openDB();
    if (db) {
      await new Promise<void>((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(value, key);
        req.onsuccess = () => resolve();
        req.onerror = () => {
          console.warn(`IndexedDB write error for ${key}:`, req.error);
          resolve();
        };
      });
    }
  } catch (err) {
    console.warn(`IndexedDB write failed for ${key}:`, err);
  }

  // 2. Also try localStorage for instant sync (safely ignore quota exceeded)
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // QuotaExceededError is safely swallowed because IndexedDB has the complete data
    console.info(`Saved ${key} to IndexedDB (localStorage quota reached)`);
  }
}
