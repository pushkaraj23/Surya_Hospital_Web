// import React, { useState } from "react";

// // Static data - This would come from CMS in real implementation
// const departmentsData = {
//     departments: [
//         {
//             id: 1,
//             name: "Cardiology",
//             description: "Comprehensive heart care and cardiovascular treatments",
//             shortDescription: "Expert heart care and cardiovascular treatments",
//             bannerImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop&q=60",
//             icon: "❤️",
//             isActive: true,
//             overview: "Our Cardiology Department provides comprehensive cardiovascular care with state-of-the-art technology. We specialize in prevention, diagnosis, and treatment of heart diseases with a patient-centered approach.",
//             services: [
//                 "Cardiac Catheterization",
//                 "Angioplasty & Stenting",
//                 "Pacemaker Implantation",
//                 "Echocardiography",
//                 "Cardiac Rehabilitation",
//                 "Preventive Cardiology"
//             ],
//             equipment: [
//                 "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&auto=format&fit=crop&q=60",
//                 "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=60"
//             ],
//             doctors: [1, 2] // Doctor IDs from doctors data
//         },
//         {
//             id: 2,
//             name: "Neurology",
//             description: "Advanced care for brain and nervous system disorders",
//             shortDescription: "Advanced brain and nervous system care",
//             bannerImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60",
//             icon: "🧠",
//             isActive: true,
//             overview: "The Neurology Department offers cutting-edge diagnosis and treatment for neurological disorders. Our team of specialists provides comprehensive care for conditions affecting the brain, spine, and nerves.",
//             services: [
//                 "EEG & EMG Testing",
//                 "Stroke Treatment",
//                 "Epilepsy Management",
//                 "Multiple Sclerosis Care",
//                 "Headache & Migraine Treatment",
//                 "Neurological Rehabilitation"
//             ],
//             equipment: [
//                 "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&auto=format&fit=crop&q=60",
//                 "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&auto=format&fit=crop&q=60"
//             ],
//             doctors: [3, 4]
//         },
//         {
//             id: 3,
//             name: "Orthopedics",
//             description: "Bone, joint, and muscle care with advanced surgical options",
//             shortDescription: "Comprehensive bone and joint care",
//             bannerImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60",
//             icon: "🦴",
//             isActive: true,
//             overview: "Our Orthopedics Department specializes in the diagnosis and treatment of musculoskeletal conditions. We offer both surgical and non-surgical interventions to restore mobility and improve quality of life.",
//             services: [
//                 "Joint Replacement Surgery",
//                 "Arthroscopic Surgery",
//                 "Spinal Surgery",
//                 "Sports Injury Treatment",
//                 "Fracture Care",
//                 "Physical Therapy"
//             ],
//             equipment: [
//                 "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&auto=format&fit=crop&q=60"
//             ],
//             doctors: [5, 6]
//         },
//         {
//             id: 4,
//             name: "Pediatrics",
//             description: "Comprehensive healthcare for children and adolescents",
//             shortDescription: "Specialized care for children and teens",
//             bannerImage: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop&q=60",
//             icon: "👶",
//             isActive: true,
//             overview: "The Pediatrics Department provides compassionate, family-centered care for patients from birth through adolescence. We focus on preventive care, growth monitoring, and treatment of childhood illnesses.",
//             services: [
//                 "Well-child Visits",
//                 "Vaccinations & Immunizations",
//                 "Developmental Assessments",
//                 "Childhood Illness Treatment",
//                 "Adolescent Medicine",
//                 "Emergency Pediatric Care"
//             ],
//             equipment: [
//                 "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&auto=format&fit=crop&q=60"
//             ],
//             doctors: [7, 8]
//         },
//         {
//             id: 5,
//             name: "Oncology",
//             description: "Advanced cancer treatment and compassionate care",
//             shortDescription: "Comprehensive cancer care and treatment",
//             bannerImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop&q=60",
//             icon: "🎗️",
//             isActive: true,
//             overview: "Our Oncology Department offers multidisciplinary cancer care with the latest treatment modalities. We provide personalized treatment plans and supportive care throughout the cancer journey.",
//             services: [
//                 "Chemotherapy",
//                 "Radiation Therapy",
//                 "Immunotherapy",
//                 "Cancer Surgery",
//                 "Palliative Care",
//                 "Clinical Trials"
//             ],
//             equipment: [
//                 "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=60"
//             ],
//             doctors: [9, 10]
//         },
//         {
//             id: 6,
//             name: "Dermatology",
//             description: "Skin, hair, and nail care with advanced treatments",
//             shortDescription: "Expert skin, hair, and nail care",
//             bannerImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=60",
//             icon: "🌟",
//             isActive: true,
//             overview: "The Dermatology Department provides comprehensive care for skin, hair, and nail conditions. We offer medical, surgical, and cosmetic treatments using the latest technology and techniques.",
//             services: [
//                 "Skin Cancer Screening",
//                 "Acne Treatment",
//                 "Psoriasis & Eczema Care",
//                 "Laser Therapy",
//                 "Cosmetic Dermatology",
//                 "Hair & Nail Disorders"
//             ],
//             equipment: [
//                 "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&auto=format&fit=crop&q=60"
//             ],
//             doctors: [11, 12]
//         }
//     ],
//     doctors: [
//         { id: 1, name: "Dr. Sarah Chen", specialization: "Interventional Cardiologist", departmentId: 1 },
//         { id: 2, name: "Dr. Michael Rodriguez", specialization: "Cardiac Electrophysiologist", departmentId: 1 },
//         { id: 3, name: "Dr. Emily Watson", specialization: "Neurologist", departmentId: 2 },
//         { id: 4, name: "Dr. James Kumar", specialization: "Neurosurgeon", departmentId: 2 },
//         { id: 5, name: "Dr. Robert Kim", specialization: "Orthopedic Surgeon", departmentId: 3 },
//         { id: 6, name: "Dr. Lisa Thompson", specialization: "Sports Medicine Specialist", departmentId: 3 },
//         { id: 7, name: "Dr. Maria Garcia", specialization: "Pediatrician", departmentId: 4 },
//         { id: 8, name: "Dr. David Wilson", specialization: "Pediatric Cardiologist", departmentId: 4 },
//         { id: 9, name: "Dr. Jennifer Lee", specialization: "Medical Oncologist", departmentId: 5 },
//         { id: 10, name: "Dr. Christopher Brown", specialization: "Radiation Oncologist", departmentId: 5 },
//         { id: 11, name: "Dr. Amanda White", specialization: "Dermatologist", departmentId: 6 },
//         { id: 12, name: "Dr. Kevin Patel", specialization: "Cosmetic Dermatologist", departmentId: 6 }
//     ]
// };

