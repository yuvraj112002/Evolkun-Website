import styles from '@/styles/modules/plans.module.scss';

const WebflowForm = () => {
  return (
    <div className={styles.plansContainer}>

      {/* Basic Plan */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Basic</div>
          <div className={styles.planBestFor}>Landing pages & personal projects</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹35,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Up to 5 Pages</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Webflow Prebuilt Template</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Mobile Responsive Design</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> CMS Collections</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Interactions & Animations</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> SEO Setup</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Newsletter Integration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Form Setup (Contact Only)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Admin Walkthrough (30-min call)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 5 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Medium Plan */}
      <div className={`${styles.planCard} ${styles.highlightCard}`}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Medium</div>
          <div className={styles.planBestFor}>Business websites & service providers</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹55,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Up to 10 Pages</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Semi-Custom Webflow Design</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> CMS Collections Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Basic Interactions & Animations</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> SEO Tags & Sitemap</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Newsletter / Zapier / CRM Integration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Multi-step Contact / Booking Form</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 3rd Party App Integrations</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Admin Training + Docs</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 14 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Premium Plan */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Premium</div>
          <div className={styles.planBestFor}>Creative brands, high-conversion platforms</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹90,000</div>
            <div className={styles.priceAnnual}>One-time setup fee</div>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 15+ Pages (Custom Layouts)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Fully Custom Webflow Design</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Advanced Interactions + Scroll Effects</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> CMS & Dynamic Filtering</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Ecommerce Setup (Optional)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Marketing Automations + API</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Blog, Case Study, Portfolio Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Figma to Webflow Translation</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Zapier + Make Integrations</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Full Admin Training (Zoom + Docs)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 30 Days Premium Support</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WebflowForm;
