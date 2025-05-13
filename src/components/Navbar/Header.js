'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleClick = () => {
    router.push(isLoggedIn ? '/account' : '/Login');
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.icon}>🚀</span>
        <span>Evolkun</span>
      </div>

      {/* Toggle Button using custom SVG */}
      <img
        src="/svgs/nav-menu.svg"
        alt="Menu"
        className={styles.menuToggle}
        onClick={() => setMenuOpen(!menuOpen)}
      />

      <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        <a href="#">Use Cases</a>
        <a href="#">Pricing</a>
        <a href="#">Company</a>
        <a href="#">Careers</a>
        <button className={styles.accountButton} onClick={handleClick}>
          {isLoggedIn ? 'My Account' : 'Login / Sign Up'}
        </button>
      </nav>
    </div>
  );
}
