"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import styles from "@/styles/modules/survey.module.scss";
import useLenisScroll from "@/hooks/useLenisScroll"; // 👈 import the hook

export default function SurveyPage() {
  useLenisScroll(); // ✅ Apply Lenis scroll here

  const [showAllServices, setShowAllServices] = useState(false);
  const hiddenServicesRef = useRef(null);
  const router = useRouter();

  const services = [
    "Branding",
    "Web Development",
    "App Development",
    "SEO",
    "Marketing",
    "UI/UX",
    "Content Writing",
    "Social Media",
    "Graphic Design",
    "Video Editing",
  ];

  const visibleServices = services.slice(0, 5);
  const hiddenServices = services.slice(5);

  const serviceRouteMap = {
    "Web Development": "/web-development",
    "App Development": "/app-development",
    Branding: "/branding",
    SEO: "/seo",
    Marketing: "/marketing",
    "UI/UX": "/ui-ux",
    "Content Writing": "/content-writing",
    "Social Media": "/social-media",
    "Graphic Design": "/graphic-design",
    "Video Editing": "/video-editing",
  };

  const handleServiceRedirect = (service) => {
    const route = serviceRouteMap[service];
    console.log(route)
    if (route==="/web-development" || route==="/app-development") {
      router.push(route);
    } else {
     router.push("/comming-soon");
    }
  };

  // Service cards animation
  useEffect(() => {
    const container = hiddenServicesRef.current;
    if (!container) return;

    const cards = container.children;

    if (showAllServices) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          onStart: () => {
            if (container) {
              container.style.visibility = "visible";
              container.style.height = "auto";
            }
          },
        }
      );
    } else {
      gsap.to(cards, {
        opacity: 0,
        y: 30,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.in",
        onStart: () => {
          if (container) {
            container.style.pointerEvents = "none";
          }
        },
        onComplete: () => {
          if (container) {
            container.style.visibility = "hidden";
            container.style.height = 0;
            container.style.pointerEvents = "auto";
          }
        },
      });
    }
  }, [showAllServices]);

  useEffect(() => {
    const heading = document.getElementById("animatedHeading");
    if (!heading) return;

    const text = heading.innerText;
    heading.innerHTML = "";

    // Build span structure for each character
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.className = "char";
      span.style.display = "inline-block";
      heading.appendChild(span);
    });

    const chars = heading.querySelectorAll(".char");

    // Initial entrance animation
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        scale: 0,
        y: 20,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "back.out(1.7)",
        duration: 1,
        stagger: 0.03,
      }
    );

    // Per-character wobble on mousemove
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;

      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - charX);

        if (distance < 60) {
          const strength = 1 - distance / 60;

          gsap.to(char, {
            y: -10 * strength,
            scale: 1 + 0.2 * strength,
            letterSpacing: "0.1em",
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });

          gsap.to(char, {
            y: 0,
            scale: 1,
            letterSpacing: "normal",
            duration: 0.6,
            delay: 0.1,
            ease: "elastic.out(1, 0.4)",
            overwrite: true,
          });
        }
      });
    };

    heading.addEventListener("mousemove", handleMouseMove);

    // 🔁 Ripple Effect on hover enter
    let ripple = document.createElement("div");
    ripple.className = "heading-ripple";
    heading.appendChild(ripple);

    const handleMouseEnter = (e) => {
      const rect = heading.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 0.4,
        },
        {
          scale: 5,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    };

    heading.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      heading.removeEventListener("mousemove", handleMouseMove);
      heading.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div className={styles.surveyContainer}>
      <h1 className={styles.surveyHeading} id="animatedHeading">
        Get a free quote
      </h1>
      <p className={styles.subHeading}>
        We offer personalized packages for you.
      </p>

      <div className={styles.formContainer}>
        <p className={styles.description}>
          Select a service to continue to the next step.
        </p>
        <div className={styles.separator}></div>

        {/* Service Selection */}
        <div className={styles.formGroup}>
          <label>Please Select The Service you want.</label>
          <div className={styles.servicesGrid}>
            {visibleServices.map((service) => (
              <div
                key={service}
                className={styles.serviceCard}
                onClick={() => handleServiceRedirect(service)}
              >
                {service}
              </div>
            ))}
          </div>

          <div
            ref={hiddenServicesRef}
            className={styles.servicesGrid}
            style={{
              visibility: showAllServices ? "visible" : "hidden",
              height: showAllServices ? "auto" : 0,
              overflow: "hidden",
            }}
          >
            {hiddenServices.map((service) => (
              <div
                key={service}
                className={styles.serviceCard}
                onClick={() => handleServiceRedirect(service)}
              >
                {service}
              </div>
            ))}
          </div>

          <button
            className={styles.showMoreButton}
            onClick={() => setShowAllServices(!showAllServices)}
          >
            {showAllServices ? "Show Less" : "Show More Services"}
          </button>
        </div>
      </div>
    </div>
  );
}
