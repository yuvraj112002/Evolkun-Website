import { Check } from "lucide-react";
import styles from "@/styles/modules/pricingCard.module.scss";

export default function PricingCard({ plan, isPopular }) {
  return (
    <div className={`${styles.card} ${isPopular ? styles.popular : ""}`}>
      {isPopular && <div className={styles.popularLabel}>Most Popular</div>}

      <h3 className={styles.planName}>{plan.name}</h3>
      <p className={styles.planDescription}>{plan.description}</p>

      <div className={styles.priceWrapper}>
        <span className={styles.price}>{plan.price}</span>
        <span className={styles.feeNote}>one-time setup fee</span>
      </div>

      <button
        className={`${styles.button} ${
          isPopular ? styles.popularButton : styles.defaultButton
        }`}
        onClick={() => {
          window.location.href = "mailto:info@evolkun.com";
        }}
      >
       Contact us
      </button>

      <div className={styles.featureList}>
        <h4 className={styles.featureTitle}>Features</h4>
        {plan.features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <Check className={styles.featureIcon} />
            <span className={styles.featureText}>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
