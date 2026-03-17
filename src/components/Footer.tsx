import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { CommonContent } from "@/lib/content-loader";
import { clinicConfig } from "@/lib/clinic-config";

interface FooterProps {
  locale: Locale;
  common: CommonContent;
}

export default function Footer({ locale, common }: FooterProps) {
  return (
    <footer className="bg-primary text-white/80">
      {/* CTA Section */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* TODO_OPERATION_CONFIRM: 予約リンク先URL */}
          <a
            href={clinicConfig.bookingUrl}
            className="flex items-center justify-center gap-3 py-4 px-6 bg-accent hover:bg-accent-dark text-white rounded-sm transition-colors text-sm tracking-wide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {common.bookOnline}
          </a>

          <a
            href={`tel:${clinicConfig.phone.replace(/-/g, "")}`}
            className="flex items-center justify-center gap-3 py-4 px-6 border border-white/20 hover:bg-white/10 rounded-sm transition-colors text-sm tracking-wide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {common.callUs}
          </a>

          <a
            href={`mailto:${clinicConfig.email}`}
            className="flex items-center justify-center gap-3 py-4 px-6 border border-white/20 hover:bg-white/10 rounded-sm transition-colors text-sm tracking-wide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
            {common.emailUs}
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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
