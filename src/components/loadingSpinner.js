"use client";
import styles from "@/styles/modules/loading.module.scss";
export default function loadingSpinner() {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};