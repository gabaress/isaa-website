"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type RefCallback } from "react";
import { LogoLockup } from "@/components/Logo";
import { CloseIcon, InstagramIcon, MailIcon, MenuIcon } from "@/components/Icons";
import { site } from "@/lib/content";
import { NAV } from "@/lib/nav";

// Sticky 64px header. Five links, no CTA button. Current page gets aria-current
// and a 2px green underline that slides to the active link on navigation
// (a shared bar, repositioned via transform/width - see the indicator state
// below). Mobile: hamburger opens a full-screen panel with the same five
// items; focus is trapped while open, Esc closes, focus returns to the toggle.

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const activeHref = NAV.find((item) => isCurrent(item.href))?.href;

  // Desktop underline: one shared bar, slid under the active link instead of
  // each link drawing its own border. This positions an existing DOM node
  // directly rather than routing measurements through React state - the bar's
  // position isn't something any page renders differently, so there is
  // nothing here for state to synchronise, only a rect to apply.
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const positionIndicator = useCallback(() => {
    const bar = indicatorRef.current;
    if (!bar) return;
    const el = activeHref ? linkRefs.current.get(activeHref) : undefined;
    if (!el) {
      bar.style.opacity = "0";
      return;
    }
    bar.style.opacity = "1";
    bar.style.width = `${el.offsetWidth}px`;
    bar.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [activeHref]);

  // Runs before paint so the bar is already in place on first render (no
  // slide-in from nowhere) and animates on every later reposition.
  useLayoutEffect(() => {
    positionIndicator();
  }, [positionIndicator]);

  useEffect(() => {
    window.addEventListener("resize", positionIndicator);
    // Archivo loads with font-display: swap; a late font swap can shift link
    // widths slightly, so re-measure once webfonts are actually in.
    document.fonts?.ready.then(positionIndicator).catch(() => {});
    return () => window.removeEventListener("resize", positionIndicator);
  }, [positionIndicator]);

  const setLinkRef = useCallback(
    (href: string): RefCallback<HTMLAnchorElement> =>
      (el) => {
        if (el) linkRefs.current.set(href, el);
        else linkRefs.current.delete(href);
      },
    [],
  );

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

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
          <ul className="relative flex items-center gap-1">
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-green opacity-0 transition-all duration-300 ease-out"
            />
            {NAV.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    ref={setLinkRef(item.href)}
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`inline-flex h-16 items-center border-b-2 border-transparent px-3 text-[15px] font-medium transition-colors duration-[120ms] ${
                      current ? "text-green" : "text-ink hover:text-green"
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
                    onClick={() => setOpen(false)}
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
