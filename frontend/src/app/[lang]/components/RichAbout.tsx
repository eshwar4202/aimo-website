import React from 'react';
import { Info, Target, Globe, Settings, Rocket, Award, Users, Briefcase } from 'lucide-react';

const AIMOPrograms = () => {
  const programs = [
    { 
      icon: Settings, 
      title: "Skill Training on New-Age Technologies", 
      description: "Empowering youth through cutting-edge technology training"
    },
    { 
      icon: Target, 
      title: "Disruptive Technologies Impact", 
      description: "Enhancing industrial productivity and labor management"
    },
    { 
      icon: Globe, 
      title: "Industry-Institution Partnership", 
      description: "Establishing Centers of Excellence and Skill Development"
    },
    { 
      icon: Rocket, 
      title: "Apprenticeship & Internship Programs", 
      description: "National Apprenticeship Training and Promotion Schemes"
    },
    { 
      icon: Award, 
      title: "Industrial Relations Practices", 
      description: "Promoting employee engagement and industrial harmony"
    },
    { 
      icon: Users, 
      title: "Skill Training for Emerging Sectors", 
      description: "Targeting Sunrise and MSME Sectors"
    },
    { 
      icon: Briefcase, 
      title: "Startup Ecosystem Development", 
      description: "Contributing to employment generation in India"
    }
  ];

  return (
    <div className="bg-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-100">
          AIMO Programs and Initiatives
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <program.icon className="mr-4 text-blue-600" size={40} />
                <h3 className="text-xl font-semibold text-gray-800">{program.title}</h3>
              </div>
              <p className="text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Additional Specialized Programs</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Labour Codes and Industrial Policy Re-engineering</li>
            <li>Industrial Safety Training</li>
            <li>Finishing School for Vocational Craftsmen</li>
            <li>Special Skill Training for Persons with Disabilities</li>
            <li>Exclusive Job Fairs and Startup Awareness Programs</li>
            <li>National and International Events, Conferences, and Workshops</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIMOPrograms;
