'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from './Home.module.scss';
import { useRouter } from 'next/navigation';
import { runRadialTransition } from './RadialTransition';
import radialStyles from './RadialTransition.module.scss';

const TEXTS = [
  "Can't stand boring",
  "Think loud, dream louder",
  "Bleed ideas at midnight",
  "Want chills, not checklists"
];

function Typewriter({ strings }) {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const type = useCallback(() => {
    const currentString = strings[currentIndex % strings.length];

    if (isTyping) {
      if (text.length < currentString.length) {
        setTimeout(() => {
          setText(currentString.substring(0, text.length + 1));
        }, 100);
      } else {
        setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (text.length > 0) {
        setTimeout(() => {
          setText(currentString.substring(0, text.length - 1));
        }, 50);
      } else {
        setTimeout(() => {
          setIsTyping(true);
          setCurrentIndex(currentIndex + 1);
        }, 500);
      }
    }
  }, [text, currentIndex, isTyping, strings]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    type();
  }, [type]);

  return (
    <span className={`${styles.highlight} ${styles[`gradient${currentIndex % 4}`]}`}>
      {text}
      <span className={styles.cursor} style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </span>
  );
}

export default function HomeSection() {
  const buttonRef = useRef(null);
  const overlayRefs = useRef([]);
  const router = useRouter();

  const handleButtonClick = () => {
    const rocket = buttonRef.current?.querySelector(`.${styles.ctaBox}`);
    runRadialTransition(rocket, overlayRefs.current, () => router.push('/survey-page'));
  };

  useEffect(() => {
    const updateButtonWidth = () => {
      if (buttonRef.current) {
        buttonRef.current.style.setProperty(
          '--button-width', 
          `${buttonRef.current.offsetWidth}px`
        );
      }
    };

    updateButtonWidth();
    window.addEventListener('resize', updateButtonWidth);

    return () => {
      window.removeEventListener('resize', updateButtonWidth);
    };
  }, []);

  return (
    <section className={styles.section}>
      {/* <Header /> */}
      <div className={styles.content}>
        <h2 className={styles.intro}>This Energy Is For You If You...</h2>

        <h1 className={styles.mainText}>
          <Typewriter strings={TEXTS} />
        </h1>

        <button ref={buttonRef} className={styles.ctaButton} onClick={handleButtonClick}>
          <div className={styles.ctaBox}>
            <img src="/svgs/arrow-right1.svg" alt="arrow" className={styles.arrow} />
          </div>
          <span className={styles.ctaText}>Get Free Quote Instantly</span>
        </button>

        <p className={styles.footerNote}>
          Answer a few questions so we can tailor your dream solution.
        </p>

        <div className={styles.nextStep}>
          <div className={styles.line}></div>
          <p className={styles.nextLabel}>Next Step</p>
          <div className={styles.downArrow}>⬇</div>
        </div>
      </div>

      {/* 🔵 Radial Transition Bubbles */}
      <div className={radialStyles.pageOverlayContainer}>
  <div ref={el => (overlayRefs.current[0] = el)} className={`${radialStyles.overlay} ${radialStyles.overlayBlue}`}></div>
  <div ref={el => (overlayRefs.current[1] = el)} className={`${radialStyles.overlay} ${radialStyles.overlayLight}`}></div>
  <div ref={el => (overlayRefs.current[2] = el)} className={`${radialStyles.overlay} ${radialStyles.overlayWhite}`}></div>
</div>
    </section>
  );
}