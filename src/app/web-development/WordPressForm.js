'use client';
import { useState } from 'react';
import styles from './main.module.scss';

export default function WordPressForm() {
  const [platform, setPlatform] = useState('');
  const [siteType, setSiteType] = useState('');
  const [helpType, setHelpType] = useState('');
  const [redesignReason, setRedesignReason] = useState('');
  const [sectionsToImprove, setSectionsToImprove] = useState([]);
  const [bugDescription, setBugDescription] = useState('');
  const [featuresToAdd, setFeaturesToAdd] = useState('');
  const [speedIssue, setSpeedIssue] = useState('');
  const [selfManage, setSelfManage] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [initialProducts, setInitialProducts] = useState('');
  const [needProductHelp, setNeedProductHelp] = useState('');
  const [needStoreSetup, setNeedStoreSetup] = useState('');
  const [productCount, setProductCount] = useState('');

  const toggleSection = (section) => {
    setSectionsToImprove((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const ecommerceOnly = ['Shopify', 'WordPress'];

  return (
    <div className={styles.surveyContainer}>
      {/* Optional Progress Bar */}
      {/* <div className={styles.progressBarWrapper}>Progress Bar Here</div> */}

      {/* Top Heading */}
      <h1 className={styles.surveyHeading}>Web Development Questionnaire</h1>
      

      {/* Main Form Container */}
      <div className={styles.formContainer}>
      
      <p className={styles.subHeading}>
        Let’s understand your website needs step-by-step.
      </p>

        {/* All your form fields below */}
        
        

        <div className={styles.fieldGroup}>
          <label>2. What type of website is it?</label>
          <select className={styles.dropdown} value={siteType} onChange={(e) => setSiteType(e.target.value)}>
            <option value="">Select type</option>
            <option>Online Store</option>
            <option>Business or Services</option>
            <option>Personal Blog</option>
            <option>Portfolio / Artist Website</option>
            <option>Educational / Courses</option>
            <option>NGO / Community</option>
            <option>Other</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label>3. What would you like us to help with?</label>
          <select className={styles.dropdown} value={helpType} onChange={(e) => setHelpType(e.target.value)}>
            <option value="">Select</option>
            <option>Full REDESIGN</option>
            <option>IMPROVE SECTION</option>
            <option>FIX BUG & DESIGN</option>
            <option>NEW FEATURE</option>
            <option>SPEED-UP</option>
          </select>
        </div>

        {helpType === 'Full REDESIGN' && (
          <div className={styles.fieldGroup}>
            <label>4. Why do you want a redesign?</label>
            <select className={styles.dropdown} value={redesignReason} onChange={(e) => setRedesignReason(e.target.value)}>
              <option value="">Select reason</option>
              <option>Site looks outdated</option>
              <option>Not converting visitors</option>
              <option>Need new brand direction</option>
              <option>Just want something better</option>
            </select>
          </div>
        )}

        {helpType === 'IMPROVE SECTION' && (
          <div className={styles.fieldGroup}>
            <label>5. Which sections do you want updated?</label>
            <div className={styles.multiOptionGrid}>
              {['Homepage', 'About / Info Section', 'Contact / Booking Page', 'Product or Services Section', 'Blog Layout', 'Not Sure / Need Advice'].map(section => (
                <div
                  key={section}
                  className={`${styles.optionCard} ${sectionsToImprove.includes(section) ? styles.selected : ''}`}
                  onClick={() => toggleSection(section)}
                >
                  {section}
                </div>
              ))}
            </div>
          </div>
        )}

        {helpType === 'FIX BUG & DESIGN' && (
          <div className={styles.fieldGroup}>
            <label>6. What kind of issues are you facing?</label>
            <textarea
              className={styles.textarea}
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
              placeholder="Describe the bug/design issue..."
            />
          </div>
        )}

        {helpType === 'NEW FEATURE' && (
          <div className={styles.fieldGroup}>
            <label>7. What kind of features would you like to add?</label>
            <textarea
              className={styles.textarea}
              value={featuresToAdd}
              onChange={(e) => setFeaturesToAdd(e.target.value)}
              placeholder="e.g. User login, booking system, live chat, animations..."
            />
          </div>
        )}

        {helpType === 'SPEED-UP' && (
          <div className={styles.fieldGroup}>
            <label>8. Where do you notice the slowness most?</label>
            <select className={styles.dropdown} value={speedIssue} onChange={(e) => setSpeedIssue(e.target.value)}>
              <option value="">Select area</option>
              <option>Whole site is slow</option>
              <option>Homepage takes time to load</option>
              <option>Product or blog pages are laggy</option>
              <option>Mobile version feels slow</option>
              <option>Not sure, just want faster</option>
            </select>
          </div>
        )}

        <div className={styles.fieldGroup}>
          <label>9. Are you planning to manage the website yourself later?</label>
          <select className={styles.dropdown} value={selfManage} onChange={(e) => setSelfManage(e.target.value)}>
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not Sure</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label>10. When was your website last updated/redesigned?</label>
          <select className={styles.dropdown} value={lastUpdated} onChange={(e) => setLastUpdated(e.target.value)}>
            <option value="">Select</option>
            <option>Within the last 6 months</option>
            <option>6–12 months ago</option>
            <option>Over 1 year ago</option>
            <option>Not sure</option>
          </select>
        </div>

        {ecommerceOnly.includes(platform) && (
          <>
            <div className={styles.fieldGroup}>
              <label>11. How many products do you plan to launch with?</label>
              <select className={styles.dropdown} value={initialProducts} onChange={(e) => setInitialProducts(e.target.value)}>
                <option value="">Select</option>
                <option>1–10</option>
                <option>10–50</option>
                <option>50–100</option>
                <option>100+</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label>12. Do you need help with product uploading and organizing collections?</label>
              <select className={styles.dropdown} value={needProductHelp} onChange={(e) => setNeedProductHelp(e.target.value)}>
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
                <option>Not Sure</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label>13. Do you need us to set up your payment, shipping, and tax settings?</label>
              <select className={styles.dropdown} value={needStoreSetup} onChange={(e) => setNeedStoreSetup(e.target.value)}>
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
                <option>Not Sure</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label>14. How many products are in your store (roughly)?</label>
              <select className={styles.dropdown} value={productCount} onChange={(e) => setProductCount(e.target.value)}>
                <option value="">Select</option>
                <option>1–10</option>
                <option>10–50</option>
                <option>50–100</option>
                <option>100+</option>
                <option>Not Sure</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
