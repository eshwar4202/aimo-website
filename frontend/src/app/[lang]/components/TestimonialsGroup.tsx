'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

interface Testimonial {
  text: string;
  authorName: string;
  picture: {
    data: {
      id: string;
      attributes: {
        name: string;
        alternativeText: string;
        url: string;
      };
    };
  };
}

interface TestimonialsProps {
  data: {
    id: string;
    title: string;
    description: string;
    testimonials: Testimonial[];
  };
}

function Testimonial({ text, authorName, picture }: Readonly<Testimonial>) {
  const [isVisible, setIsVisible] = useState(false);

  const imageUrl = getStrapiMedia(picture.data?.attributes.url);

  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center mx-12 lg:mx-0 opacity-0 transform transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex items-center">
        <div className="my-6">
          <Image
            src={imageUrl ?? ""}
            alt={picture.data?.attributes.alternativeText || "none provided"}
            className="inline-block h-32 w-32 rounded-full"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="relative text-center">
         <p className="px-10 py-1 text-2xl italic">{text}</p>
        </div>
      <span className="w-12 h-1 my-2 rounded-lg dark:bg-violet-400"></span>
      <p className="text-2xl">{authorName}</p>
    </div>
  );
}

export default function Testimonials({ data }: TestimonialsProps) {
  return (
    <section className="dark:bg-black dark:text-gray-100 m:py-12 lg:py-24">
      <div className="container mx-auto py-4 space-y-2 text-center">
        <h1 className="text-4xl font-semibold leading-none text-center">{data.title}</h1>
        <p className="mt-4 text-lg text-center">{data.description}</p>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
        {data.testimonials.map((testimonial: Testimonial, index: number) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}

