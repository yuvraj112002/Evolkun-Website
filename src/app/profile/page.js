"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import styles from "./Profile.module.scss";

export default function Profile() {
  const { user, logout ,isAuthenticated } = useAuth();
  const router = useRouter();
    useEffect(() => {
    if (!isAuthenticated && typeof window !== "undefined") {
      router.push("/login");
    }
  }, [isAuthenticated]);
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h3>User Profile</h3>
          <p>Your personal information</p>
        </div>
        <div className={styles.body}>
          <div className={styles.profileInfo}>
            <img
              src={
                user?.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name || "User"
                )}`
              }
              alt="Profile"
              className={styles.avatar}
            />
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>

          <div className={styles.accountDetails}>
            <h3>Account Details</h3>
            <dl>
              <div className={styles.detailRow}>
                <dt>Name</dt>
                <dd>{user?.name}</dd>
              </div>
              <div className={styles.detailRow}>
                <dt>Email</dt>
                <dd>{user?.email}</dd>
              </div>
              <div className={styles.detailRow}>
                <dt>User ID</dt>
                <dd>{user?.id}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.actions}>
            <button onClick={() => router.push("/")} className={styles.backButton}>
              Back to Home
            </button>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
