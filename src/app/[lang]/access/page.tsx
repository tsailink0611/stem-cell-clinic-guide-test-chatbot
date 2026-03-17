import { isValidLocale } from "@/lib/i18n";
import {
  clinicConfig,
  getClinicAddress,
  getClinicHours,
  getClinicStation,
} from "@/lib/clinic-config";
import { getContent } from "@/lib/content-loader";
import type { AccessContent, MetaContent } from "@/lib/content-loader";
import { notFound } from "next/navigation";
import AddressCard from "./address-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const meta = getContent<MetaContent>(lang, "meta");
  return {
    title: meta.pages.access.title,
    description: meta.pages.access.description,
  };
}

export default async function AccessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const content = getContent<AccessContent>(lang, "access");
  const jaAddress = clinicConfig.address.ja;

  const infoItems = [
    {
      label: content.addressLabel,
      value: getClinicAddress(lang),
      icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z",
    },
    {
      label: content.stationLabel,
      value: getClinicStation(lang),
      icon: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
    },
    {
      label: content.phoneLabel,
      value: clinicConfig.phone,
      href: `tel:${clinicConfig.phone.replace(/-/g, "")}`,
      icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    },
    {
      label: content.emailLabel,
      value: clinicConfig.email,
      href: `mailto:${clinicConfig.email}`,
      icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
    },
    {
      label: content.hoursLabel,
      value: getClinicHours(lang),
      icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 sm:py-28">
      <div className="text-center mb-16">
        <h1 className="font-display text-2xl sm:text-3xl font-light tracking-wide text-primary mb-6">
          {content.title}
        </h1>
        <div className="w-12 h-px bg-accent mx-auto" />
      </div>

      {/* Address card for taxi / navigation */}
      <AddressCard
        address={jaAddress}
        showToDriver={content.showToDriver}
        tapToCopy={content.tapToCopy}
        copied={content.copied}
      />

      {/* Info list */}
      <div className="space-y-0 mb-16">
        {infoItems.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-6 py-7 border-b border-border-light last:border-0"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent flex-shrink-0 mt-0.5"
            >
              <path d={item.icon} />
            </svg>
            <div>
              <p className="text-xs text-text-muted tracking-widest uppercase mb-2">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm sm:text-base text-primary font-light hover:text-accent-dark transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm sm:text-base text-primary font-light">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Google Map Link */}
      <div className="text-center">
        <a
          href={clinicConfig.googleMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 py-4 px-8 border border-accent text-accent-dark hover:bg-accent hover:text-white text-sm tracking-wide rounded-sm transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
          {content.mapLinkText}
        </a>
      </div>
    </div>
  );
}
