import { useState } from "react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

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
                className="bg-primary text-white px-8 py-3 rounded-2xl 
                  font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap"
              >
                Subscribe
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
            <p className="text-sm">
              <span className="font-semibold">Address:</span> 123 Wellness
              Avenue, Healthy City, State 12345
            </p>
            <p className="text-sm">
              <span className="font-semibold">Phone:</span> (123) 456-7890
            </p>
            <p className="text-sm">
              <span className="font-semibold">Email:</span>{" "}
              info@hospitalnearj.org
            </p>
            <p className="text-sm">
              <span className="font-semibold">Fax:</span> (123) 456-7891
            </p>

            <div className="pt-4 space-y-2 border-t border-white/20 mt-4">
              <p className="text-sm font-semibold">
                Emergency Department: Open 24/7
              </p>
              <p className="text-sm">
                Outpatient Clinics: Mon–Fri, 8 AM – 6 PM
              </p>
              <p className="text-sm">
                Laboratory & Imaging: Mon–Sat, 7 AM – 5 PM
              </p>
            </div>
          </div>

          {/* ------------ Navigation Links ------------ */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <FooterLink label="Home" />
              <FooterLink label="About Us" />
              <FooterLink label="Departments" />
              <FooterLink label="Doctors" />
              <FooterLink label="Gallery" />
              <FooterLink label="Blogs" />
            </div>

            <div className="space-y-3">
              <FooterLink label="Terms & Conditions" />
              <FooterLink label="Privacy Policy" />
              <FooterLink label="Accessibility" />
              <FooterLink label="Non-Discrimination Notice" />
            </div>
          </div>

          {/* ------------ Social + Map ------------ */}
          <div className="flex flex-col items-start md:items-end gap-5">
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <SocialIcon
                href="https://facebook.com"
                icon={<FaFacebookF />}
                hover="hover:text-blue-500"
              />
              <SocialIcon
                href="https://instagram.com"
                icon={<FaInstagram />}
                hover="hover:text-pink-500"
              />
              <SocialIcon
                href="mailto:info@hospitalnearj.org"
                icon={<FaEnvelope />}
                hover="hover:text-red-600"
              />
            </div>

            {/* Map */}
            <div className="w-56 h-48 bg-mute rounded-2xl overflow-hidden shadow-lg relative border border-gray-300">
              {/* Google Map Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4439323062736!2d73.9046481!3d18.5557219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c10b7f6b5edb%3A0x9f85b2cd559ee5b4!2sSurya%20Hospital!5e0!3m2!1sen!2sin!4v1708190000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Label Overlay */}
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

const FooterLink = ({ label }) => (
  <a href="#" className="block text-sm hover:text-secondary transition-colors">
    {label}
  </a>
);

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
