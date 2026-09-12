"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LogoLockup } from "@/components/Logo";
import { CloseIcon, InstagramIcon, MailIcon, MenuIcon } from "@/components/Icons";
import { site } from "@/lib/content";
import { NAV } from "@/lib/nav";

// Sticky 64px header. Five links, no CTA button. Current page gets aria-current
// and a 2px green underline. Mobile: hamburger opens a full-screen panel with the
// same five items; focus is trapped while open, Esc closes, focus returns to the toggle.

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: lock scroll, move focus into the panel, trap Tab, close on Esc.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = [
        toggleRef.current,
        ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ].filter((n): n is HTMLElement => !!n);
      if (nodes.length === 0) return;
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === firstNode || !nodes.includes(active as HTMLElement))) {
        e.preventDefault();
        lastNode.focus();
      } else if (!e.shiftKey && active === lastNode) {
        e.preventDefault();
        firstNode.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="container-site flex h-16 items-center justify-between">
        <LogoLockup />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`inline-flex h-16 items-center border-b-2 px-3 text-[15px] font-medium transition-colors duration-[120ms] ${
                      current ? "border-green text-green" : "border-transparent text-ink hover:text-green"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-green md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => (open ? close() : setOpen(true))}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper md:hidden"
      >
        <nav aria-label="Primary" className="container-site pt-2">
          <ul className="divide-y divide-line border-b border-line">
            {NAV.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`flex min-h-[56px] items-center text-[20px] font-medium ${current ? "text-green" : "text-ink"}`}
                  >
                    <span className={`mr-4 h-6 w-[3px] ${current ? "bg-green" : "bg-transparent"}`} aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="container-site mt-8 flex flex-col gap-4 pb-12">
          <a href={`mailto:${site.email}`} className="inline-flex min-h-[44px] items-center gap-3 text-[16px] font-medium text-green">
            <MailIcon />
            {site.email}
          </a>
          {site.instagram ? (
            <a
              href={site.instagram}
              className="inline-flex min-h-[44px] items-center gap-3 text-[16px] font-medium text-green"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
              Instagram <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
