import { useState, useEffect } from "react";
import MediaCard from "../components/GalleryPage/MediaCard";
import Lightbox from "../components/GalleryPage/Lightbox";
import CategoryFilters from "../components/GalleryPage/CategoryFilters";

export default function GalleryPage() {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Load Media
  useEffect(() => {
    import("../components/GalleryPage/sampleMedia.json").then((res) => {
      setTimeout(() => {
        setMedia(res.default);
        setFilteredMedia(res.default);
        setLoading(false);
      }, 1000);
    });
  }, []);

  // Filter Media
  useEffect(() => {
    if (selectedCategory === "all") setFilteredMedia(media);
    else setFilteredMedia(media.filter((m) => m.category === selectedCategory));

    setCurrentPage(1);
  }, [selectedCategory, media]);

  // Pagination Logic
  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filteredMedia.slice(
    indexOfLast - itemsPerPage,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);

  const categories = [
    "all",
    "facilities",
    "doctors",
    "events",
    "procedures",
    "research",
  ];

  if (loading)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-mute">
        <div className="h-14 w-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary text-lg font-medium">Loading gallery...</p>
      </div>
    );

  return (
    <div className="pt-36 max-sm:pt-28 pb-16 px-4 max-w-7xl mx-auto">
      {/* PAGE TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-primary mb-2">
          Hospital Gallery
        </h1>
        <div className="w-24 h-1 bg-secondary rounded-full mx-auto"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore our advanced medical facilities, team moments, and events from
          our hospital.
        </p>
      </div>

      {/* CATEGORY FILTERS */}
      <CategoryFilters
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        media={media}
      />

      {/* MEDIA GRID */}
      <div className="flex flex-wrap gap-3 justify-center mt-10">
        {currentItems.map((item) => (
          <MediaCard key={item.id} item={item} onOpen={setSelectedMedia} />
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${currentPage === i + 1
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
          allMedia={filteredMedia}
          onClose={() => setSelectedMedia(null)}
          onNavigate={(dir) => {
            const index = filteredMedia.findIndex(
              (m) => m.id === selectedMedia.id
            );
            const newIndex =
              dir === "prev"
                ? (index - 1 + filteredMedia.length) % filteredMedia.length
                : (index + 1) % filteredMedia.length;

            setSelectedMedia(filteredMedia[newIndex]);
          }}
        />
      )}
    </div>
  );
}