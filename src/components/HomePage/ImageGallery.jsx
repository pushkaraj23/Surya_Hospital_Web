// import { useState, useEffect } from "react";
// import { getGallery } from "../../api/userApi";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// /* ---------------- Image Card ---------------- */
// const ImageCard = ({ src, alt, index }) => (
//   <motion.div
//     custom={index}
//     variants={cardVariants}
//     initial="hidden"
//     whileInView="visible"
//     viewport={{ once: true, amount: 0.3 }}
//     className="rounded-3xl overflow-hidden shadow-lg group relative cursor-pointer"
//   >
//     <img
//       src={src}
//       alt={alt}
//       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//     />

//     <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
//   </motion.div>
// );

// /* ---------------- Animation Variants ---------------- */
// const fadeUp = {
//   hidden: { opacity: 0, y: 60 },
//   visible: { opacity: 1, y: 0 },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 40, scale: 0.95 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       delay: i * 0.15,
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   }),
// };

// /* ---------------- Gallery Section ---------------- */
// const ImageGallery = () => {
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const data = await getGallery();

//         const validImages = data
//           .filter((item) => item.filepath && item.filepath.trim() !== "")
//           .map((item) => ({
//             ...item,
//           }));

//         setGalleryImages(validImages);
//       } catch (err) {
//         console.error("❌ Error loading gallery:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   /* ---------------- Loading State ---------------- */
//   if (loading) {
//     return (
//       <motion.section
//         initial="hidden"
//         animate="visible"
//         variants={fadeUp}
//         transition={{ duration: 0.8 }}
//         className="bg-[#f9fafb] py-16 px-5"
//       >
//         <div className="mb-10">
//           <h2 className="text-3xl md:text-4xl font-extrabold">Gallery</h2>
//           <p className="text-gray-500">Loading...</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-pulse">
//           <div className="h-[300px] bg-gray-300 rounded-3xl"></div>

//           <div className="flex flex-col gap-5">
//             <div className="h-[145px] bg-gray-300 rounded-3xl"></div>
//             <div className="h-[145px] bg-gray-300 rounded-3xl"></div>
//           </div>

//           <div className="h-[300px] bg-gray-300 rounded-3xl"></div>
//         </div>
//       </motion.section>
//     );
//   }

//   if (galleryImages.length === 0) return null;

//   /* ---------------- Select Images (same logic) ---------------- */
//   const categoryMap = {};
//   galleryImages.forEach((img) => {
//     if (!categoryMap[img.category]) categoryMap[img.category] = [];
//     categoryMap[img.category].push(img);
//   });

//   const categories = Object.keys(categoryMap);

//   let selectedImages = [];

//   for (let cat of categories) {
//     if (selectedImages.length >= 4) break;
//     selectedImages.push(categoryMap[cat][0]);
//   }

//   if (selectedImages.length < 4) {
//     const filler = 4 - selectedImages.length;
//     selectedImages = [...selectedImages, ...galleryImages.slice(0, filler)];
//   }

//   /* ---------------- Final Section with Animation ---------------- */
//   return (
//     <motion.section
//       initial="hidden"
//       whileInView="visible"
//       variants={fadeUp}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.8 }}
//       className="bg-[#f9fafb] py-16 px-5"
//     >
//       {/* Header */}
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         transition={{ duration: 0.8 }}
//         className="mb-10 text-start"
//       >
//         <div className="text-start mb-8">
//           <h2 className="text-4xl font-bold font-quicksand text-gray-800">
//             Gallery
//           </h2>
//           <div className="h-1.5 rounded bg-secondary w-20 mt-1.5 mb-3" />
//           <p className="text-gray-500">
//             A glimpse of our facilities, team, and patient-first environment.
//           </p>
//         </div>
//       </motion.div>

//       {/* Grid Layout */}
//       <div
//         onClick={() => navigate("/gallery")}
//         className="grid grid-cols-1 md:grid-cols-3 gap-5 cursor-pointer"
//       >
//         <ImageCard
//           src={selectedImages[0]?.filepath}
//           alt={selectedImages[0]?.title}
//           index={0}
//         />

