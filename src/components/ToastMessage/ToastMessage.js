"use client";
import { useEffect } from "react";
import styles from "./ToastMessage.module.scss";

export default function ToastMessage({ message }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // onClose(); // Auto close after 5 sec
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return <div className={styles.toast}>{message}</div>;
}