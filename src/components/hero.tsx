"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SearchBar } from "./search-bar";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="flex  flex-col md:flex-row h-auto md:h-screen mt-[100px]">
      <div className="flex-3  flex flex-col h-[80%] justify-center gap-6 pr-5">
        <motion.h1
          initial={{
            opacity: 0,
            x: -100,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 1,
              duration: 1,
            },
          }}
          className="text-xl md:text-3xl font-bold"
        >
          Find Your Dream Home Today
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
            x: -100,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 1,
              duration: 1,
            },
          }}
          className="text-sm"
        >
          Welcome to, where we turn your real estate dreams into reality. <br />
          ith our expert knowledge and personalized service,
          <br />
          were here to guide you through every step of your property journey.
        </motion.p>
        <motion.div
          className="flex flex-col gap-6"
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 1,
              duration: 1,
            },
          }}
        >
          <SearchBar />

          <div className="flex md:items-center justify-between flex-col w-full md:flex-row gap-2">
            <div>
              <h2 className=" text-2xl font-bold">16+</h2>
              <p className="">Years of Experience</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">200</h2>
              <p className="">Awards Gained</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">1200+</h2>
              <p className="">Property Ready</p>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 1,
            duration: 1,
          },
        }}
        className="flex-2 relative w-full h-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background image"
          fill
          className="object-cover rounded overflow-hidden"
        />
      </motion.div>
    </section>
  );
};
