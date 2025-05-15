import styles from '@/styles/modules/plans.module.scss';

const WixForm = () => {
  return (
    <div className={styles.plansContainer}>

      {/* Basic Plan */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Basic</div>
          <div className={styles.planBestFor}>Small businesses, personal brands</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹22,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Up to 5 Pages</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Wix Pre-made Template</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Mobile Responsive Design</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Booking/Calendar Integration</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> SEO Setup</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Speed Optimization</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Newsletter/Email Form Integration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Custom Domain & SSL Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Basic App Setup (1-2 apps)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Admin Training (30 min call)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 5 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Medium Plan */}
      <div className={`${styles.planCard} ${styles.highlightCard}`}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Medium</div>
          <div className={styles.planBestFor}>Service providers, regional businesses</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹40,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Up to 10 Pages</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Semi-Custom Wix Theme</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Booking System or Appointment Integration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> SEO Tags, Metadata</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Performance Optimization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Newsletter Signup Forms</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> WhatsApp/Chat Integration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Domain, SSL, Email Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 3–5 App Integrations</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 1 Hour Training + Video</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 14 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Premium Plan */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Premium</div>
          <div className={styles.planBestFor}>High-end brands, feature-rich platforms</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹65,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 15+ Pages with Custom Layouts</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Fully Custom Wix Studio Design</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Member Area / Client Login</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Event Booking, Galleries, Blogs</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Premium SEO Setup + Google Indexing</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Marketing Automation Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Custom Interactions & Effects</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Domain, SSL, DNS, Custom Email Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 5–8 App Integrations + Optimization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Full Admin Walkthrough (Zoom + Docs)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 30 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WixForm;
