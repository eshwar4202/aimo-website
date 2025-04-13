'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Building, Trophy, Star, Globe } from 'lucide-react';

// Award Winners Data
const awardWinners = [
  { name: 'TVS Group', year: 'Multiple Years' },
  { name: 'Ashok Leyland Ltd.', year: 'Multiple Years' },
  { name: 'MRF Ltd.', year: '1997' },
  { name: 'Sundaram Fasteners Ltd', year: '1989' },
  { name: 'Indian Bank', year: '2005' },
  { name: 'Hyundai Motors India Ltd', year: '2010' }
];

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const background1Y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const background2Y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div 
        style={{ 
          y: background1Y, 
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          opacity: 0.3 
        }} 
      />
      <motion.div 
        style={{ 
          y: background2Y, 
          backgroundImage: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)', 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          opacity: 0.2 
        }} 
      />
    </div>
  );
};

const AwardWinnerCard = ({ name, year }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl"
    >
      <div className="flex items-center space-x-4">
        <Award className="w-12 h-12 text-blue-600"/>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-gray-500">Award Year: {year}</p>
        </div>
      </div>
    </motion.div>
  );
};

const AwardsPage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const sectionsRef = {
    intro: useRef(null),
    history: useRef(null),
    winners: useRef(null)
  };

  const scrollToSection = (section) => {
    sectionsRef[section].current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative pt-20">
      <ParallaxBackground />
      
      {/* Content Sections */}
      <div className="container mx-auto px-4 space-y-16">
        {/* Intro Section */}
        <motion.section 
          ref={sectionsRef.intro}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="min-h-screen flex items-center"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h2 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="text-4xl font-bold mb-6 text-gray-900"
              >
                Sir Visvesvaraya Industrial Award
              </motion.h2>
              <p className="text-gray-700 mb-8">
                Founded by Bharat Ratna Sir. M. Visvesvaraya over 75 years ago, AIMO stands committed to industrial progress with the motto "Prosperity through Industry".
              </p>
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center">
                  <Star className="w-12 h-12 mx-auto text-blue-600 mb-4"/>
                  <p className="text-2xl font-bold text-blue-800">75+</p>
                  <p className="text-gray-600 font-medium">Years of Excellence</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center">
                  <Globe className="w-12 h-12 mx-auto text-purple-600 mb-4"/>
                  <p className="text-2xl font-bold text-purple-800">30+</p>
                  <p className="text-gray-600 font-medium">Award Recipients</p>
                </div>
              </motion.div>
            </div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Award Significance</h3>
              <p className="text-gray-700 mb-4">
                Every year, AIMO identifies and honors an industry in Tamil Nadu or Puducherry based on exceptional performance and contribution to industrial growth.
              </p>
              <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-lg">
                <Building className="w-12 h-12 text-blue-600"/>
                <div>
                  <p className="font-semibold text-gray-900">Recognizing Industrial Excellence</p>
                  <p className="text-sm text-gray-600">A legacy of promoting industrial achievements</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Award Winners */}
        <motion.section 
          ref={sectionsRef.winners}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Distinguished Award Winners
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A showcase of organizations that have been recognized for their outstanding contributions to industry and innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {awardWinners.map((winner, index) => (
              <AwardWinnerCard key={index} {...winner} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AwardsPage;
