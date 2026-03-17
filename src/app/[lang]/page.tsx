import Link from "next/link";
import { isValidLocale } from "@/lib/i18n";
import { getClinicName } from "@/lib/clinic-config";
import { getContent } from "@/lib/content-loader";
import type { TopContent, MetaContent } from "@/lib/content-loader";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const meta = getContent<MetaContent>(lang, "meta");
  return {
    title: meta.pages.top.title,
    description: meta.pages.top.description,
  };
}

export default async function TopPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const content = getContent<TopContent>(lang, "top");
  const clinicName = getClinicName(lang);

  const ctaItems = [
    { key: "flow" as const, href: `/${lang}/flow`, icon: "M9 5l7 7-7 7" },
    { key: "menu" as const, href: `/${lang}/menu`, icon: "M4 6h16M4 12h16M4 18h16" },
    { key: "access" as const, href: `/${lang}/access`, icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z" },
    { key: "faq" as const, href: `/${lang}/faq`, icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3 M12 17h.01" },
    { key: "help" as const, href: `/${lang}/help`, icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z" },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      {/* Hero */}
      <div className="text-center max-w-lg mx-auto pt-20 pb-16">
        <p className="text-xs text-text-muted tracking-[0.3em] uppercase mb-8 animate-fade-in-up">
          {clinicName}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-light leading-relaxed text-primary mb-8 animate-fade-in-up animate-delay-100">
          {content.welcome}
        </h1>
        <div className="w-16 h-px bg-accent mx-auto mb-8 animate-fade-in-up animate-delay-200" />
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light animate-fade-in-up animate-delay-300">
          {content.description}
        </p>
      </div>

      {/* CTA Grid */}
      <div className="w-full max-w-md mx-auto space-y-3 pb-24 animate-fade-in-up animate-delay-400">
        {ctaItems.map(({ key, href, icon }) => (
          <Link
            key={key}
            href={href}
            className="group flex items-center gap-5 py-5 px-7 border border-border rounded-sm
              hover:bg-surface-warm hover:border-accent-light
              transition-all duration-300"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent flex-shrink-0"
            >
              <path d={icon} />
            </svg>
            <span className="text-sm tracking-wide font-light text-text-primary group-hover:text-primary">
              {content.cta[key]}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="ml-auto text-text-muted group-hover:text-accent transition-colors"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
