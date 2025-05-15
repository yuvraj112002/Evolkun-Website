"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn } = useUser();
  // console.log(isLoggedIn);

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        <span className={styles.icon}>🚀</span>
        <span>Evolkun</span>
      </div>

      {/* Hamburger Menu */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>

      {/* Navigation Links */}
      <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
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
        <div className={styles.mobileAuth}>
          <Link href="/login" className={styles.authHalf}>
            Login
          </Link>
          <span className={styles.separator}>/</span>
          <Link href="/signup" className={styles.authHalf}>
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Desktop Auth Buttons */}
      {isLoggedIn ? (
        ""
      ) : (
        <div className={styles.authButtonWrapper}>
          <Link href="/login" className={styles.authHalf}>
            Login
          </Link>
          <span className={styles.separator}>/</span>
          <Link href="/signup" className={styles.authHalf}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
