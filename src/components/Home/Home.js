'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from './Home.module.scss';
import { useRouter } from 'next/navigation';
import { runRadialTransition } from './RadialTransition';
import radialStyles from './RadialTransition.module.scss';
import useLenisScroll from '@/hooks/useLenisScroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'react-toastify';

gsap.registerPlugin(ScrollTrigger);

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
 
  useLenisScroll();
  const buttonRef = useRef(null);
  const overlayRefs = useRef([]);
  const cardRefs = useRef([]);
  const router = useRouter();

  const handleButtonClick = () => {
    const rocket = buttonRef.current?.querySelector(`.${styles.ctaBox}`);
    runRadialTransition(rocket, overlayRefs.current.filter(Boolean), () => router.push('/survey-page'));
  };

  useEffect(() => {
    const updateButtonWidth = () => {
      if (buttonRef.current) {
        buttonRef.current.style.setProperty('--button-width', `${buttonRef.current.offsetWidth}px`);
      }
    };

    updateButtonWidth();
    window.addEventListener('resize', updateButtonWidth);
    return () => window.removeEventListener('resize', updateButtonWidth);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRefs.current[0],
        start: 'top 85%',
      },
    });
  }, []);

  const handleHover = (el, hover) => {
    gsap.to(el, {
      scale: hover ? 1.03 : 1,
      boxShadow: hover ? '0 10px 24px rgba(0,0,0,0.1)' : 'none',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const cards = [
    {
      img: "/images/project1.webp",
      title: "AI Avatars",
      desc: "Make more videos faster, with high-quality AI avatars.",
    },
    {
      img: "/images/pixel-perfect.webp",
      title: "Voiceover Generator",
      desc: "Instantly add natural-sounding voices to your video.",
    },
    {
      img: "/images/project3.webp",
      title: "Smart Video Editing",
      desc: "Trim, resize, and subtitle your videos effortlessly.",
    },
  ];

  const features = [
    {
      title: "Blazing Fast Delivery",
      desc: "Get your projects live faster than ever with our optimized workflows.",
      icon: "/svgs/fast-forward.svg",
      bg: "/images/IMG_4922.webp",
    },
    {
      title: "Pixel-Perfect Design",
      desc: "Every pixel counts. We craft beautiful, responsive layouts.",
      icon: "/svgs/pixel-retro.svg",
      bg: "/images/IMG_4826.webp",
    },
    {
      title: "AI-Powered Strategy",
      desc: "Leverage automation and intelligence to stay ahead of the curve.",
      icon: "/svgs/ai.svg",
      bg: "/images/IMG_4861.webp",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.intro}>This Energy Is For You If You...</h2>
          <h1 className={styles.mainText}><Typewriter strings={TEXTS} /></h1>
          <button ref={buttonRef} className={styles.ctaButton} onClick={handleButtonClick}>
            <div className={styles.ctaBox}>
              <img src="/svgs/arrow-right1.svg" alt="arrow" className={styles.arrow} />
            </div>
            <span className={styles.ctaText}>Get Free Quote Instantly</span>
          </button>
          <p className={styles.footerNote}>Answer a few questions so we can tailor your dream solution.</p>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>
        Proof? <span className={styles.highlighted}>We Let Our Work Talk.</span>
      </h2>
      <p className={styles.sectionSubheading}>
        Real projects. Real results. From startups to rebels who don’t settle.
      </p>

      <div className={styles.cardGrid}>
        {cards.map((item, index) => (
          <div
            ref={(el) => (cardRefs.current[index] = el)}
            className={styles.featureCard}
            key={index}
            onMouseEnter={() => handleHover(cardRefs.current[index], true)}
            onMouseLeave={() => handleHover(cardRefs.current[index], false)}
          >
            <img src={item.img} alt={item.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.featureSection}>
        <h2 className={styles.sectionHeading}>
          Why Choose <span className={styles.highlighted}>Evolkun</span>?
        </h2>
        <p className={styles.sectionSubheading}>
          We combine creativity, speed, and AI-driven precision to build your digital future.
        </p>
        <div className={styles.cardGrid}>
          {features.map((item, i) => (
            <div
              className={styles.featureCard}
              key={i}
              style={{ backgroundImage: `url(${item.bg})` }}
            >
              <div className={styles.iconWrapper}>
                <img src={item.icon} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={radialStyles.pageOverlayContainer}>
        <div ref={el => (overlayRefs.current[0] = el)} className={`${radialStyles.overlay} ${radialStyles.overlayBlue}`}></div>
        <div ref={el => (overlayRefs.current[1] = el)} className={`${radialStyles.overlay} ${radialStyles.overlayLight}`}></div>
        <div ref={el => (overlayRefs.current[2] = el)} className={`${radialStyles.overlay} ${radialStyles.overlayWhite}`}></div>
      </div>
     
    </section>
  );
}
