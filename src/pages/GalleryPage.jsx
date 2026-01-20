// // import { useState, useEffect } from "react";
// // import MediaCard from "../components/GalleryPage/MediaCard";
// // import Lightbox from "../components/GalleryPage/Lightbox";
// // import CategoryFilters from "../components/GalleryPage/CategoryFilters";
// // import { getFullImageUrl, getGallery } from "../api/userApi";

// // export default function GalleryPage() {
// //   const [media, setMedia] = useState([]);
// //   const [filteredMedia, setFilteredMedia] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState("all");
// //   const [selectedMedia, setSelectedMedia] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const itemsPerPage = 12;
// //   const [currentPage, setCurrentPage] = useState(1);

// //   // =====================================================
// //   // 🔥 FETCH GALLERY MEDIA FROM API
// //   // =====================================================
// //   useEffect(() => {
// //     async function loadMedia() {
// //       try {
// //         setLoading(true);

// //         const res = await getGallery();

// //         const normalizedMedia = res.map((item) => ({
// //           ...item,
// //           url: getFullImageUrl(item.url),
// //         }));

// //         setMedia(normalizedMedia);
// //         setFilteredMedia(normalizedMedia);

// //       } catch (err) {
// //         console.error("Failed to load gallery:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     loadMedia();
// //   }, []);

// //   // =====================================================
// //   // 🔥 AUTO-GENERATE UNIQUE CATEGORIES
// //   // =====================================================
// //   const categories = [
// //     "all",
// //     ...Array.from(new Set(media.map((item) => item.category))).filter(Boolean),
// //   ];

// //   // =====================================================
// //   // 🔥 FILTER MEDIA ON CATEGORY CHANGE
// //   // =====================================================
// //   useEffect(() => {
// //     if (selectedCategory === "all") setFilteredMedia(media);
// //     else setFilteredMedia(media.filter((m) => m.category === selectedCategory));

// //     setCurrentPage(1);
// //   }, [selectedCategory, media]);

// //   // =====================================================
// //   // 🔥 PAGINATION LOGIC
// //   // =====================================================
// //   const indexOfLast = currentPage * itemsPerPage;
// //   const currentItems = filteredMedia.slice(
// //     indexOfLast - itemsPerPage,
// //     indexOfLast
// //   );
// //   const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);

// //   // =====================================================
// //   // 🔥 LOADING UI
// //   // =====================================================
// //   if (loading)
// //     return (
// //       <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-mute">
// //         <div className="h-14 w-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
// //         <p className="text-primary text-lg font-medium">Loading gallery...</p>
// //       </div>
// //     );

// //   // =====================================================
// //   // 🔥 MAIN PAGE
// //   // =====================================================
// //   return (
// //     <div className="pt-40 max-sm:pt-28 pb-16 px-4 max-w-7xl mx-auto">
// //       {/* PAGE TITLE */}
// //       <div className="text-center mb-10">
// //         <h1 className="text-5xl max-sm:text-4xl font-quicksand font-extrabold text-primary mb-2">
// //           Hospital Gallery
// //         </h1>
// //         <div className="w-24 h-1 bg-secondary rounded-full mx-auto"></div>
// //         <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
// //           Explore our advanced medical facilities, team moments, and events from
// //           our hospital.
// //         </p>
// //       </div>

// //       {/* CATEGORY FILTERS */}
// //       <CategoryFilters
// //         categories={categories}
// //         selected={selectedCategory}
// //         onSelect={setSelectedCategory}
// //         media={media}
// //       />

// //       {/* MEDIA GRID */}
// //       <div className="flex flex-wrap gap-3 justify-center mt-10">
// //         {currentItems.map((item) => (
// //           <MediaCard
// //             key={item.id}
// //             item={{
// //               ...item,
// //             }}
// //             onOpen={setSelectedMedia}
// //           />
// //         ))}
// //       </div>

// //       {/* PAGINATION */}
// //       {totalPages > 1 && (
// //         <div className="flex justify-center gap-2 mt-12">
// //           {Array.from({ length: totalPages }, (_, i) => (
// //             <button
// //               key={i}
// //               onClick={() => setCurrentPage(i + 1)}
// //               className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${currentPage === i + 1
// //                 ? "bg-primary text-white shadow-md"
// //                 : "bg-white text-primary border border-primary hover:bg-primary/10"
// //                 }`}
// //             >
// //               {i + 1}
// //             </button>
// //           ))}
// //         </div>
// //       )}

// //       {/* LIGHTBOX */}
// //       {selectedMedia && (
// //         <Lightbox
// //           media={selectedMedia}
// //           allMedia={filteredMedia}
// //           onClose={() => setSelectedMedia(null)}
// //           onNavigate={(dir) => {
// //             const index = filteredMedia.findIndex(
// //               (m) => m.id === selectedMedia.id
// //             );
// //             const newIndex =
// //               dir === "prev"
// //                 ? (index - 1 + filteredMedia.length) % filteredMedia.length
// //                 : (index + 1) % filteredMedia.length;

// //             setSelectedMedia(filteredMedia[newIndex]);
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// export default function CategoryFilters({
//   categories,
//   selected,
//   onSelect,
//   media,
// }) {
//   return (
//     <div className="flex flex-wrap justify-center gap-3 mt-6">
//       {categories.map((cat) => {
//         const count =
//           cat === "all"
//             ? media.length
//             : media.filter((m) => m.category === cat).length;

