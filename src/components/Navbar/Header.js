"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import ProfileDropdown from "@/components/ProfileDropDown";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();
  const toggleRef = useRef();

  // ✅ Close nav menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        !toggleRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className={styles.header}>
      {/* Logo */}
      <div className={styles.logo} onClick={() => router.push("/")}>
        <img
          src="/images/logo3.png"
          alt="Evolkun Logo"
          className={styles.logoImage}
        />
      </div>

      {/* Hamburger for mobile */}
      <button
        ref={toggleRef}
        className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>

      {/* Navigation links */}
      <nav
        ref={navRef}
        className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}
      >
        <Link href="#" onClick={() => setMenuOpen(false)}>
          Use Cases
        </Link>
        <Link href="#" onClick={() => setMenuOpen(false)}>
          Pricing
        </Link>
        <Link href="#" onClick={() => setMenuOpen(false)}>
          Company
        </Link>
        <Link href="#" onClick={() => setMenuOpen(false)}>
          Careers
        </Link>

        <div className={styles.container}>
          {!isAuthenticated ? (
            <div className={styles.authButtons}>
              <Link href="/signin">
                <button className={`${styles.signinBtn} ${styles.button}`}>Sign in</button>
              </Link>
              <Link href="/signup">
                <button className={`${styles.signupBtn} ${styles.buttonPrimary} ${styles.button}`}>
                  Sign up
                </button>
              </Link>
            </div>
          ) : isLoading ? (
            // 🌀 Small spinner (better UX than showing nothing)
            <div className={styles.profileLoadingWrapper}>
              <div className={styles.profileSpinner}></div>
            </div>
          ) : (
            <ProfileDropdown />
          )}{" "}
        </div>
      </nav>
    </div>
  );
}