// export default function DepartmentManagement() {
//     const [selectedDepartment, setSelectedDepartment] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");

//     // Filter departments based on search
//     const filteredDepartments = departmentsData.departments.filter(dept =>
//         dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         dept.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Get doctors for selected department
//     const getDepartmentDoctors = (departmentId) => {
//         return departmentsData.doctors.filter(doctor =>
//             selectedDepartment?.doctors.includes(doctor.id)
//         );
//     };

//     if (selectedDepartment) {
//         return <DepartmentDetail
//             department={selectedDepartment}
//             doctors={getDepartmentDoctors(selectedDepartment.id)}
//             onBack={() => setSelectedDepartment(null)}
//         />;
//     }

//     return (
//         <div className="min-h-screen mt-20 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                         Departments & Specialties
//                     </h1>
//                     <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                         Comprehensive medical care across all specialties. Our expert teams provide
//                         advanced treatments with compassion and cutting-edge technology.
//                     </p>
//                 </div>

//                 {/* Search Bar */}
//                 <div className="max-w-2xl mx-auto mb-12">
//                     <div className="relative">
//                         <input
//                             type="text"
//                             placeholder="Search departments..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg shadow-sm"
//                         />
//                         <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                             <span className="text-gray-400 text-2xl">🔍</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Departments Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {filteredDepartments.map((department) => (
//                         <DepartmentCard
//                             key={department.id}
//                             department={department}
//                             onClick={() => setSelectedDepartment(department)}
//                         />
//                     ))}
//                 </div>

