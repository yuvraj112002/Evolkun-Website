import styles from '@/styles/modules/plans.module.scss';

const WordPressForm = () => {
  return (
    <div className={styles.plansContainer}>

      {/* Basic Plan */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Basic</div>
          <div className={styles.planBestFor}>First-time founders, portfolio sites</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹25,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 5 Page Website</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Pre-designed Template</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Basic Contact Form</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Mobile Responsive</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Blog Setup</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> SEO Optimization</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Speed Optimization</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> WhatsApp Chat Integration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> SSL & Domain Integration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 30-min Admin Training</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 5 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Medium Plan */}
      <div className={`${styles.planCard} ${styles.highlightCard}`}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Medium</div>
          <div className={styles.planBestFor}>Growing brands, service providers</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹45,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Up to 10 Pages</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Semi-Custom Design</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Blog & Content Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Speed Optimization (Basic)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> SEO Tags & Metadata</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> WhatsApp Chat + Email Forms</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Newsletter Integration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> SSL & Domain Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 1-Hour Zoom Training</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 14 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Premium Plan */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Premium</div>
          <div className={styles.planBestFor}>Established brands, full-featured sites</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹70,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 15+ Pages</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Fully Custom UX/UI Design</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Advanced Blog + Resources</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Lazy Load & Speed Optimization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> SEO Setup + Indexing Tools</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Advanced Forms + CRM Tools</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Marketing Automation Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Custom Animations & Scroll Effects</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> SSL, DNS, & Cloudflare Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Full Admin Training (Zoom + Video)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 30 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WordPressForm;
