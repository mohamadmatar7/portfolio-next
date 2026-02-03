"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/i18n";

const nav = [
  { href: "/projects", key: "projects" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC to close + lock scroll when open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleLang = () => setLang(lang === "en" ? "nl" : "en");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />

      <div className="border-b border-white/5 bg-neutral-950/70 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
          {/* Brand */}
          <Link
            href="/"
            className="relative font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Mohamad Matar
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-4 sm:flex">
            <nav
              className="flex items-center gap-1.5"
              role="navigation"
              aria-label="Main navigation"
            >
              {nav.map((item) => {
                const isActive = pathname === item.href;
                const label = t.nav[item.key];

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cx(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                      isActive
                        ? "bg-white/15 text-white shadow-md shadow-white/5"
                        : "text-neutral-400 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={toggleLang}
              aria-label={lang === "en" ? t.ui.switchToNl : t.ui.switchToEn}
              className="group relative rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-200 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-md hover:shadow-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-95"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="h-3.5 w-3.5 text-neutral-400 transition group-hover:text-neutral-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span className="tracking-wide">{lang === "en" ? "NL" : "EN"}</span>
              </span>
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={lang === "en" ? t.ui.switchToNl : t.ui.switchToEn}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              {lang === "en" ? "NL" : "EN"}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-neutral-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              {open ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay + drawer */}
      <div
        className={cx(
          "sm:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={cx(
            "fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Drawer */}
        <aside
          className={cx(
            "fixed right-0 top-0 z-50 h-dvh w-[86%] max-w-sm border-l border-white/10 bg-neutral-950/90 backdrop-blur-xl",
            "transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
            <span className="text-sm font-semibold text-white/90">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-neutral-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Close menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-4 py-4">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {nav.map((item) => {
                const isActive = pathname === item.href;
                const label = t.nav[item.key];

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cx(
                      "rounded-2xl px-4 py-3 text-sm font-medium transition",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-neutral-200/90 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

              <button
                type="button"
                onClick={toggleLang}
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:scale-[0.99]"
              >
                {lang === "en" ? t.ui.switchToNl : t.ui.switchToEn}
              </button>
          </div>
        </aside>
      </div>
    </header>
  );
}
