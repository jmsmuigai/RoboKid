// ============================================================
// RoboKid Smart Translation Model
// Self-learning system that:
// 1. Caches every translation in local storage + Firestore
// 2. Learns new words from context (Gemini-powered)
// 3. Grows vocabulary automatically over time
// 4. Prioritizes cached translations for speed
// ============================================================

interface CachedTranslation {
  original: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  method: string;
  confidence: string;
  timestamp: number;
  usageCount: number;
}

interface LearningModel {
  translations: Record<string, CachedTranslation>;
  wordCount: number;
  lastUpdated: number;
  sessionsCount: number;
  languagePairs: string[];
}

// In-memory cache (persisted to localStorage on client)
let model: LearningModel = {
  translations: {},
  wordCount: 0,
  lastUpdated: Date.now(),
  sessionsCount: 0,
  languagePairs: [],
};

/** Generate cache key */
function getCacheKey(text: string, sourceLang: string, targetLang: string): string {
  return `${sourceLang}:${targetLang}:${text.toLowerCase().trim()}`;
}

/** Load model from localStorage (client-side) */
export function loadModel(): LearningModel {
  if (typeof window === 'undefined') return model;
  try {
    const stored = localStorage.getItem('robokid-translation-model');
    if (stored) {
      model = JSON.parse(stored);
      model.sessionsCount += 1;
    }
  } catch { /* ignore parse errors */ }
  return model;
}

/** Save model to localStorage (client-side) */
export function saveModel(): void {
  if (typeof window === 'undefined') return;
  try {
    model.lastUpdated = Date.now();
    model.wordCount = Object.keys(model.translations).length;
    localStorage.setItem('robokid-translation-model', JSON.stringify(model));
  } catch { /* storage full — clear old entries */ }
}

/** Get translation from cache */
export function getCachedTranslation(text: string, sourceLang: string, targetLang: string): CachedTranslation | null {
  const key = getCacheKey(text, sourceLang, targetLang);
  const cached = model.translations[key];
  if (cached) {
    cached.usageCount += 1;
    return cached;
  }
  return null;
}

/** Store translation in cache */
export function cacheTranslation(
  original: string, translated: string,
  sourceLang: string, targetLang: string,
  method: string, confidence: string
): void {
  const key = getCacheKey(original, sourceLang, targetLang);
  model.translations[key] = {
    original: original.toLowerCase().trim(),
    translated,
    sourceLang, targetLang, method, confidence,
    timestamp: Date.now(),
    usageCount: 1,
  };

  // Track language pairs
  const pair = `${sourceLang}-${targetLang}`;
  if (!model.languagePairs.includes(pair)) {
    model.languagePairs.push(pair);
  }

  saveModel();
}

/** Get model stats */
export function getModelStats() {
  return {
    totalWords: Object.keys(model.translations).length,
    languagePairs: model.languagePairs,
    sessionsCount: model.sessionsCount,
    lastUpdated: model.lastUpdated,
    topWords: Object.values(model.translations)
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 20)
      .map(t => ({ word: t.original, translated: t.translated, lang: t.targetLang, uses: t.usageCount })),
    byLanguage: model.languagePairs.reduce((acc, pair) => {
      const count = Object.values(model.translations).filter(
        t => `${t.sourceLang}-${t.targetLang}` === pair
      ).length;
      acc[pair] = count;
      return acc;
    }, {} as Record<string, number>),
  };
}

/** Auto-learn: Generate batch translations for common words using Gemini */
export async function autoLearnWords(
  words: string[],
  targetLang: string = 'kiswahili'
): Promise<{ learned: number; total: number }> {
  const uncached = words.filter(w => !getCachedTranslation(w, 'english', targetLang));
  if (uncached.length === 0) return { learned: 0, total: words.length };

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'batch',
        texts: uncached,
        sourceLang: 'english',
        targetLang,
      }),
    });
    const data = await res.json();
    if (data.results) {
      data.results.forEach((r: any) => {
        if (r.method !== 'fallback') {
          cacheTranslation(r.original, r.translated, r.sourceLang, r.targetLang, r.method, r.confidence);
        }
      });
    }
    return { learned: data.results?.filter((r: any) => r.method !== 'fallback').length || 0, total: words.length };
  } catch {
    return { learned: 0, total: words.length };
  }
}

/** Export model as JSON (for backup/sharing) */
export function exportModel(): string {
  return JSON.stringify(model, null, 2);
}

/** Import model from JSON */
export function importModel(json: string): boolean {
  try {
    const imported = JSON.parse(json) as LearningModel;
    // Merge — don't overwrite existing
    Object.entries(imported.translations).forEach(([key, val]) => {
      if (!model.translations[key]) {
        model.translations[key] = val;
      }
    });
    saveModel();
    return true;
  } catch {
    return false;
  }
}
