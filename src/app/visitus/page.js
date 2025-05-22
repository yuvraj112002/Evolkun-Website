'use client';

import styles from './visitUs.module.scss';
import { useRouter } from 'next/navigation';

export default function VisitUsPage() {
  const router = useRouter();

  return (
    <div className={styles.visitUsContainer}>
      <h1>Welcome to Evolkun 👋</h1>
      <p>Thanks for scanning. Where would you like to go?</p>
      <div className={styles.buttonGroup}>
        <button onClick={() => router.push('/')} className={styles.btn}>
          Visit Our Website
        </button>
        <a
          href="https://instagram.com/evolkun"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btn}
        >
          Follow on Instagram
        </a>
      </div>
    </div>
  );
}
