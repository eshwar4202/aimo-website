'use client';
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

interface ContactProps {
  data: {
    id: string;
    address: string;
    tel: string;
    telfax: string;
    email: string;
  };
}

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const background1Y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const background2Y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

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

const ContactPage = ({ data }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'eshwar4202@gmail.com'
        }),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <ParallaxBackground />
      
      <div className="relative z-10 w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        {/* Organization Details */}
        <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-700 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">AIMO Tamil Nadu</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6"/>
              <p style={{ width: '300px', wordWrap: 'break-word' }}> { data.address } </p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6"/>
              <p>Tel: {data.tel}<br/>TeleFax: {data.telfax}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6"/>
              <p>Email: {data.email}</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Contact Us</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-black"
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-black"
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-black"
            />
            <textarea 
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-black"
            />
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5"/>
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