//                 {/* Empty State */}
//                 {filteredDepartments.length === 0 && (
//                     <div className="text-center py-12">
//                         <div className="text-6xl mb-4">🔍</div>
//                         <h3 className="text-2xl font-semibold text-gray-900 mb-2">
//                             No departments found
//                         </h3>
//                         <p className="text-gray-600">
//                             Try adjusting your search terms or browse all departments.
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// // Department Card Component
// function DepartmentCard({ department, onClick }) {
//     return (
//         <div
//             className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all  duration-300 hover:-translate-y-2 cursor-pointer group overflow-hidden"
//             onClick={onClick}
//         >
//             {/* Card Header with Icon */}
//             <div className="p-6 border-b border-gray-100">
//                 <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                         <span className="text-2xl">{department.icon}</span>
//                     </div>
//                     <div>
//                         <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                             {department.name}
//                         </h3>
//                         <p className="text-gray-600 mt-1">{department.shortDescription}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Card Content */}
//             <div className="p-6">
//                 <p className="text-gray-700 mb-4 line-clamp-2">
//                     {department.description}
//                 </p>

//                 {/* Services Preview */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                     {department.services.slice(0, 3).map((service, index) => (
//                         <span
//                             key={index}
//                             className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
//                         >
//                             {service}
//                         </span>
//                     ))}
//                     {department.services.length > 3 && (
//                         <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
//                             +{department.services.length - 3} more
//                         </span>
//                     )}
//                 </div>

//                 {/* CTA */}
//                 <div className="flex items-center justify-between">
//                     <span className="text-blue-600 font-semibold group-hover:underline">
//                         Learn More →
//                     </span>
//                     <div className="text-sm text-gray-500">
//                         {department.doctors.length} specialists
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // Department Detail Component
// function DepartmentDetail({ department, doctors, onBack }) {
//     const [showAllServices, setShowAllServices] = useState(false);

//     const handleBookAppointment = () => {
//         alert(`Booking appointment for ${department.name} department`);
//         // In real implementation, this would open a booking modal or navigate to booking page
//     };

//     return (
//         <div className="min-h-screen mt-20 bg-white">
//             {/* Back Button */}
//             <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <button
//                         onClick={onBack}
//                         className="flex items-center gap-2 py-4 text-gray-600 hover:text-gray-900 transition-colors group"
//                     >
//                         <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
//                         <span className="font-medium">Back to Departments</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Banner */}
//             <div className="relative mx-6 rounded-xl h-80 bg-gray-900">
//                 <img
//                     src={department.bannerImage}
//                     alt={department.name}
//                     className="w-full h-full object-cover rounded-xl opacity-70"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
//                 <div className="absolute bottom-8 left-8 text-white">
//                     <div className="flex items-center gap-4 mb-4">
//                         <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
//                             <span className="text-2xl">{department.icon}</span>
//                         </div>
//                         <h1 className="text-5xl font-bold">{department.name}</h1>
//                     </div>
//                     <p className="text-xl text-gray-200 max-w-2xl">{department.description}</p>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2 space-y-12">
//                         {/* Overview */}
//                         <section>
//                             <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
//                             <p className="text-lg text-gray-700 leading-relaxed">
//                                 {department.overview}
//                             </p>
//                         </section>

//                         {/* Services */}
//                         <section>
//                             <h2 className="text-3xl font-bold text-gray-900 mb-6">Services & Treatments</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 {(showAllServices ? department.services : department.services.slice(0, 6)).map((service, index) => (
//                                     <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
//                                         <span className="text-green-500 text-xl">✓</span>
//                                         <span className="text-gray-700 font-medium">{service}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                             {department.services.length > 6 && (
//                                 <button
//                                     onClick={() => setShowAllServices(!showAllServices)}
//                                     className="mt-6 text-blue-600 font-semibold hover:underline"
//                                 >
//                                     {showAllServices ? 'Show Less' : `Show All ${department.services.length} Services`}
//                                 </button>
//                             )}
//                         </section>

//                         {/* Equipment */}
//                         {department.equipment && department.equipment.length > 0 && (
//                             <section>
//                                 <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Facilities</h2>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {department.equipment.map((image, index) => (
//                                         <div key={index} className="rounded-xl overflow-hidden shadow-lg">
//                                             <img
//                                                 src={image}
//                                                 alt={`${department.name} equipment ${index + 1}`}
//                                                 className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         )}
//                     </div>

