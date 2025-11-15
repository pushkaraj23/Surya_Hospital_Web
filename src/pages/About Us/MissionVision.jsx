import React from "react";

export default function MissionVision() {
  return (
    <div className="w-full flex flex-col gap-16 p-6 bg-white lg:p-6">
      {/* Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
        
        {/* Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800">Our Mission</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              We take pride in being more than just a healthcare institution — 
              we are a trusted partner in the journey to{" "}
              <span className="font-bold text-orange-600">wellness</span>.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From preventive care and diagnostics to advanced surgeries and rehabilitation, 
              our comprehensive services are designed to meet the unique needs of every patient.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-4">
            <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              Patient-Centered Care
            </span>
            <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              Comprehensive Services
            </span>
            <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              Trusted Partnership
            </span>
          </div>
        </div>

        {/* Image Area */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://plus.unsplash.com/premium_photo-1664303535827-78a06a7b25a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3VyZ2VyeXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Healthcare mission"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-500 rounded-2xl rotate-12 opacity-90"></div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
        
        {/* Image Area */}
        <div className="lg:col-span-4 flex justify-center order-2 lg:order-1">
          <div className="relative">
            <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1640876777002-badf6aee5bcc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VyZ2VyeXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Healthcare vision"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500 rounded-2xl -rotate-12 opacity-90"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8 space-y-6 order-1 lg:order-2 lg:text-right">
          <div className="flex items-center gap-4 mb-2 lg:justify-end">
            <h2 className="text-4xl font-bold text-gray-800">Our Vision</h2>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-2xl">🔭</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              To revolutionize healthcare by creating a future where{" "}
              <span className="font-bold text-blue-600">every individual</span> has access 
              to compassionate, innovative, and personalized medical care.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where technology and human touch converge to deliver 
              exceptional healthcare experiences that transform lives and communities.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-4 lg:justify-end">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Innovative Care
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Community Impact
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Future Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}