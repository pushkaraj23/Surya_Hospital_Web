import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaBars,
  FaTimes,
} from "react-icons/fa";

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
      {/* 🔹 Top Info Bar */}
      <div className="bg-primary text-white text-xs py-2 px-6 flex flex-col sm:flex-row justify-between items-center max-sm:fixed max-sm:w-full max-sm:bottom-0">
        {/* Left Side */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>
            <strong className="font-quicksand">Emergency No.</strong> +91 98765
            43210
          </span>
          <span className="hidden sm:inline">|</span>
          <span>pushkaraj232002@gmail.com</span>
        </div>

        {/* Right Side */}
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
      </div>

      {/* 🔸 Main Navbar */}
      <div className="px-5">
        <nav
          className={`mt-3 transition-transform duration-500 ease-in-out 
            bg-gradient-to-br from-mute to-accent/50 backdrop-blur-md 
            rounded-3xl py-4 px-8 flex items-center justify-between shadow-lg
            ${showNavbar ? "translate-y-0" : "-translate-y-[180%]"}
          `}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <img src="/logo.svg" alt="Surya Hospital" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-10 font-semibold text-gray-700">
            <NavItem name="Home" path="/" />
            <NavItem name="About Us" path="/about" />
            <NavItem name="Departments" path="/departments" />
            <NavItem name="Doctors" path="/doctors" />
            <NavItem name="Gallery" path="/gallery" />
            <NavItem name="Blogs" path="/blogs" />
            <NavItem name="Feedback" path="/feedback" />
            <NavItem name="Appoinment Booking" path="/appBook" />
          </ul>

          {/* Desktop Contact Button */}
          <Link
            to="/contact"
            className="hidden md:inline-block bg-secondary hover:bg-accent text-white px-6 py-2.5 rounded-full font-semibold shadow-md transition-all duration-300"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl text-primary"
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </div>

      {/* 🔻 Mobile Menu */}
      <div

        className={`md:hidden bg-white/75 backdrop-blur-md shadow-xl rounded-3xl mx-5 mt-2 py-7 px-6 
          transition-all duration-400 overflow-hidden
          ${mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <ul className="flex flex-col gap-5 text-gray-700 items-center font-semibold">
          <NavItem name="Home" path="/" mobile onClick={closeMobileMenu} />
          <NavItem name="About Us" path="/about" mobile onClick={closeMobileMenu} />
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
            name="Feedback"
            path="/feedback"
            mobile
            onClick={closeMobileMenu}
          />
          <NavItem name="Blogs" path="/blogs" mobile onClick={closeMobileMenu} />

          {/* Mobile Contact Button */}
          <Link
            path="/contact"
            onClick={closeMobileMenu}
            className="bg-secondary text-white py-2.5 px-7 rounded-full text-center font-semibold hover:bg-accent transition"
          >
            Contact Us
          </Link>

        </ul>
      </div>
    </header>
  );
};

/* 🔹 Reusable Nav Item */
const NavItem = ({ name, path, mobile, onClick }) => (
  <li>
    <Link
      to={path}
      onClick={onClick}
      className={`hover:text-primary transition ${mobile ? "block w-full text-base" : ""
        }`}
    >
      {name}
    </Link>
  </li>
);

export default Header;
