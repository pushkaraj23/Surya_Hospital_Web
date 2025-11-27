import React from "react";
import { motion } from "framer-motion";
import JourneyTimeline from "./JourneyTimeline";

/* ------------------ Animation Variants ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function AboutSections() {
  const cmsData = {
    director: {
      name: "Dr. Sarah Johnson",
      title: "Medical Director & Chief of Surgery",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=60",
      message: `For over 15 years, I've had the privilege of leading our exceptional team at Fibonce Healthcare. Our commitment has always been to provide not just treatment, but comprehensive care that addresses the physical, emotional, and psychological needs of our patients.

What sets us apart is our unwavering dedication to medical excellence combined with genuine compassion. We've built a culture where every team member shares the same vision: to make healthcare accessible, advanced, and human-centered.

I'm proud of the milestones we've achieved together and excited for the innovations we're bringing to our community. Thank you for trusting us with your health.`,
      signature:
        "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=200&auto=format&fit=crop&q=60",
    },

    coreValues: [
      {
        icon: "💖",
        title: "Patient-Centered Care",
        description: "Putting patients at the heart of everything we do",
      },
      {
        icon: "🤝",
        title: "Compassion",
        description: "Treating every individual with empathy and understanding",
      },
      {
        icon: "⭐",
        title: "Excellence",
        description: "Striving for the highest standards in medical care",
      },
      {
        icon: "🔬",
        title: "Innovation",
        description: "Embracing cutting-edge technology and research",
      },
      {
        icon: "🌍",
        title: "Community",
        description: "Serving and uplifting our local community",
      },
      {
        icon: "🛡️",
        title: "Integrity",
        description: "Maintaining transparency and ethical practices",
      },
    ],

    milestones: [
      {
        year: "2010",
        event: "Foundation",
        description: "Established with 50 beds and 3 departments",
      },
      {
        year: "2013",
        event: "Cardiac Unit",
        description: "Launched advanced cardiac care facility",
      },
      {
        year: "2016",
        event: "JCI Accredited",
        description: "International quality certification",
      },
      {
        year: "2019",
        event: "Expansion",
        description: "200-bed new wing inaugurated",
      },
      {
        year: "2021",
        event: "Telemedicine",
        description: "Introduced digital consultations",
      },
      {
        year: "2023",
        event: "Robotic Surgery",
        description: "AI-assisted surgical systems launched",
      },
    ],

    infrastructure: {
      stats: [
        { number: "250+", label: "ICU Beds", icon: "🛏️" },
        { number: "40", label: "Operation Theatres", icon: "🔪" },
        { number: "15", label: "Specialized Labs", icon: "🔬" },
        { number: "80", label: "Consulting Rooms", icon: "🚪" },
        { number: "24/7", label: "Emergency Dept", icon: "🚨" },
        { number: "5", label: "MRI & CT Scanners", icon: "📊" },
      ],
      facilities: [
        "Advanced Cardiac Cath Lab",
        "Neonatal ICU",
        "Modular Operation Theatres",
        "Digital Pathology Lab",
        "Physiotherapy & Rehabilitation Center",
        "Pharmacy & Medical Store",
      ],
    },

    contact: {
      phone: "+91 8888-6890-61",
      email: "contact@fibonce.com",
      website: "https://www.fibonce.com",
    },
  };

  return (
    <div className="w-full space-y-20 p-6 bg-white lg:p-12">
      {/* ------------------------------------------------------------- */}
      {/* DIRECTOR'S MESSAGE */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-lg"
      >
        {/* Left Image */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 flex justify-center"
        >
          <div className="relative">
            <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
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
        </motion.div>

        {/* Right Content */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 space-y-6"
        >
          <div className="space-y-3">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              Director’s Message
            </div>

            <h2 className="text-4xl font-bold text-gray-800">
              {cmsData.director.name}
            </h2>

            <p className="text-lg text-purple-600 font-semibold">
              {cmsData.director.title}
            </p>
          </div>

          <div className="space-y-4">
            {cmsData.director.message.split("\n\n").map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-lg">
                {p}
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
        </motion.div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* CORE VALUES */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 lg:p-12 shadow-lg"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The fundamental beliefs that define our culture of compassionate
            care.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cmsData.coreValues.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* CONTACT STRIP */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
          <a
            href={`tel:${cmsData.contact.phone}`}
            className="flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <span className="text-2xl">📞</span>
            <span className="text-lg font-semibold">
              {cmsData.contact.phone}
            </span>
          </a>

          <a
            href={`mailto:${cmsData.contact.email}`}
            className="flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <span className="text-2xl">✉️</span>
            <span className="text-lg font-semibold">
              {cmsData.contact.email}
            </span>
          </a>

          <a
            href={cmsData.contact.website}
            className="flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <span className="text-2xl">🌐</span>
            <span className="text-lg font-semibold">
              {cmsData.contact.website.replace("https://", "")}
            </span>
          </a>
        </div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* MILESTONES TIMELINE */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 lg:p-12 shadow-lg"
      >
        <JourneyTimeline />
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* INFRASTRUCTURE */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-lg"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Infrastructure
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            State-of-the-art facilities built for comprehensive healthcare
            delivery.
          </p>
        </div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
        >
          {cmsData.infrastructure.stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Facilities */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Key Facilities
          </h3>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {cmsData.infrastructure.facilities.map((facility, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <span className="text-blue-500 text-lg">✅</span>
                <span className="text-gray-700 font-medium">{facility}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
