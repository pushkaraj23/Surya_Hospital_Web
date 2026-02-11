import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaPlaneArrival,
  FaHotel,
  FaLanguage,
  FaFileAlt,
  FaCreditCard,
  FaShieldAlt,
  FaUserNurse,
  FaCheckCircle,
  FaGlobeAmericas,
  FaStethoscope,
  FaAward,
  FaDownload,
  FaComments,
  FaFileMedical,
  FaVideo,
  FaClipboardList,
  FaPassport,
  FaProcedures,
  FaLaptopMedical,
} from "react-icons/fa";

// Reusable animation variants (Framer Motion)
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const sectionViewport = { once: true, amount: 0.15 };

const MedicalTourismPage = () => {
  const whatsappNumber = "919876543210";
  const phoneNumber = "+919876543210";
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <main className="pt-28 max-sm:pt-20 pb-24 bg-mute min-h-screen overflow-x-hidden max-sm:px-3">
      {/* ——— 1. HERO SECTION ——— */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-14 md:py-20"
        >
          <p className="text-secondary font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Surya Hospital — Global Care, Trusted Worldwide
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mb-4"
          >
            World-Class Medical Treatment in India at Affordable Costs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/90 text-base md:text-lg max-w-2xl mb-8"
          >
            Advanced healthcare, expert doctors, transparent pricing, and complete travel support — all in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-5 py-3 rounded-xl shadow-lg transition-all hover:scale-105"
            >
              <FaWhatsapp className="text-xl" /> WhatsApp International Desk
            </a>
            <Link
              to="/appBook"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-5 py-3 rounded-xl shadow-lg hover:bg-mute transition-all hover:scale-105"
            >
              Get Free Medical Opinion
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-5 py-3 rounded-xl hover:bg-white/10 transition-all"
            >
              Request Cost Estimate
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4 text-sm"
          >
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full">
              <FaCheckCircle className="text-accent" /> 24-Hour Response Guarantee
            </span>
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full">
              <FaCheckCircle className="text-accent" /> No Waiting Time
            </span>
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full">
              <FaCheckCircle className="text-accent" /> Safety & Hygiene Commitment
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ——— 2. WHY PATIENTS TRAVEL TO INDIA (Bento + stat strip) ——— */}
      <SectionWrapper>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-14 md:py-18"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Why Patients Travel to India for Treatment
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Medical tourism India offers world-class care at a fraction of the cost. Choose the best hospital in India for international patients.
            </p>
          </div>
          {/* Bento-style grid: 1 large + 4 small */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <motion.div
              variants={fadeUp}
              className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-primary to-primary/90 text-white p-8 md:p-10 flex flex-col justify-center"
            >
              <span className="text-5xl mb-4 block opacity-90">💰</span>
              <h3 className="text-xl md:text-2xl font-bold mb-2">60–80% Lower Treatment Costs</h3>
              <p className="text-white/90 text-sm md:text-base">
                Affordable surgery India without compromising quality. Transparent pricing and no hidden fees.
              </p>
            </motion.div>
            {[
              { title: "No Waiting Lists", icon: "⏱", desc: "Procedure scheduled without long delays" },
              { title: "Qualified Specialists", icon: "👨‍⚕️", desc: "Internationally trained doctors" },
              { title: "Modern Infrastructure", icon: "🏥", desc: "State-of-the-art equipment" },
              { title: "English-Speaking", icon: "🗣", desc: "Clear communication throughout" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl bg-white border border-gray-200/80 p-5 flex items-center gap-4 hover:border-secondary/40 hover:shadow-md transition-all"
              >
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-primary text-sm md:text-base">{item.title}</h3>
                  <p className="text-gray-500 text-xs md:text-sm truncate">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Stat strip with dividers */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-6 px-6 rounded-2xl bg-primary/5 border border-primary/10"
          >
            <span className="text-primary font-semibold text-center sm:text-left">✔ 500,000+ medical tourists visit India annually</span>
            <span className="hidden sm:inline w-px h-8 bg-primary/20" aria-hidden />
            <span className="text-primary font-semibold text-center sm:text-right">✔ India ranks among top global medical tourism destinations</span>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* ——— 3. WHY CHOOSE SURYA HOSPITAL (List + stat bar) ——— */}
      <section className="bg-white py-14 md:py-18">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Why Choose Surya Hospital
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trust, excellence, and personalized care for every international patient.
            </p>
          </motion.div>
          {/* Two-column: list left, visual right on desktop */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10"
          >
            <ul className="space-y-0">
              {[
                "Dedicated International Patient Desk",
                "Multidisciplinary Expert Team",
                "Advanced Surgical Technology",
                "Transparent Billing Policy",
                "Personalized Care Coordinators",
                "24/7 Support",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
                >
                  <FaCheckCircle className="text-secondary text-lg flex-shrink-0" />
                  <span className="font-medium text-gray-800">{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div variants={fadeUp} className="flex items-center justify-center md:justify-end">
              <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6 border border-primary/10">
                <p className="text-center text-primary font-bold text-4xl md:text-5xl mb-1">15+</p>
                <p className="text-center text-primary/80 text-sm">Years of Excellence</p>
                <p className="text-center text-primary font-bold text-3xl mt-4 mb-1">10,000+</p>
                <p className="text-center text-primary/80 text-sm">Successful Procedures</p>
                <p className="text-center text-secondary font-bold text-3xl mt-4 mb-1">95%</p>
                <p className="text-center text-primary/80 text-sm">Patient Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>
          {/* Horizontal stat bar (mobile-friendly) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 py-6 rounded-2xl bg-primary text-white"
          >
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">15+</p>
              <p className="text-xs text-white/80">Years of Excellence</p>
            </div>
            <span className="w-px h-12 bg-white/30 hidden sm:block" aria-hidden />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">10,000+</p>
              <p className="text-xs text-white/80">Successful Procedures</p>
            </div>
            <span className="w-px h-12 bg-white/30 hidden sm:block" aria-hidden />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">95%</p>
              <p className="text-xs text-white/80">Patient Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ——— 4. TREATMENTS OFFERED (Pill flow + list with accent) ——— */}
      <SectionWrapper>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-14 md:py-18"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Treatments Offered for International Patients
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2">
              Organized by departments. Custom treatment plans prepared after medical report evaluation.
            </p>
          </div>
          {/* Pill/tag flow */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="flex flex-wrap justify-center gap-3 mb-6"
          >
            {[
              "Orthopedics",
              "Cardiac Surgery",
              "Neurosurgery",
              "IVF & Fertility",
              "Cosmetic & Plastic",
              "Oncology",
              "Gastroenterology",
              "Urology",
              "Dental & Maxillofacial",
            ].map((dept, i) => (
              <motion.span
                key={i}
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-primary/20 text-primary font-medium text-sm hover:border-secondary hover:bg-secondary/10 transition-all"
              >
                <FaStethoscope className="text-secondary text-xs" />
                {dept}
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="text-center text-gray-500 text-sm"
          >
            Joint Replacement, Spine Surgery & more — full list by department.
          </motion.p>
        </motion.div>
      </SectionWrapper>

      {/* ——— 5. DOCTOR CREDENTIALS (Cards) ——— */}
      <section className="bg-white py-14 md:py-18">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Doctor Credentials & Expertise
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              International patients trust doctors more than hospital buildings. Meet our senior consultants.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { name: "Senior Consultant – Orthopedics", exp: "20+ years", note: "International training, joint replacement & spine" },
              { name: "Senior Consultant – Cardiac", exp: "18+ years", note: "Global associations, minimally invasive surgery" },
              { name: "Senior Consultant – IVF & Fertility", exp: "15+ years", note: "International fellowships, high success rates" },
            ].map((doc, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-mute rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg hover:border-secondary/20 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {doc.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-primary mb-1">{doc.name}</h3>
                <p className="text-secondary text-sm font-medium mb-2">{doc.exp} experience</p>
                <p className="text-gray-600 text-sm">{doc.note}</p>
                <p className="text-xs text-gray-500 mt-2">Membership in global medical associations</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="text-center mt-8"
          >
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
            >
              View All Doctors
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ——— 6. ACCREDITATION & SAFETY (Premium cards) ——— */}
      <SectionWrapper>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-14 md:py-18"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Accreditation & Safety Standards
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Your safety is our priority. We follow international standards and best practices.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20">
              <FaAward className="text-secondary text-lg" />
              <span className="font-semibold text-primary text-sm">Certified & Trusted</span>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "NABH Accreditation", desc: "National accreditation for quality healthcare", highlight: true },
              { title: "ISO Certification", desc: "International quality management systems", highlight: false },
              { title: "Infection Control Protocols", desc: "Rigorous hygiene and sterilization", highlight: false },
              { title: "International Safety Standards", desc: "Aligned with global best practices", highlight: false },
              { title: "Advanced ICU Support", desc: "24/7 critical care and monitoring", highlight: false },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                  item.highlight
                    ? "bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-lg"
                    : "bg-white border-gray-100 shadow-md hover:border-secondary/30"
                }`}
              >
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                    item.highlight ? "bg-primary text-white" : "bg-secondary/15 text-secondary group-hover:bg-secondary/25"
                  }`}>
                    <FaAward className="text-2xl" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
                {item.highlight && (
                  <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/10 rounded-bl-full" aria-hidden />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Full-width trust strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="mt-10 rounded-2xl bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          >
            <span className="font-semibold text-center sm:text-left">Trusted by international patients</span>
            <span className="hidden sm:inline w-px h-6 bg-white/30" aria-hidden />
            <span className="text-white/90 text-sm text-center sm:text-right">Rigorous quality & safety protocols</span>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* ——— 7. MEDICAL TOURISM PROCESS (STEPS) ——— */}
      <section className="bg-gradient-to-b from-mute to-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="text-center mb-14"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Our Medical Tourism Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Step-by-step support from first contact to follow-up care.
            </p>
          </motion.div>

          {/* Timeline: vertical line + alternating cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="relative"
          >
            {/* Vertical connector line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-px bg-gradient-to-b from-secondary/40 via-secondary to-secondary/40"
              aria-hidden
            />

            {[
              {
                icon: FaFileMedical,
                title: "Share Medical Reports",
                desc: "Send your medical history and reports. We review them promptly.",
                step: 1,
              },
              {
                icon: FaVideo,
                title: "Free Online Consultation",
                desc: "Discuss your case with our specialists via video or phone.",
                step: 2,
              },
              {
                icon: FaClipboardList,
                title: "Treatment Plan & Cost Estimate",
                desc: "Receive a clear treatment plan and transparent cost breakdown.",
                step: 3,
              },
              {
                icon: FaPassport,
                title: "Visa & Travel Assistance",
                desc: "We help with visa invitation letters and travel guidance.",
                step: 4,
              },
              {
                icon: FaPlaneArrival,
                title: "Airport Pickup & Admission",
                desc: "Welcome at the airport and smooth admission to the hospital.",
                step: 5,
              },
              {
                icon: FaProcedures,
                title: "Treatment & Recovery",
                desc: "Expert care in modern facilities with dedicated coordinators.",
                step: 6,
              },
              {
                icon: FaLaptopMedical,
                title: "Online Follow-Up Care",
                desc: "Continued support and follow-up consultations after you return home.",
                step: 7,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-0 mb-10 last:mb-0"
              >
                {/* Step node (circle on the line) - centered on timeline */}
                <div className="absolute left-6 md:left-1/2 top-4 md:top-1/2 z-10 -translate-x-1/2 md:-translate-y-1/2 md:-translate-x-1/2">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-lg ring-4 ring-white border-2 border-secondary"
                    aria-hidden
                  >
                    <item.icon className="text-lg md:text-xl" />
                  </div>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:hidden text-xs font-bold text-primary bg-white px-1.5 rounded">
                    Step {item.step}
                  </span>
                </div>

                {/* Card: alternate left/right on desktop */}
                <div
                  className={`w-full pl-20 md:pl-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 1 ? "md:order-3 md:pl-8 md:pr-0 md:text-right" : "md:pr-8"
                  }`}
                >
                  <div
                    className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6 hover:shadow-xl hover:border-secondary/20 transition-all ${
                      i % 2 === 1 ? "md:ml-auto" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center min-w-[28px] h-7 rounded-full bg-secondary/20 text-secondary font-bold text-xs">
                        {item.step}
                      </span>
                      <h3 className="font-bold text-primary text-base md:text-lg">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Empty half for layout (desktop) */}
                <div className={`hidden md:block md:w-[calc(50%-2rem)] ${i % 2 === 1 ? "md:order-2 md:pr-8" : "md:pl-8"}`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ——— 8. TRANSPARENT COST COMPARISON (Table + banner) ——— */}
      <SectionWrapper>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-14 md:py-18"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Transparent Cost Comparison
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2">
              Approximate comparison (USD). Detailed cost breakdown provided before travel.
            </p>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="mb-4 py-3 px-4 rounded-xl bg-secondary/10 border border-secondary/20 text-center"
          >
            <span className="font-semibold text-primary">No hidden charges.</span>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 font-semibold rounded-tl-2xl">Procedure</th>
                  <th className="px-4 py-3 font-semibold">USA/UK (approx.)</th>
                  <th className="px-4 py-3 font-semibold rounded-tr-2xl">India at Surya (approx.)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t border-gray-100 bg-mute/50"><td className="px-4 py-3">Knee Replacement</td><td className="px-4 py-3">$25,000 – $35,000</td><td className="px-4 py-3 text-secondary font-semibold">$5,000 – $8,000</td></tr>
                <tr className="border-t border-gray-100"><td className="px-4 py-3">Cardiac Bypass</td><td className="px-4 py-3">$75,000 – $120,000</td><td className="px-4 py-3 text-secondary font-semibold">$8,000 – $12,000</td></tr>
                <tr className="border-t border-gray-100 bg-mute/50"><td className="px-4 py-3">IVF (one cycle)</td><td className="px-4 py-3">$12,000 – $15,000</td><td className="px-4 py-3 text-secondary font-semibold">$2,500 – $4,000</td></tr>
                <tr className="border-t border-gray-100"><td className="px-4 py-3">Dental Implant</td><td className="px-4 py-3">$3,000 – $5,000</td><td className="px-4 py-3 text-secondary font-semibold">$800 – $1,500</td></tr>
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* ——— 9. INTERNATIONAL PATIENT SUPPORT (Icon strip + list) ——— */}
      <section className="bg-white py-14 md:py-18">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              International Patient Support Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              End-to-end assistance so you can focus on healing.
            </p>
          </motion.div>
          {/* Horizontal icon strip - scroll on mobile */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide snap-x snap-mandatory md:flex-wrap md:justify-center md:overflow-visible"
          >
            {[
              { icon: FaPlaneArrival, label: "Airport Pickup" },
              { icon: FaHotel, label: "Hotel Assistance" },
              { icon: FaLanguage, label: "Translator Services" },
              { icon: FaFileAlt, label: "Visa Invitation Letter" },
              { icon: FaCreditCard, label: "Multiple Payment Options" },
              { icon: FaShieldAlt, label: "Insurance Assistance" },
              { icon: FaUserNurse, label: "Dedicated Care Coordinator" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col items-center justify-center min-w-[100px] snap-center py-4 px-3 rounded-2xl hover:bg-mute/80 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-secondary mb-2">
                  <item.icon className="text-2xl" />
                </div>
                <span className="font-semibold text-gray-800 text-sm text-center leading-tight">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ——— 10. PATIENT TESTIMONIALS (Quote blocks + featured) ——— */}
      <SectionWrapper>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-14 md:py-18"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Patient Testimonials
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from international patients who chose Surya Hospital.
            </p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="space-y-8"
          >
            {/* Featured quote - large */}
            <motion.div
              variants={fadeUp}
              className="relative pl-8 pr-6 py-8 rounded-2xl bg-primary/5 border-l-4 border-secondary"
            >
              <span className="absolute left-4 top-6 text-6xl text-secondary/30 font-serif leading-none">"</span>
              <p className="text-lg md:text-xl text-gray-700 italic relative z-10">
                Pain-free within weeks. The team was incredibly supportive.
              </p>
              <p className="mt-4 text-secondary font-semibold">Knee Replacement — Kenya</p>
              <p className="text-sm text-gray-500">International Patient</p>
            </motion.div>
            {/* Two smaller quote strips */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { quote: "World-class care at a fraction of the cost. Grateful for the transparency.", procedure: "Cardiac Surgery", country: "Bangladesh" },
                { quote: "Professional, caring, and successful. We recommend Surya to everyone.", procedure: "IVF & Fertility", country: "UAE" },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-4 py-4 border-b border-gray-200 last:border-0 md:border-0 md:py-0"
                >
                  <span className="text-3xl text-secondary/40 font-serif flex-shrink-0">"</span>
                  <div>
                    <p className="text-gray-600 italic text-sm md:text-base">"{t.quote}"</p>
                    <p className="text-secondary font-semibold text-sm mt-2">{t.procedure} — {t.country}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* ——— 11. BEFORE & AFTER (Split view placeholders) ——— */}
      <section className="bg-white py-14 md:py-18">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Before & After Results
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Especially for Cosmetic Surgery, Orthopedics, and Dental — results that speak for themselves.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {["Orthopedics", "Cosmetic & Plastic", "Dental"].map((cat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl overflow-hidden border border-gray-200"
              >
                <div className="grid grid-cols-2 gap-px bg-gray-200">
                  <div className="aspect-square bg-mute flex flex-col items-center justify-center p-4">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Before</span>
                    <span className="text-gray-400 text-sm mt-1">—</span>
                  </div>
                  <div className="aspect-square bg-primary/5 flex flex-col items-center justify-center p-4">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">After</span>
                    <span className="text-gray-400 text-sm mt-1">—</span>
                  </div>
                </div>
                <p className="text-center py-3 font-medium text-primary text-sm border-t border-gray-100">{cat}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ——— 12. COUNTRY-SPECIFIC SUPPORT (Strip + pills) ——— */}
      <SectionWrapper>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-14 md:py-18"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Country-Specific Support
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2">
              We regularly assist patients from these regions. Dedicated country coordinators available.
            </p>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-primary/10 py-8 px-6"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {["Africa", "Middle East", "Bangladesh", "Nepal", "Sri Lanka"].map((region, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur border border-primary/20 text-primary font-semibold text-sm hover:border-secondary hover:bg-white transition-all shadow-sm"
                >
                  <FaGlobeAmericas className="text-secondary" />
                  {region}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* ——— 13. FAQs (Accordion) ——— */}
      <section className="bg-white py-14 md:py-18">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Common questions from international patients.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="space-y-2"
          >
            {[
              { q: "How safe is medical treatment in India?", a: "India has world-class hospitals with NABH/ISO accreditations, modern equipment, and highly trained doctors. We follow strict infection control and safety protocols." },
              { q: "How long do I need to stay?", a: "It depends on your procedure. We provide an estimated stay duration in your treatment plan and cost estimate before you travel." },
              { q: "Can I bring an attendant?", a: "Yes. We can assist with visa invitation letters and accommodation for one attendant per patient." },
              { q: "How do I apply for medical visa?", a: "We provide a visa invitation letter and necessary documents. You apply at the Indian embassy/consulate in your country with your passport and medical documents." },
              { q: "What payment methods are accepted?", a: "We accept bank transfer, cards, and other methods. Details are shared by our international desk. No hidden charges." },
              { q: "Is post-treatment follow-up available?", a: "Yes. We offer online follow-up consultations and can share reports with your local doctor for continuity of care." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left py-4 px-5 font-semibold text-primary hover:bg-mute/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaqIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-secondary flex-shrink-0"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 text-sm pb-4 px-5 pt-0 border-t border-gray-100">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ——— 14. STICKY WHATSAPP FLOATING BUTTON ——— */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <FaWhatsapp className="text-2xl" /> WhatsApp
      </motion.a>

      {/* ——— 15. FINAL CTA SECTION ——— */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-16 md:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            Start Your Healing Journey Today
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Get expert medical advice within 24 hours.
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div variants={fadeUp}>
              <Link
                to="/appBook"
                className="inline-flex items-center gap-2 bg-secondary text-white font-semibold px-6 py-3 rounded-xl hover:bg-secondary/90 transition-all"
              >
                Upload Medical Reports
              </Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-mute transition-all"
              >
                Get Free Cost Estimate
              </Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
              >
                <FaWhatsapp /> Talk to International Coordinator
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ——— BONUS: Brochure & Live Chat ——— */}
      <section className="bg-mute py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
          >
            <FaDownload /> Download Medical Tourism Brochure
          </motion.a>
          <motion.a
            href="#"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="inline-flex items-center gap-2 bg-secondary text-white font-semibold px-6 py-3 rounded-xl hover:bg-secondary/90 transition-all"
          >
            <FaComments /> Live Chat
          </motion.a>
        </div>
      </section>
    </main>
  );
};

// Wrapper for alternating background sections with animation
function SectionWrapper({ children }) {
  return (
    <section className="bg-mute">
      {children}
    </section>
  );
}

export default MedicalTourismPage;
