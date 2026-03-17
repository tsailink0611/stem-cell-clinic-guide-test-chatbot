import { isValidLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content-loader";
import type { FAQContent, MetaContent } from "@/lib/content-loader";
import { notFound } from "next/navigation";
import FAQList from "./faq-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const meta = getContent<MetaContent>(lang, "meta");
  return {
    title: meta.pages.faq.title,
    description: meta.pages.faq.description,
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const content = getContent<FAQContent>(lang, "faq");

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 sm:py-28">
      <div className="text-center mb-16">
        <h1 className="font-display text-2xl sm:text-3xl font-light tracking-wide text-primary mb-6">
          {content.title}
        </h1>
        <div className="w-12 h-px bg-accent mx-auto" />
      </div>

      <FAQList items={content.items} />
    </div>
  );
}
