"use client";

import { useState, useRef, useEffect } from "react";
import styles from "@/styles/modules/main.module.scss";
import ToastMessage from "@/components/ToastMessage/ToastMessage";

import ProgressBar from "@/components/ProgressBar";

import { useRouter } from "next/navigation";

export default function WebDevMainForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);


  const recommendedPlatforms = {
    grocery: "shopify",
    ecommerce: "shopify",
    restaurant: "wordpress",
    "local-services": "wordpress",
    "home-services": "wordpress",
    "event-planner": "wordpress",
    medical: "wordpress",
    hotel: "wordpress",
    coach: "wordpress",
    ngo: "wordpress",
    fashion: "shopify",
    artist: "webflow",
    creator: "wordpress",
    portfolio: "webflow",
    "real-estate": "wordpress",
    legal: "wordpress",
    saas: "custom",
    agency: "wordpress",
    other: "wordpress",
  
    // Marketplace types
    multivendor: "custom",
    "service-platform": "custom",
    freelance: "custom",
    travel: "wordpress",
    "doctor-booking": "custom",
    "gym-marketplace": "custom",
    "event-aggregator": "custom",
    education: "custom",
    "realestate-portal": "custom"
  };
  


  useEffect(() => {
    const savedData = localStorage.getItem("webDevFormData");
    const stepValue = localStorage.getItem("formStep")
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if(stepValue){
      const parsedStep = parseInt(stepValue,10)
      if(!isNaN(parsedStep)){
        setStep(parsedStep)
      }
    }
  }, []);

  // Save data to localStorage on every formData change
  useEffect(() => {
    localStorage.setItem("webDevFormData", JSON.stringify(formData));
    localStorage.setItem("formStep", step.toString());

  }, [formData]);

  const questions = [
    {
      id: 1,
      type: "text",
      label: "What's your business or brand called?",
      name: "businessName",
      required: true,
      placeholder: "company.Ltd.",
      helper: "This helps us personalize your site and make it feel truly yours."
    },

    {
      id: 2,
      type: "radio",
      label: "What kind of website are you building?",
      name: "siteCategory",
      required: true,
      helper: "Knowing this upfront helps us show the most relevant options — whether you're starting for yourself or building something bigger.",
      options: [
        {
          label: "Personal / Business Website",
          value: "personal",
          description: "A website for your store, service, or brand"
        },
        {
          label: "Multi-vendor or Marketplace Platform",
          value: "marketplace",
          description: "A platform with multiple sellers, vendors, or service providers"
        },
        
      ]
    },
    
    {
      id: 3,
      type: "select",
      label: "What kind of work do you do?",
      name: "businessType",
      required: true,
      helper: "Select the option that best fits — we'll tailor the design and features around it.",
      options: [
        // Regular businesses (shown when siteCategory is "personal")
        { label: "Grocery or General Store", value: "grocery", category: "personal" },
        { label: "Online Store / E-commerce", value: "ecommerce", category: "personal" },
        { label: "Restaurant / Cafe / Food Delivery", value: "restaurant", category: "personal" },
        { label: "Local Services (e.g., Salon, Gym, Plumbing)", value: "local-services", category: "personal" },
        { label: "Home Services (e.g., Cleaning, Repairs)", value: "home-services", category: "personal" },
        { label: "Event Planner / Wedding Services", value: "event-planner", category: "personal" },
        { label: "Doctor / Clinic / Medical Practice", value: "medical", category: "personal" },
        { label: "Hotel / Resort / Homestay", value: "hotel", category: "personal" },
        { label: "Coach / Educator / Institute", value: "coach", category: "personal" },
        { label: "NGO / Nonprofit / Charity", value: "ngo", category: "personal" },
        { label: "Fashion / Streetwear Brand", value: "fashion", category: "personal" },
        { label: "Artist / Musician / Creative Professional", value: "artist", category: "personal" },
        { label: "Digital Creator / Blogger / Influencer", value: "creator", category: "personal" },
        { label: "Portfolio / Resume / CV", value: "portfolio", category: "personal" },
        { label: "Real Estate Agent / Property Manager", value: "real-estate", category: "personal" },
        { label: "Legal / Law Office / Financial Services", value: "legal", category: "personal" },
        { label: "Developer / Tech Startup / SaaS", value: "saas", category: "personal" },
        { label: "Marketing Agency / Digital Studio", value: "agency", category: "personal" },
        { label: "Other (write below if not listed)", value: "other", category: "personal" },
        // Marketplaces (shown when siteCategory is "marketplace")
        { label: "Multi-vendor Online Store", value: "multivendor", category: "marketplace" },
        { label: "Service Provider Platform (e.g., UrbanClap)", value: "service-platform", category: "marketplace" },
        { label: "Freelance Marketplace", value: "freelance", category: "marketplace" },
        { label: "Travel Agent / Property Listing Site", value: "travel", category: "marketplace" },
        { label: "Doctor / Specialist Booking Platform", value: "doctor-booking", category: "marketplace" },
        { label: "Salon or Gym Marketplace", value: "gym-marketplace", category: "marketplace" },
        { label: "Event / Wedding Vendor Aggregator", value: "event-aggregator", category: "marketplace" },
        { label: "Online Education Platform (Multiple Teachers)", value: "education", category: "marketplace" },
        { label: "Real Estate Listing Portal (Multiple Agents)", value: "realestate-portal", category: "marketplace" }
      ],
      footer: "No stress — if your business is unique, we'll still make sure your website fits just right."
    },

    
    {
      id: 4,
      type: "radio",
      label: "How far do you currently serve customers?",
      name: "reach",
      required: true,
      options: [
        { label: "Local area", value: "local" },
        { label: "State or region-wide", value: "regional" },
        { label: "Across the country", value: "national" },
        { label: "Worldwide", value: "global" },
      ],
      helper: "This helps us understand the reach your site should be optimized for (speed, language, etc.)"
    },
    {
      id: 5,
      type: "radio",
      label: "What's your current website situation?",
      name: "websiteStatus",
      required: true,
      helper: "This helps us understand your starting point",
      options: [
        { 
          label: "I don't have a website", 
          value: "no-website",
          description: "Starting completely from scratch" 
        },
        { 
          label: "I have a website but want to redesign it", 
          value: "redesign",
          description: "Keep some content but change the design" 
        },
        { 
          label: "I have a website and want to add features", 
          value: "add-features",
          description: "Keep design but add new functionality" 
        }
      ],
      conditionalQuestions: {
        "redesign": [
          {
            id: 5.1,
            type: "radio",
            label: "What kind of redesign do you need?",
            name: "redesignScope",
            options: [
              { 
                label: "Complete overhaul", 
                value: "complete",
                description: "New look and structure" 
              },
              { 
                label: "Partial refresh", 
                value: "partial",
                description: "Update specific sections only" 
              },
              { 
                label: "Just improve UX", 
                value: "ux-only",
                description: "Better navigation and usability" 
              }
            ]
          },
          {
            id: 5.2,
            type: "text",
            label: "Current website URL (if live):",
            name: "currentUrl",
            placeholder: "https://example.com"
          }
        ],
        "add-features": [
          {
            id: 5.1,
            type: "text",
            label: "Your current website URL:",
            name: "currentUrl",
            placeholder: "https://example.com",
            required: true
          },
          
        ]
      }
    },
    {
      id: 6,
      type: "select",
      recommendedLabel: "✅ We've selected the best-fit platform for your business. You can change it if you'd like.",
      label: "Which platform would you prefer for your website?",
      name: "platformPreference",
      options: [
        { label: "WordPress", value: "wordpress" },
        { label: "Shopify", value: "shopify" },
        { label: "Webflow", value: "webflow" },
        { label: "Wix", value: "wix" },
        { label: "Custom-built (HTML/CSS/React/etc.)", value: "custom" },
        { label: "Not sure — help me choose", value: "unsure" }
      ],
      helper: "If you're not sure, we'll recommend one based on your business type and future plans."
    },
    {
      id: 7,
      type: "radio",
      label: "What do you want your website to help you with the most?",
      name: "primaryGoal",
      options: [
        { label: "Attract more people to my business", value: "attract" },
        { label: "Sell products or services online", value: "sell" },
        { label: "Let people book appointments or services", value: "book" },
        { label: "Share my content or ideas", value: "share" },
        { label: "Build a strong brand presence", value: "brand" },
        { label: "Something else", value: "other" }
      ],
      helper: "Your goal helps us design with purpose — every click should lead somewhere useful."
    },
    {
      id: 8,
      type: "radio",
      label: "What kind of design vibe are you going for?",
      name: "designVibe",
      options: [
        { label: "Clean & minimal", value: "minimal" },
        { label: "Bold & modern", value: "modern" },
        { label: "Trendy & stylish", value: "stylish" },
        { label: "Playful or artistic", value: "playful" },
        { label: "Futuristic or animated", value: "futuristic" }
      ],
      helper: "This sets the tone — even simple sites can feel powerful if the vibe is right."
    },
    {
      id: 9,
      type: "radio",
      label: "Do you have a logo or brand visuals ready?",
      name: "brandAssets",
      options: [
        { label: "Yes, I have everything", value: "complete" },
        { label: "I have a logo but no brand colors", value: "logo-only" },
        { label: "I need help with visuals and branding", value: "none" }
      ],
      helper: "If you don't have branding, don't worry — we can help you create a clean, professional look."
    },
    {
      id: 10,
      type: "radio",
      label: "How are you handling the content for the site?",
      name: "contentStatus",
      options: [
        { label: "I already have all the content (text & images)", value: "complete" },
        { label: "I need help writing content", value: "need-writing" },
        { label: "I need help with writing + finding visuals", value: "need-all" },
        { label: "I'm not sure yet", value: "unsure" }
      ],
      helper: "Content plays a big role in pricing — it affects design time and SEO quality."
    },
    {
      id: 11,
      type: "feature-display", // Custom type for rendering features
      name: "essentialFeatures",
      label: "Essential Features (Pre-Selected for You)",
      helper: "These are your essential features to help your business run smoothly. You can add more if needed.",
      conditionalOn: "businessType", // This field shows up only if businessType is selected
    }
  ];




  


  const fetchUserCountry = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return data.country_name || "Unknown";
    } catch (err) {
      console.error("Failed to fetch country:", err);
      return "Unknown";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" 
        ? checked 
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter(v => v !== value)
        : value 
    }));
  };

  useEffect(() => {
    const selectedBusiness = formData.businessType;
    const currentPlatform = formData.platformPreference;
  
    if (selectedBusiness && !currentPlatform && recommendedPlatforms[selectedBusiness]) {
      setFormData((prev) => ({
        ...prev,
        platformPreference: recommendedPlatforms[selectedBusiness],
      }));
    }
  }, [formData.businessType]);
  

  const handleSubmit = async () => {
    setLoading(true);
    const country = await fetchUserCountry();
    const payload = { formData: { ...formData }, country };
    try {
      const response = await fetch("/api/generatePlans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Failed to generate pricing plans");
      const data = await response.json();
      localStorage.setItem("pricingPlans", JSON.stringify(data.plans));
      router.push("/pricing");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate pricing plans. Please try again.");
    } finally {
      setLoading(false);
    }
  };






  const businessTypeFeatures = {
    grocery: [
      "Product Listings",
      "Online Payments",
      "Admin Dashboard",
      "Contact Form",
      "Delivery Area Pin Code Checker",
      "Inventory Management"
    ],
    ecommerce: [
      "Product Listings",
      "Online Payments",
      "Admin Dashboard",
      "User Login",
      "Wishlist & Cart",
      "Search & Filter Options",
      "Order Tracking"
    ],
    restaurant: [
      "Menu Listings",
      "Online Ordering",
      "Table Reservation / Delivery Time Slot",
      "Online Payments",
      "Contact Form",
      "Live Chat",
      "Admin Dashboard"
    ],
    "local-services": [
      "Service Listings",
      "Booking or Appointment Form",
      "Contact Form",
      "Pricing Plans / Packages",
      "Google Maps Integration",
      "Reviews / Testimonials"
    ],
    "home-services": [
      "Service Listings",
      "Booking Form",
      "Area-wise Availability",
      "Contact Form",
      "Online Payments",
      "Admin Dashboard"
    ],
    "event-planner": [
      "Portfolio Gallery",
      "Contact Form",
      "Booking Request Form",
      "Packages/Pricing Page",
      "Testimonials",
      "Admin Dashboard"
    ],
    medical: [
      "Appointment Booking",
      "Doctor Profiles",
      "Clinic Timings & Location",
      "Online Consult Request Form",
      "Contact Form",
      "Admin Dashboard"
    ],
    hotel: [
      "Room Listings",
      "Booking Calendar",
      "Availability Checker",
      "Contact Form",
      "Google Maps Integration",
      "Testimonials"
    ],
    coach: [
      "Course/Training Listings",
      "Booking or Enrollment Form",
      "Testimonials",
      "About/Experience Section",
      "Contact Form",
      "Admin Dashboard"
    ],
    ngo: [
      "Donation Gateway",
      "Volunteer Form",
      "Blog / Activity Updates",
      "Events Calendar",
      "About Us & Team",
      "Contact Form"
    ],
    fashion: [
      "Product Listings",
      "Lookbook / Gallery",
      "Online Payments",
      "Admin Dashboard",
      "Newsletter Signup",
      "Live Chat"
    ],
    artist: [
      "Portfolio (Image / Video / Audio)",
      "Booking or Inquiry Form",
      "Event Calendar or Tour Dates",
      "Contact Form",
      "About Section"
    ],
    creator: [
      "Blog Posts",
      "Newsletter Signup",
      "Social Media Feed",
      "Contact Form",
      "About Me Section",
      "Collaborate / Sponsor Form"
    ],
    portfolio: [
      "About / Bio Section",
      "Resume Download",
      "Skills & Services",
      "Contact Form",
      "Testimonials",
      "Call-to-Action Button"
    ],
    "real-estate": [
      "Property Listings",
      "Inquiry/Booking Form",
      "Filters (Location, Budget, Type)",
      "Google Maps Integration",
      "Contact Agent Form",
      "Admin Dashboard"
    ],
    legal: [
      "Services & Practice Areas",
      "Appointment Booking",
      "Contact Form",
      "FAQ Section",
      "Document Upload Feature",
      "Team Profiles"
    ],
    saas: [
      "Features / Product Pages",
      "Pricing Plans",
      "Contact / Demo Request Form",
      "Blog",
      "Admin Dashboard",
      "User Login (if SaaS)"
    ],
    agency: [
      "Services Offered",
      "Portfolio",
      "Case Studies / Results",
      "Contact / Get Quote Form",
      "Client Testimonials",
      "Blog (optional)"
    ],
    other: [
      "Contact Form",
      "Basic Pages (About, Services, Testimonials)",
      "Newsletter Signup",
      "Custom Features (As described)"
    ],
    // Marketplace
    multivendor: [
      "Vendor Registration",
      "Multi-vendor Product Management",
      "Commission System",
      "Vendor Dashboard",
      "Order Splitting",
      "Admin Control Panel"
    ],
    "service-platform": [
      "Service Provider Profiles",
      "Booking System",
      "Ratings & Reviews",
      "Payment Processing",
      "Service Area Management",
      "Admin Dashboard"
    ],
    freelance: [
      "Freelancer Profiles",
      "Project Bidding System",
      "Portfolio Display",
      "Escrow Payments",
      "Messaging System",
      "Dispute Resolution"
    ],
    travel: [
      "Property/Service Listings",
      "Booking Engine",
      "Availability Calendar",
      "Review System",
      "Payment Gateway",
      "Commission Management"
    ],
    "doctor-booking": [
      "Doctor Profiles",
      "Appointment Scheduling",
      "Patient Records",
      "Online Consultations",
      "Prescription Management",
      "Billing System"
    ],
    "gym-marketplace": [
      "Gym/Fitness Center Listings",
      "Class Scheduling",
      "Membership Management",
      "Trainer Profiles",
      "Payment Processing",
      "Attendance Tracking"
    ],
    "event-aggregator": [
      "Vendor Listings",
      "Event Calendar",
      "Booking System",
      "Quote Requests",
      "Review System",
      "Payment Processing"
    ],
    education: [
      "Instructor Profiles",
      "Course Listings",
      "Enrollment System",
      "Learning Management",
      "Payment Processing",
      "Certificate Generation"
    ],
    "realestate-portal": [
      "Agent Listings",
      "Property Management",
      "Lead Generation",
      "Document Sharing",
      "Commission Tracking",
      "Analytics Dashboard"
    ]
  };
  

  const renderField = (q) => {
    const currentValue = formData[q.name];
  
    // For businessType question, filter options based on siteCategory
    let options = q.options;
    if (q.name === "businessType" && formData.siteCategory) {
      options = q.options.filter(opt =>
        opt.category === formData.siteCategory || !opt.category
      );
    }
  
    // ✅ Handle feature-display BEFORE the main return
    if (q.type === "feature-display") {
      if (!formData[q.conditionalOn]) {
        return (
          <div key={q.id} className={styles.fieldGroup}>
            <label>{q.id}. {q.label}</label>
            <p className={styles.helperText}>Please select your business type first to see recommended features</p>
          </div>
        );
      }
  
      const selectedType = formData[q.conditionalOn];
      const features = businessTypeFeatures[selectedType] || [];
  
      if (features.length === 0) {
        return (
          <div key={q.id} className={styles.fieldGroup}>
            <label>{q.id}. {q.label}</label>
            <p className={styles.helperText}>No standard features defined for this business type yet</p>
          </div>
        );
      }
  
      return (
        <div key={q.id} className={styles.fieldGroup}>
          <label>{q.id}. {q.label}</label>
          {q.helper && <p className={styles.helperText}>{q.helper}</p>}
          <ul className={styles.featureList}>
            {features.map((feature, idx) => (
              <li key={`${selectedType}-feature-${idx}`} className={styles.featureItem}>
                ✅ {feature}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  
    // ✅ Regular fields (default JSX return)
    return (
      <div key={q.id} className={styles.fieldGroup}>
        <label>{q.id}. {q.label}</label>
        {q.helper && <p className={styles.helperText}>{q.helper}</p>}
  
        {q.type === "text" && (
          <input 
            name={q.name} 
            type="text" 
            className={styles.input} 
            onChange={handleChange} 
            required={q.required} 
            value={currentValue || ""}
            placeholder={q.placeholder}
          />
        )}
  
  {q.type === "select" && options && (
  <>
    {q.recommendedLabel && (
      <div className={styles.recommendNotice}>
        {q.recommendedLabel}
      </div>
    )}
    <select 
      name={q.name} 
      className={styles.dropdown} 
      onChange={handleChange} 
      required={q.required}
      value={currentValue || ""}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </>
)}

  
  {q.type === "radio" && options && (
  <div className={styles.radioGroup}>
    {options.map((opt) => {
      const inputId = `${q.name}-${opt.value}`;
      return (
        <div
          key={opt.value}
          className={styles.radioOption}
          data-selected={currentValue === opt.value}
        >
          <input
            type="radio"
            id={inputId}
            name={q.name}
            value={opt.value}
            checked={currentValue === opt.value}
            onChange={handleChange}
            required={q.required}
            className={styles.radioInput}
          />
          <label htmlFor={inputId} className={styles.radioLabel}>
            {opt.label}
            {opt.description && (
              <div className={styles.optionDesc}>{opt.description}</div>
            )}
          </label>
        </div>
      );
    })}
  </div>
)}

            
        
        {q.type === "checkbox" && options && (
          <div className={styles.checkboxGroup}>
            {options.map((opt) => (
              <label key={opt.value} className={styles.checkboxOption}>
                <input
                  type="checkbox"
                  name={q.name}
                  value={opt.value}
                  checked={(currentValue || []).includes(opt.value)}
                  onChange={handleChange}
                />
                {opt.label}
              </label>
            ))}
          </div>
        )}
  
        {q.footer && <p className={styles.footerText}>{q.footer}</p>}
  
        {q.conditionalQuestions && q.conditionalQuestions[currentValue] && (
          <div className={styles.conditionalQuestions}>
            {q.conditionalQuestions[currentValue].map(renderField)}
          </div>
        )}
      </div>
    );
  };  




  

  // Determine which questions to display based on current step
  let displayedQuestions = [];
  const totalSteps = questions.length;

  if (step === 1) {
    displayedQuestions = [questions[0]]; // Business name
  } else if (step === 2) {
    displayedQuestions = [questions[1]]; // Site category
  } else if (step === 3) {
    // Show business type question (filtered based on previous selection)
    displayedQuestions = [questions[2]];
  } else {
    // For steps after 3, show the remaining questions in order
    const remainingQuestions = questions.slice(3);
    const questionIndex = step - 4;
    if (questionIndex < remainingQuestions.length) {
      displayedQuestions = [remainingQuestions[questionIndex]];
    }
  }

  const isLastStep = step === totalSteps;

  return (
    <>
    {toast && <ToastMessage message={toast} onClose={() => setToast(null)} />}

    <div className={styles.formWrapper}>
      <div className={styles.formInner}>
      <div className={styles.betaMarquee}>
  <div className={styles.marqueeTrack}>
     Alert 🚨🔧 This is a beta version — improvements and features are rolling out. Thanks for being here early! 🔧 This is a beta version — improvements and features are rolling out. Thanks for being here early!
  </div>
</div>

      <h1 className={styles.surveyHeading} id="animatedHeading">
  {step >= 2 && formData.businessName?.trim()
    ? formData.businessName
    : "Let's build your site"}
</h1>

        <p className={styles.subHeading}>We offer personalized packages for you.</p>
        <ProgressBar step={step} totalSteps={totalSteps} />
        <form
  onSubmit={(e) => {
    e.preventDefault();
    if (step === 1 && formData.businessName?.trim()) {
      setToast(`✨ Awesome! We'll call your site: ${formData.businessName}`);
    }

    if (isLastStep) handleSubmit();
    else setStep(step + 1);
  }}
  className={styles.formContainer}
>

          {displayedQuestions.map(renderField)}
          <div className={styles.stickyFooter}>
  <div className={styles.buttonGroup}>
    {step > 1 && (
      <button type="button" onClick={() => setStep(step - 1)} className={styles.backButton}>
        Back
      </button>
    )}
    <button type="submit" className={styles.nextButton} disabled={loading}>
      {loading ? "Loading..." : isLastStep ? "Submit" : "Next"}
    </button>
  </div>
</div>

        </form>
      </div>
    </div>
    </>
  );
}