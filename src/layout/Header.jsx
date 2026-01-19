import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* 🔹 Top Info Bar (Fade In) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-primary text-white text-xs py-2 px-6 flex flex-col sm:flex-row justify-between items-center max-sm:fixed max-sm:w-full max-sm:bottom-0"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>
            <strong className="font-quicksand">Emergency No.</strong> +91 98765
            43210
          </span>
          <span className="hidden sm:inline">|</span>
          <span>pushkaraj232002@gmail.com</span>
        </div>

        <div className="flex items-center gap-4 mt-1 sm:mt-0">
          <span>Street 4, Ganesh Nagar, Wadgaonsheri</span>
          <div className="flex gap-3 text-lg">
            <a href="#" className="hover:text-accent">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-accent">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-accent">
              <FaYoutube />
            </a>
          </div>
        </div>
      </motion.div>

      {/* 🔸 Main Navbar */}
      <div className="px-5">
        <motion.nav
          initial={{ y: -120, opacity: 0 }}
          animate={
            showNavbar ? { y: 0, opacity: 1 } : { y: -120, opacity: 0.9 }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="
    mt-3 bg-gradient-to-br from-mute to-accent/50 backdrop-blur-md 
    rounded-3xl py-4 px-8 flex items-center justify-between shadow-lg
  "
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="flex items-center gap-3"
              onClick={closeMobileMenu}
            >
              <img
                src="/logo.svg"
                alt="Surya Hospital"
                className="h-10 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <motion.ul
            className="hidden md:flex gap-10 font-semibold text-gray-700"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            <NavMotionItem name="Home" path="/" />
            <NavMotionItem name="About Us" path="/about" />
            <NavMotionItem name="Departments" path="/departments" />
            <NavMotionItem name="Doctors" path="/doctors" />
            <NavMotionItem name="Gallery" path="/gallery" />
            <NavMotionItem name="Blogs" path="/blogs" />
            <NavMotionItem name="Appoinment" path="/appBook" />
            <NavMotionItem name="Feedback" path="/feedback" />
          </motion.ul>

          {/* Desktop Contact Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/contact"
              className="hidden md:inline-block bg-secondary hover:bg-accent text-white px-6 py-2.5 rounded-full font-semibold shadow-md transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden text-2xl text-primary"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: mobileOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </motion.nav>
      </div>

      {/* 🔻 Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="md:hidden bg-white/75 backdrop-blur-md shadow-xl rounded-3xl mx-5 mt-2 py-7 px-6"
          >
            <ul className="flex flex-col gap-5 text-gray-700 items-center font-semibold">
              <NavItem name="Home" path="/" mobile onClick={closeMobileMenu} />
              <NavItem
                name="About Us"
                path="/about"
                mobile
                onClick={closeMobileMenu}
              />
              <NavItem
                name="Departments"
                path="/departments"
                mobile
                onClick={closeMobileMenu}
              />
              <NavItem
                name="Doctors"
                path="/doctors"
                mobile
                onClick={closeMobileMenu}
              />
              <NavItem
                name="Gallery"
                path="/gallery"
                mobile
                onClick={closeMobileMenu}
              />
              <NavItem
                name="Blogs"
                path="/blogs"
                mobile
                onClick={closeMobileMenu}
              />
               <NavItem
                name="Feedback"
                path="/feedback"
                mobile
                onClick={closeMobileMenu}
              />

              {/* Mobile Contact Button */}
              <Link
                path="/contact"
                onClick={closeMobileMenu}
                className="bg-secondary text-white py-2.5 px-7 rounded-full text-center font-semibold hover:bg-accent transition"
              >
                Contact Us
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* 🔹 Reusable Motion Nav Item (with Fade + Slide) */
const NavMotionItem = ({ name, path }) => (
  <motion.li
    variants={{
      hidden: { opacity: 0, y: -10 },
      show: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.4 }}
  >
    <Link to={path} className="hover:text-primary transition">
      {name}
    </Link>
  </motion.li>
);

/* 🔹 Basic Nav Item */
const NavItem = ({ name, path, mobile, onClick }) => (
  <li>
    <Link
      to={path}
      onClick={onClick}
      className={`hover:text-primary transition ${
        mobile ? "block w-full text-base" : ""
      }`}
    >
      {name}
    </Link>
  </li>
);

export default Header;
