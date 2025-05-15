import styles from '@/styles/modules/plans.module.scss';

const CustomCodeForm = () => {
  return (
    <div className={styles.plansContainer}>

      {/* Basic Plan */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Basic</div>
          <div className={styles.planBestFor}>MVPs, static websites, landing pages</div>
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
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Up to 5 Static Pages (React / Next.js)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Mobile Responsive</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Dynamic Admin Panel</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Database Integration</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> Login / Signup System</li>
              <li className={styles.featureItem}><span className={styles.crossmark}>✗</span> API Integration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Deployment (Vercel/Netlify)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Admin Handover (30-min call)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 5 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Medium Plan */}
      <div className={`${styles.planCard} ${styles.highlightCard}`}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Medium</div>
          <div className={styles.planBestFor}>Full websites with CMS or dashboards</div>
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
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Up to 10 Pages (Next.js / React)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Dynamic Admin Panel (Node.js / Express)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> MongoDB / PostgreSQL Integration</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> REST API or GraphQL Setup</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Basic Authentication (JWT + Session)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Payment Gateway (Stripe, Razorpay)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> SEO + Performance Optimization</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Admin Handover + Documentation</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 14 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Premium Plan */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div className={styles.planName}>Premium</div>
          <div className={styles.planBestFor}>Scalable apps, custom SaaS platforms</div>
          <div className={styles.priceContainer}>
            <div className={styles.priceMonthly}>₹1,25,000+</div>
            <div className={styles.priceAnnual}>Project-based quotation</div>
          </div>
          <button className={styles.buyButton}>Request Quote</button>
        </div>
        <div className={styles.planFeatures}>
          <div className={styles.featureSection}>
            <div className={styles.featureSectionTitle}>Features</div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Unlimited Pages & Features</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Custom Design System (Figma to Code)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Advanced Dashboard / CMS</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Role-based Access Control</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Advanced API Layer (REST / GraphQL)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> AI Features / Chatbot / Analytics</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Scalable Hosting Setup (VPS / Vercel Pro)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> DevOps / CI-CD Integration (GitHub, Railway, PM2)</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> Full Ownership + Dev Training</li>
              <li className={styles.featureItem}><span className={styles.checkmark}>✓</span> 30–45 Days Post Launch Support</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CustomCodeForm;
