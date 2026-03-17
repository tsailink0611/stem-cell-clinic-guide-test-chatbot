"use client";

import { useState } from "react";

function PhraseCard({
  text,
  ja,
  isActive,
  onClick,
}: {
  text: string;
  ja: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left transition-all duration-300 rounded-sm ${
        isActive
          ? "bg-primary text-white p-8 sm:p-10"
          : "bg-white border border-border hover:border-accent-light p-6 sm:p-8"
      }`}
    >
      {isActive ? (
        <div className="space-y-6">
          <p className="font-display text-2xl sm:text-3xl font-light leading-relaxed">
            {ja}
          </p>
          <div className="w-8 h-px bg-white/30" />
          <p className="text-sm text-white/60 font-light">{text}</p>
        </div>
      ) : (
        <p className="text-sm sm:text-base text-text-primary font-light leading-relaxed">
          {text}
        </p>
      )}
    </button>
  );
}

export default function PhraseList({
  phrases,
}: {
  phrases: { text: string; ja: string }[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {phrases.map((phrase, i) => (
        <PhraseCard
          key={i}
          text={phrase.text}
          ja={phrase.ja}
          isActive={activeIndex === i}
          onClick={() => setActiveIndex(activeIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
