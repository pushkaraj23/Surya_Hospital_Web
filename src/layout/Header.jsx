import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* 🔹 Top Info Bar */}
      <div className="bg-primary z-50 text-white text-xs mb-3 py-2 px-6 flex flex-col sm:flex-row justify-between items-center">
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
      </div>

      {/* 🔸 Main Navbar (scroll-hide) */}
      <div className="px-5">
        <nav
          className={`transition-transform duration-500 ease-in-out bg-gradient-to-br from-mute to-accent/50 backdrop-blur-md rounded-3xl py-4 px-8 flex flex-col sm:flex-row items-center justify-between shadow-lg ${
            showNavbar ? "translate-y-0" : "-translate-y-[170%]"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Surya Hospital" className="h-10 w-auto" />
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex gap-10 font-semibold text-gray-700">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/departments" className="hover:text-primary">
                Departments
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="hover:text-primary">
                Doctors
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-primary">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-primary">
                Blogs
              </Link>
            </li>
          </ul>

          {/* Contact Button */}
          <Link
            to="/contact"
            className="mt-3 sm:mt-0 bg-secondary hover:bg-accent text-white px-6 py-2.5 rounded-full font-semibold shadow-md transition-all duration-300"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
