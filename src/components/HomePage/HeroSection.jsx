const HeroSection = () => {
  return (
    <div className="px-5">
      <section
        className="
          relative w-full rounded-3xl 
          bg-gradient-to-br from-accent via-secondary to-primary 
          overflow-hidden
          
          /* Height responsive */
          h-[70vh] 
          sm:h-[75vh] 
          lg:h-[80vh]
          
          /* Padding responsive */
          px-6 sm:px-10 lg:px-16
        "
      >
        {/* Background Logo */}
        <img
          src="/logo-single-white.svg"
          className="absolute bottom-0 left-4 sm:left-10 lg:left-24 opacity-20 h-3/5 sm:h-4/5"
          alt="logo-white"
        />

        {/* Left Content */}
        <div
          className="
            relative z-10 h-full flex flex-col md:justify-center max-sm:pt-10
            gap-3 

            /* Width responsive */
            w-full sm:w-[70%] lg:w-[55%]
          "
        >
          {/* Tag */}
          <p className="text-xs sm:text-sm text-[#AE650E] w-fit font-medium bg-mute/30 backdrop-blur-md rounded-full py-2 px-4">
            Your Health Our Priority
          </p>

          {/* Heading */}
          <h1
            className="
              font-quicksand font-semibold 
              text-[#212121] 

              text-3xl sm:text-5xl lg:text-7xl 
              leading-tight
            "
          >
            Your Health Comes First, Every Time to Us
          </h1>

          {/* Description */}
          <p
            className="
              text-[#212121]/70 font-medium 
              text-sm sm:text-base lg:text-lg
              max-w-xl
            "
          >
            Welcome to Medicax Medical Clinic, where we are dedicated to
            revolutionizing the way you experience healthcare.
          </p>

          {/* CTA Button */}
          <button
            className="
              bg-mute px-5 py-3 rounded-lg shadow-md 
              text-primary font-semibold w-fit mt-4
              hover:-translate-y-[2px] hover:shadow-lg 
              transition-all duration-200
              text-sm sm:text-base
            "
          >
            Book Appointment
          </button>
        </div>

        {/* Right Side Image */}
        <img
          src="/assets/HomePage/model.png"
          alt="doctor-photo"
          className="
            absolute object-contain

            /* Height responsive */
            h-[50%] bottom-0 
            sm:h-[60%]
            md:h-[75%]
            lg:h-[100%]

            /* Position responsive */
            right-0 sm:right-6 lg:right-9

          "
        />
      </section>
    </div>
  );
};

export default HeroSection;
