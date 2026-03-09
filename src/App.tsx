import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import FeaturedOutfit from './sections/FeaturedOutfit';
import CollectionGrid from './sections/CollectionGrid';
import CustomDesign from './sections/CustomDesign';
import SizeGuide from './sections/SizeGuide';
import Testimonials from './sections/Testimonials';
import Lookbook from './sections/Lookbook';
import CraftCare from './sections/CraftCare';
import Contact from './sections/Contact';
import Navigation from './components/Navigation';
import WhatsAppButton from './components/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    ScrollTrigger.defaults({
      markers: false,
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-blush">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content - flowing sections */}
      <main className="relative">
        <Hero />
        <FeaturedOutfit />
        <CollectionGrid />
        <CustomDesign />
        <SizeGuide />
        <Testimonials />
        <Lookbook />
        <CraftCare />
        <Contact />
      </main>
      
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
