'use client';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './main.module.scss';

import WordPressForm from './WordPressForm';
import ShopifyForm from './ShopifyForm';
import WebflowForm from './WebflowForm';
import CustomCodeForm from './CustomCodeForm';
import WixForm from './WixForm';

export default function WebDevMainForm() {
  const [step, setStep] = useState(1);
  const [hasWebsite, setHasWebsite] = useState('');
  const [siteURL, setSiteURL] = useState('');
  const [platform, setPlatform] = useState('');
  const containerRef = useRef(null);

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderPlatformForm = () => {
    switch (platform) {
      case 'WordPress':
        return <WordPressForm />;
      case 'Shopify':
        return <ShopifyForm />;
      case 'Webflow':
        return <WebflowForm />;
      case 'Custom Code':
        return <CustomCodeForm />;
      case 'Wix':
        return <WixForm />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [step]);

  return (
    <div className={styles.formContainer}>
      {/* Progress Bar */}
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
        <div className={styles.progressSteps}>
          <span className={step === 1 ? styles.activeStep : ''}>1. Platform</span>
          <span className={step === 2 ? styles.activeStep : ''}>2. Questions</span>
        </div>
      </div>

      {/* Step Content */}
      <div className={styles.stepContent} ref={containerRef}>
        {step === 1 && (
          <>
            <h2 className={styles.heading}>Let's Get Started with Your Website</h2>

            <div className={styles.fieldGroup}>
              <label>1. Do you already have a website or need a new one?</label>
              <select
                className={styles.dropdown}
                value={hasWebsite}
                onChange={(e) => {
                  setHasWebsite(e.target.value);
                  setSiteURL('');
                  setPlatform('');
                }}
              >
                <option value="">Select</option>
                <option value="existing">I already have a website</option>
                <option value="new">I need a brand new website</option>
              </select>
            </div>

            {hasWebsite === 'existing' && (
              <div className={styles.fieldGroup}>
                <label>2. Paste your website URL</label>
                <input
                  type="url"
                  className={styles.input}
                  placeholder="https://yourwebsite.com"
                  value={siteURL}
                  onChange={(e) => setSiteURL(e.target.value)}
                />
              </div>
            )}

            {hasWebsite && (
              <div className={styles.fieldGroup}>
                <label>
                  {hasWebsite === 'existing'
                    ? '3. What platform is your current website built on?'
                    : '2. What platform would you like us to build your site on?'}
                </label>
                <select
                  className={styles.dropdown}
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="">Select Platform</option>
                  <option value="WordPress">WordPress</option>
                  <option value="Shopify">Shopify</option>
                  <option value="Webflow">Webflow</option>
                  <option value="Custom Code">Custom Code</option>
                  <option value="Wix">Wix</option>
                </select>
              </div>
            )}

            {platform && (
              <button onClick={nextStep} className={styles.nextButton}>
                Next ➔
              </button>
            )}
          </>
        )}

        {step === 2 && (
          <div>
            <button onClick={prevStep} className={styles.backButton}>
              ← Back
            </button>
            {renderPlatformForm()}
          </div>
        )}
      </div>
    </div>
  );
}

