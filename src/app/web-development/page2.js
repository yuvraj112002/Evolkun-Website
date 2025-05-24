//"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "@/styles/modules/main.module.scss";
import useLenisScroll from '@/hooks/useLenisScroll'; // 👈 Smooth scroll hook

import WordPressForm from "./WordPressForm";
import ShopifyForm from "./ShopifyForm";
import WebflowForm from "./WebflowForm";
import CustomCodeForm from "./CustomCodeForm";
import WixForm from "./WixForm";
import ProgressBar from "@/components/ProgressBar";

export default function WebDevMainForm() {
  useLenisScroll(); // ✅ Apply Lenis scroll here

  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState("");
  const containerRef = useRef(null);

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderPlatformForm = () => {
    switch (platform) {
      case "WordPress":
        return <WordPressForm />;
      case "Shopify":
        return <ShopifyForm />;
      case "Webflow":
        return <WebflowForm />;
      case "Custom Code":
        return <CustomCodeForm />;
      case "Wix":
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
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [step]);

  return (
    <div className={styles.formWrapper}>
      {/* ✅ Progress Bar */}
      <ProgressBar step={step} totalSteps={3} />

      {/* ✅ Actual form section */}
      {step === 1 && (
        <div className={styles.formContainer}>
          <div className={styles.stepContent} ref={containerRef}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                nextStep();
              }}
            >
              {/* Optional Store Icon */}
              <div className={styles.iconWrapper}>
                <img
                
                  src="svgs/website-theme-svgrepo-com.svg"
                  alt="Store Icon"
                  className={styles.storeIcon}
                />
              </div>

              <h2 className={styles.heading}>Let’s Build Your New Website</h2>

              <div className={styles.fieldGroup}>
                <label>1. What’s your business name?</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="e.g., Evolkun Studio"
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>
                  2. What platform would you like us to build your site on?
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

              {platform && (
                <button className={styles.nextButton} type="submit">
                  <span>Next</span>
                  <svg className={styles.arrow} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </form>
          </div>
        </div>
      )}
      <div>
        {step === 2 && (
          <div className={styles.containerBackground}>
            {/* <button onClick={prevStep} className={styles.backButton}>
            
          </button> */}
            {renderPlatformForm()}
            <button
              className={styles.backButton}
              type="button"
              onClick={prevStep}
            >
              <svg className={styles.arrow} viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M11 18l-7-6 7-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Back</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
