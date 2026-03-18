"use client";

import { difyConfig } from "@/lib/dify-config";

export default function DifyIframe() {
  const src = `${difyConfig.baseUrl}/chatbot/${difyConfig.token}`;

  return (
    <iframe
      src={src}
      allow="microphone"
      title="Clinic Guide Assistant"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
      }}
    />
  );
}
