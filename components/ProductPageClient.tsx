"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { products } from "@/data/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductTextOverlays } from "@/components/ProductTextOverlays";
import { MangoBottleScroll } from "@/components/MangoBottleScroll";
import { ChocolateBottleScroll } from "@/components/ChocolateBottleScroll";
import { StrawberryBottleScroll } from "@/components/StrawberryBottleScroll";
import { ArrowRight, Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface ProductPageClientProps {
  flavor: string;
}

/**
 * ScrollytellingLayout
 * Isolated component to handle useScroll and text overlays safely after hydration.
 */
function ScrollytellingLayout({ currentProduct }: { currentProduct: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const renderBottleScroll = () => {
    switch (currentProduct.id) {
      case "mango": return <MangoBottleScroll progress={scrollYProgress} />;
      case "chocolate": return <ChocolateBottleScroll progress={scrollYProgress} />;
      case "strawberry": return <StrawberryBottleScroll progress={scrollYProgress} />;
      default: return <MangoBottleScroll progress={scrollYProgress} />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      {renderBottleScroll()}
      
      <div className="absolute top-0 w-full h-[500vh] pointer-events-none">
        <ProductTextOverlays
          progress={scrollYProgress}
          price={currentProduct.price}
          features={currentProduct.features}
          section1={currentProduct.section1}
          section2={currentProduct.section2}
          section3={currentProduct.section3}
          section4={currentProduct.section4}
        />
      </div>
    </div>
  );
}

export default function ProductPageClient({ flavor }: ProductPageClientProps) {
  const [isMounted, setIsMounted] = useState(false);

  const productIndex = products.findIndex((p) => p.id === flavor);
  const currentProduct = products[productIndex] || products[0];

  useEffect(() => {
    setIsMounted(true);
    // Scroll to top on flavor change
    window.scrollTo(0, 0);
  }, [flavor]);

  // Prevent Framer Motion hydration mismatch
  if (!isMounted) {
    return (
      <div 
        style={{ background: currentProduct.gradient }}
        className="min-h-screen flex items-center justify-center font-headline antialiased"
      >
        <div className="text-white/10 font-black tracking-widest animate-pulse">
           INITIALIZING {currentProduct.name.toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentProduct.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background: currentProduct.gradient,
        }}
        className="min-h-screen relative font-sans text-white antialiased selection:bg-orange-500 selection:text-white"
      >
        <Navbar />

        {/* This section contains the useScroll hook and target ref */}
        <ScrollytellingLayout currentProduct={currentProduct} />

        {/* DETAILS SECTION - Seamless Transition */}
        <motion.section 
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 py-12"
        >
          <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-headline font-black text-white/40 mb-6">{currentProduct.name} Details</h3>
              <h2 className="text-4xl md:text-5xl font-headline font-black mb-8 leading-[0.95] tracking-[-0.02em]">{currentProduct.detailsSection.title}</h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl font-medium">
                {currentProduct.detailsSection.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {currentProduct.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full shadow-lg">
                     <Leaf className="w-4 h-4 text-orange-400" />
                     <span className="text-xs font-black uppercase tracking-widest">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               {currentProduct.stats.map((stat, i) => (
                 <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-3xl p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center shadow-xl">
                    <div className="text-4xl font-headline font-black mb-2 tracking-tighter">{stat.val}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 py-24 my-12 text-center relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             <ShieldCheck className="w-12 h-12 mx-auto mb-8 text-white/30" />
             <h2 className="text-3xl md:text-5xl font-headline font-black mb-6 tracking-tight">{currentProduct.freshnessSection.title}</h2>
             <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-medium">
                {currentProduct.freshnessSection.description}
             </p>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-24 mb-32 text-center bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/20 relative overflow-hidden shadow-2xl">
            {/* Subtle Gradient Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-500/10 blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-500/10 blur-[100px]" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-headline font-black mb-4 tracking-tighter leading-none">Stock the Fridge.</h2>
              <p className="text-xl text-white/60 mb-14 max-w-xl mx-auto font-medium">Experience {currentProduct.name} delivered fresh to your door.</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
                <div className="text-left">
                  <div className="text-6xl md:text-8xl font-headline font-black tracking-[-0.04em] text-white">{currentProduct.buyNowSection.price}</div>
                  <div className="text-white/30 font-black uppercase tracking-widest text-[10px] mt-2">{currentProduct.buyNowSection.unit}</div>
                </div>

                <div className="h-px w-full md:w-px md:h-24 bg-white/10 hidden md:block"></div>

                <ul className="text-left space-y-4">
                  {currentProduct.buyNowSection.processingParams.map((param, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                      <span className="font-bold text-sm uppercase tracking-widest text-white/70">{param}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black text-xl font-headline font-black py-6 px-20 rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_70px_rgba(255,255,255,0.3)] transition-all duration-500"
              >
                Add to Cart
              </motion.button>

              <div className="mt-16 text-[10px] uppercase tracking-[0.2em] font-black text-white/30 max-w-xl mx-auto space-y-3">
                <p>{currentProduct.buyNowSection.deliveryPromise}</p>
                <p>{currentProduct.buyNowSection.returnPolicy}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FIXED FLAVOR SWITCHER - Premium Slim Glass Controls */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-3xl border border-white/20 p-1 rounded-full flex gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto">
           {products.map((p) => {
             const isActive = flavor === p.id;
             // Use short name for better layout if full name is long
             const displayName = p.id === "strawberry" ? "Berry" : p.id === "chocolate" ? "Cocoa" : "Mango";
             
             return (
               <Link 
                 key={p.id}
                 href={`/${p.id}`}
                 draggable={false}
                 className={`px-6 py-2 rounded-full flex items-center justify-center transition-all duration-500 no-underline relative group overflow-hidden ${
                   isActive ? "scale-100" : "hover:bg-white/5 opacity-60 hover:opacity-100 scale-95"
                 }`}
               >
                 {/* Active Background Glow */}
                 {isActive && (
                   <motion.div 
                     layoutId="active-nav-bg"
                     style={{ backgroundColor: p.themeColor }}
                     className="absolute inset-0 z-0"
                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
                   />
                 )}
                 
                 <span className={`relative z-10 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${
                   isActive ? "text-black" : "text-white"
                 }`}>
                   {p.name.split(' ').pop()}
                 </span>
               </Link>
             );
           })}
        </div>

        <Footer />
        
        {/* FLAVOR SWITCHER DISMISSABLE OR REMOVED PER REQUEST */}
        {/* We have removed the fixed bar as per "remove this part" request */}

      </motion.div>
    </AnimatePresence>
  );
}
