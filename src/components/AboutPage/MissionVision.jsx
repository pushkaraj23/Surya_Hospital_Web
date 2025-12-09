import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function MissionVision({
  mission,
  missiontags,
  missionimage,
  vision,
  visiontags,
  visionimage,
}) {
  return (
    <div className="w-full flex flex-col gap-16 p-6 lg:p-6">
      {/* ------------------ MISSION SECTION ------------------ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center
        bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 lg:p-12
        shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        {/* Mission Content */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-8 space-y-6"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800">Our Mission</h2>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">{mission}</p>
          </div>

          {/* Mission Tags */}
          <div className="flex flex-wrap gap-3 pt-4">
            {missiontags?.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Mission Image */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-4 flex justify-center"
        >
          <div className="relative">
            <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={missionimage}
                alt="Mission"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-500 rounded-2xl rotate-12 opacity-90"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* ------------------ VISION SECTION ------------------ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center
        bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 lg:p-12
        shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        {/* Vision Image */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-4 flex justify-center order-2 lg:order-1"
        >
          <div className="relative">
            <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={visionimage}
                alt="Vision"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500 rounded-2xl -rotate-12 opacity-90"></div>
          </div>
        </motion.div>

        {/* Vision Content */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-8 space-y-6 order-1 lg:order-2 lg:text-right"
        >
          <div className="flex items-center gap-4 mb-2 lg:justify-end">
            <h2 className="text-4xl font-bold text-gray-800">Our Vision</h2>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-2xl">🔭</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">{vision}</p>
          </div>

          {/* Vision Tags */}
          <div className="flex flex-wrap gap-3 pt-4 lg:justify-end">
            {visiontags?.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
