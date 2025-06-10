"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { Mail, ChevronRight, Star, Sparkles } from 'lucide-react';

import styles from '@/styles/modules/CommingSoon.module.scss';
import { useRouter } from 'next/navigation';

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
  // Set target date (30 days from now)
  


  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert("Thanks for subscribing! We'll notify you when we launch.");
      setEmail('');
      router.push('/'); 
    }
  };

  return (
    <div className={styles["coming-soon"]}>
      {/* Animated Background Elements */}
      <div className={styles['background-elements']}>
        {/* Floating Stars */}
        <div className={`${styles['floating-star']} ${styles['star-1']}`}>
          <Star size={24} style={{ color: '#f59e0b' }} />
        </div>
        <div className={`${styles['floating-star']} ${styles['star-2']}`}>
          <Sparkles size={32} style={{ color: '#ec4899' }} />
        </div>
        <div className={`${styles['floating-star']} ${styles['star-3']}`}>
          <Star size={16} style={{ color: '#3b82f6' }} />
        </div>
        <div className={`${styles['floating-star']} ${styles['star-4']}`}>
          <Sparkles size={20} style={{ color: '#a855f7' }} />
        </div>

        {/* Animated Gradient Orbs */}
        <div className={`${styles['gradient-orb']} ${styles['orb-1']}`}></div>
        <div className={`${styles['gradient-orb']} ${styles['orb-2']}`}></div>
        <div className={`${styles['gradient-orb']} ${styles['orb-3']}`}></div>

        {/* Interactive Mouse Follower */}
        <div
          className={styles['mouse-follower']}
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className={styles['main-content']}>
        {/* Logo/Brand */}
        <div className={styles.logo}>
          <div className={styles['logo-icon']}>
            <Sparkles />
          </div>
        </div>

        {/* Main Heading */}
        <div className={styles['hero-section']}>
          <h1 className={styles['main-title']}>
            Coming Soon
          </h1>
          <p className={styles.subtitle}>
            Something amazing is brewing. Get ready for an extraordinary experience that will change everything.
          </p>
        </div>

       

        {/* Email Subscription */}
        <div className={styles['email-subscription']}>
          <form onSubmit={handleEmailSubmit} className={styles['form-container']}>
            <div className={styles['input-wrapper']}>
              <Mail className={styles['mail-icon']} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles['email-input']}
                required
              />
            </div>
            <button type="submit" className={styles['submit-button']}>
              Notify Me
              <ChevronRight className={styles['chevron-icon']} />
            </button>
          </form>
          <p className={styles['subscription-note']}>
            Be the first to know when we launch!
          </p>
        </div>

        {/* Social Proof */}
        <div className={styles['social-proof']}>
          <p className={styles['proof-text']}>Join thousands of others waiting for launch</p>
          <div className={styles['proof-dots']}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`${styles.dot} ${styles[`delay-${i + 1}`]}`}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;