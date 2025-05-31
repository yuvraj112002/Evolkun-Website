// Converted AuthCard.jsx (app/components/AuthCard.jsx)
"use client";
import styles from "@/styles/modules/AuthCard.module.scss";

const AuthCard = ({ children, title, subtitle }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.body}>{children}</div>
      </div>
      <div className={styles.footer}>
        <p>
          Secured by <span className={styles.brand}>Your App</span>
        </p>
      </div>
    </div>
  );
};

export default AuthCard;