'use client';
import { useState, useRef } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transitionStyles, setTransitionStyles] = useState({});
  const imageRef = useRef<HTMLImageElement | null>(null);

  const imageUrl = getStrapiMedia(picture.data?.attributes.url);

  const handleImageClick = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setTransitionStyles({
        position: "fixed",
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        zIndex: 50,
        transition: "all 0.5s ease-in-out",
        transform: "scale(1)",
      });
      setTimeout(() => {
        setTransitionStyles({
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "80vw",
          height: "80vh",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          transition: "all 0.5s ease-in-out",
        });
      }, 0);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setTransitionStyles({
        position: "fixed",
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        zIndex: 50,
        transition: "all 0.5s ease-in-out",
        transform: "scale(1)",
      });
    }
    setTimeout(() => setIsModalOpen(false), 500); // Wait for the animation to complete
  };

  return (
    <>
      <div className="flex flex-col items-center mx-6 group">
        <div className="my-6">
          <Image
            src={imageUrl ?? ""}
            alt={picture.data?.attributes.alternativeText || "none provided"}
            className="inline-block w-full h-[300px] object-cover rounded-lg cursor-pointer transform transition-transform duration-300 group-hover:scale-105"
            width={1200}
            height={400}
            onClick={handleImageClick}
            ref={imageRef}
          />
        </div>
        <span className="w-16 h-1 my-2 rounded-lg bg-violet-400"></span> {/* Horizontal line */}
        <p className="mt-2 text-center font-medium">{authorName}</p>
      </div>

      {isModalOpen && (
        <>
          <div
            style={transitionStyles}
            onClick={handleCloseModal}
            className="bg-black bg-opacity-75 rounded-lg overflow-hidden"
          >
            <Image
              src={imageUrl ?? ""}
              alt={picture.data?.attributes.alternativeText || "none provided"}
              className="object-cover w-full h-full"
              width={1200}
              height={800}
            />
          </div>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-75"
            onClick={handleCloseModal}
          />
        </>
      )}
    </>
  );
}

export default function Testimonials({ data }: TestimonialsProps) {
  return (
    <section className="dark:bg-black dark:text-gray-100 py-12 lg:py-24">
      <div className="container mx-auto py-4 space-y-2 text-center">
        <h1 className="text-4xl font-semibold leading-none text-center">
          {data.title}
        </h1>
        <p className="mt-4 text-lg text-center">{data.description}</p>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {data.testimonials.map((testimonial: Testimonial, index: number) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}

