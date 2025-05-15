import styles from '@/styles/modules/plans.module.scss';
const Plans = () => {
  return (
    <div className={styles.plansContainer}>
      {/* Basic Plan */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Basic</div>
          <div className={styles.planBestFor}>First-time sellers, low SKU stores</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹28,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Product Upload: Up to 10</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Pre-built Theme</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Minimal Theme Customization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Responsive Design</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Payment Gateway Setup (COD/UPI)</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> SEO Optimization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Manual Product Filters & Collections</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> WhatsApp/Chat Plugin</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Email Newsletter Integration</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Mobile Speed Optimization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Basic About Page</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Basic Apps Installation</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Shipping & Tax Configuration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Domain & SSL Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 30-min Admin Panel Training</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 7 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Standard Plan (Popular) */}
      <div className={`${styles.planCard} ${styles.highlightCard}`}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Standard</div>
          <div className={styles.planBestFor}>Growing D2C brands, regional businesses</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹48,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Product Upload: Up to 50</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Semi-Custom Homepage Design</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Moderate Theme Customization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Responsive Design</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Payment Gateway Setup (Stripe, Razorpay, etc.)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> SEO Optimization + Structured Data</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Automated Collection Logic</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> WhatsApp/Chat Plugin + Autoresponse triggers</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Email Newsletter + Abandoned Cart Flow</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Mobile Speed Optimization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 3 Static Pages</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 3-5 Apps Installation</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Shipping & Tax Configuration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Domain & SSL Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 1-Hour Training + Video Guide</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 14 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Premium Plan */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Premium</div>
          <div className={styles.planBestFor}>High-volume stores, branded eCommerce</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹75,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Product Upload: Up to 200 (bulk support)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Full Custom UX/UI Homepage Design</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Full Design Overhaul</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Responsive Design</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Multiple Payment Gateway Options</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Advanced SEO Optimization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Advanced Collection Filters</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Enhanced WhatsApp/Chat Features</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Advanced Email Marketing Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Premium Mobile Speed Optimization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 5+ Pages with Custom Layouts</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 6-10 Apps + Optimization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Regional/Global Shipping Zones</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Domain & SSL Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Comprehensive Training Program</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 30 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;