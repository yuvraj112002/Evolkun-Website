// src/components/MarqueeText/MarqueeText.js
"use client";
import styles from "@/styles/modules/marqueetext.module.scss";

export default function MarqueeText() {
  return (
    <div className={styles.betaMarquee}>
      <div className={styles.marqueeTrack}>
        ⚠️ This is a beta version — some features may be incomplete or unstable. Thank you for your patience!
      </div>
    </div>
  );
}