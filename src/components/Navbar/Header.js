"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  const router = useRouter();
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
  <img src="/images/logo3.png" alt="Evolkun Logo" className={styles.logoImage} />
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
      <nav ref={navRef} className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        <Link href="#" onClick={() => setMenuOpen(false)}>Use Cases</Link>
        <Link href="#" onClick={() => setMenuOpen(false)}>Pricing</Link>
        <Link href="#" onClick={() => setMenuOpen(false)}>Company</Link>
        <Link href="#" onClick={() => setMenuOpen(false)}>Careers</Link>

        {/* Mobile Login/Signup (inside menu) */}
        <div className={styles.mobileAuth}>
          <SignedOut>
            <SignInButton mode="modal">
              <button className={`${styles.btn} ${styles["login-btn"]}`}>Login</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className={`${styles.btn} ${styles["signup-btn"]}`}>Signup</button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>

      {/* Desktop Login/Signup (hidden on mobile) */}
      <div className={styles.authButtons}>
        <SignedOut>
          <SignInButton mode="modal">
            <button className={`${styles.btn} ${styles["login-btn"]} ${styles.hideInSmallScreen}`}>
              Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className={`${styles.btn} ${styles["signup-btn"]} ${styles.hideInSmallScreen}`}>
              Signup
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonTrigger: "custom-trigger",
                userButtonAvatarBox: "custom-avatar",
                userButtonPopoverCard: "custom-card",
                userButtonPopoverMain: "custom-main",
                userButtonPopoverName: "custom-name",
                userButtonPopoverEmail: "custom-email",
                userButtonPopoverActions: "custom-actions",
                userButtonPopoverActionButton: "custom-action",
                userButtonPopoverFooter: "hide-footer",
                userButtonPopoverUserIdentifier: "custom-workspace-title",
                userButtonPopoverUserPreview: "custom-workspace-subtitle",
                badge: "custom-badge",
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
}
