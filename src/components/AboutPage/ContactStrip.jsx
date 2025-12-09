import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchContactDetails } from "../../api/userApi";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function ContactStrip() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------------------- Load Contact Details from API -------------------- */
  useEffect(() => {
    const loadContact = async () => {
      try {
        const result = await fetchContactDetails();
        setContact(result); // API returns a single object
      } catch (err) {
        console.error("Error fetching contact details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  return (
    <div className="px-7 mt-12">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center shadow-lg"
      >
        {/* Loading */}
        {loading && (
          <p className="text-gray-200 text-center">
            Loading contact details...
          </p>
        )}

        {/* No Data Fallback */}
        {!loading && !contact && (
          <p className="text-gray-200 text-center">
            Contact details not available.
          </p>
        )}

        {/* Contact Content */}
        {!loading && contact && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            {/* Phone */}
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">📞</span>
              <span className="text-lg font-semibold">{contact.phone}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">✉️</span>
              <span className="text-lg font-semibold">{contact.email}</span>
            </a>

            {/* Website */}
            {contact?.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:scale-105 transition-transform"
              >
                <span className="text-2xl">🌐</span>
                <span className="text-lg font-semibold">
                  {contact.website
                    ?.replace("https://", "")
                    ?.replace("http://", "")}
                </span>
              </a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
