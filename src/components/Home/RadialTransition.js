import gsap from 'gsap';
import styles from './RadialTransition.module.scss';

/**
 * Animate a radial transition from the given rocket element's center.
 * 
 * @param {HTMLElement} rocketBoxEl - The clickable element (e.g., circular rocket part)
 * @param {Array<HTMLElement>} overlayEls - Array of 3 overlay circle refs
 * @param {Function} callback - Callback to run after animation (like routing)
 */
export function runRadialTransition(rocketBoxEl, overlayEls, callback) {
  if (!rocketBoxEl || !overlayEls?.length) return;

  const bounds = rocketBoxEl.getBoundingClientRect();

  // Prepare each circle
  overlayEls.forEach((circle) => {
    if (!circle) return;
    circle.classList.add(styles.overlay); // ensure base class is applied
    circle.style.left = `${bounds.left + bounds.width / 2}px`;
    circle.style.top = `${bounds.top + bounds.height / 2}px`;
    circle.style.transform = 'translate(-50%, -50%) scale(0)';
    circle.style.display = 'block';
  });

  // Animate sequential expansion
  gsap.timeline({
    defaults: { duration: 0.5, ease: 'power2.inOut' },
    onComplete: callback,
  })
    .to(overlayEls[0], { scale: 20 }, 0)
    .to(overlayEls[1], { scale: 25 }, 0.15)
    .to(overlayEls[2], { scale: 30 }, 0.3);
}  
