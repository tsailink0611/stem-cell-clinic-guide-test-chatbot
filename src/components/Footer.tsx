import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { publicLocales, localeLabels } from "@/lib/i18n";
import type { CommonContent } from "@/lib/content-loader";
import { clinicConfig } from "@/lib/clinic-config";

interface FooterProps {
  locale: Locale;
  common: CommonContent;
}

export default function Footer({ locale, common }: FooterProps) {
  return (
    <footer className="bg-primary text-white/80">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Language switcher */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {publicLocales.map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              className={`text-xs tracking-widest uppercase transition-colors ${
                l === locale
                  ? "text-accent-light font-medium"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {localeLabels[l]}
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="text-xs text-white/40 hover:text-white/60 tracking-widest uppercase transition-colors"
          >
            {common.backToTop}
          </Link>
          <p className="text-xs text-white/30 tracking-wide">
            {clinicConfig.name[locale]}
          </p>
        </div>
      </div>
    </footer>
  );
}
