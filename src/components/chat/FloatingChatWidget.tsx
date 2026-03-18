"use client";

import { useState, useCallback } from "react";
import FloatingChatButton from "./FloatingChatButton";
import ChatPanel from "./ChatPanel";

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <FloatingChatButton isOpen={isOpen} onClick={handleToggle} />
      <ChatPanel isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
