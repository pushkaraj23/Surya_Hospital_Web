import React from "react";

const images = [
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?w=600&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1661773163380-22e1c6fba588?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1620210903582-6e3c64be0d76?w=800&auto=format&fit=crop&q=60",
];

const ImageCard = ({ src, alt }) => (
  <div className="rounded-3xl overflow-hidden shadow-lg group relative">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    {/* Optional Soft Overlay for Elegance */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
  </div>
);

const ImageGallery = () => {
  return (
    <section className="bg-[#f9fafb] py-16 px-5">
      {/* Header */}
      <div className="mb-10 text-start">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-quicksand">
          Gallery
        </h2>
        <p className="text-gray-500 mt-1 text-base">
          A glimpse of our facilities, team, and patient-first environment.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Large Image */}
        <ImageCard src={images[0]} alt="Large Doctors Group" />

        {/* Middle Column (Two Images Stacked) */}
        <div className="flex flex-col gap-5">
          <ImageCard src={images[1]} alt="Doctors Close-up" />
          <ImageCard src={images[2]} alt="Modern Interior Room" />
        </div>

        {/* Right Large Image */}
        <ImageCard src={images[3]} alt="Hospital Exterior" />
      </div>
    </section>
  );
};

export default ImageGallery;
