'use client';

import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";
import { motion } from "framer-motion";

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);
  const backUrl = getStrapiMedia(data.background?.data?.attributes?.url);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }} // Removed 'once: true' for repeated animations
      variants={containerVariants}
      className="dark:bg-gray-900 dark:text-gray-100 mt-[300px]"
      style={{
        backgroundImage: `url(${backUrl})`,
      }}
    >
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:items-center lg:justify-between">
        {/* Image Section */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center p-6 lg:order-none h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
        >
          <Image
            src={imgUrl || ""}
            alt={
              data.picture.data.attributes.alternativeText || "none provided"
            }
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            width={600}
            height={600}
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-xl xl:max-w-3xl lg:text-left"
        >
          <HighlightedText
            text={data.title}
            tag="h1"
            className="text-5xl font-bold leading-none sm:text-6xl mb-8 text-white" // Changed color to white
          />
          <HighlightedText
            text={data.description}
            tag="p"
            className="text-2xl mt-6 mb-8 sm:mb-12 text-justify text-balance leading-relaxed text-white" // Changed color to white
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