//         const isActive = selected === cat;

//         return (
//           <button
//             key={cat}
//             onClick={() => onSelect(cat)}
//             className={`
//               group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
//               transition-all duration-300 shadow-sm hover:shadow-md 
//               ${
//                 isActive
//                   ? "bg-primary text-white shadow-md scale-[1.03]"
//                   : "bg-white text-gray-700 border border-gray-300 hover:bg-primary/10 hover:text-primary"
//               }
//             `}
//           >
//             {/* Category Name */}
//             <span>{cat.toUpperCase()}</span>

//             {/* Count Badge */}
//             <span
//               className={`
//                 px-2 py-0.5 rounded-full text-xs font-semibold 
//                 transition-all duration-300
//                 ${
//                   isActive
//                     ? "bg-secondary text-white"
//                     : "bg-gray-200 text-gray-600 group-hover:bg-primary/20 group-hover:text-primary"
//                 }
//               `}
//             >
//               {count}
//             </span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import MediaCard from "../components/GalleryPage/MediaCard";
import Lightbox from "../components/GalleryPage/Lightbox";
import CategoryFilters from "../components/GalleryPage/CategoryFilters";
import { getFullImageUrl, getGallery } from "../api/userApi";

export default function GalleryPage() {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // =====================================================
  // 🔥 FETCH GALLERY MEDIA FROM API
  // =====================================================
  useEffect(() => {
    async function loadMedia() {
      try {
        setLoading(true);

        const res = await getGallery();

        // ✅ Add safety check for response
        if (!res || !Array.isArray(res)) {
          console.error("Invalid gallery response:", res);
          setMedia([]);
          setFilteredMedia([]);
          return;
        }

        const normalizedMedia = res
          .filter((item) => item.filepath && item.filepath.trim() !== "")
          .map((item) => ({
            ...item,
            filepath: getFullImageUrl(item.filepath),
          }));

        setMedia(normalizedMedia);
        setFilteredMedia(normalizedMedia);

      } catch (err) {
        console.error("Failed to load gallery:", err);
        setMedia([]);
        setFilteredMedia([]);
      } finally {
        setLoading(false);
      }
    }
    loadMedia();
  }, []);

  // =====================================================
  // 🔥 AUTO-GENERATE UNIQUE CATEGORIES (with safety check)
  // =====================================================
  const categories = [
    "all",
    ...Array.from(
      new Set((media || []).map((item) => item.category))
    ).filter(Boolean),
  ];

  // =====================================================
  // 🔥 FILTER MEDIA ON CATEGORY CHANGE
  // =====================================================
  useEffect(() => {
    if (!media || media.length === 0) {
      setFilteredMedia([]);
      return;
    }
    
    if (selectedCategory === "all") {
      setFilteredMedia(media);
    } else {
      setFilteredMedia(media.filter((m) => m.category === selectedCategory));
    }

    setCurrentPage(1);
  }, [selectedCategory, media]);

  // =====================================================
  // 🔥 PAGINATION LOGIC
  // =====================================================
  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = (filteredMedia || []).slice(
    indexOfLast - itemsPerPage,
    indexOfLast
  );
  const totalPages = Math.ceil((filteredMedia || []).length / itemsPerPage);

  // =====================================================
  // 🔥 LOADING UI
  // =====================================================
  if (loading)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-mute">
        <div className="h-14 w-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary text-lg font-medium">Loading gallery...</p>
      </div>
    );

  // =====================================================
  // 🔥 MAIN PAGE
  // =====================================================
  return (
    <div className="pt-40 max-sm:pt-28 pb-16 px-4 max-w-7xl mx-auto">
      {/* PAGE TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-5xl max-sm:text-4xl font-quicksand font-extrabold text-primary mb-2">
          Hospital Gallery
        </h1>
        <div className="w-24 h-1 bg-secondary rounded-full mx-auto"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore our advanced medical facilities, team moments, and events from
          our hospital.
        </p>
      </div>

      {/* CATEGORY FILTERS - ✅ Pass safe arrays */}
      <CategoryFilters
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        media={media || []}
      />

      {/* MEDIA GRID */}
      <div className="flex flex-wrap gap-3 justify-center mt-10">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onOpen={setSelectedMedia}
            />
          ))
        ) : (
          <div className="text-center py-12 w-full">
            <p className="text-gray-500">
              {media.length === 0 
                ? "No gallery items found." 
                : "No items found in this category."}
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                currentPage === i + 1
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-primary border border-primary hover:bg-primary/10"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* LIGHTBOX */}
      {selectedMedia && (
        <Lightbox
          media={selectedMedia}
          allMedia={filteredMedia || []}
          onClose={() => setSelectedMedia(null)}
          onNavigate={(dir) => {
            const safeMedia = filteredMedia || [];
            const index = safeMedia.findIndex(
              (m) => m.id === selectedMedia.id
            );
            if (index === -1 || safeMedia.length === 0) return;
            
            const newIndex =
              dir === "prev"
                ? (index - 1 + safeMedia.length) % safeMedia.length
                : (index + 1) % safeMedia.length;

            setSelectedMedia(safeMedia[newIndex]);
          }}
        />
      )}
    </div>
  );
}