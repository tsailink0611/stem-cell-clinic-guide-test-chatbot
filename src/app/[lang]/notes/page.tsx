import { isValidLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content-loader";
import type { NotesContent, MetaContent } from "@/lib/content-loader";
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
    title: meta.pages.notes.title,
    description: meta.pages.notes.description,
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const content = getContent<NotesContent>(lang, "notes");

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 sm:py-28">
      <div className="text-center mb-16">
        <h1 className="font-display text-2xl sm:text-3xl font-light tracking-wide text-primary mb-6">
          {content.title}
        </h1>
        <div className="w-12 h-px bg-accent mx-auto mb-8" />
        <p className="text-sm text-text-secondary font-light leading-relaxed max-w-md mx-auto">
          {content.intro}
        </p>
      </div>

      <div className="space-y-0">
        {content.items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-5 py-6 border-b border-border-light last:border-0"
          >
            <div className="flex-shrink-0 mt-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <p className="text-sm sm:text-base text-text-primary font-light leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