//         <div className="grid grid-rows-2 h-[80vh] max-sm:h-fit gap-5">
//           <ImageCard
//             src={selectedImages[1]?.filepath}
//             alt={selectedImages[1]?.title}
//             index={1}
//           />
//           <ImageCard
//             src={selectedImages[2]?.filepath}
//             alt={selectedImages[2]?.title}
//             index={2}
//           />
//         </div>

//         <ImageCard
//           src={selectedImages[3]?.filepath}
//           alt={selectedImages[3]?.title}
//           index={3}
//         />
//       </div>
//     </motion.section>
//   );
// };

// export default ImageGallery;


import { useState, useEffect } from "react";
import { getFullImageUrl, getGallery } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


/* ---------------- Image Card ---------------- */
const ImageCard = ({ src, alt, index }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="rounded-3xl overflow-hidden shadow-lg group relative cursor-pointer"
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      onError={(e) => {
        console.error("Image failed to load:", src);
        e.target.style.display = "none";
      }}
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
  </motion.div>
);

/* ---------------- Animation Variants ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

/* ---------------- Gallery Section ---------------- */
const ImageGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGallery();

        // ✅ Transform images with full URLs
        const validImages = data
          .filter((item) => item.filepath && item.filepath.trim() !== "")
          .map((item) => ({
            ...item,
            filepath: getFullImageUrl(item.filepath), // ✅ Attach BASE_URL
          }));

        setGalleryImages(validImages);
      } catch (err) {
        console.error("❌ Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  /* ---------------- Loading State ---------------- */
  if (loading) {
    return (
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="bg-[#f9fafb] py-16 px-5"
      >
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold">Gallery</h2>
          <p className="text-gray-500">Loading...</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-pulse">
          <div className="h-[300px] bg-gray-300 rounded-3xl"></div>

          <div className="flex flex-col gap-5">
            <div className="h-[145px] bg-gray-300 rounded-3xl"></div>
            <div className="h-[145px] bg-gray-300 rounded-3xl"></div>
          </div>

          <div className="h-[300px] bg-gray-300 rounded-3xl"></div>
        </div>
      </motion.section>
    );
  }

  if (galleryImages.length === 0) return null;

  /* ---------------- Select Images (same logic) ---------------- */
  const categoryMap = {};
  galleryImages.forEach((img) => {
    if (!categoryMap[img.category]) categoryMap[img.category] = [];
    categoryMap[img.category].push(img);
  });

  const categories = Object.keys(categoryMap);

  let selectedImages = [];

  for (let cat of categories) {
    if (selectedImages.length >= 4) break;
    selectedImages.push(categoryMap[cat][0]);
  }

  if (selectedImages.length < 4) {
    const filler = 4 - selectedImages.length;
    selectedImages = [...selectedImages, ...galleryImages.slice(0, filler)];
  }

  /* ---------------- Final Section with Animation ---------------- */
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={fadeUp}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f9fafb] py-16 px-5"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-start"
      >
        <div className="text-start mb-8">
          <h2 className="text-4xl font-bold font-quicksand text-gray-800">
            Gallery
          </h2>
          <div className="h-1.5 rounded bg-secondary w-20 mt-1.5 mb-3" />
          <p className="text-gray-500">
            A glimpse of our facilities, team, and patient-first environment.
          </p>
        </div>
      </motion.div>

      {/* Grid Layout - ✅ filepath already has full URL */}
      <div
        onClick={() => navigate("/gallery")}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 cursor-pointer"
      >
        <ImageCard
          src={selectedImages[0]?.filepath}
          alt={selectedImages[0]?.title}
          index={0}
        />

        <div className="grid grid-rows-2 h-[80vh] max-sm:h-fit gap-5">
          <ImageCard
            src={selectedImages[1]?.filepath}
            alt={selectedImages[1]?.title}
            index={1}
          />
          <ImageCard
            src={selectedImages[2]?.filepath}
            alt={selectedImages[2]?.title}
            index={2}
          />
        </div>

        <ImageCard
          src={selectedImages[3]?.filepath}
          alt={selectedImages[3]?.title}
          index={3}
        />
      </div>
    </motion.section>
  );
};

export default ImageGallery;