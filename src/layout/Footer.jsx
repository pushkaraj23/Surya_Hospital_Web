import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import {
  fetchPolicies,
  fetchContactDetails,
  subscribeNewsletter,
} from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [policies, setPolicies] = useState([]);
  const [contact, setContact] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  /* ---------------- Fetch Policies ---------------- */
  useEffect(() => {
    const loadPolicies = async () => {
      try {
        const data = await fetchPolicies();
        setPolicies(data);
      } catch (err) {
        console.error("Error fetching policies:", err);
      }
    };
    loadPolicies();
  }, []);

  /* ---------------- Fetch Contact Details ---------------- */
  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await fetchContactDetails();
        setContact(data); // single object
      } catch (err) {
        console.error("Error fetching contact details:", err);
      }
    };
    loadContact();
  }, []);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    try {
      setSubmitting(true);
      await subscribeNewsletter(email); // 🔥 Actual POST call
      alert("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      alert("Subscription failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Helpers for social links with graceful fallback
  const fbLink = contact?.facebook || "https://facebook.com";
  const igLink = contact?.instagram || "https://instagram.com";
  const ytLink = contact?.youtube || "https://youtube.com";
  const emailLink = contact?.email || "info@hospitalnearj.org";

  return (
    <footer className="w-full bg-gradient-to-br from-primary to-primary/40 text-white py-14 px-6">
      {/* ---------------- Newsletter Section ---------------- */}
      <section className="max-w-7xl mx-auto mb-14">
        <div className="bg-gradient-to-r from-accent via-secondary to-accent rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-quicksand font-extrabold text-gray-900">
              Subscribe to our Newsletter
            </h2>

            <div className="flex gap-3 max-sm:flex-col w-full md:w-auto">
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-3 rounded-2xl w-full md:w-80 text-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-secondary"
              />

              <button
                onClick={handleSubscribe}
                disabled={submitting}
                className={`bg-primary text-white px-8 py-3 rounded-2xl 
                  font-semibold transition-colors whitespace-nowrap
                  ${
                    submitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-blue-800"
                  }`}
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Footer Content ---------------- */}
      <div className="max-w-7xl mx-auto px-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* ------------ Contact Information ------------ */}
          <div className="space-y-3">
            {contact ? (
              <>
                <p className="text-sm">
                  <span className="font-semibold">Address:</span>{" "}
                  {contact.address}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Phone:</span> {contact.phone}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Emergency:</span>{" "}
                  {contact.emergencyno}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Email:</span> {contact.email}
                </p>

                <div className="pt-4 space-y-2 border-t border-white/20 mt-4">
                  <p className="text-sm font-semibold">Working Hours</p>
                  <p className="text-sm">
                    {contact.workinghours || "Timings not available"}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm opacity-70">Loading contact details...</p>
              </>
            )}
          </div>

          {/* ------------ Navigation Links ------------ */}
          <div className="grid grid-cols-2 gap-8">
            {/* Main Site Links */}
            <div className="space-y-3 text-sm">
              <p
                onClick={() => navigate("/")}
                className="block text-left text-sm hover:text-secondary hover:cursor-pointer transition-colors"
              >
                Home
              </p>
              <p
                onClick={() => navigate("/about")}
                className="block text-left text-sm hover:text-secondary hover:cursor-pointer transition-colors"
              >
                About Us
              </p>
              <p
                onClick={() => navigate("/departments")}
                className="block text-left text-sm hover:text-secondary hover:cursor-pointer transition-colors"
              >
                Departments
              </p>
              <p
                onClick={() => navigate("/doctors")}
                className="block text-left text-sm hover:text-secondary hover:cursor-pointer transition-colors"
              >
                Doctors
              </p>
              <p
                onClick={() => navigate("/gallery")}
                className="block text-left text-sm hover:text-secondary hover:cursor-pointer transition-colors"
              >
                Gallery
              </p>
              <p
                onClick={() => navigate("/blogs")}
                className="block text-left text-sm hover:text-secondary hover:cursor-pointer transition-colors"
              >
                Blogs
              </p>
            </div>

            {/* -------- Dynamic Policies -------- */}
            <div className="space-y-3">
              {policies.length === 0 && (
                <p className="text-sm opacity-70">Loading policies...</p>
              )}

              {policies.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/policy/${p.id}`)}
                  className="block text-left text-sm hover:text-secondary transition-colors"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* ------------ Social + Map ------------ */}
          <div className="flex flex-col items-start md:items-end gap-5">
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <SocialIcon
                href={fbLink}
                icon={<FaFacebookF />}
                hover="hover:text-blue-500"
              />
              <SocialIcon
                href={igLink}
                icon={<FaInstagram />}
                hover="hover:text-pink-500"
              />
              <SocialIcon
                href={`mailto:${emailLink}`}
                icon={<FaEnvelope />}
                hover="hover:text-red-600"
              />
            </div>

            {/* Map (still static for now) */}
            <div className="w-56 h-48 bg-mute rounded-2xl overflow-hidden shadow-lg relative border border-gray-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4439323062736!2d73.9046481!3d18.5557219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c10b7f6b5edb%3A0x9f85b2cd559ee5b4!2sSurya%20Hospital!5e0!3m2!1sen!2sin!4v1708190000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
              <div className="absolute top-2 left-2 bg-secondary text-white px-3 py-1 rounded-lg text-xs font-bold shadow">
                SURYA HOSPITAL
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Copyright ---------------- */}
        <div className="text-center pt-6 border-t border-white/20">
          <p className="text-sm text-primary font-semibold">
            © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Reusable Components ---------------- */

const SocialIcon = ({ href, icon, hover }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-3 bg-white rounded-full text-primary hover:bg-mute transition-colors text-lg ${hover}`}
  >
    {icon}
  </a>
);