//                     {/* Sidebar */}
//                     <div className="space-y-8">
//                         {/* Book Appointment CTA */}
//                         <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
//                             <h3 className="text-2xl font-bold mb-4">Book an Appointment</h3>
//                             <p className="mb-6 opacity-90">
//                                 Schedule your consultation with our {department.name} specialists
//                             </p>
//                             <button
//                                 onClick={handleBookAppointment}
//                                 className="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition-colors text-lg"
//                             >
//                                 Book Now
//                             </button>
//                         </div>

//                         {/* Specialists */}
//                         <div className="bg-gray-50 rounded-2xl p-6">
//                             <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Specialists</h3>
//                             <div className="space-y-4">
//                                 {doctors.map((doctor) => (
//                                     <div key={doctor.id} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
//                                         <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                                             <span className="text-blue-600 font-semibold text-sm">
//                                                 {doctor.name.split(' ').map(n => n[0]).join('')}
//                                             </span>
//                                         </div>
//                                         <div>
//                                             <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
//                                             <p className="text-sm text-gray-600">{doctor.specialization}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Quick Info */}
//                         <div className="bg-white border border-gray-200 rounded-2xl p-6">
//                             <h3 className="text-xl font-bold text-gray-900 mb-4">Department Info</h3>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Specialists:</span>
//                                     <span className="font-semibold">{doctors.length}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Services:</span>
//                                     <span className="font-semibold">{department.services.length}+</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Status:</span>
//                                     <span className="font-semibold text-green-600">Active</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



import React, { useState } from "react";

