"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { localeLabels, publicLocales } from "@/lib/i18n";
import type { CommonContent } from "@/lib/content-loader";

interface HeaderProps {
  locale: Locale;
  common: CommonContent;
  clinicName: string;
}

export default function Header({ locale, common, clinicName }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: "about", href: `/${locale}/about` },
    { key: "menu", href: `/${locale}/menu` },
    { key: "flow", href: `/${locale}/flow` },
    { key: "faq", href: `/${locale}/faq` },
    { key: "access", href: `/${locale}/access` },
    { key: "help", href: `/${locale}/help` },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border-light">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-display text-lg font-medium tracking-wide text-primary"
        >
          {clinicName}
        </Link>

        {/* Language switcher - desktop */}
        <div className="hidden md:flex items-center gap-3">
          {publicLocales.map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              className={`text-xs tracking-widest uppercase transition-colors ${
                l === locale
                  ? "text-accent-dark font-medium"
                  : "text-text-muted hover:text-accent-dark"
              }`}
            >
              {localeLabels[l]}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 -mr-2 text-text-secondary"
          aria-label="Menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {isMenuOpen ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-border-light">
          <div className="max-w-3xl mx-auto px-6 py-6 space-y-1">
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-sm text-text-secondary hover:text-primary transition-colors border-b border-border-light last:border-0"
              >
                {common.navigation[key]}
              </Link>
            ))}
            <div className="pt-6 flex gap-3">
              {publicLocales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className={`text-xs tracking-widest uppercase ${
                    l === locale
                      ? "text-accent-dark font-medium"
                      : "text-text-muted"
                  }`}
                >
                  {localeLabels[l]}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
