"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <SignedOut>
            <SignInButton mode="modal" redirecturl="/" >
          <button  className={`${styles.btn} ${styles['login-btn']}`}>Login</button>
          </SignInButton>
          <SignUpButton mode="modal" redirecturl="/">
          <button className={`${styles.btn} ${styles['signup-btn ']}`}>Signup</button>
          </SignUpButton>
        </SignedOut>
        </div>
      </nav>

      <div className={`${styles.authButtons} `}>
        <SignedOut>
            <SignInButton mode="modal" redirecturl="/">
          <button  className={`${styles.btn} ${styles['login-btn']} ${styles.hideInSmallScreen}`}>Login</button>
          </SignInButton>
          <SignUpButton mode="modal" redirecturl="/">
          <button className={`${styles.btn} ${styles['signup-btn ']} ${styles.hideInSmallScreen}`}>Signup</button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
