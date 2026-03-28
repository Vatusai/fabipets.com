import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimationRefs {
  leftPhoto?: React.RefObject<HTMLElement | null>;
  rightPhotos?: React.RefObject<HTMLElement | null>[];
  panel?: React.RefObject<HTMLElement | null>;
  stamp?: React.RefObject<HTMLElement | null>;
  heading?: React.RefObject<HTMLElement | null>;
}

interface AnimationOptions {
  staggerDelay?: number;
  startTrigger?: string;
  disableOnMobile?: boolean;
}

export const useSectionAnimations = (
  sectionRef: React.RefObject<HTMLElement | null>,
  refs: AnimationRefs,
  options: AnimationOptions = {}
) => {
  const { staggerDelay = 0.1, startTrigger = 'top 85%' } = options;
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left photo animation
      if (refs.leftPhoto?.current) {
        gsap.fromTo(
          refs.leftPhoto.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: refs.leftPhoto.current,
              start: startTrigger,
              toggleActions: 'play none none reverse',
              onRefresh: (self) => triggersRef.current.push(self),
            },
          }
        );
      }

      // Right photos animation with stagger
      const rightPhotoElements = refs.rightPhotos
        ?.map(ref => ref.current)
        .filter(Boolean);
      
      if (rightPhotoElements && rightPhotoElements.length > 0) {
        gsap.fromTo(
          rightPhotoElements,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: staggerDelay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightPhotoElements[0],
              start: startTrigger,
              toggleActions: 'play none none reverse',
              onRefresh: (self) => triggersRef.current.push(self),
            },
          }
        );
      }

      // Panel animation
      if (refs.panel?.current) {
        gsap.fromTo(
          refs.panel.current,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: refs.panel.current,
              start: startTrigger,
              toggleActions: 'play none none reverse',
              onRefresh: (self) => triggersRef.current.push(self),
            },
          }
        );
      }

      // Stamp animation
      if (refs.stamp?.current) {
        gsap.fromTo(
          refs.stamp.current,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: refs.stamp.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              onRefresh: (self) => triggersRef.current.push(self),
            },
          }
        );
      }

      // Heading animation
      if (refs.heading?.current) {
        gsap.fromTo(
          refs.heading.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: refs.heading.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              onRefresh: (self) => triggersRef.current.push(self),
            },
          }
        );
      }
    }, section);

    return () => {
      // Only kill triggers created by this hook
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, [sectionRef, refs.leftPhoto, refs.panel, refs.stamp, refs.heading, staggerDelay, startTrigger]);
};

export default useSectionAnimations;
