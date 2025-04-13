'use client';
import Link from "next/link";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { getStrapiMedia } from "../utils/api-helpers";
import { Users, CalendarCheck, UserPlus } from 'lucide-react';

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  }[];
}
interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    content: string;
    member: number;
    event: number;
    participants: number;
  };
}
export default function HeroHome({ data }: HeroProps) {
  const images = Array.isArray(data.picture.data)
    ? data.picture.data
    : [data.picture.data];
  return (
    <section className="relative mt-0 h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <Slide
          duration={5000}
          transitionDuration={900}
          infinite={true}
          autoplay={true}
          indicators={false}
          arrows={true}
        >
          {images.map((img, index) => {
            const imgUrl = getStrapiMedia(img.attributes.url);
            return (
              <div
                key={img.id || index}
                className="each-slide h-screen"
                style={{
                  backgroundImage: `url(${imgUrl || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            );
          })}
        </Slide>
      </div>
      {/* Overlay Text Box (Left) */}
      <div
        className="absolute left-0 bottom-0 p-6 w-full lg:w-[800px] text-white rounded-md z-50"
        style={{
          backgroundColor: "rgb(57, 70, 80)",
        }}
      >
        <h1 className="text-4xl font-bold sm:text-5xl mb-4 text-[#D8AF77]">
          {data.title}
        </h1>
        <p className="text-sm sm:text-base text-[#D8AF77] mb-8">
          {data.description}
        </p>
        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="text-sm sm:text-base text-[#D8AF77] lg:w-[80%]">
            {data.content}
          </div>
        </div>
      </div>
      {/* Enhanced Right Text Box with Statistics */}
      <div
        className="absolute right-[0px] bottom-0 p-6 text-white z-50"
        style={{
          backgroundColor: "rgb(57,70,80)", 
          width: "58%"
        }}
      >
        {/* Buttons */}
        <div className="flex justify-start mb-4 space-x-2">
          <button
            className="text-sm sm:text-base text-[#D8AF77] bg-[#1A1A1A] px-4 py-2 rounded hover:bg-[#D8AF77] hover:text-[#1A1A1A] transition-all duration-200"
            onClick={() => {
              window.location.href = "/en/member";
            }}
          >
            Member Benefits
          </button>
          <button
            className="text-sm sm:text-base text-[#D8AF77] bg-[#1A1A1A] px-4 py-2 rounded hover:bg-[#D8AF77] hover:text-[#1A1A1A] transition-all duration-200"
            onClick={() => {
              window.open("https://www.aimotnsb.com/assets/downloads/AIMO%20Membership%20form%202022-2023.pdf", "_blank");
            }}
          >
            Become a Member
          </button>
        </div>

        {/* Organization Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-[#000000] p-4 rounded-lg shadow-lg transform transition-all hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <Users className="text-[#D8AF77] w-10 h-10 mr-2" />
              <span className="text-2xl font-bold text-[#D8AF77]">{data.member}</span>
            </div>
            <h3 className="text-center text-sm text-[#A9A9A9]">Total Members</h3>
          </div>
          
          <div className="bg-[#000000] p-4 rounded-lg shadow-lg transform transition-all hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <CalendarCheck className="text-[#D8AF77] w-10 h-10 mr-2" />
              <span className="text-2xl font-bold text-[#D8AF77]">{data.event}</span>
            </div>
            <h3 className="text-center text-sm text-[#A9A9A9]">Events Hosted</h3>
          </div>
          
          <div className="bg-[#000000] p-4 rounded-lg shadow-lg transform transition-all hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <UserPlus className="text-[#D8AF77] w-10 h-10 mr-2" />
              <span className="text-2xl font-bold text-[#D8AF77]">{data.participants}</span>
            </div>
            <h3 className="text-center text-sm text-[#A9A9A9]">Total Participants</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
