'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/modules/plans.module.scss';
import LoadingPage from '@/components/LoadingPage/LoadingPage';
const PricingPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/plans/demo', { method: 'POST' });
      const data = await res.json();
      console.log(data)
      setPlans(data.plans); // or just `setPlans(data)` if not wrapped under `plans`
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchPlans();
}, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <span>Generating your plan...</span>
        <LoadingPage/>
      </div>
    );
  }

  return (
    <div className={styles.plansContainer}>
      {plans.map((plan, idx) => (
        <div
          key={idx}
          className={`${styles.planCard} ${plan.name === 'Standard' ? styles.highlightCard : ''}`}
        >
           {plan.name === 'Standard' && (
      <div className={styles.popularTag}>POPULAR</div>
    )}
          <div className={styles.planHeader}>
            <div className={styles.planName}>{plan.name}</div>
            <div className={styles.planBestFor}>{plan.best_for}</div>
            <div className={styles.priceContainer}>
              <div className={styles.priceMonthly}>${plan.price}</div>
              <div className={styles.priceAnnual}>{plan.pricing_note}</div>
            </div>
            <button className={styles.buyButton}>Choose this plan</button>
          </div>

          <div className={styles.planFeatures}>
            <div className={styles.featureSection}>
              <div className={styles.featureSectionTitle}>Features</div>
              <ul className={styles.featureList}>
                {plan.features.map((feature, i) => (
                  <li className={styles.featureItem} key={i}>
                    <span
                      className={feature.included ? styles.checkmark : styles.crossmark}
                    >
                      {feature.included ? '✓' : '✗'}
                    </span>{' '}
                    {feature.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;
