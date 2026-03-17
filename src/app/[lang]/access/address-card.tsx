"use client";

import { useState } from "react";

interface AddressCardProps {
  address: string;
  showToDriver: string;
  tapToCopy: string;
  copied: string;
}

export default function AddressCard({
  address,
  showToDriver,
  tapToCopy,
  copied,
}: AddressCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = address;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="mb-16">
      <p className="text-xs text-text-muted tracking-widest uppercase text-center mb-4">
        {showToDriver}
      </p>
      <button
        onClick={handleCopy}
        className="w-full p-8 bg-surface-warm border border-border-light rounded-sm text-center transition-all hover:border-accent-light active:scale-[0.99]"
      >
        <p className="font-display text-lg sm:text-xl text-primary leading-relaxed mb-4">
          {address}
        </p>
        <p className="text-xs text-text-muted">
          {isCopied ? (
            <span className="text-accent-dark">{copied}</span>
          ) : (
            tapToCopy
          )}
        </p>
      </button>
    </div>
  );
}
