import { useState, useEffect } from 'react';

const JourneyTimeline = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Sample data - replace with your actual CMS data
  const cmsData = {
    milestones: [
      {
        year: "2015",
        event: "Foundation Established",
        description: "Started our journey with a vision to revolutionize healthcare through innovation and compassion.",
        icon: "🏥"
      },
      {
        year: "2017",
        event: "First Major Breakthrough",
        description: "Launched our flagship telemedicine platform, serving over 10,000 patients in the first year.",
        icon: "💡"
      },
      {
        year: "2019",
        event: "National Recognition",
        description: "Received the National Healthcare Excellence Award for innovative patient care solutions.",
        icon: "🏆"
      },
      {
        year: "2021",
        event: "Global Expansion",
        description: "Expanded our services to 3 new countries, reaching over 1 million patients worldwide.",
        icon: "🌍"
      },
      {
        year: "2023",
        event: "AI Integration",
        description: "Implemented AI-driven diagnostics, improving accuracy and reducing wait times by 40%.",
        icon: "🤖"
      }
    ]
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate active milestone
    const interval = setInterval(() => {
      setActiveMilestone(prev => (prev + 1) % cmsData.milestones.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
 
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-6 shadow-lg">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Our Journey
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Celebrating milestones that mark our commitment to healthcare excellence and innovation
          </p>
        </div>

        {/* Timeline Navigation - Mobile */}
        <div className="lg:hidden mb-8">
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {cmsData.milestones.map((milestone, index) => (
              <button
                key={index}
                onClick={() => setActiveMilestone(index)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeMilestone === index
                    ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 shadow-md hover:shadow-lg'
                }`}
              >
                {milestone.year}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-2 bg-gradient-to-b from-orange-300 to-amber-300 h-full rounded-full hidden lg:block shadow-lg"></div>
          
          {/* Progress Line */}
          <div 
            className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-2 bg-gradient-to-b from-orange-500 to-amber-500 h-full rounded-full hidden lg:block shadow-lg transition-all duration-1000"
            style={{ 
              height: `${((activeMilestone + 1) / cmsData.milestones.length) * 100}%`,
              background: `linear-gradient(to bottom, #f97316, #f59e0b, #eab308)`
            }}
          ></div>

          <div className="space-y-8 lg:space-y-12">
            {cmsData.milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-start gap-6 lg:gap-12 transition-all duration-500 ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                } ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Year Circle with Icon */}
                <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto">
                  <div 
                    className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white shadow-2xl flex items-center justify-center z-10 transition-all duration-500 transform hover:scale-110 ${
                      activeMilestone === index
                        ? 'bg-gradient-to-br from-orange-500 to-amber-500 animate-pulse-glow'
                        : 'bg-gradient-to-br from-orange-400 to-amber-400'
                    }`}
                    onClick={() => setActiveMilestone(index)}
                  >
                    <div className="text-center">
                      <div className="text-white text-2xl mb-1">{milestone.icon}</div>
                      <span className="text-white font-bold text-sm lg:text-base block">
                        {milestone.year}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Connector */}
                  <div className="lg:hidden flex-1 h-1 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full"></div>
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 bg-white rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${
                    index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                  } ${
                    activeMilestone === index
                      ? 'border-l-4 lg:border-l-0 lg:border-r-4 border-orange-500 bg-orange-50'
                      : ''
                  } ${index % 2 === 0 ? 'lg:border-r-4' : 'lg:border-l-4'} border-orange-200`}
                >
                  <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                      Milestone {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                    {milestone.event}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {milestone.description}
                  </p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-12">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-semibold">Progress</span>
              <div className="flex gap-1">
                {cmsData.milestones.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveMilestone(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeMilestone === index
                        ? 'bg-orange-500 scale-125'
                        : 'bg-orange-200 hover:bg-orange-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-orange-600 font-bold">
                {activeMilestone + 1} / {cmsData.milestones.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default JourneyTimeline;