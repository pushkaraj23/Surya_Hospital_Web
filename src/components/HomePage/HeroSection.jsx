const HeroSection = () => {
  return (
    <div className="px-5">
      <section className="h-[75vh] w-full relative bg-gradient-to-br from-accent via-secondary to-primary rounded-3xl px-16">
        <img
          src="/logo-single-white.svg"
          className="h-5/6 absolute z-0 -bottom-5 left-24 opacity-20"
          alt="logo-white"
        />
        <div className="w-[55%] relative z-10 flex flex-col justify-center h-full gap-3">
          <p className="text-sm text-[#AE650E] w-fit font-medium bg-mute/30 backdrop-blur-md rounded-full py-2 px-4">
            Your Health Our Priority
          </p>
          <h1 className="text-7xl font-semibold text-[#212121] font-quicksand">
            Your Health Comes First, Every Time to Us
          </h1>
          <p className="text-[#212121]/60 font-medium text-lg">
            Welcome to Medicax Medical Clinic, where we are dedicated to
            revolutionizing the way you healthcare.
          </p>
          <button className="bg-mute px-5 py-3 rounded-lg shadow-md text-primary font-semibold w-fit my-5 hover:-translate-y-[2px] transition-all duration-200 hover:shadow-lg">Book Appointment</button>
        </div>
        <img src="/assets/HomePage/model.png" className="absolute h-[110%] right-9 bottom-0" alt="doctor-photo" />
      </section>
    </div>
  );
};

export default HeroSection;
