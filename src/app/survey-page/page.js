'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import styles from './survey.module.scss';

export default function SurveyPage() {
  const [showAllServices, setShowAllServices] = useState(false);
  const hiddenServicesRef = useRef(null);
  const router = useRouter();

  const services = [
    'Branding', 'Web Development', 'App Development', 'SEO', 'Marketing',
    'UI/UX', 'Content Writing', 'Social Media', 'Graphic Design', 'Video Editing'
  ];

  const visibleServices = services.slice(0, 5);
  const hiddenServices = services.slice(5);


  const serviceRouteMap = {
    'Web Development': '/web-development',
    'App Development': '/app-development',
    'Branding': '/branding',
    'SEO': '/seo',
    'Marketing': '/marketing',
    'UI/UX': '/ui-ux',
    'Content Writing': '/content-writing',
    'Social Media': '/social-media',
    'Graphic Design': '/graphic-design',
    'Video Editing': '/video-editing'
  };
  


  const handleServiceRedirect = (service) => {
    const route = serviceRouteMap[service];
    if (route) {
      router.push(route);
    } else {
      alert('This service page is under construction.');
    }
  };

  useEffect(() => {
    if (hiddenServicesRef.current) {
      const cards = hiddenServicesRef.current.children;
  
      if (showAllServices) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
            onStart: () => {
              hiddenServicesRef.current.style.visibility = 'visible';
              hiddenServicesRef.current.style.height = 'auto';
            }
          }
        );
      } else {
        gsap.to(cards, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          stagger: 0.1,
          ease: 'power2.in',
          onStart: () => {
            hiddenServicesRef.current.style.pointerEvents = 'none';
          },
          onComplete: () => {
            hiddenServicesRef.current.style.visibility = 'hidden';
            hiddenServicesRef.current.style.height = 0;
            hiddenServicesRef.current.style.pointerEvents = 'auto';
          }
        });
      }
    }
  }, [showAllServices]);
  

  return (
    <div className={styles.surveyContainer}>
      <h1 className={styles.surveyHeading}>Get a free quote</h1>
      <p className={styles.subHeading}>We offer personalized packages for you.</p>

      <div className={styles.formContainer}>
        <p className={styles.description}>
          Select a service to continue to the next step.
        </p>
        <div className={styles.separator}></div>

        {/* Service Selection */}
        <div className={styles.formGroup}>
          <label>Please Select The Service you want.</label>
          <div className={styles.servicesGrid}>
            {visibleServices.map(service => (
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
              visibility: showAllServices ? 'visible' : 'hidden',
              height: showAllServices ? 'auto' : 0,
              overflow: 'hidden'
            }}
          >
            {hiddenServices.map(service => (
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
  {showAllServices ? 'Show Less' : 'Show More Services'}
</button>
        </div>
      </div>
    </div>
  );
}
