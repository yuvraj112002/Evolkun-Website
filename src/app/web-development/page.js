'use client';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from '@/styles/modules/main.module.scss';

import WordPressForm from './WordPressForm';
import ShopifyForm from './ShopifyForm';
import WebflowForm from './WebflowForm';
import CustomCodeForm from './CustomCodeForm';
import WixForm from './WixForm';
import ProgressBar from '@/components/ProgressBar';


export default function WebDevMainForm() {
  const [step, setStep] = useState(1);
  const [hasWebsite, setHasWebsite] = useState('');
  const [siteURL, setSiteURL] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(true);
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
    <div className={styles.formWrapper}>
      {/* ✅ Progress Bar */}
      <ProgressBar step={step} totalSteps={3} />

      {/* ✅ Actual form section */}
      <div className={styles.formContainer}>
        <div className={styles.stepContent} ref={containerRef}>
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
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
                  <label htmlFor="siteURL">2. Paste your website URL</label>
                  <div className={styles.urlInputWrapper}>
                    <span className={styles.prefix}>https://</span>
                    <input
                      id="siteURL"
                      type="text"
                      className={styles.input}
                      placeholder="example.com"
                      value={siteURL}
                      onChange={(e) => setSiteURL(e.target.value)}
                      onBlur={() => {
                        const domainPattern = /^[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
                        const isValid = domainPattern.test(siteURL);
                        setIsUrlValid(isValid);
                      }}
                    />
                  </div>
                  {!isUrlValid && siteURL && (
                    <p className={styles.errorText}>
                      ⚠️ Please enter a valid domain like example.com or example.in
                    </p>
                  )}
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
                <button type="submit" className={styles.nextButton}>
                  Next ➔
                </button>
              )}
            </form>
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
    </div>
  );
}
