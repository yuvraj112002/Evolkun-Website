"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "@/styles/modules/main.module.scss";
import useLenisScroll from "@/hooks/useLenisScroll";
import ProgressBar from "@/components/ProgressBar";

export default function WebDevMainForm() {
  useLenisScroll();
  const dropdownQuestions = [
    {
      id: 7,
      label: "What kind of design vibe are you going for?",
      helper:
        "This sets the tone — even simple sites can feel powerful if the vibe is right.",
      name: "designVibe",
      type: "select",
      required: true,
      options: [
        { label: "Clean & minimal", value: "clean" },
        { label: "Bold & modern", value: "bold" },
        { label: "Trendy & stylish", value: "trendy" },
        { label: "Playful or artistic", value: "playful" },
        { label: "Futuristic or animated", value: "futuristic" },
      ],
    },
    {
      id: 8,
      label: "Do you have a logo or brand visuals ready?",
      helper: "", // Add helper text if needed
      name: "branding",
      type: "select",
      required: true,
      options: [
        { label: "Yes, I have everything", value: "yes" },
        { label: "I have a logo but no brand colors", value: "partial" },
        { label: "I need help with visuals and branding", value: "need-help" },
      ],
    },
    {
      id: 9,
      label: "How are you handling the content for the site?",
      helper:
        "Content plays a big role in pricing — it affects design time and SEO quality.",
      name: "content",
      type: "radio",
      required: true,
      options: [
        {
          label: "I already have all the content (text & images)",
          value: "have-all",
        },
        { label: "I need help writing content", value: "need-writing" },
        {
          label: "I need help with writing + finding visuals",
          value: "need-writing-visuals",
        },
        { label: "I’m not sure yet", value: "not-sure" },
      ],
    },
    {
      id: 10,
      label: "What features would you like on the site?",
      helper:
        " We use this list to gauge the complexity of your project. Select everything you need.",
      name: "features",
      type: "checkbox",
      options: [
        { label: "Contact Form", value: "contact-form" },
        { label: "Blog / Article Section", value: "blog" },
        { label: "Online Payments", value: "payments" },
        { label: "Product Listings", value: "product-listing" },
        { label: "Booking or Scheduling", value: "booking" },
        { label: "Live Chat", value: "live-chat" },
        { label: "User Login", value: "user-login" },
        { label: "Admin Dashboard", value: "admin-dashboard" },
        { label: "Multi-language Support", value: "multilang" },
        { label: "Newsletter Signup", value: "newsletter" },
        { label: "Custom Feature (Describe below)", value: "custom" },
      ],
    },
    {
      id: 11,
      label: "What kind of animations or effects do you prefer?",
      helper:
        "Animations affect both style and speed — we’ll balance it for performance.",
      name: "animations",
      type: "radio",
      required: true,
      options: [
        { label: "None — keep it simple", value: "none" },
        { label: "Basic (fade-ins, slide transitions)", value: "basic" },
        { label: "Scroll-triggered effects", value: "scroll" },
        { label: "Interactive hover elements", value: "hover" },
        { label: "3D / parallax / advanced visuals", value: "advanced" },
      ],
    },
    {
      id: 12,
      label: "Should the website work well on phones and tablets?",
      helper:
        "Most users are on mobile — we’ll optimize it unless you ask us not to.",
      name: "mobile",
      type: "radio",
      required: true,
      options: [
        { label: "Yes, definitely", value: "yes" },
        { label: "Not needed right now", value: "no" },
      ],
    },
  
  ];
  const stepFourthQuestions=[
      {
      id: 13,
      label: "When would you ideally like to launch your site?",
      helper:
        "This helps us set expectations on design, development, and delivery.",
      name: "timeline",
      type: "select",
      required: true,
      options: [
        { label: "Within a week", value: "week" },
        { label: "2–3 weeks", value: "2-3-weeks" },
        { label: "Around 1 month", value: "1-month" },
        { label: "No hurry, just planning ahead", value: "no-hurry" },
      ],
    },
    {
      id: 14,
      label: "Do you want post-launch support or ongoing updates?",
      helper:
        "We offer optional support plans to keep your site fresh and secure.",
      name: "supportPlan",
      type: "select",
      required: true,
      options: [
        { label: "No, I’ll manage it myself", value: "self-manage" },
        { label: "Yes — 1 month support sounds good", value: "1-month" },
        {
          label: "Yes — I’d like a long-term maintenance plan",
          value: "long-term",
        },
      ],
    },
    {
      id: 15,
      label: "Want to share anything specific you have in mind? (Optional)",
      helper:
        "The more details you share, the more accurate your plan and pricing will be.",
      name: "customNotes",
      type: "textarea",
      required: false,
        options: [],
      placeholder:
        "e.g., “I want something clean like Apple’s website,” or “It should load really fast in India.”",
    },
  ]
  const [step, setStep] = useState(1);
  const containerRef = useRef(null);

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
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
    Local: "locally.svg",
    Regional: "regionally.svg",
    Global: "globally.svg",
    "Not Sure": "not sure.svg",
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
      <ProgressBar step={step} totalSteps={4} />

      {/* Step 1 */}
      {step === 1 && (
        <div className={styles.formContainer}>
          <div className={styles.stepContent} ref={containerRef}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                nextStep();
              }}
            >
              <div className={styles.iconWrapper}>
                <img
                  src="/svgs/website-theme-svgrepo-com.svg"
                  alt="Website Icon"
                  className={styles.storeIcon}
                />
              </div>
              <h2 className={styles.heading}>Let's Understand Your Business</h2>

              <div className={styles.fieldGroup}>
                <label>1. What’s your business or brand called??</label>
                <input
                  name="businessName"
                  type="text"
                  className={styles.input}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>2. What kind of work do you do?</label>
                <p className={styles.helperText}>
                  No stress — if your business is unique, we’ll still make sure
                  your website fits just right.
                </p>
                <select
                  name="category"
                  className={styles.dropdown}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="grocery">
                    Local grocery or convenience store
                  </option>
                  <option value="ecommerce">
                    Online product store (E-commerce)
                  </option>
                  <option value="restaurant">
                    Restaurant, cafe, or food delivery
                  </option>
                  <option value="service-business">
                    Service-based business (plumber, salon, gym, etc.)
                  </option>
                  <option value="freelancer">Freelancer or consultant</option>
                  <option value="coach">Coach, mentor, or educator</option>
                  <option value="event-planner">
                    Event planner / Wedding services
                  </option>
                  <option value="hospitality">
                    Hotel, homestay, or travel services
                  </option>
                  <option value="healthcare">
                    Clinic, doctor, or healthcare provider
                  </option>
                  <option value="fashion">Fashion or clothing brand</option>
                  <option value="startup">Tech startup / SaaS product</option>
                  <option value="portfolio">
                    Personal portfolio (artist, designer, photographer)
                  </option>
                  <option value="blogger">Blogger or content creator</option>
                  <option value="influencer">Influencer / Public figure</option>
                  <option value="ngo">NGO or nonprofit</option>
                  <option value="real-estate">
                    Construction or real estate business
                  </option>
                  <option value="agency">
                    Digital agency or development team
                  </option>
                  <option value="entertainment">
                    Entertainment (DJ, music artist, production)
                  </option>
                  <option value="other">
                    Other (write below if not listed)
                  </option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>3. How far do you currently serve customers?</label>
                <p className={styles.helperText}>
                  This helps us understand the reach your site should be
                  optimized for (speed, language, etc.).
                </p>
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
            <h2 className={styles.heading}>
              Website Goals & Design Preferences
            </h2>

            <div className={styles.fieldGroup}>
              <label>4. Do you already have a website?</label>
                <p className={styles.helperText}>
                  No stress — if your business is unique, we’ll still make sure
                  your website fits just right.
                </p>
              <div className={styles.radioGroup}>
                {[
                  "No, this is brand new",
                  "Yes, but I want a redesign",
                  "Yes, and I’d like to add features or improvements ",
                ].map((option) => (
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
            <div className={styles.fieldGroup}>
              <label>
                5. Which platform would you prefer for your website?
              </label>
             
                <p className={styles.helperText}>
                  If you're not sure, we’ll recommend one based on your business
                  type and future plans.
                </p>

              <select
                name="goal"
                className={styles.dropdown}
                onChange={handleChange}
                required
              >
                <option value="">Select Goal</option>
                <option value="wordpress">WordPress</option>
                <option value="shopify">Shopify</option>
                <option value="webflow">Webflow</option>
                <option value="wix">Wix</option>
                <option value="custom">
                  Custom-built (HTML/CSS/React/etc.)
                </option>
                <option value="not-sure">Not sure — help me choose</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label>
                6. What do you want your website to help you with the most?
              </label>
              <p className={styles.helperText}>
                Your goal helps us design with purpose — every click should lead
                somewhere useful.
              </p>
              <select
                name="design"
                className={styles.dropdown}
                onChange={handleChange}
                required
              >
                <option value="">Select Design</option>
                <option value="attract">
                  Attract more people to my business
                </option>
                <option value="sell">Sell products or services online</option>
                <option value="book">
                  Let people book appointments or services
                </option>
                <option value="share">Share my content or ideas</option>
                <option value="brand">Build a strong brand presence</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <button className={styles.backButton} onClick={prevStep}>
              Back
            </button>
            <button className={styles.nextButton} onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className={styles.formContainer} ref={containerRef}>
          <div className={styles.stepContent}>
            <h2 className={styles.heading}>Design, Content & Features</h2>

            {dropdownQuestions.map((q) => (
              <div key={q.id} className={styles.fieldGroup}>
                <label>
                  {q.id}. {q.label}
                </label>
                {q.helper && <p className={styles.helperText}>{q.helper}</p>}

                <select
                  name={q.name}
                  className={styles.dropdown}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  {q.options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button className={styles.backButton} onClick={prevStep}>
              Back
            </button>
            <button className={styles.nextButton} onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
      <div className={styles.formContainer} ref={containerRef}>
          <div className={styles.stepContent}>
            <h2 className={styles.heading}>Timeline & Support</h2>

            {stepFourthQuestions.map((q) => (
              <div key={q.id} className={styles.fieldGroup}>
                <label>
                  {q.id}. {q.label}
                </label>
                {q.helper && <p className={styles.helperText}>{q.helper}</p>}

                <select
                  name={q.name}
                  className={styles.dropdown}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  {q.options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button className={styles.backButton} onClick={prevStep}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}