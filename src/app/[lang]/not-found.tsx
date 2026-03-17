import Link from "next/link";

export default function LangNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs text-text-muted tracking-[0.3em] uppercase mb-8">
          Page Not Found
        </p>
        <h1 className="font-display text-3xl font-light text-primary mb-8">
          404
        </h1>
        <div className="w-12 h-px bg-accent mx-auto mb-10" />
        <Link
          href="/"
          className="inline-block py-3 px-8 border border-border text-sm tracking-wide font-light
            hover:bg-surface-warm hover:border-accent-light transition-all duration-300 rounded-sm"
        >
          Select Language
        </Link>
      </div>
    </div>
  );
}
