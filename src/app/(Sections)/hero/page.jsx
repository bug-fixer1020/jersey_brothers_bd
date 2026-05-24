"use client";

import React from 'react';
import { motion } from 'framer-motion';
import coverphoto from '../../../../public/assets/cover.jpg';
import Image from 'next/image';

const JerseyHero = () => {
  // Animation variants for text
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 1. BACKGROUND IMAGE (Upscaled look using object-cover) */}
      <Image
        src={coverphoto}
        alt="Football Jerseys Collection"
        className="absolute inset-0 h-full w-full object-cover object-center scale-105"
        priority
      />

      {/* 2. BLURRY OVERLAY LAYER */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm md:backdrop-blur-md" />

      {/* 3. CONTENT LAYER */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Welcome Text */}
          <motion.p
            variants={itemVars}
            className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-gray-300 md:text-lg"
          >
            Welcome to
          </motion.p>

          {/* Brand Name */}
          <motion.h1
            variants={itemVars}
            className="mb-6 text-4xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl"
          >
            JERSEY BROTHERS <span className="text-yellow-500">BD</span>
          </motion.h1>

          {/* Subtext */}
          <motion.div
            variants={itemVars}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <span className="h-[2px] w-20 bg-yellow-500"></span>
            <p className="text-lg font-light text-white md:text-2xl lg:text-3xl">
              All Premium Jersey Collection
            </p>

            {/* Call to Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-yellow-500 md:text-base"
            >
              Explore Shop
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Optional: Subtle decorative element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-[2px] bg-white/30"></div>
      </div>
    </section>
  );
};

export default JerseyHero;