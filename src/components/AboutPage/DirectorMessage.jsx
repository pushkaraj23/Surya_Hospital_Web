import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function DirectorMessage({
  directorname,
  directorimage,
  directormessage,
}) {
  return (
    <div className="px-7">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-gradient-to-br my-10 mb-16 from-purple-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-lg"
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
                src={directorimage}
                alt={directorname}
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
          className="lg:col-span-8 space-y-6 my-auto md:pb-2"
        >
          <div className="space-y-3">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              Director’s Message
            </div>

            <h2 className="text-4xl font-bold text-gray-800">{directorname}</h2>
          </div>

          <div className="space-y-4">
            {directormessage?.split("\n\n").map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-lg">
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
