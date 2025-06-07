"use client";
import styles from '@/styles/modules/FeatureCard.module.scss';

import  { useState, useRef, useEffect } from 'react';
// import styles from './PlanFeatures.module.scss';

const PlanFeatures = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  const features = [
    {
      icon: '🧠',
      title: "Built for Decision-Makers",
      description: "Know exactly what your business needs — no vague proposals, just precision-built plans."
    },
    {
      icon: '📊 ',
      title: "Business-Aware Estimations",
      description: "We analyze your answers like a strategist would. You talk, we translate it into value."
    },
    {
      icon: '⚙️',
      title: "Smart Estimates, Not Guesstimates",
      description: "Every feature is scored. You’ll see what matters, what adds cost, and what you can skip."
    },
    {
      icon: '🛑',
      title: "No Sales Calls. No Pressure. Ever.",
      description: "Just answer a few questions — your tailored plan arrives instantly. No chasing. No fluff."
    },
    {
      icon: '🧩',
      title: "Works Across Platforms",
      description: "WordPress, Shopify, Webflow, or Custom — we analyze and adapt to all."
    }
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.children[0].offsetWidth;
      const newSlide = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(newSlide);
    }
  };

  const scrollToSlide = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0].offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className={styles.planFeatures}>
      <div className={styles.container}>
        <h2 className={styles.title}>What every plan gets you</h2>
        
        <div 
          className={styles.cardsContainer}
          ref={scrollContainerRef}
        >
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          {features.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanFeatures;