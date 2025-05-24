"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "@/styles/modules/main.module.scss";
import useLenisScroll from '@/hooks/useLenisScroll';
import ProgressBar from "@/components/ProgressBar";

export default function WebDevMainForm() {
  useLenisScroll();

  const [step, setStep] = useState(1);
  const containerRef = useRef(null);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScaleClick = (value) => {
    setFormData((prev) => ({ ...prev, scale: value }));
  };

  const scaleIcons = {
    "Local": "locally.svg",
    "Regional": "regionally.svg",
    "Global": "globally.svg",
    "Not Sure": "not sure.svg"
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

  const estimatePrice = () => {
    let price = 10000;
    if (formData.scale === "National") price += 5000;
    if (formData.scale === "Global") price += 10000;
    if (formData.design === "3D Animated") price += 15000;
    if (formData.features?.includes("E-commerce")) price += 10000;
    if (formData.features?.includes("Dashboard")) price += 8000;
    return price;
  };

  const toggleFeature = (feature) => {
    setFormData((prev) => {
      const features = prev.features || [];
      return {
        ...prev,
        features: features.includes(feature)
          ? features.filter((f) => f !== feature)
          : [...features, feature],
      };
    });
  };

  return (
    <div className={styles.formWrapper}>
      <ProgressBar step={step} totalSteps={3} />

      {/* Step 1 */}
      {step === 1 && (
        <div className={styles.formContainer}>
          <div className={styles.stepContent} ref={containerRef}>
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <div className={styles.iconWrapper}>
                <img src="/svgs/website-theme-svgrepo-com.svg" alt="Website Icon" className={styles.storeIcon} />
              </div>
              <h2 className={styles.heading}>Let's Understand Your Business</h2>

              <div className={styles.fieldGroup}>
                <label>1. What's your business name?</label>
                <input 
                  name="businessName" 
                  type="text" 
                  className={styles.input} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>2. Business Category</label>
                <select 
                  name="category" 
                  className={styles.dropdown} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Category</option>
                  <option>Service-based</option>
                  <option>Product-based</option>
                  <option>Portfolio</option>
                  <option>Educational</option>
                  <option>Blog</option>
                  <option>Other</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>3. What scale does your business operate at?</label>
                <div className={styles.iconSelectGroup}>
                  {Object.entries(scaleIcons).map(([label, file]) => (
                    <div
                      key={label}
                      className={`${styles.iconOption} ${
                        formData.scale === label ? styles.active : ""
                      }`}
                      onClick={() => handleScaleClick(label)}
                    >
                      <img src={`/svgs/${file}`} alt={label} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label>4. Do you already have a website?</label>
                <div className={styles.radioGroup}>
                  {['Yes', 'No'].map(option => (
                    <label key={option}>
                      <input 
                        type="radio" 
                        name="existingSite" 
                        value={option} 
                        onChange={handleChange} 
                        required 
                      /> 
                      {option}
                    </label>
                  ))}
                </div>
              </div>

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
            </form>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className={styles.formContainer} ref={containerRef}>
          <div className={styles.stepContent}>
            <h2 className={styles.heading}>Website Goals & Design Preferences</h2>

            <div className={styles.fieldGroup}>
              <label>5. What's your primary website goal?</label>
              <select 
                name="goal" 
                className={styles.dropdown} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Goal</option>
                <option>Sell Products</option>
                <option>Showcase Services</option>
                <option>Portfolio Display</option>
                <option>Build Community</option>
                <option>Educational Content</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label>6. What type of design are you looking for?</label>
              <select 
                name="design" 
                className={styles.dropdown} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Design</option>
                <option>Basic</option>
                <option>Modern</option>
                <option>Interactive</option>
                <option>3D Animated</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label>7. Do you already have branding ready?</label>
              <div className={styles.radioGroup}>
                <label>
                  <input 
                    type="radio" 
                    name="branding" 
                    value="Yes" 
                    onChange={handleChange} 
                    required 
                  /> 
                  Yes
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="branding" 
                    value="No" 
                    onChange={handleChange} 
                  /> 
                  No
                </label>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label>8. Should the site be mobile/tablet responsive?</label>
              <div className={styles.radioGroup}>
                <label>
                  <input 
                    type="radio" 
                    name="responsive" 
                    value="Yes" 
                    onChange={handleChange} 
                    required 
                  /> 
                  Yes
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="responsive" 
                    value="No" 
                    onChange={handleChange} 
                  /> 
                  No
                </label>
              </div>
            </div>

            <button className={styles.backButton} onClick={prevStep}>Back</button>
            <button className={styles.nextButton} onClick={nextStep}>Next</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className={styles.formContainer} ref={containerRef}>
          <div className={styles.stepContent}>
            <h2 className={styles.heading}>Select Key Features</h2>

            <div className={styles.fieldGroup}>
              <label>9. Which features would you like?</label>
              <div className={styles.checkboxGroup}>
                {['E-commerce', 'Blog', 'Booking System', 'Dashboard', 'Multilingual'].map((feature) => (
                  <label key={feature}>
                    <input
                      type="checkbox"
                      name="features"
                      value={feature}
                      checked={formData.features?.includes(feature) || false}
                      onChange={() => toggleFeature(feature)}
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.priceBox}>
              <p><strong>Estimated Price:</strong> ₹{estimatePrice().toLocaleString()}</p>
            </div>

            <button className={styles.backButton} onClick={prevStep}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}