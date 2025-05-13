'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '@/styles/modules/main.module.scss';

export default function ProgressBar({ step, totalSteps }) {
  const fillRef = useRef();

  useEffect(() => {
    const percentage = (step / totalSteps) * 100;
    gsap.to(fillRef.current, {
      width: `${percentage}%`,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, [step, totalSteps]);

  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressTrack}>
        <div ref={fillRef} className={styles.progressFill} />
      </div>
    </div>
  );
}
