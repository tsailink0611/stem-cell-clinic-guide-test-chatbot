import { isValidLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content-loader";
import type { MenuContent, MetaContent } from "@/lib/content-loader";
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
    title: meta.pages.menu.title,
    description: meta.pages.menu.description,
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const content = getContent<MenuContent>(lang, "menu");

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 sm:py-28">
      <div className="text-center mb-16">
        <h1 className="font-display text-2xl sm:text-3xl font-light tracking-wide text-primary mb-6">
          {content.title}
        </h1>
        <div className="w-12 h-px bg-accent mx-auto mb-8" />
        <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed max-w-md mx-auto">
          {content.note}
        </p>
      </div>

      <div className="space-y-8 mb-16">
        {content.categories.map((category, i) => (
          <div
            key={i}
            className="p-8 sm:p-10 border border-border-light rounded-sm hover:border-accent-light transition-colors"
          >
            <h3 className="font-display text-lg sm:text-xl font-light text-primary mb-4">
              {category.name}
            </h3>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              {category.description}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing note */}
      <div className="bg-surface-warm px-8 py-6 rounded-sm">
        <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
          {content.pricingNote}
        </p>
      </div>
    </div>
  );
}
