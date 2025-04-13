'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStrapiMedia } from "../utils/api-helpers";

interface ImageInfo {
  data: {
    attributes: {
      url: string;
    };
  } | null;
}

interface Feature {
  title: string;
  description: string;
  media: ImageInfo;
}

interface FeaturesProps {
  data: {
    feature: Feature[];
  };
}

const CreativeFeatureShowcase: React.FC<FeaturesProps> = ({ data }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      const scrollRange = containerHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, (scrollTop - containerTop) / scrollRange));
      const section = Math.floor(progress * data.feature.length);

      setActiveFeature(section);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.feature.length]);

  return (
    <section
      ref={containerRef}
      className="w-full relative"
      style={{
        height: `calc(${data.feature.length} * 100vh)`,
        minHeight: `calc(${data.feature.length} * 100vh)`,
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <AnimatePresence>
          {data.feature.map((feature, index) => {
            const imgUrl = getStrapiMedia(feature.media?.data?.attributes?.url);
            const isActive = index === activeFeature;
            const isPrevious = index < activeFeature;
            const isNext = index > activeFeature;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: isNext ? '100%' : isPrevious ? '-100%' : '0%',
                  rotateX: isNext ? 30 : isPrevious ? -30 : 0,
                }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.8,
                  y: isActive ? '0%' : isNext ? '100%' : '-100%',
                  rotateX: isActive ? 0 : isNext ? 30 : -30,
                }}
                transition={{
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 50,
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${imgUrl || ''})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="bg-black bg-opacity-50 p-12 rounded-2xl text-center max-w-2xl">
                  <motion.h2
                    className="text-6xl font-bold text-white mb-6"
                    initial={{ letterSpacing: '-0.05em' }}
                    animate={{ letterSpacing: isActive ? '0em' : '-0.05em' }}
                  >
                    {feature.title}
                  </motion.h2>
                  <motion.p
                    className="text-2xl text-white text-balance"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default function Features({ data }: FeaturesProps) {
  return <CreativeFeatureShowcase data={data} />;
}

