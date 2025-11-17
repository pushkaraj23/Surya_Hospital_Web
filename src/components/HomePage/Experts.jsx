import React from "react";
import { FaLinkedinIn, FaRegEnvelope, FaTelegramPlane } from "react-icons/fa";

const experts = [
  {
    name: "Dr. James Patrick",
    title: "Cardiologist & Medicine",
    image:
      "https://plus.unsplash.com/premium_photo-1702598520071-60c9b9fd0d49?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Dr. James Patrick",
    title: "Cardiologist & Medicine",
    image:
      "https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Dr. James Patrick",
    title: "Cardiologist & Medicine",
    image:
      "https://plus.unsplash.com/premium_photo-1702598520071-60c9b9fd0d49?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Dr. James Patrick",
    title: "Cardiologist & Medicine",
    image:
      "https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Dr. James Patrick",
    title: "Cardiologist & Medicine",
    image:
      "https://plus.unsplash.com/premium_photo-1702598520071-60c9b9fd0d49?w=600&auto=format&fit=crop&q=60",
  },
];

export default function ExpertsSection() {
  return (
    <div
      className="px-5 mb-20 
        bg-gradient-to-tl from-white/0 via-accent/50 to-white/0 py-16"
    >
      {/* Header */}
      <div className="text-start mb-12">
        <h2 className="text-3xl font-bold text-primary">Experts</h2>
        <p className="text-gray-600 text-sm mt-1">
          Professionals at Work — delivering excellence in every case
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-sm:gap-3">
        {experts.map((expert, idx) => (
          <div
            key={idx}
            className="relative rounded-3xl overflow-hidden bg-white/40 backdrop-blur-xl group transition-all duration-500 ease-out flex flex-col items-center justify-end h-[40vh]"
          >
            {/* Image */}
            <img
              src={expert.image}
              alt={expert.name}
              className="w-full h-full absolute object-cover group-hover:scale-105 transition-all duration-300"
              loading="lazy"
            />

            {/* Glass Info Card */}
            <div
              className="group-hover: 
                bg-white/70 backdrop-blur-xl 
                rounded-2xl px-4 py-4 
                shadow-xl mb-4 w-[90%]"
            >
              <h3 className="text-primary text-center font-semibold text-sm">
                {expert.name}
              </h3>
              <p className="text-gray-600 text-center text-xs mb-4">
                {expert.title}
              </p>

              {/* Social Buttons */}
              <div className="flex justify-center gap-3">
                <SocialButton type="telegram" icon={<FaTelegramPlane />} />
                <SocialButton type="linkedin" icon={<FaLinkedinIn />} />
                <SocialButton type="email" icon={<FaRegEnvelope />} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------- Reusable Social Button ----------------- */
const SocialButton = ({ icon, type }) => {
  const base =
    "p-2.5 text-sm rounded-full flex items-center justify-center transition-all duration-300";

  const styles = {
    telegram: "bg-secondary text-white hover:brightness-90",
    linkedin:
      "border border-primary text-primary hover:bg-primary hover:text-white",
    email:
      "border border-gray-500 text-gray-600 hover:bg-gray-600 hover:text-white",
  };

  return <button className={`${base} ${styles[type]}`}>{icon}</button>;
};
