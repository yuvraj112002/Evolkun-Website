'use client';
import styles from '@/styles/modules/main.module.scss';

export default function CustomCodeForm() {
  return (
    <main className={styles.surveyContainer}>
      <h1 className={styles.surveyHeading}>Custom Code Form</h1>
      <p className={styles.subHeading}>Let's customize your website with unique code solutions</p>
      
      <div className={styles.formContainer}>
        <div className={styles.fieldGroup}>
          <label>What type of custom code do you need?</label>
          <select className={styles.dropdown}>
            <option value="">Select type</option>
            <option>Custom Widget</option>
            <option>API Integration</option>
            <option>Animation Effects</option>
            <option>Form Customization</option>
            <option>Other</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label>Describe your requirements</label>
          <textarea 
            className={styles.textarea} 
            placeholder="Please describe what you want to achieve with custom code..."
          />
        </div>

        <div className={styles.fieldGroup}>
          <label>Select features needed</label>
          <div className={styles.multiOptionGrid}>
            {['Responsive Design', 'User Interactions', 'Data Processing', 'Third-party Integration', 'Performance Optimization'].map(feature => (
              <div
                key={feature}
                className={styles.optionCard}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}