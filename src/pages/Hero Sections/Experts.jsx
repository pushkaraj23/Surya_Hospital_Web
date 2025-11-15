import React from 'react';
import { Linkedin, Mail, Send } from 'lucide-react';

const experts = [
  {
    name: 'Dr. James Patrick',
    title: 'Cardiologist & Medicine',
    image: 'https://plus.unsplash.com/premium_photo-1702598520071-60c9b9fd0d49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Dr. James Patrick',
    title: 'Cardiologist & Medicine',
    image: 'https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
  },
  {
    name: 'Dr. James Patrick',
    title: 'Cardiologist & Medicine',
    image: 'https://plus.unsplash.com/premium_photo-1702598520071-60c9b9fd0d49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Dr. James Patrick',
    title: 'Cardiologist & Medicine',
    image: 'https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
  },
  {
    name: 'Dr. James Patrick',
    title: 'Cardiologist & Medicine',
    image: 'https://plus.unsplash.com/premium_photo-1702598520071-60c9b9fd0d49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D',
  },
];

export default function ExpertsSection() {
  return (
        <div className=" md:px-10 lg:px-5 mb-20 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#c1befa] via-[#e2e5ff] to-[#f2f3f9] py-12 ">
      {/* Header */}
      <div className="text-start mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Experts</h2>
        <p className="text-gray-500 text-sm">
          Professionals at Work lorem ipsum
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 justify-items-center">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="relative bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden w-[275px] h-[300px] shadow-[0_4px_25px_-10px_rgba(0,0,0,0.2)] transition-transform hover:scale-110 hover:shadow-2xl"
          >
            {/* Image */}
            <img
              src={expert.image}
              alt={expert.name}
              className="object-cover w-full h-full"
            />

            {/* Glass Info Card */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-md px-4 py-3 w-[85%] text-center">
              <h3 className="text-gray-900 font-semibold text-sm">
                {expert.name}
              </h3>
              <p className="text-gray-600 text-xs mb-3">{expert.title}</p>

              {/* Social Buttons */}
              <div className="flex justify-center gap-3">
                <button className="bg-[#0A66C2] text-white p-1.5 rounded-full hover:bg-[#084b91] transition">
                  <Send size={16} />
                </button>
                <button className="bg-white text-[#0A66C2] border border-[#0A66C2] p-1.5 rounded-full hover:bg-[#0A66C2] hover:text-white transition">
                  <Linkedin size={16} />
                </button>
                <button className="bg-white text-gray-600 border border-gray-400 p-1.5 rounded-full hover:bg-gray-200 transition">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
