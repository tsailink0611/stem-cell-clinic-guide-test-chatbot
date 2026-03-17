import { notFound } from "next/navigation";
import { locales, isValidLocale } from "@/lib/i18n";
import { getClinicName } from "@/lib/clinic-config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content-loader";
import type { CommonContent, MetaContent } from "@/lib/content-loader";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const meta = getContent<MetaContent>(lang, "meta");
  return {
    title: {
      default: meta.siteName,
      template: `%s | ${meta.siteName}`,
    },
    description: meta.siteDescription,
    openGraph: {
      title: meta.siteName,
      description: meta.siteDescription,
      locale: lang,
    },
    alternates: {
      languages: {
        en: "/en",
        zh: "/zh",
        mn: "/mn",
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const common = getContent<CommonContent>(lang, "common");
  const clinicName = getClinicName(lang);

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={lang} common={common} clinicName={clinicName} />
      <main className="flex-1">{children}</main>
      <Footer locale={lang} common={common} />
    </div>
  );
}
