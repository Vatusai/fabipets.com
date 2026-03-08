import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Auto-play entrance animation on page load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Frame entrance
      tl.fromTo(
        frameRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5 }
      );

      // Images staggered entrance - faster
      const images = imagesRef.current.filter(Boolean);
      tl.fromTo(
        images[0],
        { x: '-8vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        '-=0.25'
      );
      tl.fromTo(
        images[1],
        { x: '8vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        '-=0.4'
      );
      tl.fromTo(
        images[2],
        { x: '-6vw', y: '6vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.5 },
        '-=0.35'
      );
      tl.fromTo(
        images[3],
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.4'
      );
      tl.fromTo(
        images[4],
        { x: '6vw', y: '6vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.5 },
        '-=0.4'
      );
      tl.fromTo(
        images[5],
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        '-=0.35'
      );

      // Headline entrance
      tl.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // Subhead entrance
      tl.fromTo(
        subheadRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.25'
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle parallax on scroll - NOT pinned
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Subtle parallax for images
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.to(img, {
          y: (i % 2 === 0 ? -20 : 20),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Fade out content on scroll
      gsap.to([headlineRef.current, subheadRef.current, ctaRef.current], {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToCollection = () => {
    const element = document.querySelector('#collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-blush flex items-center justify-center z-10 overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center justify-center py-24 md:py-32">
        {/* Collage Frame */}
        <div
          ref={frameRef}
          className="relative bg-white card-border rounded-[28px] card-shadow mx-4 md:mx-0"
          style={{
            width: '90vw',
            maxWidth: '1200px',
            height: 'auto',
            aspectRatio: '16/10',
          }}
        >
          {/* Collage Images */}
          {/* Image A - top-left */}
          <div
            ref={(el) => { imagesRef.current[0] = el; }}
            className="absolute fabipets-card-sm overflow-hidden"
            style={{
              left: '5%',
              top: '8%',
              width: '35%',
              height: '40%',
            }}
          >
            <img
              src="/images/hero_dog_flowers.jpg"
              alt="Dog with flower crown"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image B - top-right */}
          <div
            ref={(el) => { imagesRef.current[1] = el; }}
            className="absolute fabipets-card-sm overflow-hidden"
            style={{
              left: '55%',
              top: '8%',
              width: '38%',
              height: '40%',
            }}
          >
            <img
              src="/images/hero_cat_pink.jpg"
              alt="Elegant cat"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image C - bottom-left */}
          <div
            ref={(el) => { imagesRef.current[2] = el; }}
            className="absolute fabipets-card-sm overflow-hidden"
            style={{
              left: '5%',
              top: '54%',
              width: '25%',
              height: '36%',
            }}
          >
            <img
              src="/images/hero_dog_costume.jpg"
              alt="Dog in costume"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image D - bottom-center */}
          <div
            ref={(el) => { imagesRef.current[3] = el; }}
            className="absolute fabipets-card-sm overflow-hidden"
            style={{
              left: '33%',
              top: '54%',
              width: '25%',
              height: '36%',
            }}
          >
            <img
              src="/images/hero_dog_bow.jpg"
              alt="Dog with bow tie"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image E - bottom-right */}
          <div
            ref={(el) => { imagesRef.current[4] = el; }}
            className="absolute fabipets-card-sm overflow-hidden"
            style={{
              left: '61%',
              top: '54%',
              width: '32%',
              height: '36%',
            }}
          >
            <img
              src="/images/hero_dog_sunglasses.jpg"
              alt="Dog with sunglasses"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image F - center overlay (small) */}
          <div
            ref={(el) => { imagesRef.current[5] = el; }}
            className="absolute fabipets-card-sm overflow-hidden z-10"
            style={{
              left: '42%',
              top: '36%',
              width: '14%',
              height: '24%',
            }}
          >
            <img
              src="/images/hero_paws_closeup.jpg"
              alt="Pet paws closeup"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Headline */}
        <div
          ref={headlineRef}
          className="absolute font-display font-black text-black uppercase leading-none"
          style={{
            left: '7vw',
            bottom: '10vh',
            fontSize: 'clamp(32px, 5vw, 72px)',
          }}
        >
          <div>Designer Fashion</div>
          <div>
            For Pets<span className="text-camel">.</span>
          </div>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="absolute font-body text-black/60 text-sm md:text-base max-w-md"
          style={{
            left: '7vw',
            bottom: '5vh',
          }}
        >
          Outfits, costumes & accessories—made to fit your pet.
        </p>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="#collection"
          onClick={(e) => {
            e.preventDefault();
            scrollToCollection();
          }}
          className="absolute flex items-center gap-2 font-body text-black underline underline-offset-4 hover:text-camel transition-colors duration-300"
          style={{
            right: '7vw',
            bottom: '7vh',
          }}
        >
          Explore the collection
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
