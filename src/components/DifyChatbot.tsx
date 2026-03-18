"use client";

import Script from "next/script";
import { difyConfig } from "@/lib/dify-config";

export default function DifyChatbot() {
  return (
    <>
      <Script
        id="dify-chatbot-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.difyChatbotConfig = {
              token: '${difyConfig.token}',
              baseUrl: '${difyConfig.baseUrl}',
              inputs: {},
              systemVariables: {},
              userVariables: {},
            }
          `,
        }}
      />
      <Script
        src={`${difyConfig.baseUrl}/embed.min.js`}
        id={difyConfig.token}
        strategy="afterInteractive"
      />
      <style jsx global>{`
        #dify-chatbot-bubble-button {
          background-color: #1C64F2 !important;
          right: 24px !important;
          bottom: 24px !important;
        }
        #dify-chatbot-bubble-window {
          width: 24rem !important;
          height: 40rem !important;
          right: 24px !important;
          bottom: 80px !important;
        }
        @media (max-width: 640px) {
          #dify-chatbot-bubble-button {
            bottom: 80px !important;
            right: 16px !important;
          }
          #dify-chatbot-bubble-window {
            width: calc(100vw - 32px) !important;
            height: 70vh !important;
            right: 16px !important;
            bottom: 140px !important;
          }
        }
      `}</style>
    </>
  );
}
