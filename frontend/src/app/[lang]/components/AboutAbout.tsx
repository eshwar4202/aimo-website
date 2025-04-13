'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutProps {
   data: {
     location: string;
     structure: string;
     operation: string;
     tnsb: string;
   };
}

export default function About({ data }: AboutProps) {
  const [activeSection, setActiveSection] = useState<keyof typeof data | null>(null);
  
  const headingStyles = {
    location: "text-5xl font-bold text-gray-800 hover:text-gray-800 cursor-pointer transform rotate-90 absolute left-4 top-1/4 w-auto",
    structure: "text-5xl font-semibold text-gray-700 hover:text-gray-700 cursor-pointer transform -rotate-90 absolute right-4 top-1/4 w-auto",
    operation: "text-6xl font-extrabold text-gray-900 hover:text-gray-900 cursor-pointer transform rotate-0 absolute top-4 left-1/2 -translate-x-1/2 w-auto",
    tnsb: "text-5xl font-bold text-gray-600 hover:text-gray-600 cursor-pointer transform rotate-0 absolute bottom-4 left-1/2 -translate-x-1/2 w-auto"
  };

  const generatePositions = () => {
    const positions = [];
    for (let i = 0; i < 50; i++) {
      positions.push({
        top: Math.floor(Math.random() * 700),
        left: Math.floor(Math.random() * 1590)
      });
    }
    return positions;
  };
  
  const positions = generatePositions();

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-900 p-10">
      <div className="w-full h-[800px] bg-gray-200 rounded-lg shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {positions.map((pos, repeatIndex) => (
            <div key={`repeat-${repeatIndex}`} className="absolute">
              {(Object.keys(data) as Array<keyof typeof data>).map((key, index) => (
                <h1 
                  key={`heading-${repeatIndex}-${index}`}
                  className={`${headingStyles[key]} absolute`}
                  style={{ 
                    top: `${pos.top}px`, 
                    left: `${pos.left}px`
                  }}
                >
                  {key.toUpperCase()}
                </h1>
              ))}
            </div>
          ))}
        </div>
        <div className="space-y-6 flex flex-col items-center relative h-full w-full">
          {(Object.keys(data) as Array<keyof typeof data>).map((key, index) => (
            <h1 
              key={`main-heading-${index}`}
              className={`${headingStyles[key]} ${activeSection ? 'opacity-20 pointer-events-none' : ''}`}
              onClick={() => setActiveSection(key === activeSection ? null : key)}
            >
              {key.toUpperCase()}
            </h1>
          ))}
        </div>
        <AnimatePresence>
          {activeSection && (
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            >
              <motion.div 
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-black rounded-xl shadow-2xl p-8 w-11/12 max-w-xl h-3/4 max-h-[600px] relative overflow-auto"
              >
                <button 
                  onClick={() => setActiveSection(null)}
                  className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900"
                >
                  ✕
                </button>
                <h1 className="text-4xl font-bold mb-6 uppercase text-center text-white">
                  {activeSection.toUpperCase()}
                </h1>
                <p className="text-xl text-white text-justify text-balance">
                  {data[activeSection]}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
