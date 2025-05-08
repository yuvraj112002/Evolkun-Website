'use client';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>EVOLKUN.inc</div>
      <button className={styles.cta}>Let’s Talk</button>
    </header>
  );
}