"use client";

import React from "react";
import { motion } from "framer-motion";

// Custom Premium Glass Bottle Icon Component (Shared Style)
const BottleIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M8.5 7.5V4.5C8.5 3.94772 8.94772 3.5 9.5 3.5H14.5C15.0523 3.5 15.5 3.94772 15.5 4.5V7.5L16.5 8.5C17.6046 9.60457 18.25 11.0853 18.25 12.6288V17.5C18.25 19.1569 16.9069 20.5 15.25 20.5H8.75C7.09315 20.5 5.75 19.1569 5.75 17.5V12.6288C5.75 11.0853 6.39543 9.60457 7.5 8.5L8.5 7.5Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path
      d="M6 14.5C6 14.5 7.5 15 9 14.5C10.5 14 13.5 14 15 14.5C16.5 15 18 14.5 18 14.5V17.5C18 19.1569 16.6569 20.5 15 20.5H9C7.34315 20.5 6 19.1569 6 17.5V14.5Z"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path 
      d="M9.5 3.5H14.5V5.5H9.5V3.5Z" 
      fill="currentColor"
    />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-black/95 text-white/40 py-10 px-6 border-t border-white/5 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 group">
            <div 
              style={{ 
                background: "linear-gradient(135deg, #FF7A18, #FF3D00)",
                boxShadow: "0 4px 15px rgba(255, 80, 0, 0.2)" 
              }}
              className="p-1.5 rounded-xl text-white"
            >
              <BottleIcon className="w-5 h-5" />
            </div>
            <span className="text-lg font-headline font-black text-white tracking-tighter hover:text-orange-400 transition-colors">
              Juicera
            </span>
          </div>
          <p className="text-[11px] leading-relaxed max-w-[200px] uppercase font-black tracking-widest opacity-60">
            The future of freshness, bottled and delivered.
          </p>
        </div>

        <div>
          <h4 className="text-white text-[10px] font-black uppercase tracking-[0.25em] mb-4">Shop</h4>
          <ul className="space-y-2 text-[11px] font-bold">
            <li><a href="#" className="hover:text-white transition-all duration-300">All Products</a></li>
            <li><a href="#" className="hover:text-white transition-all duration-300">Subscriptions</a></li>
            <li><a href="#" className="hover:text-white transition-all duration-300">Merch</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-[10px] font-black uppercase tracking-[0.25em] mb-4">Support</h4>
          <ul className="space-y-2 text-[11px] font-bold">
            <li><a href="#" className="hover:text-white transition-all duration-300">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-all duration-300">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-all duration-300">Contact Us</a></li>
          </ul>
        </div>

        <div>
           <h4 className="text-white text-[10px] font-black uppercase tracking-[0.25em] mb-4">Newsletter</h4>
           <div className="flex gap-2">
             <input type="email" placeholder="JOIN THE CLUB" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[10px] font-black tracking-widest w-full focus:outline-none focus:border-white/30 text-white" />
             <button className="bg-[#F5F5F5] text-black px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all duration-300">
               SUBMIT
             </button>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/5 text-[10px] font-black tracking-widest flex flex-col md:flex-row justify-between items-center text-center opacity-40 uppercase">
        <p>&copy; {new Date().getFullYear()} Juicera Inc. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};
