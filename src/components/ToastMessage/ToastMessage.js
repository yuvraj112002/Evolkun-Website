"use client";
import { useEffect } from "react";
import styles from "./ToastMessage.module.scss";

export default function ToastMessage({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Auto close after 5 sec
    }, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={styles.toast}>{message}</div>;
}