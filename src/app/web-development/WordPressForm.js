'use client';
import { useState } from 'react';
import styles from '@/styles/modules/main.module.scss';
import '@/styles/globals.scss';


export default function WordPressForm() {
  const [siteType, setSiteType] = useState('');
  const [helpType, setHelpType] = useState('');
  const [redesignReason, setRedesignReason] = useState('');
  const [sectionsToImprove, setSectionsToImprove] = useState([]);
  const [bugDescription, setBugDescription] = useState('');
  const [featuresToAdd, setFeaturesToAdd] = useState('');
  const [speedIssue, setSpeedIssue] = useState('');
  const [selfManage, setSelfManage] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const toggleSection = (section) => {
    setSectionsToImprove((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const improvementOptions = [
    'Homepage',
    'About / Info Section',
    'Contact / Booking Page',
    'Product or Services Section',
    'Blog Layout',
    'Not Sure / Need Advice'
  ];

  return (
    <div className={styles.surveyContainer}>
      <h1 className={styles.surveyHeading}>Web Development Questionnaire</h1>

      <div className={styles.formContainer}>
        <p className={styles.subHeading}>
          Let’s understand your website needs step-by-step.
        </p>

        {/* ✅ EVERYTHING inside form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.fieldGroup}>
            <label htmlFor="siteType">1. What type of website is it?</label>
            <select
              id="siteType"
              className={styles.dropdown}
              value={siteType}
              onChange={(e) => setSiteType(e.target.value)}
            >
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
            <label htmlFor="helpType">2. What would you like us to help with?</label>
            <select
              id="helpType"
              className={styles.dropdown}
              value={helpType}
              onChange={(e) => setHelpType(e.target.value)}
            >
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
              <label htmlFor="redesignReason">3. Why do you want a redesign?</label>
              <select
                id="redesignReason"
                className={styles.dropdown}
                value={redesignReason}
                onChange={(e) => setRedesignReason(e.target.value)}
              >
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
              <label>4. Which sections do you want updated?</label>
              <div className={styles.multiOptionGrid}>
                {improvementOptions.map((section) => (
                  <div
                    key={section}
                    className={`${styles.optionCard} ${sectionsToImprove.includes(section) ? styles.selected : ''}`}
                    onClick={() => toggleSection(section)}
                    role="button"
                    tabIndex={0}
                  >
                    {section}
                  </div>
                ))}
              </div>
            </div>
          )}

          {helpType === 'FIX BUG & DESIGN' && (
            <div className={styles.fieldGroup}>
              <label htmlFor="bugDescription">5. What kind of issues are you facing?</label>
              <textarea
                id="bugDescription"
                className={styles.textarea}
                placeholder="Describe the bug/design issue..."
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
              />
            </div>
          )}

          {helpType === 'NEW FEATURE' && (
            <div className={styles.fieldGroup}>
              <label htmlFor="featuresToAdd">6. What features would you like to add?</label>
              <textarea
                id="featuresToAdd"
                className={styles.textarea}
                placeholder="e.g. login system, dashboard, live chat, etc."
                value={featuresToAdd}
                onChange={(e) => setFeaturesToAdd(e.target.value)}
              />
            </div>
          )}

          {helpType === 'SPEED-UP' && (
            <div className={styles.fieldGroup}>
              <label htmlFor="speedIssue">7. Where do you notice the slowness most?</label>
              <select
                id="speedIssue"
                className={styles.dropdown}
                value={speedIssue}
                onChange={(e) => setSpeedIssue(e.target.value)}
              >
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
            <label htmlFor="selfManage">8. Will you manage the website yourself?</label>
            <select
              id="selfManage"
              className={styles.dropdown}
              value={selfManage}
              onChange={(e) => setSelfManage(e.target.value)}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
              <option>Not Sure</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="lastUpdated">9. When was your site last updated?</label>
            <select
              id="lastUpdated"
              className={styles.dropdown}
              value={lastUpdated}
              onChange={(e) => setLastUpdated(e.target.value)}
            >
              <option value="">Select</option>
              <option>Within the last 6 months</option>
              <option>6–12 months ago</option>
              <option>Over 1 year ago</option>
              <option>Not sure</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
