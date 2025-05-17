'use client';
import styles from './LoadingPage.module.scss';

const LoadingPage = () => {
  return (
    <div className={styles.loader}>
      <div style={{ '--i': 1 }}></div>
      <div style={{ '--i': 2 }}></div>
      <div style={{ '--i': 3 }}></div>
      <div style={{ '--i': 4 }}></div>
    </div>
  );
};

export default LoadingPage;