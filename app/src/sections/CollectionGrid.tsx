import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CollectionGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const collections = [
    {
      name: 'Dresses',
      image: '/images/collection_dress.jpg',
      description: 'Elegant dresses for special occasions',
    },
    {
      name: 'Shirts',
      image: '/images/collection_shirt.jpg',
      description: 'Stylish shirts for everyday wear',
    },
    {
      name: 'Costumes',
      image: '/images/collection_costume.jpg',
      description: 'Fun costumes for celebrations',
    },
    {
      name: 'Accessories',
      image: '/images/collection_accessories.jpg',
      description: 'Collars, bow ties & more',
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Card animations
      gsap.fromTo(
        card1Ref.current,
        { x: '-12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card1Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        card2Ref.current,
        { x: '12vw', y: '-6vh', opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        card3Ref.current,
        { x: '12vw', y: '6vh', opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card3Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        card4Ref.current,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card4Ref.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="section-flowing bg-blush z-30"
    >
      <div className="px-6 md:px-[7vw] py-16 md:py-24">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="font-display font-black text-black text-4xl md:text-6xl uppercase">
            Shop By Style
          </h2>
          <p className="font-body text-black/60 mt-4 text-lg">
            Tap a look to ask availability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 - Large left */}
          <div
            ref={card1Ref}
            className="md:col-span-6 md:row-span-2"
          >
            <div className="fabipets-card overflow-hidden hover-lift group cursor-pointer h-full">
              <div className="relative h-64 md:h-[500px] overflow-hidden">
                <img
                  src={collections[0].image}
                  alt={collections[0].name}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display font-bold text-white text-2xl md:text-3xl">
                    {collections[0].name}
                  </h3>
                  <p className="font-body text-white/80 text-sm mt-2">
                    {collections[0].description}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-white font-body text-sm group-hover:underline">
                    View collection
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Top right */}
          <div
            ref={card2Ref}
            className="md:col-span-6"
          >
            <div className="fabipets-card overflow-hidden hover-lift group cursor-pointer">
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={collections[1].image}
                  alt={collections[1].name}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display font-bold text-white text-xl">
                    {collections[1].name}
                  </h3>
                  <p className="font-body text-white/80 text-xs mt-1">
                    {collections[1].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Mid right */}
          <div
            ref={card3Ref}
            className="md:col-span-6"
          >
            <div className="fabipets-card overflow-hidden hover-lift group cursor-pointer">
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={collections[2].image}
                  alt={collections[2].name}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display font-bold text-white text-xl">
                    {collections[2].name}
                  </h3>
                  <p className="font-body text-white/80 text-xs mt-1">
                    {collections[2].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Bottom banner */}
          <div
            ref={card4Ref}
            className="md:col-span-12"
          >
            <div className="fabipets-card overflow-hidden hover-lift group cursor-pointer">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={collections[3].image}
                  alt={collections[3].name}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 className="font-display font-bold text-white text-2xl md:text-3xl">
                      {collections[3].name}
                    </h3>
                    <p className="font-body text-white/80 text-sm mt-2">
                      {collections[3].description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-white font-body text-sm group-hover:underline">
                    Explore
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionGrid;
