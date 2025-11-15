import React from 'react';

export default function HealthcareAbout() {
  return (
    <div className="mx-auto px-8 py-8 mt-20 bg-gray-50">
      {/* Header Section */}
      <div
        className="mb-12"
        style={{ marginLeft: "200px" }} // Move header 200px to the right
      >
        <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-md font-medium mb-3">
          Your Health, Our Priority
        </span>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-3">
          We take pride in being more than just a healthcare institution — we are a trusted partner in the journey to wellness.{' '}
          <span className="text-gray-500 font-normal">
            From preventive care and diagnostics to advanced surgeries and rehabilitation.
          </span>
        </h1>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Hospital Image */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80" 
              alt="Modern Hospital Building"
              className="w-full h-100 object-cover"
            />
          </div>

          {/* Years of Excellence Card */}
          <div className="bg-amber-50 rounded-3xl p-8 shadow-md">
            <h3 className="text-amber-900 font-bold text-lg mb-4 italic">
              Years of Excellence
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              At Surge Hospital, we believe that every life deserves exceptional care, compassion, and commitment. Established with a vision to provide world-class medical services, we combine cutting-edge medical technology with the expertise of our highly qualified doctors and dedicated healthcare professionals. Here, every patient and individual receives personalized attention in a safe, caring, and healing environment.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Stats Row */}
          <div className="flex gap-4">
            <div className="bg-amber-100 rounded-2xl p-6 flex-1 text-center shadow-md">
              <div className="text-4xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600 text-sm mt-1">years</div>
            </div>
            <div className="bg-amber-50 rounded-2xl p-6 flex-1 text-center shadow-md">
              <div className="text-4xl font-bold text-gray-900">100+</div>
              <div className="text-gray-600 text-sm mt-1">specialists</div>
            </div>
            <div className="bg-amber-100 rounded-2xl p-6 flex-1 text-center shadow-md">
              <div className="text-4xl font-bold text-gray-900">1000+</div>
              <div className="text-gray-600 text-sm mt-1">stories</div>
            </div>
          </div>

          {/* Hospital Room Image */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80" 
              alt="Modern Hospital Room"
              className="w-full h-100 object-cover"
            />
          </div>

          {/* Patient First Approach Card */}
          <div className="bg-blue-50 rounded-3xl p-8 shadow-md">
            <p className="text-gray-700 text-sm leading-relaxed">
              Our patient-first approach ensures that every individual who walks through our doors is treated in a safe, caring, and healing environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
