// Launch gate - SPEC.md §7 item 10 and §12.
// Greps the built HTML for placeholder sentinels and fails if any are present.
// Run after `next build` with NEXT_PUBLIC_SHOW_PLACEHOLDERS unset:
//   npm run check:launch
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = ".next/server/app";
const sentinels = ["[insert", "[VERIFY]", "[CONTENT REQUIRED]"];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

let failures = 0;
for (const file of walk(root)) {
  const html = readFileSync(file, "utf8");
  for (const s of sentinels) {
    const n = html.split(s).length - 1;
    if (n > 0) {
      failures += n;
      console.error(`✗ ${file}: ${n} × "${s}"`);
    }
  }
}

if (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true") {
  console.log(`(demo build - ${failures} placeholder(s) rendered on purpose)`);
} else if (failures > 0) {
  console.error(`\n${failures} placeholder(s) found in the built output. Do not publish this build.`);
  process.exit(1);
} else {
  console.log("✓ No placeholders in the built output.");
}
