import Link from "next/link";
import { publicLocales, localeNativeNames } from "@/lib/i18n";
import { clinicConfig } from "@/lib/clinic-config";

export default function LanguageSelectPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* Logo / Clinic Name */}
      <div className="text-center mb-20 animate-fade-in-up">
        <h1 className="font-display text-3xl sm:text-4xl font-light tracking-wide text-primary mb-4">
          {clinicConfig.name.en}
        </h1>
        <div className="w-12 h-px bg-accent mx-auto mb-6" />
        <p className="text-sm text-text-muted tracking-widest uppercase">
          Visitor Guide
        </p>
      </div>

      {/* Language Selection */}
      <div className="w-full max-w-sm space-y-4 animate-fade-in-up animate-delay-200">
        <p className="text-center text-xs text-text-muted tracking-widest uppercase mb-8">
          Select your language
        </p>

        {publicLocales.map((locale, i) => (
          <Link
            key={locale}
            href={`/${locale}`}
            className={`block w-full py-5 px-8 text-center border border-border rounded-sm
              text-lg tracking-wide font-light
              hover:bg-surface-warm hover:border-accent-light
              transition-all duration-300
              animate-fade-in-up animate-delay-${(i + 3) * 100}`}
          >
            {localeNativeNames[locale]}
          </Link>
        ))}
      </div>

      {/* Subtle bottom decoration */}
      <div className="mt-24 animate-fade-in-up animate-delay-500">
        <div className="w-8 h-px bg-border mx-auto" />
      </div>
    </div>
  );
}