// Static data - This would come from CMS in real implementation
const departmentsData = {
    departments: [
        {
            id: 1,
            name: "Cardiology",
            description: "Comprehensive heart care and cardiovascular treatments",
            shortDescription: "Expert heart care and cardiovascular treatments",
            bannerImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop&q=60",
            icon: "❤️",
            isActive: true,
            overview: "Our Cardiology Department provides comprehensive cardiovascular care with state-of-the-art technology. We specialize in prevention, diagnosis, and treatment of heart diseases with a patient-centered approach.",
            services: [
                "Cardiac Catheterization",
                "Angioplasty & Stenting",
                "Pacemaker Implantation",
                "Echocardiography",
                "Cardiac Rehabilitation",
                "Preventive Cardiology",
                "Heart Failure Management",
                "Cardiac Imaging"
            ],
            equipment: [
                "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=60"
            ],
            stats: { successRate: "98%", patients: "5000+", experience: "15+ years" },
            doctors: [1, 2]
        },
        {
            id: 2,
            name: "Neurology",
            description: "Advanced care for brain and nervous system disorders",
            shortDescription: "Advanced brain and nervous system care",
            bannerImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60",
            icon: "🧠",
            isActive: true,
            overview: "The Neurology Department offers cutting-edge diagnosis and treatment for neurological disorders. Our team of specialists provides comprehensive care for conditions affecting the brain, spine, and nerves.",
            services: [
                "EEG & EMG Testing",
                "Stroke Treatment",
                "Epilepsy Management",
                "Multiple Sclerosis Care",
                "Headache & Migraine Treatment",
                "Neurological Rehabilitation",
                "Parkinson's Disease Care",
                "Neuromuscular Disorders"
            ],
            equipment: [
                "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&auto=format&fit=crop&q=60"
            ],
            stats: { successRate: "95%", patients: "3000+", experience: "12+ years" },
            doctors: [3, 4]
        },
        {
            id: 3,
            name: "Orthopedics",
            description: "Bone, joint, and muscle care with advanced surgical options",
            shortDescription: "Comprehensive bone and joint care",
            bannerImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60",
            icon: "🦴",
            isActive: true,
            overview: "Our Orthopedics Department specializes in the diagnosis and treatment of musculoskeletal conditions. We offer both surgical and non-surgical interventions to restore mobility and improve quality of life.",
            services: [
                "Joint Replacement Surgery",
                "Arthroscopic Surgery",
                "Spinal Surgery",
                "Sports Injury Treatment",
                "Fracture Care",
                "Physical Therapy",
                "Orthopedic Trauma",
                "Pediatric Orthopedics"
            ],
            equipment: [
                "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&auto=format&fit=crop&q=60"
            ],
            stats: { successRate: "97%", patients: "4500+", experience: "18+ years" },
            doctors: [5, 6]
        },
        {
            id: 4,
            name: "Pediatrics",
            description: "Comprehensive healthcare for children and adolescents",
            shortDescription: "Specialized care for children and teens",
            bannerImage: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop&q=60",
            icon: "👶",
            isActive: true,
            overview: "The Pediatrics Department provides compassionate, family-centered care for patients from birth through adolescence. We focus on preventive care, growth monitoring, and treatment of childhood illnesses.",
            services: [
                "Well-child Visits",
                "Vaccinations & Immunizations",
                "Developmental Assessments",
                "Childhood Illness Treatment",
                "Adolescent Medicine",
                "Emergency Pediatric Care",
                "Newborn Care",
                "Child Nutrition"
            ],
            equipment: [
                "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&auto=format&fit=crop&q=60"
            ],
            stats: { successRate: "99%", patients: "8000+", experience: "20+ years" },
            doctors: [7, 8]
        },
        {
            id: 5,
            name: "Oncology",
            description: "Advanced cancer treatment and compassionate care",
            shortDescription: "Comprehensive cancer care and treatment",
            bannerImage: "https://images.unsplash.com/photo-1579154204601-015aabd44628?w=800&auto=format&fit=crop&q=60",
            icon: "🎗️",
            isActive: true,
            overview: "Our Oncology Department offers multidisciplinary cancer care with the latest treatment modalities. We provide personalized treatment plans and supportive care throughout the cancer journey.",
            services: [
                "Chemotherapy",
                "Radiation Therapy",
                "Immunotherapy",
                "Cancer Surgery",
                "Palliative Care",
                "Clinical Trials",
                "Targeted Therapy",
                "Cancer Screening"
            ],
            equipment: [
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=60"
            ],
            stats: { successRate: "92%", patients: "2500+", experience: "15+ years" },
            doctors: [9, 10]
        },
        {
            id: 6,
            name: "Dermatology",
            description: "Skin, hair, and nail care with advanced treatments",
            shortDescription: "Expert skin, hair, and nail care",
            bannerImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=60",
            icon: "🌟",
            isActive: true,
            overview: "The Dermatology Department provides comprehensive care for skin, hair, and nail conditions. We offer medical, surgical, and cosmetic treatments using the latest technology and techniques.",
            services: [
                "Skin Cancer Screening",
                "Acne Treatment",
                "Psoriasis & Eczema Care",
                "Laser Therapy",
                "Cosmetic Dermatology",
                "Hair & Nail Disorders",
                "Anti-Aging Treatments",
                "Dermatologic Surgery"
            ],
            equipment: [
                "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&auto=format&fit=crop&q=60"
            ],
            stats: { successRate: "96%", patients: "6000+", experience: "14+ years" },
            doctors: [11, 12]
        }
    ],
    doctors: [
        { id: 1, name: "Dr. Sarah Chen", specialization: "Interventional Cardiologist", departmentId: 1, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=60" },
        { id: 2, name: "Dr. Michael Rodriguez", specialization: "Cardiac Electrophysiologist", departmentId: 1, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=60" },
        { id: 3, name: "Dr. Emily Watson", specialization: "Neurologist", departmentId: 2, image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150&auto=format&fit=crop&q=60" },
        { id: 4, name: "Dr. James Kumar", specialization: "Neurosurgeon", departmentId: 2, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=60" },
        { id: 5, name: "Dr. Robert Kim", specialization: "Orthopedic Surgeon", departmentId: 3, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=60" },
        { id: 6, name: "Dr. Lisa Thompson", specialization: "Sports Medicine Specialist", departmentId: 3, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&auto=format&fit=crop&q=60" },
        { id: 7, name: "Dr. Maria Garcia", specialization: "Pediatrician", departmentId: 4, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&auto=format&fit=crop&q=60" },
        { id: 8, name: "Dr. David Wilson", specialization: "Pediatric Cardiologist", departmentId: 4, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=60" },
        { id: 9, name: "Dr. Jennifer Lee", specialization: "Medical Oncologist", departmentId: 5, image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150&auto=format&fit=crop&q=60" },
        { id: 10, name: "Dr. Christopher Brown", specialization: "Radiation Oncologist", departmentId: 5, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=60" },
        { id: 11, name: "Dr. Amanda White", specialization: "Dermatologist", departmentId: 6, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&auto=format&fit=crop&q=60" },
        { id: 12, name: "Dr. Kevin Patel", specialization: "Cosmetic Dermatologist", departmentId: 6, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=60" }
    ]
};

export default function DepartmentManagement() {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    // Filter departments based on search and active filter
    const filteredDepartments = departmentsData.departments.filter(dept => {
        const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            dept.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === "all" || dept.name.toLowerCase().includes(activeFilter);
        return matchesSearch && matchesFilter;
    });

    if (selectedDepartment) {
        return <DepartmentDetail
            department={selectedDepartment}
            onBack={() => setSelectedDepartment(null)}
        />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-6">
                        <span className="text-lg">🏥</span>
                        Medical Excellence
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Departments & Specialties
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover our comprehensive medical departments, each staffed with expert specialists 
                        and equipped with cutting-edge technology to provide you with exceptional healthcare.
                    </p>
                </div>

                {/* Enhanced Search and Filter Section */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search departments by name or specialty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-5 bg-transparent border-0 focus:ring-0 text-lg placeholder-gray-400 outline-none"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <span className="text-2xl text-blue-500">🔍</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Quick Filter Chips */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {["all", "cardiology", "neurology", "orthopedics", "pediatrics", "oncology", "dermatology"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter === "all" ? "all" : filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeFilter === filter
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                        : 'bg-white/80 text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md'
                                }`}
                            >
                                {filter === "all" ? "All Departments" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Enhanced Departments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredDepartments.map((department) => (
                        <DepartmentCard
                            key={department.id}
                            department={department}
                            onClick={() => setSelectedDepartment(department)}
                        />
                    ))}
                </div>

                {/* Enhanced Empty State */}
                {filteredDepartments.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <span className="text-5xl">🔍</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            No departments found
                        </h3>
                        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                            We couldn't find any departments matching your search. Try different keywords or browse all departments.
                        </p>
                        <button
                            onClick={() => { setSearchTerm(""); setActiveFilter("all"); }}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            View All Departments
                        </button>
                    </div>
                )}

                {/* Stats Section */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{departmentsData.departments.length}</div>
                        <div className="text-gray-600 font-medium">Specialized Departments</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl font-bold text-green-600 mb-2">{departmentsData.doctors.length}+</div>
                        <div className="text-gray-600 font-medium">Expert Doctors</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                        <div className="text-gray-600 font-medium">Medical Services</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                        <div className="text-gray-600 font-medium">Emergency Care</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced Department Card Component
function DepartmentCard({ department, onClick }) {
    return (
        <div
            className="group cursor-pointer relative"
            onClick={onClick}
        >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            
            {/* Main Card */}
            <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 border border-gray-100 overflow-hidden">
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl">{department.icon}</span>
                            </div>
                            <div className="text-right">
                                <div className="text-white/80 text-sm">Specialists</div>
                                <div className="text-xl font-bold">{department.doctors.length}</div>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{department.name}</h3>
                        <p className="text-blue-100 opacity-90">{department.shortDescription}</p>
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        {department.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{department.stats.successRate}</div>
                            <div className="text-xs text-gray-500">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{department.stats.patients}</div>
                            <div className="text-xs text-gray-500">Patients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">{department.stats.experience}</div>
                            <div className="text-xs text-gray-500">Experience</div>
                        </div>
                    </div>

                    {/* Services Preview */}
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            {department.services.slice(0, 4).map((service, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                >
                                    {service}
                                </span>
                            ))}
                            {department.services.length > 4 && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    +{department.services.length - 4} more
                                </span>
                            )}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-2">
                            Explore Department
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                            <span>⭐</span>
                            <span>4.9</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced Department Detail Component
function DepartmentDetail({ department, onBack }) {
    const [showAllServices, setShowAllServices] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    // Get doctors for this department
    const doctors = departmentsData.doctors.filter(doctor => 
        department.doctors.includes(doctor.id)
    );

    const handleBookAppointment = () => {
        // In real implementation, this would open a booking modal
        console.log(`Booking appointment for ${department.name}`);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Enhanced Back Button */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-3 py-4 text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            <span className="text-xl group-hover:-translate-x-0.5 transition-transform">←</span>
                        </div>
                        <span className="font-semibold">Back to Departments</span>
                    </button>
                </div>
            </div>

            {/* Enhanced Banner */}
            <div className="relative h-96 bg-gradient-to-r from-blue-900 to-cyan-800">
                <img
                    src={department.bannerImage}
                    alt={department.name}
                    className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-cyan-800/80"></div>
                <div className="absolute bottom-8 left-8 text-white max-w-4xl">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                            <span className="text-3xl">{department.icon}</span>
                        </div>
                        <div>
                            <h1 className="text-6xl font-bold mb-2">{department.name}</h1>
                            <p className="text-2xl text-blue-100 opacity-90">{department.description}</p>
                        </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="flex gap-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold">{department.stats.successRate}</div>
                            <div className="text-blue-200 text-sm">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{department.stats.patients}</div>
                            <div className="text-blue-200 text-sm">Patients Treated</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{department.stats.experience}</div>
                            <div className="text-blue-200 text-sm">Experience</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-200 mb-12">
                    {["overview", "services", "doctors", "facilities"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 font-semibold text-lg border-b-2 transition-colors ${
                                activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-12">
                        {activeTab === "overview" && (
                            <section className="space-y-8">
                                <div>
                                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Department Overview</h2>
                                    <p className="text-xl text-gray-700 leading-relaxed">
                                        {department.overview}
                                    </p>
                                </div>
                                
                                {/* Key Features */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                                        <div className="text-3xl mb-4">🏆</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Care</h3>
                                        <p className="text-gray-600">Board-certified specialists with extensive experience</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                                        <div className="text-3xl mb-4">🔬</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Technology</h3>
                                        <p className="text-gray-600">State-of-the-art equipment and treatment methods</p>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === "services" && (
                            <section>
                                <h2 className="text-4xl font-bold text-gray-900 mb-8">Services & Treatments</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(showAllServices ? department.services : department.services.slice(0, 8)).map((service, index) => (
                                        <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                                <span className="text-blue-600 text-xl">✓</span>
                                            </div>
                                            <span className="text-lg font-semibold text-gray-800">{service}</span>
                                        </div>
                                    ))}
                                </div>
                                {department.services.length > 8 && (
                                    <button
                                        onClick={() => setShowAllServices(!showAllServices)}
                                        className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        {showAllServices ? 'Show Less' : `View All ${department.services.length} Services`}
                                    </button>
                                )}
                            </section>
                        )}

                        {activeTab === "doctors" && (
                            <section>
                                <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Specialists</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {doctors.map((doctor) => (
                                        <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    className="w-16 h-16 rounded-2xl object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                                                    <p className="text-blue-600 font-semibold">{doctor.specialization}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-yellow-400">⭐</span>
                                                        <span className="text-sm text-gray-600">4.9 (120 reviews)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                                                View Profile
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeTab === "facilities" && department.equipment && (
                            <section>
                                <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Facilities</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {department.equipment.map((image, index) => (
                                        <div key={index} className="group relative rounded-2xl overflow-hidden shadow-lg">
                                            <img
                                                src={image}
                                                alt={`${department.name} facility ${index + 1}`}
                                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <span className="text-white font-semibold">View Facility</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Enhanced Sidebar */}
                    <div className="space-y-6">
                        {/* Book Appointment CTA */}
                        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
                            <div className="text-4xl mb-4">📅</div>
                            <h3 className="text-2xl font-bold mb-3">Book an Appointment</h3>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                Schedule your consultation with our {department.name} specialists today.
                            </p>
                            <button
                                onClick={handleBookAppointment}
                                className="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors text-lg shadow-lg"
                            >
                                Book Consultation
                            </button>
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <span className="text-xl">📞</span>
                                    <span>+91 8888-6890-61</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <span className="text-xl">✉️</span>
                                    <span>contact@fibonce.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <span className="text-xl">🌐</span>
                                    <span>www.fibonce.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Department Highlights */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-green-500 text-xl">✓</span>
                                    <span className="text-gray-700">Board-certified specialists</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-green-500 text-xl">✓</span>
                                    <span className="text-gray-700">Advanced medical technology</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-green-500 text-xl">✓</span>
                                    <span className="text-gray-700">Personalized care plans</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-green-500 text-xl">✓</span>
                                    <span className="text-gray-700">24/7 emergency support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}