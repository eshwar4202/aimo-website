'use client';

import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";
import { motion } from "framer-motion";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);

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
      viewport={{ amount: 0.2 }} // Animates on every scroll into view
      variants={containerVariants}
      className="dark:bg-black dark:text-gray-100 mt-20"
    >
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        {/* Text Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-xl xl:max-w-2xl lg:text-left"
        >
          <HighlightedText
            text={data.title}
            tag="h1"
            className="text-5xl font-bold leading-none sm:text-6xl mb-8"
            color="dark:text-violet-400"
          />
          <HighlightedText
            text={data.description}
            tag="p"
            className="text-2xl mt-6 mb-8 sm:mb-12 text-justify text-balance leading-relaxed"
            color="dark:text-violet-400"
          />
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            {data.buttons.map((button: Button, index: number) => (
              <motion.div key={index} variants={itemVariants}>
                <Link
                  href={button.url}
                  target={button.newTab ? "_blank" : "_self"}
                  className={renderButtonStyle(button.type)}
                >
                  {button.text}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center p-6 mt-8 lg:mt-0 lg:self-center h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
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
      </div>
    </motion.section>
  );
}

