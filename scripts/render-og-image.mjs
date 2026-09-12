// Renders scripts/og-image.html to app/opengraph-image.png with headless Chrome.
//   node scripts/render-og-image.mjs
// Needs Chrome installed and network access for the Archivo web font.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const candidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];
const chrome = candidates.find((c) => existsSync(c));
if (!chrome) throw new Error("Chrome not found");

const src = "file:///" + resolve("scripts/og-image.html").split("\\").join("/");
const out = resolve("app/opengraph-image.png");
execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
  "--window-size=1200,630", "--force-device-scale-factor=1", "--virtual-time-budget=8000",
  `--screenshot=${out}`, src,
], { stdio: "ignore" });
console.log("wrote", out);
