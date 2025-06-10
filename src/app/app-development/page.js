'use client';
import { useState, useRef, useEffect } from "react";
import styles from "@/styles/modules/main.module.scss";
import ProgressBar from "@/components/ProgressBar";
import MarqueeText from "@/components/MarqueeText/MarqueeText";
import ToastMessage from "@/components/ToastMessage/ToastMessage";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function AppDevMainForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    appIdeaShort: "",
    featureList: [],
    aiPredictedFeatures: [],
    score: 0,
  });
  const [loading, setLoading] = useState(false);
  const [showCustomFeatures, setShowCustomFeatures] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const { isAuthenticated, checkAuthProfile } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if ((step === 3 || step === 4) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const fetchUserCountry = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return data.country_name || "india";
    } catch (err) {
      console.error("Failed to fetch country:", err);
      return "Unknown";
    }
  };
  const handleChange = (name, value, score = 0) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      score: prev.score + score,
    }));
  };

  const validateAppIdea = async () => {
    if (!formData.appIdeaShort || formData.appIdeaShort.length < 8) {
      setError("Please describe your app idea in at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/extract-features", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: formData.appIdeaShort }),
      });

      const data = await res.json();

      const aiFeatures = data.features || [];

      setError(data.message || "Features generated successfully!");
      setFormData((prev) => ({
        ...prev,
        aiPredictedFeatures: aiFeatures,
        score: prev.score + aiFeatures.length * 5,
      }));
      setStep((prev) => prev + 1);
    } catch (err) {
      console.error("AI API Error:", err);
      setError("Something went wrong while generating features.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    setLoading(true);
    const country = await fetchUserCountry();
    const payload = {
      formData: { ...formData },
      country,
      score: formData.score,
    };
    
    try {
      const response = await fetch("/api/generatePlans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      // return;
      if (data.success) {
        router.push(`/pricing/${data?.planId}`);
        sessionStorage.removeItem("user");
        await checkAuthProfile();
        toast.success(data?.message || "Plane Generated Sucessfull");
        return;
      }
      toast.error(` ${data?.message || "Failed to generate plans"}`);
      router.push(`/`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate pricing plans. Please try again.");
      router.push("/");
    } finally {
      setLoading(false);
      localStorage.removeItem("appDevFormData");
      localStorage.removeItem("formStep");
    }
  };

  const appDevQuestions = [
    {
      id: 1,
      type: "radio-card",
      name: "projectStage",
      label: "Where are you in your journey right now?",
      helper: "No pressure — we just want to understand where you stand.",
      options: [
        {
          label: "Just an idea",
          value: "idea",
          description: "I have a vision but haven't started anything yet.",
          score: 5,
        },
        {
          label: "Some progress",
          value: "progress",
          description: "I've done a bit — maybe a design, maybe a prototype.",
          score: 3,
        },
        {
          label: "It's live, but needs more",
          value: "launched",
          description: "The app exists, but I want to improve or rebuild it.",
          score: 1,
        },
      ],
    },
    {
      id: 2,
      type: "text",
      name: "businessName",
      label: "What do you call this project or app?",
      placeholder: "Give it a name, even if it's temporary.",
      helper: "Helps us talk to you like a real partner.",
      score: 10,
    },
    {
      id: 3,
      type: "text",
      name: "appIdeaShort",
      label: "In a few words, what should your app do?",
      placeholder: "e.g. Book tutors, rent bikes, sell sneakers",
      helper:
        "Keep it short and simple — like you're pitching the idea in one line.",
      score: 10,
      ref: inputRef,
    },
    {
      id: 4,
      type: "select",
      name: "audienceType",
      label: "Who is this app for?",
      helper: "This helps us guess how complex it might be.",
      options: [
        { label: "My customers or clients", value: "clients", score: 12 },
        { label: "Other businesses", value: "b2b", score: 16},
        { label: "My team / internal use", value: "internal", score: 14 },
        { label: "Anyone — open to the public", value: "public", score: 13 },
      ],
    },
    {
      id: 5,
      type: "select",
      name: "industryType",
      label: "What industry does your app fall into?",
      helper: "Just pick what feels closest — it doesn't have to be perfect.",
      options: [
        { label: "Education", value: "education", score: 8 },
        { label: "Healthcare", value: "healthcare", score: 15 },
        { label: "Fitness", value: "fitness", score: 7 },
        { label: "E-commerce", value: "e-commerce", score: 12 },
        { label: "Real Estate", value: "real-estate", score: 10 },
        { label: "Food & Beverage", value: "food-beverage", score: 6 },
        { label: "Events", value: "events", score: 8 },
        { label: "Travel", value: "travel", score: 10 },
        { label: "Finance", value: "finance", score: 15 },
        { label: "Logistics", value: "logistics", score: 12 },
        { label: "NGO", value: "ngo", score: 5 },
        { label: "Other", value: "other", score: 5 },
      ],
    },
    {
      id: 6,
      type: "select",
      name: "reach",
      label: "Where will your users be located?",
      helper:
        "Helps us understand the scope and scale of what you're building.",
      options: [
        { label: "Just my city or town", value: "local", score: 25 },
        { label: "A few states or regions", value: "regional", score: 30 },
        { label: "Across the whole country", value: "national", score: 35 },
        { label: "Globally — anywhere", value: "global", score: 40 },
      ],
    },
    {
      id: 7,
      type: "select",
      name: "platform",
      label: "Where should people be able to use your app?",
      helper: "Let's get a sense of where your audience will interact.",
      options: [
        { label: "Android phones", value: "android", score: 20 },
        { label: "iPhones (iOS)", value: "ios", score: 20 },
        { label: "Both Android and iOS", value: "both", score: 25 },
        { label: "Just a web app", value: "web", score: 18 },
      ],
    },
    {
      id: 8,
      type: "textarea",
      name: "extraNotes",
      label: "Anything else you'd like to mention?",
      placeholder: "Payments, chat, live tracking, etc.",
      helper: "Optional — but helps make your solution smarter.",
      score: 0,
    },
    {
      id: 9,
      type: "custom-display",
      name: "aiFeatureGlimpse",
      label: "What your app might include",
      helper:
        "We've looked at your idea and highlighted just a few things that feel essential.",
      additionalText: `
        Just a glimpse (we're keeping your idea safe):
        • Easy user onboarding  
        • Smart content feed  
        • Built-in payments or bookings  
        
        There's more behind the scenes — we'll share the full plan when you're ready.
      `,
      score: 0,
    },
    {
      id: 10,
      type: "select",
      name: "monetization",
      label: "How will your app make money?",
      helper:
        "This helps us understand if you'll need subscriptions, payments, ads, or other tools.",
      options: [
        {
          label: "I'll charge users (subscriptions or purchases)",
          value: "paid",
          score: 10,
        },
        {
          label: "Free to use, with ads or sponsorships",
          value: "ads",
          score: 5,
        },
        {
          label: "It's internal — no monetization",
          value: "internal",
          score: 0,
        },
        { label: "Not sure yet", value: "unsure", score: 3 },
      ],
    },
    {
      id: 11,
      type: "custom-display",
      name: "finalSummary",
      label: "Your Idea, Our Insights ✨",
      helper: "Here's everything wrapped into a neat summary for you.",
      additionalText: `
        🎉 <strong>Congratulations!</strong><br/>
        You're building <strong>{businessName}</strong>, and we love the direction you're heading.<br/><br/>
        <strong>Your idea:</strong><br/>
        {appIdeaShort}<br/><br/>
        <strong>Management Plan:</strong> {managementPlan}<br/>
        <strong>1-Year Plan:</strong> {oneYearPlan}<br/><br/>
        <strong>Core Features:</strong><br/>
        {featuresList}<br/><br/>
        This is just the beginning. Let’s turn this into something real.
      `,
      score: 0,
    },

    {
      id: 12,
      type: "cta-button",
      name: "finalCTA",
      label: "Let's keep things moving",
      buttonText: "Show me the suggested plan",
      score: 0,
    },
  ];

  const renderField = (q) => {
    const currentValue = formData[q.name] || "";

    if (q.type === "text") {
      return (
        <div key={q.id} className={styles.fieldGroup}>
          <label>{q.label}</label>
          {q.helper && <p className={styles.helperText}>{q.helper}</p>}
          <input
            type="text"
            name={q.name}
            ref={q.ref || null}
            placeholder={q.placeholder}
            value={currentValue}
            onChange={(e) => handleChange(q.name, e.target.value, q.score)}
            className={styles.input}
            required={q.required}
          />
        </div>
      );
    }

    if (q.type === "textarea") {
      return (
        <div key={q.id} className={styles.fieldGroup}>
          <label>{q.label}</label>
          {q.helper && <p className={styles.helperText}>{q.helper}</p>}
          <textarea
            name={q.name}
            placeholder={q.placeholder}
            value={currentValue}
            onChange={(e) => handleChange(q.name, e.target.value, q.score)}
            className={styles.textarea}
            required={q.required}
            rows={5}
          />
        </div>
      );
    }

    if (q.type === "radio-card") {
      return (
        <div key={q.id} className={styles.fieldGroup}>
          <label>{q.label}</label>
          {q.helper && <p className={styles.helperText}>{q.helper}</p>}
          <div className={styles.cardGrid}>
            {q.options.map((option) => (
              <div
                key={option.value}
                className={`${styles.card} ${
                  currentValue === option.value ? styles.cardSelected : ""
                }`}
                onClick={() => handleChange(q.name, option.value, option.score)}
              >
                <h4>{option.label}</h4>
                <p>{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (q.type === "select") {
      return (
        <div key={q.id} className={styles.fieldGroup}>
          <label>{q.label}</label>
          {q.helper && <p className={styles.helperText}>{q.helper}</p>}
          <select
            name={q.name}
            className={styles.select}
            value={currentValue}
            onChange={(e) => {
              const selectedOption = q.options.find(
                (opt) => opt.value === e.target.value
              );
              handleChange(q.name, e.target.value, selectedOption?.score || 0);
            }}
            required={q.required}
          >
            <option value="">Select an option</option>
            {q.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (q.type === "custom-display" && q.name === "aiFeatureGlimpse") {
      return (
        <div key={q.id} className={styles.fieldGroup}>
          <label>{q.label}</label>
          {q.helper && <p className={styles.helperText}>{q.helper}</p>}

          {formData.aiSummary && (
            <div className={styles.appreciationBox}>
              <p>
                <strong>💡 AI Summary:</strong> {formData.aiSummary}
              </p>
            </div>
          )}

          <div className={styles.cardGrid}>
            {formData.aiPredictedFeatures.map((feature) => (
              <div
                key={feature}
                className={`${styles.card} ${styles.cardSelected}`}
              >
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (q.name === "finalSummary") {
      const featuresList = [
        ...(formData.aiPredictedFeatures || []),
        ...(formData.featureList || []),
      ]
        .map((f) => `• ${f}`)
        .join("<br/>");

      const finalSummaryText = q.additionalText
        .replace("{businessName}", formData.businessName || "")
        .replace("{appIdeaShort}", formData.appIdeaShort || "")
        .replace("{managementPlan}", formData.managementPlan || "")
        .replace("{oneYearPlan}", formData.oneYearPlan || "")
        .replace("{featuresList}", featuresList || "");

      return (
        <div key={q.id} className={styles.fieldGroup}>
          <label>{q.label}</label>
          {q.helper && <p className={styles.helperText}>{q.helper}</p>}
          <div
            className={styles.additionalText}
            dangerouslySetInnerHTML={{ __html: finalSummaryText }}
          />
        </div>
      );
    }
    {
      const aiFeatures = formData.aiPredictedFeatures || [];
      const userSelected = formData.featureList || [];

      return (
        <div key={q.id} className={styles.fieldGroup}>
          {q.additionalText && (
            <div className={styles.additionalText}>
              {q.additionalText.replace(
                "{businessName}",
                formData.businessName || "there"
              )}
            </div>
          )}
          <label>{q.label}</label>
          {q.helper && <p className={styles.helperText}>{q.helper}</p>}

          <div className={styles.cardGrid}>
            {[...new Set([...aiFeatures])].map((feature) => (
              <div
                key={feature}
                className={`${styles.card} ${styles.cardSelected}`}
              >
                <p>{feature}</p>
              </div>
            ))}
          </div>

          <p className={styles.helperText} style={{ marginTop: "1rem" }}>
            Want to add more features?
          </p>
          <button
            type="button"
            onClick={() => setShowCustomFeatures(!showCustomFeatures)}
            className={styles.toggleButton}
          >
            {showCustomFeatures
              ? "Hide additional features"
              : "Add more features"}
          </button>

          {showCustomFeatures && (
            <div className={styles.cardGrid}>
              {[
                "User Profile",
                "Chat or Messaging",
                "Search & Filters",
                "Booking System",
                "Live Tracking",
                "Ratings & Reviews",
                "In-App Purchases",
                "Subscription Plans",
                "Dark Mode",
                "Offline Access",
                "Analytics & Reports",
                "Payment Integration",
              ].map((opt) => {
                const isSelected = userSelected.includes(opt);
                return (
                  <div
                    key={opt}
                    className={`${styles.card} ${
                      isSelected ? styles.cardSelected : ""
                    }`}
                    onClick={() => {
                      const newValue = isSelected
                        ? userSelected.filter((v) => v !== opt)
                        : [...userSelected, opt];
                      handleChange(
                        "featureList",
                        newValue,
                        isSelected ? -5 : 5
                      );
                    }}
                  >
                    <p>{opt}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    if (q.type === "cta-button") {
      return (
        <div key={q.id} className={styles.fieldGroup}>
          <label>{q.label}</label>
          <button type="submit" className={styles.ctaButton} disabled={loading}>
            {loading ? "Processing..." : q.buttonText}
          </button>
        </div>
      );
    }

    return null;
  };

  const isLastStep = step === appDevQuestions.length;

  const handleNext = async (e) => {
    e.preventDefault();

    // Special handling for step 3 (app idea validation)
    if (step === 3) {
      await validateAppIdea();
    }
    // Submit on last step
    else if (isLastStep) {
      await handleSubmit(e);
    }
    // Otherwise just go to next step
    else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.questionnaireContainer}>
      <h1 className={styles.h1}>Let&apos;s Predict Your App&apos;s Pricing</h1>
      <ProgressBar step={step} totalSteps={appDevQuestions.length} />
      {error && <ToastMessage message={error} />}

      <form
        id="survey-form"
        onSubmit={handleNext}
        className={styles.formContainer}
      >
        {renderField(appDevQuestions[step - 1])}
      </form>

      <div className={styles.bottomNavBar}>
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className={styles.bottomBack}
            disabled={loading}
          >
            Back
          </button>
        )}
        <button
          type="submit"
          form="survey-form"
          className={styles.bottomNext}
          disabled={loading}
        >
          {loading ? "Loading..." : isLastStep ? "Get Price Estimate" : "Next"}
        </button>
      </div>
    </div>
  );
}
