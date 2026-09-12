"use client";

import { useEffect, useState } from "react";

// Copies the address to the clipboard and confirms in text, not colour alone.
// The status is announced via a polite live region.

export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2500);
    return () => clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-[44px] items-center rounded-sm border-[1.5px] border-green px-4 text-[15px] font-medium text-green transition-colors duration-[120ms] hover:bg-green-tint"
        aria-label={`Copy ${text} to clipboard`}
      >
        {state === "copied" ? "Copied" : state === "failed" ? "Select and copy" : "Copy address"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? "Copy failed — select the address to copy it" : ""}
      </span>
    </>
  );
}
