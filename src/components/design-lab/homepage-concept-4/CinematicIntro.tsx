"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CinematicIntro({ onComplete, locale }: { onComplete: () => void, locale: string }) {
  const isAr = locale === "ar";
  
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020205] overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Deep portal glow */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[120px]"
        initial={{ scale: 0 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 4, ease: "easeOut" }}
      />
      
      <div className="relative z-10 text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 tracking-tight"
          initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          NexaLearn
        </motion.h1>
        <motion.p 
          className="mt-4 text-white/50 font-mono tracking-widest uppercase text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          by Ahmed Darhous
        </motion.p>
        
        <motion.div 
          className="mt-12 h-1 w-64 bg-white/10 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <button 
        onClick={onComplete}
        className="absolute bottom-10 px-6 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm"
      >
        {isAr ? "تخطي" : "Skip"}
      </button>
    </motion.div>
  );
}
