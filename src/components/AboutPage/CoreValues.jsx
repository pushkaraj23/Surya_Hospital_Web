import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchCoreValues } from "../../api/userApi";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function CoreValues() {
  const [coreValues, setCoreValues] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------------- LOAD DATA FROM API ---------------------- */
  useEffect(() => {
    const loadValues = async () => {
      try {
        const data = await fetchCoreValues();
        setCoreValues(data);
      } catch (err) {
        console.error("Error loading core values:", err);
      } finally {
        setLoading(false);
      }
    };
    loadValues();
  }, []);

  return (
    <div className="mb-10 px-7">
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
            The beliefs that guide our culture of compassionate care.
          </p>
        </div>

        {/* ---------- Loading State ---------- */}
        {loading && (
          <p className="text-center text-gray-500">Loading core values...</p>
        )}

        {/* ---------- No Data Fallback ---------- */}
        {!loading && coreValues.length === 0 && (
          <p className="text-center text-gray-500">No core values found.</p>
        )}

        {/* ---------- Core Values Grid ---------- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {coreValues.map((value) => (
            <motion.div
              key={value.id}
              variants={fadeUp}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-green-100 flex-shrink-0 shadow">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title + Description */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
