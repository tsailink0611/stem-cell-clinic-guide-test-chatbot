import { isValidLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content-loader";
import type { AboutContent, MetaContent } from "@/lib/content-loader";
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
    title: meta.pages.about.title,
    description: meta.pages.about.description,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const content = getContent<AboutContent>(lang, "about");

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 sm:py-28">
      <div className="text-center mb-16">
        <h1 className="font-display text-2xl sm:text-3xl font-light tracking-wide text-primary mb-6">
          {content.title}
        </h1>
        <div className="w-12 h-px bg-accent mx-auto" />
      </div>

      <p className="text-sm sm:text-base text-text-secondary leading-loose font-light text-center mb-20 max-w-lg mx-auto">
        {content.intro}
      </p>

      {/* Features */}
      <div className="space-y-0 mb-20">
        {content.features.map((feature, i) => (
          <div
            key={i}
            className="flex items-start gap-5 py-6 border-b border-border-light last:border-0"
          >
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            </div>
            <p className="text-sm sm:text-base text-text-primary font-light leading-relaxed">
              {feature.label}
            </p>
          </div>
        ))}
      </div>

      {/* Doctor */}
      <div className="border border-border-light rounded-sm p-8 sm:p-10">
        <p className="text-xs text-text-muted tracking-widest uppercase mb-4">
          {content.doctorTitle}
        </p>
        <h3 className="font-display text-lg sm:text-xl font-light text-primary mb-6">
          {content.doctorName}
        </h3>
        <p className="text-sm text-text-secondary font-light leading-relaxed">
          {content.doctorBio}
        </p>
      </div>
    </div>
  );
}
