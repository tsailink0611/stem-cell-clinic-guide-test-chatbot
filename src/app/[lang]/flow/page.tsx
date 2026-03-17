import { isValidLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content-loader";
import type { FlowContent, MetaContent } from "@/lib/content-loader";
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
    title: meta.pages.flow.title,
    description: meta.pages.flow.description,
  };
}

export default async function FlowPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const content = getContent<FlowContent>(lang, "flow");

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

      <div className="relative">
        <div className="absolute left-5 top-4 bottom-4 w-px bg-border-light" />

        <div className="space-y-0">
          {content.steps.map((step, i) => (
            <div key={i} className="relative flex gap-8 py-8">
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-accent flex items-center justify-center">
                <span className="text-xs font-medium text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex-1 pt-1.5">
                <h3 className="font-display text-base sm:text-lg font-medium text-primary mb-3">
                  {step.step}
                </h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  {step.description}
                </p>
                {step.note && (
                  <p className="mt-3 text-xs text-accent-dark font-light leading-relaxed bg-surface-warm px-4 py-3 rounded-sm">
                    {step.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
