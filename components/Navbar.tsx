"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Custom Premium Glass Bottle Icon Component
const BottleIcon = ({ className }: { className?: string }) => (
  <motion.svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Bottle Body Outline */}
    <path 
      d="M8.5 7.5V4.5C8.5 3.94772 8.94772 3.5 9.5 3.5H14.5C15.0523 3.5 15.5 3.94772 15.5 4.5V7.5L16.5 8.5C17.6046 9.60457 18.25 11.0853 18.25 12.6288V17.5C18.25 19.1569 16.9069 20.5 15.25 20.5H8.75C7.09315 20.5 5.75 19.1569 5.75 17.5V12.6288C5.75 11.0853 6.39543 9.60457 7.5 8.5L8.5 7.5Z" 
      stroke="white" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      opacity="1"
    />
    
    {/* Liquid Line - Animated */}
    <motion.path
      initial={{ d: "M6 14C6 14 7.5 13.5 9 14C10.5 14.5 13.5 14.5 15 14C16.5 13.5 18 14 18 14V17.5C18 19.1569 16.6569 20.5 15 20.5H9C7.34315 20.5 6 19.1569 6 17.5V14Z" }}
      animate={{ 
        d: [
          "M6 14C6 14 7.5 13.5 9 14C10.5 14.5 13.5 14.5 15 14C16.5 13.5 18 14 18 14V17.5C18 19.1569 16.6569 20.5 15 20.5H9C7.34315 20.5 6 19.1569 6 17.5V14Z",
          "M6 14.5C6 14.5 7.5 15 9 14.5C10.5 14 13.5 14 15 14.5C16.5 15 18 14.5 18 14.5V17.5C18 19.1569 16.6569 20.5 15 20.5H9C7.34315 20.5 6 19.1569 6 17.5V14.5Z",
          "M6 14C6 14 7.5 13.5 9 14C10.5 14.5 13.5 14.5 15 14C16.5 13.5 18 14 18 14V17.5C18 19.1569 16.6569 20.5 15 20.5H9C7.34315 20.5 6 19.1569 6 17.5V14Z"
        ]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      fill="white"
      fillOpacity="0.3"
    />

    {/* Crystalline Shine / Highlight */}
    <path 
      d="M10 5H13V6H10V5Z" 
      fill="white" 
      fillOpacity="0.9"
    />
  </motion.svg>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // Scroll effect for the floating capsule
  const width = useTransform(scrollY, [0, 100], ["94%", "90%"]);
  const maxWidth = useTransform(scrollY, [0, 100], ["1200px", "1000px"]);
  const y = useTransform(scrollY, [0, 100], [16, 24]); 
  const borderRadius = useTransform(scrollY, [0, 100], ["32px", "40px"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Collection", "Our Story", "Freshness"];

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        style={{ width, maxWidth, y, borderRadius }}
        className={`pointer-events-auto relative flex items-center justify-between px-10 py-2.5 transition-all duration-700 border ${
          scrolled 
            ? "bg-black/20 backdrop-blur-3xl border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]" 
            : "bg-white/10 backdrop-blur-2xl border-white/20 shadow-xl"
        }`}
      >
        {/* Subtle Crystalline Highlight (Top Line) */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Branding - Signature Glass Bottle Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group no-underline">
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 6 }}
              style={{ 
                background: "linear-gradient(135deg, #FF7A18, #FF3D00)",
                boxShadow: "0 8px 25px rgba(255, 80, 0, 0.25)" 
              }}
              className="p-1.5 rounded-2xl text-white transition-transform duration-500"
            >
              <BottleIcon className="w-6 h-6" />
            </motion.div>
            <div className="absolute inset-0 bg-orange-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-headline font-black text-[#F5F5F5] tracking-tighter leading-none">
              Juicera
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-[#F5F5F5]/40 group-hover:text-white transition-colors font-black mt-1">
              Pure Nature
            </span>
          </div>
        </Link>

        {/* Navigation Links - Centered & Bold */}
        <div className="hidden md:flex items-center gap-12 relative">
          {navItems.map((item) => (
            <a 
              key={item} 
              href="#" 
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className="text-[11px] font-sans font-black uppercase tracking-[0.25em] text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-all duration-300 relative py-2 no-underline"
            >
              {item}
              <AnimatePresence>
                {hoveredItem === item && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/40 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </a>
          ))}
        </div>

        {/* The "Pop" CTA Button - Premium Luxury Style */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative px-8 py-2.5 rounded-full font-headline font-black text-[11px] uppercase tracking-[0.2em] overflow-hidden group transition-all duration-500"
        >
          {/* Main Background: High Contrast Solid White */}
          <div className="absolute inset-0 bg-[#F5F5F5] group-hover:bg-white transition-colors duration-500 shadow-xl" />
          
          {/* Shimmer Effect: Soft Glass Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Outer Glow on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(255,255,255,0.4)] rounded-full" />
          
          <span className="relative text-black flex items-center gap-2 transition-colors duration-500">
            Order Now
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </motion.button>
      </motion.nav>
    </motion.div>
  );
};
