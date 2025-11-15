import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  { text: "What People are saying about us", author: "Person 1" },
  { text: "What People are saying about us", author: "Person 1" },
  { text: "What People are saying about us", author: "Person 1" },
  { text: "What People are saying about us", author: "Person 1" },
];

const TestimonialSection = () => {
  return (
    <div className="bg-[#f9fafb] py-7 px-6 flex flex-col md:flex-row md:items-center md:justify-center gap-2 mb-20">
      {/* Left Side - Quote + Heading */}
      <div className="flex flex-col items-start md:w-1/3">
        <Quote  size={90} className="text-[#002c6a] mb-4" />
        <h2 className="text-5xl md:text-5xl font-extrabold text-[#002c6a] leading-snug">
          What People <br /> are saying <br /> about us
        </h2>
      </div>

      {/* Right Side - Testimonial Cards */}
      <div className="flex flex-wrap justify-start gap-6 md:w-2/3">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-yellow-100 to-yellow-500 rounded-xl shadow-md w-[220px] h-[280px] flex flex-col justify-between p-3"
          >
            <Quote className="text-black" size={28} />
            <p className="text-black font-medium text-sm mt-4">{item.text}</p>
            <p className="text-sm text-gray-800 mt-auto text-right">
              ~ {item.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
