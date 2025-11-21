// import React from "react";
// import { Quote } from "lucide-react";

// const testimonials = [
//   {
//     text: "The medical team provided exceptional care. Highly professional and compassionate!",
//     author: "Amit Verma",
//   },
//   {
//     text: "The services were top-notch. I felt genuinely cared for during my entire visit.",
//     author: "Priya Sharma",
//   },
//   {
//     text: "Quick diagnosis and professional staff. Definitely recommended!",
//     author: "Rahul Mehta",
//   },
//   {
//     text: "Amazing doctors and a clean environment. My family trusts this hospital completely.",
//     author: "Sneha Kulkarni",
//   },
// ];

// const TestimonialSection = () => {
//   return (
//     <div className="bg-[#f9fafb] px-6 md:px-12 lg:px-20 mb-20">
//       <div className="flex flex-col md:flex-row gap-10 md:gap-16 md:items-center">
        
//         {/* Left Section */}
//         <div className="md:w-1/3 flex flex-col items-start">
//           <Quote size={70} className="text-secondary opacity-80 mb-4" />

//           <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight font-quicksand">
//             What People <br /> Are Saying <br /> About Us
//           </h2>

//           <p className="mt-4 text-gray-600 text-sm md:text-base max-w-sm">
//             Real stories from real patients who experienced compassionate and 
//             professional care at our hospital.
//           </p>
//         </div>

//         {/* Testimonials Grid */}
//         <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//           {testimonials.map((item, index) => (
//             <div
//               key={index}
//               className="
//                 bg-white/80 backdrop-blur-md border border-gray-200 
//                 rounded-2xl shadow-md hover:shadow-xl 
//                 p-6 flex flex-col gap-4 
//                 transition-all duration-300 hover:-translate-y-1
//               "
//             >
//               <Quote size={30} className="text-accent" />

//               <p className="text-gray-800 font-medium text-sm leading-relaxed">
//                 “{item.text}”
//               </p>

//               <p className="text-fadedblue font-semibold text-gray-700 text-sm">
//                 ~ {item.author}
//               </p>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default TestimonialSection;


import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { getAllFeedback } from "../../api/userApi"; // Adjust import path

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const feedbackData = await getAllFeedback();
      
      // Transform API data to match the component structure
      const transformedTestimonials = feedbackData.map(feedback => ({
        text: feedback.feedback,
        author: feedback.fullname,
        rating: feedback.rating,
        isApproved: feedback.isapproved,
        createdAt: feedback.createdat
      }));

      // Filter only approved testimonials and take max 4 for the grid
      const approvedTestimonials = transformedTestimonials
        .filter(testimonial => testimonial.isApproved)
        .slice(0, 4);

      setTestimonials(approvedTestimonials);
      setError(null);
    } catch (err) {
      console.error("Error loading testimonials:", err);
      setError("Failed to load testimonials");
      // Fallback to empty array to maintain design
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state with the same design structure
  if (loading) {
    return (
      <div className="bg-[#f9fafb] px-6 md:px-12 lg:px-20 mb-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 md:items-center">
          
          {/* Left Section - Same as original */}
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

          {/* Loading state for testimonials grid */}
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  bg-white/80 backdrop-blur-md border border-gray-200 
                  rounded-2xl shadow-md 
                  p-6 flex flex-col gap-4 
                  animate-pulse
                "
              >
                <Quote size={30} className="text-accent opacity-50" />

                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>

                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] px-6 md:px-12 lg:px-20 mb-20">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 md:items-center">
        
        {/* Left Section - Exact same as original */}
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

        {/* Testimonials Grid - Same design with dynamic data */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {testimonials.length > 0 ? (
            testimonials.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white/80 backdrop-blur-md border border-gray-200 
                  rounded-2xl shadow-md hover:shadow-xl 
                  p-6 flex flex-col gap-4 
                  transition-all duration-300 hover:-translate-y-1
                "
              >
                <Quote size={20} className="text-accent" />

                <p className="text-gray-800 font-medium text-sm leading-relaxed">
                  "{item.text}"
                </p>

                <p className="text-fadedblue font-semibold text-gray-700 text-sm">
                  ~ {item.author}
                </p>
              </div>
            ))
          ) : (
            // Fallback when no testimonials are available
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-600">No testimonials available yet.</p>
              <p className="text-gray-500 text-sm mt-2">
                Check back later for patient feedback.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TestimonialSection;