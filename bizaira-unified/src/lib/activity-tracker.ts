// Activity tracking for BizAIra dashboard stats
// Tracks first use date, creations count, and downloads count

import { safeGetItem, safeParseInt, safeSetItem } from "@/lib/safe-storage";

const STORAGE_KEYS = {
  firstUseDate: "bizaira_first_credit_use",
  creationsCount: "bizaira_creations_count",
  downloadsCount: "bizaira_downloads_count",
};

const PERIOD_DAYS = 30;

function parseISODate(value: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getRenewalDate(firstUseDate: string): Date {
  const first = new Date(firstUseDate);
  const renewal = new Date(first);
  renewal.setDate(renewal.getDate() + PERIOD_DAYS);
  return renewal;
}

function isPeriodExpired(firstUseDate: string): boolean {
  const first = parseISODate(firstUseDate);
  if (!first) return false;
  return new Date() >= getRenewalDate(firstUseDate);
}

function resetPeriod(): void {
  const now = new Date().toISOString();
  safeSetItem(STORAGE_KEYS.firstUseDate, now);
  safeSetItem(STORAGE_KEYS.creationsCount, "0");
  safeSetItem(STORAGE_KEYS.downloadsCount, "0");
}

function ensureCurrentPeriod(): void {
  const firstUseDate = safeGetItem(STORAGE_KEYS.firstUseDate);
  if (!firstUseDate) return;
  if (isPeriodExpired(firstUseDate)) {
    resetPeriod();
  }
}

function ensureFirstUseDate(): void {
  if (!safeGetItem(STORAGE_KEYS.firstUseDate)) {
    safeSetItem(STORAGE_KEYS.firstUseDate, new Date().toISOString());
  }
}

/**
 * Records a new creation action and updates first use date if needed
 */
export function trackCreation(): void {
  ensureCurrentPeriod();
  ensureFirstUseDate();

  const currentCount = safeParseInt(STORAGE_KEYS.creationsCount, 0);
  safeSetItem(STORAGE_KEYS.creationsCount, String(currentCount + 1));
}

/**
 * Records a new download action
 */
export function trackDownload(): void {
  ensureCurrentPeriod();
  ensureFirstUseDate();

  const currentCount = safeParseInt(STORAGE_KEYS.downloadsCount, 0);
  safeSetItem(STORAGE_KEYS.downloadsCount, String(currentCount + 1));
}

/**
 * Gets the current activity stats
 */
export function getActivityStats(): {
  firstUseDate: string | null;
  creationsCount: number;
  downloadsCount: number;
  nextRenewalDate: Date | null;
} {
  ensureCurrentPeriod();
  const firstUseDate = safeGetItem(STORAGE_KEYS.firstUseDate);
  const creationsCount = safeParseInt(STORAGE_KEYS.creationsCount, 0);
  const downloadsCount = safeParseInt(STORAGE_KEYS.downloadsCount, 0);

  let nextRenewalDate: Date | null = null;
  if (firstUseDate) {
    nextRenewalDate = getRenewalDate(firstUseDate);
  }

  return {
    firstUseDate,
    creationsCount,
    downloadsCount,
    nextRenewalDate,
  };
}
