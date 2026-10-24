/**
 * Handover board sync (runs before every build).
 *
 * The office keeps one Google Sheet tab with a column "slug" (project slugs, newest first),
 * published as CSV (File → Share → Publish to web → CSV). Put that URL in HANDOVER_CSV_URL.
 * This script writes src/data/handover.json, which the "Recently handed over" board reads.
 * With no URL set, the existing file is kept.
 */
import { readFile, writeFile } from "node:fs/promises";

const url = process.env.HANDOVER_CSV_URL;
const out = new URL("../src/data/handover.json", import.meta.url);

if (!url) {
  console.log("[handover] HANDOVER_CSV_URL not set — keeping src/data/handover.json");
  process.exit(0);
}

try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const lines = (await res.text()).trim().split(/\r?\n/);
  const header = lines.shift().split(",").map((h) => h.trim().toLowerCase());
  const col = header.indexOf("slug");
  if (col < 0) throw new Error('no "slug" column');
  const slugs = lines.map((l) => l.split(",")[col]?.trim()).filter(Boolean).slice(0, 6);
  await writeFile(out, JSON.stringify(slugs, null, 2) + "\n");
  console.log(`[handover] ${slugs.length} projects synced`);
} catch (err) {
  console.warn(`[handover] sync failed (${err.message}) — keeping the previous list`);
  await readFile(out).catch(() => writeFile(out, "[]\n"));
}
