// import React from "react";

// const images = [
//   "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=60",
//   "https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?w=600&auto=format&fit=crop&q=60",
//   "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
//   "https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?w=600&auto=format&fit=crop&q=60",
//   "https://plus.unsplash.com/premium_photo-1661773163380-22e1c6fba588?w=800&auto=format&fit=crop&q=60",
//   "https://images.unsplash.com/photo-1620210903582-6e3c64be0d76?w=800&auto=format&fit=crop&q=60",
// ];

// const ImageCard = ({ src, alt }) => (
//   <div className="rounded-3xl overflow-hidden shadow-lg group relative">
//     <img
//       src={src}
//       alt={alt}
//       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//     />

//     {/* Optional Soft Overlay for Elegance */}
//     <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
//   </div>
// );

// const ImageGallery = () => {
//   return (
//     <section className="bg-[#f9fafb] py-16 px-5">
//       {/* Header */}
//       <div className="mb-10 text-start">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-quicksand">
//           Gallery
//         </h2>
//         <p className="text-gray-500 mt-1 text-base">
//           A glimpse of our facilities, team, and patient-first environment.
//         </p>
//       </div>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//         {/* Left Large Image */}
//         <ImageCard src={images[0]} alt="Large Doctors Group" />

//         {/* Middle Column (Two Images Stacked) */}
//         <div className="flex flex-col gap-5">
//           <ImageCard src={images[1]} alt="Doctors Close-up" />
//           <ImageCard src={images[2]} alt="Modern Interior Room" />
//         </div>

//         {/* Right Large Image */}
//         <ImageCard src={images[3]} alt="Hospital Exterior" />
//       </div>
//     </section>
//   );
// };

// export default ImageGallery;


import React, { useState, useEffect } from "react";
import { getGallery } from "../../api/userApi"; 

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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const galleryData = await getGallery();
        
        // Take first 4 images and construct full image URLs
        const firstFourImages = galleryData.slice(0, 4).map(item => ({
          url: item.filepath ? `https://your-domain.com/${item.filepath}` : '', // Adjust domain as needed
          title: item.title,
          id: item.id
        }));
        
        setImages(firstFourImages);
      } catch (err) {
        setError("Failed to load gallery images");
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="bg-[#f9fafb] py-16 px-5">
        <div className="mb-10 text-start">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-quicksand">
            Gallery
          </h2>
          <p className="text-gray-500 mt-1 text-base">
            A glimpse of our facilities, team, and patient-first environment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-64 animate-pulse"></div>
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-32 animate-pulse"></div>
            <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-32 animate-pulse"></div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-64 animate-pulse"></div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="bg-[#f9fafb] py-16 px-5">
        <div className="mb-10 text-start">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-quicksand">
            Gallery
          </h2>
          <p className="text-gray-500 mt-1 text-base">
            A glimpse of our facilities, team, and patient-first environment.
          </p>
        </div>
        <div className="text-center text-red-500 py-8">
          {error}
        </div>
      </section>
    );
  }

  // Show actual gallery when data is loaded
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

      {/* Grid Layout - Same design as before */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Large Image */}
        <ImageCard 
          src={images[0]?.url || "/fallback-image.jpg"} 
          alt={images[0]?.title || "Gallery image 1"} 
        />

        {/* Middle Column (Two Images Stacked) */}
        <div className="flex flex-col gap-5">
          <ImageCard 
            src={images[1]?.url || "/fallback-image.jpg"} 
            alt={images[1]?.title || "Gallery image 2"} 
          />
          <ImageCard 
            src={images[2]?.url || "/fallback-image.jpg"} 
            alt={images[2]?.title || "Gallery image 3"} 
          />
        </div>

        {/* Right Large Image */}
        <ImageCard 
          src={images[3]?.url || "/fallback-image.jpg"} 
          alt={images[3]?.title || "Gallery image 4"} 
        />
      </div>
    </section>
  );
};

export default ImageGallery;