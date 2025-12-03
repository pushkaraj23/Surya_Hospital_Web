import { useState, useEffect } from "react";
import { getExperts } from "../../api/userApi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ExpertsSection() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExperts = async () => {
      try {
        setLoading(true);
        const data = await getExperts();

        const formatted = data.map((doc) => ({
          id: doc.id,
          name: doc.fullname,
          specialization: doc.specialization,
          qualification: doc.qualification,
          experience: doc.experience_years,
          bio: doc.bio,
          schedule: doc.schedule,
          image: doc.photo,
        }));

        setExperts(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadExperts();
  }, []);

  /* ---------------- Skeleton Loader ---------------- */
  if (loading) {
    return (
      <div className="px-5 py-16">
        <h2 className="text-3xl font-bold text-primary mb-6">Experts</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-3xl bg-white/40 h-[40vh] animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- Animation Variants ---------------- */
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-5 py-16 bg-gradient-to-tl from-white/0 via-accent/50 to-white/0 mb-20"
    >
      {/* Header */}
      <div className="text-start mb-8">
        <h2 className="text-4xl font-bold font-quicksand text-gray-800">
          Experts
        </h2>
        <div className="h-1.5 rounded bg-secondary w-20 mt-1.5 mb-3" />
        <p className="text-gray-500">
          A glance through our wide variety of departments
        </p>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-sm:grid-cols-1">
        {experts.map((expert, index) => (
          <motion.div
            key={expert.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ExpertCard expert={expert} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Expert Card Component ---------------- */
const ExpertCard = ({ expert }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/doctors/${expert.id}`)}
      className="
      relative rounded-3xl overflow-hidden bg-white/40 backdrop-blur-xl
      group transition-all duration-500 shadow-md ease-out flex flex-col items-center 
      justify-end h-[45vh] hover:cursor-pointer hover:shadow-2xl"
    >
      {/* Doctor Image */}
      <img
        src={expert.image}
        alt={expert.name}
        className="w-full h-full absolute object-cover group-hover:scale-105 transition-all duration-300"
        onError={(e) => {
          e.target.src =
            "https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=600&auto=format&fit=crop&q=60";
        }}
      />

      {/* Glass Info Card */}
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-3 shadow-2xl mb-2 w-[92%]">
        <h3 className="text-primary text-center font-bold text-sm">
          {expert.name}
        </h3>

        <p className="text-primary/80 text-center text-xs font-semibold">
          {expert.specialization}
        </p>

        <p className="text-gray-600 text-center text-xs">
          {expert.qualification}
        </p>

        <p className="text-gray-600 text-center text-xs mt-2">
          Experience: {expert.experience} years
        </p>

        <p className="text-primary/70 font-medium text-center text-xs mt-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: expert.bio }}>
          {/* {expert.bio} */}
        </p>
      </div>
    </div>
  );
};
