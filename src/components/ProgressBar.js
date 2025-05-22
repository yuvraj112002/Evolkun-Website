'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '@/styles/modules/main.module.scss';

export default function ProgressBar({ step, totalSteps }) {
  const fillRef = useRef();
  const countRef = useRef();

  useEffect(() => {
    const percentage = (step / totalSteps) * 100;

    // Animate the bar
    gsap.to(fillRef.current, {
      width: `${percentage}%`,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Animate the step count
    if (countRef.current) {
      countRef.current.textContent = `Step ${step} of ${totalSteps}`;
    }
  }, [step, totalSteps]);

  return (
    <div className={styles.glassContainer}>
      <div className={styles.progressWrapper}>
        <div className={styles.progressHeader}>
          <span ref={countRef} className={styles.progressStepText}>Step {step} of {totalSteps}</span>
          <span className={styles.progressRemaining}>({totalSteps - step} steps left)</span>
        </div>
        <div className={styles.progressTrack}>
          <div ref={fillRef} className={styles.progressFill} />
        </div>
      </div>
    </div>
  );
}
