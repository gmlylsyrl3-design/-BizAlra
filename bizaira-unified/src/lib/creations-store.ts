import { trackCreation as trackCreationMetric, trackDownload as trackDownloadMetric } from "@/lib/activity-tracker";
import { safeGetItem, safeSetItem } from "@/lib/safe-storage";

export type CreationType = "message" | "analytics" | "pricing" | "time" | "image" | "photo";

export interface Creation {
  id: string;
  type: CreationType;
  title: string;
  content: string;
  imageUrl?: string;
  metadata?: Record<string, string | number>;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "bizaira_creations_v1";
const MAX_CREATIONS = 50;

export function loadCreations(): Creation[] {
  try {
    const raw = safeGetItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    safeSetItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

export function saveCreation(creation: Omit<Creation, "id" | "createdAt" | "updatedAt">): Creation {
  const now = new Date().toISOString();
  const newCreation: Creation = {
    ...creation,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    updatedAt: now,
  };

  const existing = loadCreations();
  const updated = [newCreation, ...existing].slice(0, MAX_CREATIONS);
  safeSetItem(STORAGE_KEY, JSON.stringify(updated));

  trackCreationMetric();

  return newCreation;
}

export function deleteCreation(id: string): void {
  const existing = loadCreations();
  safeSetItem(STORAGE_KEY, JSON.stringify(existing.filter(c => c.id !== id)));
}

export function getCreationsByType(type: CreationType): Creation[] {
  return loadCreations().filter(c => c.type === type);
}

export function getRecentCreations(limit = 10): Creation[] {
  return loadCreations().slice(0, limit);
}

export function trackDownload(): void {
  trackDownloadMetric();
}

export const TYPE_LABELS: Record<CreationType, { he: string; en: string; color: string }> = {
  message:   { he: "הודעה",         en: "Message",   color: "hsl(210 100% 12%)" },
  analytics: { he: "ניתוח עסקי",   en: "Analytics", color: "hsl(210 80% 20%)"  },
  pricing:   { he: "תמחור",         en: "Pricing",   color: "hsl(210 60% 25%)"  },
  time:      { he: "ניהול זמן",     en: "Time Mgmt", color: "hsl(210 40% 30%)"  },
  image:     { he: "תמונה",         en: "Image",     color: "hsl(39 48% 45%)"   },
  photo:     { he: "סטודיו תמונות", en: "Photo",     color: "hsl(39 40% 50%)"   },
};
