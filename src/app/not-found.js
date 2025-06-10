'use client';
import styles from '@/styles/modules/NotFound.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/evolkunLogo.png"
            alt="404 character"
            width={500}
            height={500}
            priority
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>OOPS! PAGE NOT FOUND.</h1>
          <p className={styles.caption}>
            You must have picked the wrong door because I haven&apos;t been able to
            lay my eye on the page you&apos;ve been searching for.
          </p>
          <button className={styles.homeBtn} onClick={() => router.push('/')}>
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
}
