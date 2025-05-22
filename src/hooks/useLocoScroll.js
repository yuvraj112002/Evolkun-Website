'use client';
import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const useLocoScroll = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (!scrollContainer) return;

    const scroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      direction: 'horizontal', // use 'vertical' if you want to support both directions
      gestureDirection: 'both',
      smartphone: {
        smooth: true,
        direction: 'vertical',
      },
      tablet: {
        smooth: true,
        direction: 'horizontal',
        gestureDirection: 'both',
      },
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, [enabled]);
};

export default useLocoScroll;
