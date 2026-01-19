import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fetchHomeAbout } from "../../api/userApi";

export default function HealthcareAbout() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ------------ FETCH CMS DATA ------------ */
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchHomeAbout();
        setData(result);
      } catch (err) {
        console.error("Error loading homeabout:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  /* ------------ VARIANTS ------------ */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const popBox = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  };

  /* ------------ LOADING STATES ------------ */
  if (loading)
    return (
      <div className="px-5 py-20 text-center text-gray-600">
        Loading hospital details...
      </div>
    );

  if (!data)
    return (
      <div className="px-5 py-20 text-center text-gray-600">
        No data available.
      </div>
    );

  return (
    <div className="px-5 mt-10 pb-2">
      {/* ---------------- HEADER ---------------- */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-28 px-28 max-sm:px-12"
      >
        {data.slogan && (
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-md font-medium mb-3">
            {data.slogan}
          </span>
        )}

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-3 max-sm:text-justify">
          {data.paragraph1}
        </h1>
      </motion.div>

      {/* ---------------- CONTENT GRID ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ---------- LEFT COLUMN ---------- */}
        <div className="space-y-8 max-sm:space-y-5">
          {/* IMAGE 1 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={data.image1}
                alt="Hospital 1"
                className="w-full h-100 object-cover"
              />
            </div>
          </motion.div>

          {/* PARAGRAPH 2 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="bg-fadedyellow/30 rounded-3xl p-8 shadow-md">
              <h3 className="text-amber-900 font-bold text-lg mb-4 italic">
                Years of Excellence
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {data.paragraph2}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---------- RIGHT COLUMN ---------- */}
        <div className="flex flex-col justify-between max-sm:gap-5">
          {/* STATS GRID */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {/* YEARS */}
              <motion.div
                variants={popBox}
                className="bg-fadedyellow/30 rounded-2xl p-6 text-center shadow-md"
              >
                <div className="text-4xl font-bold text-gray-900">
                  {data.years}+
                </div>
                <div className="text-gray-600 text-sm mt-1">years</div>
              </motion.div>

              {/* SPECIALISTS */}
              <motion.div
                variants={popBox}
                className="bg-fadedorange/30 rounded-2xl p-6 text-center shadow-md"
              >
                <div className="text-4xl font-bold text-gray-900">
                  {data.specialists}+
                </div>
                <div className="text-gray-600 text-sm mt-1">specialists</div>
              </motion.div>

              {/* PATIENTS */}
              <motion.div
                variants={popBox}
                className="bg-fadedblue/30 rounded-2xl p-6 text-center shadow-md"
              >
                <div className="text-4xl font-bold text-gray-900">
                  {data.patients}+
                </div>
                <div className="text-gray-600 text-sm mt-1">patients</div>
              </motion.div>
            </div>
          </motion.div>

          {/* IMAGE 2 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="rounded-3xl overflow-hidden shadow-lg mt-6 max-sm:mt-0">
              <img
                src={data.image2}
                alt="Hospital 2"
                className="w-full h-100 object-cover"
              />
            </div>
          </motion.div>

          {/* SUPPORTING PARAGRAPH */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="bg-fadedblue/30 rounded-3xl p-8 shadow-md mt-6 max-sm:mt-0">
              <p className="text-gray-700 text-sm leading-relaxed">
                {data.paragraph3}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
