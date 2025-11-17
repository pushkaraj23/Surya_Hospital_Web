import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "The medical team provided exceptional care. Highly professional and compassionate!",
    author: "Amit Verma",
  },
  {
    text: "The services were top-notch. I felt genuinely cared for during my entire visit.",
    author: "Priya Sharma",
  },
  {
    text: "Quick diagnosis and professional staff. Definitely recommended!",
    author: "Rahul Mehta",
  },
  {
    text: "Amazing doctors and a clean environment. My family trusts this hospital completely.",
    author: "Sneha Kulkarni",
  },
];

const TestimonialSection = () => {
  return (
    <div className="bg-[#f9fafb] px-6 md:px-12 lg:px-20 mb-20">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 md:items-center">
        
        {/* Left Section */}
        <div className="md:w-1/3 flex flex-col items-start">
          <Quote size={70} className="text-secondary opacity-80 mb-4" />

          <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight font-quicksand">
            What People <br /> Are Saying <br /> About Us
          </h2>

          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-sm">
            Real stories from real patients who experienced compassionate and 
            professional care at our hospital.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                bg-white/80 backdrop-blur-md border border-gray-200 
                rounded-2xl shadow-md hover:shadow-xl 
                p-6 flex flex-col gap-4 
                transition-all duration-300 hover:-translate-y-1
              "
            >
              <Quote size={30} className="text-accent" />

              <p className="text-gray-800 font-medium text-sm leading-relaxed">
                “{item.text}”
              </p>

              <p className="text-fadedblue font-semibold text-gray-700 text-sm">
                ~ {item.author}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TestimonialSection;
