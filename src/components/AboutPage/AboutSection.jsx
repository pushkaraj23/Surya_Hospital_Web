import React from "react";
import JourneyTimeline from "./JourneyTimeline";

export default function AboutSections() {
  // CMS Data - This would come from your content management system
  const cmsData = {
    director: {
      name: "Dr. Sarah Johnson",
      title: "Medical Director & Chief of Surgery",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=60",
      message: `For over 15 years, I've had the privilege of leading our exceptional team at Fibonce Healthcare. Our commitment has always been to provide not just treatment, but comprehensive care that addresses the physical, emotional, and psychological needs of our patients.

What sets us apart is our unwavering dedication to medical excellence combined with genuine compassion. We've built a culture where every team member, from our surgeons to our support staff, shares the same vision: to make healthcare accessible, advanced, and human-centered.

I'm proud of the milestones we've achieved together and excited for the innovations we're bringing to our community. Thank you for trusting us with your health.`,
      signature: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=200&auto=format&fit=crop&q=60"
    },

    coreValues: [
      {
        icon: "💖",
        title: "Patient-Centered Care",
        description: "Putting patients at the heart of everything we do"
      },
      {
        icon: "🤝",
        title: "Compassion",
        description: "Treating every individual with empathy and understanding"
      },
      {
        icon: "⭐",
        title: "Excellence",
        description: "Striving for the highest standards in medical care"
      },
      {
        icon: "🔬",
        title: "Innovation",
        description: "Embracing cutting-edge technology and research"
      },
      {
        icon: "🌍",
        title: "Community",
        description: "Serving and uplifting our local community"
      },
      {
        icon: "🛡️",
        title: "Integrity",
        description: "Maintaining transparency and ethical practices"
      }
    ],

    milestones: [
      { year: "2010", event: "Fibonce Healthcare Foundation", description: "Established with 50 beds and 3 specialized departments" },
      { year: "2013", event: "First Cardiac Surgery Unit", description: "Launched advanced cardiac care facility" },
      { year: "2016", event: "JCI Accreditation", description: "Received international healthcare standards certification" },
      { year: "2019", event: "Expansion to 200 Beds", description: "Doubled capacity with new wing inauguration" },
      { year: "2021", event: "Telemedicine Launch", description: "Pioneered digital healthcare services" },
      { year: "2023", event: "Robotic Surgery Program", description: "Introduced AI-assisted surgical systems" }
    ],

    infrastructure: {
      stats: [
        { number: "250+", label: "ICU Beds", icon: "🛏️" },
        { number: "40", label: "Operation Theatres", icon: "🔪" },
        { number: "15", label: "Specialized Labs", icon: "🔬" },
        { number: "80", label: "Consulting Rooms", icon: "🚪" },
        { number: "24/7", label: "Emergency Dept", icon: "🚨" },
        { number: "5", label: "MRI & CT Scanners", icon: "📊" }
      ],
      facilities: [
        "Advanced Cardiac Cath Lab",
        "Neonatal Intensive Care Unit",
        "Modular Operation Theatres",
        "Digital Pathology Lab",
        "Physiotherapy & Rehabilitation Center",
        "Pharmacy & Medical Store"
      ]
    },

    contact: {
      phone: "+91 8888-6890-61",
      email: "contact@fibonce.com",
      website: "https://www.fibonce.com"
    }
  };

  return (
    <div className="w-full space-y-20 p-6 bg-white lg:p-12">

      {/* Director's Message Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-lg">

        {/* Director Image */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative">
            <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-8 border-white ">
              <img
                src={cmsData.director.image}
                alt={cmsData.director.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500 rounded-2xl rotate-12 opacity-90 flex items-center justify-center">
              <span className="text-white text-4xl">👨‍⚕️</span>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              Director's Message
            </div>
            <h2 className="text-4xl font-bold text-gray-800">{cmsData.director.name}</h2>
            <p className="text-lg text-purple-600 font-semibold">{cmsData.director.title}</p>
          </div>

          <div className="space-y-4">
            {cmsData.director.message.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-6">
            <div className="w-32 h-0.5 bg-purple-300"></div>
            <div className="flex items-center gap-3">
              <img
                src={cmsData.director.signature}
                alt="Signature"
                className="h-12 object-contain"
              />
              <span className="text-gray-600 font-semibold">Warmly,</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 lg:p-12 shadow-lg">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The fundamental beliefs that guide our actions and define our culture of care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cmsData.coreValues.map((value, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4 ">
                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Strip */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
          <a href={`tel:${cmsData.contact.phone}`} className="flex items-center gap-3 hover:scale-105 transition-transform">
            <span className="text-2xl">📞</span>
            <span className="text-lg font-semibold">{cmsData.contact.phone}</span>
          </a>
          <a href={`mailto:${cmsData.contact.email}`} className="flex items-center gap-3 hover:scale-105 transition-transform">
            <span className="text-2xl">✉️</span>
            <span className="text-lg font-semibold">{cmsData.contact.email}</span>
          </a>
          <a href={cmsData.contact.website} className="flex items-center gap-3 hover:scale-105 transition-transform">
            <span className="text-2xl">🌐</span>
            <span className="text-lg font-semibold">{cmsData.contact.website.replace('https://', '')}</span>
          </a>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 lg:p-12 shadow-lg">
        {/* <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrating milestones that mark our commitment to healthcare excellence
          </p>
        </div>

        <div className="relative">

          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-orange-200 h-full hidden lg:block"></div>

          <div className="space-y-12">
            {cmsData.milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-6 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}>

                <div className="flex-shrink-0 w-24 h-24 rounded-full bg-orange-500 border-8 border-white shadow-xl flex items-center justify-center z-10">
                  <span className="text-white font-bold text-lg">{milestone.year}</span>
                </div>

                <div className={`flex-1 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                  } text-center lg:text-left`}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.event}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <JourneyTimeline/>
      </div>

      {/* Infrastructure Overview */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-lg">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Infrastructure</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            State-of-the-art facilities designed for comprehensive healthcare delivery
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {cmsData.infrastructure.stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Facilities List */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Key Facilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cmsData.infrastructure.facilities.map((facility, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                <span className="text-blue-500 text-lg">✅</span>
                <span className="text-gray-700 font-medium">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}