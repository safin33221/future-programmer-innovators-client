"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/nurui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const WavesHero = () => {
  return (
    <section className="relative  flex min-h-svh w-full items-center justify-center overflow-hidden  bg-black">
      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Curved Lines */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
            }}
            d="M 100 100 Q 300 0 500 100 T 900 100"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="1"
          />

          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
              delay: 0.4,
            }}
            d="M 0 200 Q 200 100 400 200 T 800 200"
            fill="none"
            stroke="url(#grad2)"
            strokeWidth="1"
          />

          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
              delay: 0.9,
            }}
            d="M 100 600 Q 300 500 500 600 T 900 600"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="1"
          />
        </svg>

        {/* Moving Straight Lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "-100%", opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: 2.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              className="absolute right-0"
              style={{
                top: `${15 + i * 10}%`,
                height: "1px",
                width: "100%",
                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "#06b6d4" : "#7c3aed"
                  }60, transparent)`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Light Pastel Glow Background */}
      <div className="absolute inset-0 z-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2 }}
          className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-300/40 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-violet-300/40 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className=" relative z-3 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium border-gray-200 bg-white/70 backdrop-blur text-gray-700">
            Registration Open for 2025 Batch
          </div>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
            Future Programmer Innovators
          </h1>

          <p className="mx-auto max-w-2xl text-gray-600 sm:text-xl">
            Build real programming skills. Compete at the highest level. Learn,
            grow, and join the most advanced digital programming club for
            diploma students.
          </p>

          <div className="flex justify-center space-x-4">
            <Link href="/apply">
              <Button className="bg-gradient-to-r from-cyan-500 to-violet-600 text-lg text-white hover:from-cyan-600 hover:to-violet-700">
                Join FPI <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/courses">
              <Button
                variant="outline"
                className="border-gray-300 text-lg text-gray-700 hover:bg-gray-100"
              >
                Explore Courses
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WavesHero;
