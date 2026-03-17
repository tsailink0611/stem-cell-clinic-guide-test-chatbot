"use client";

import { useState } from "react";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-light">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-5 py-6 text-left"
      >
        <span className="flex-shrink-0 mt-0.5 text-accent font-display text-lg font-light">
          Q
        </span>
        <span className="flex-1 text-sm sm:text-base text-text-primary font-light leading-relaxed">
          {q}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`flex-shrink-0 mt-1 text-text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-6 pl-13 pr-8">
          <div className="flex items-start gap-5">
            <span className="flex-shrink-0 text-text-muted font-display text-lg font-light">
              A
            </span>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              {a}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <FAQItem key={i} q={item.q} a={item.a} />
      ))}
    </div>
  );
}
