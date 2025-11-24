// src/components/departments/departmentsData.js

const departmentsData = {
  departments: [
    {
      id: 1,
      name: "Cardiology",
      description: "Comprehensive heart care and cardiovascular treatments",
      shortDescription: "Expert heart care and cardiovascular treatments",
      bannerImage:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop&q=60",
      icon: "❤️",
      isActive: true,
      overview:
        "Our Cardiology Department provides comprehensive cardiovascular care with state-of-the-art technology.",
      services: [
        "Cardiac Catheterization",
        "Angioplasty & Stenting",
        "Pacemaker Implantation",
        "Echocardiography",
        "Cardiac Rehabilitation",
      ],
      equipment: [
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=60",
      ],
      stats: { successRate: "98%", patients: "5000+", experience: "15+ years" },
      doctors: [1, 2],
      availableDays: ["Monday", "Wednesday", "Friday"],
      timings: "7:00 AM - 9:00 PM",
    },

    {
      id: 2,
      name: "Neurology",
      description: "Advanced care for brain and nervous system disorders",
      shortDescription: "Advanced brain and nervous system care",
      bannerImage:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60",
      icon: "🧠",
      isActive: true,
      overview:
        "The Neurology Department offers cutting-edge diagnosis and treatment for neurological disorders.",
      services: [
        "EEG & EMG Testing",
        "Stroke Treatment",
        "Epilepsy Management",
        "Multiple Sclerosis Care",
      ],
      equipment: [
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&auto=format&fit=crop&q=60",
      ],
      stats: { successRate: "95%", patients: "3000+", experience: "12+ years" },
      doctors: [3, 4],
      availableDays: ["Tuesday", "Thursday", "Saturday"],
      timings: "8:00 AM - 8:00 PM",
    },
  ],

  doctors: [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialization: "Interventional Cardiologist",
      departmentId: 1,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=60",
      qualification: "MD, DM Cardiology",
      experience: "12 years",
      bio: "Expert in interventional cardiology & complex coronary interventions.",
      availableDays: ["Monday", "Wednesday", "Friday"],
      timings: "9:00 AM - 5:00 PM",
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      specialization: "Cardiac Electrophysiologist",
      departmentId: 1,
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=60",
      qualification: "MD, DM Cardiology",
      experience: "15 years",
      bio: "Expert in rhythm disorders and pacemaker implantation.",
      availableDays: ["Tuesday", "Thursday", "Saturday"],
      timings: "10:00 AM - 6:00 PM",
    },
  ],
};

export default departmentsData;
