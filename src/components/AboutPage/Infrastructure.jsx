import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchInfra, fetchFacilities, getFullImageUrl } from "../../api/userApi";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Infrastructure() {
  const [stats, setStats] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup States
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ------------ Load Infra + Facilities Data ------------ */
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const infraData = await fetchInfra();
  //       const facilityData = await fetchFacilities();

  //       setStats(infraData);
  //       setFacilities(facilityData);
  //     } catch (err) {
  //       console.error("Error loading infrastructure data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadData();
  // }, []);


  useEffect(() => {
    const loadData = async () => {
      try {
        const infraData = await fetchInfra();
        const facilityData = await fetchFacilities();

        const normalizedFacilities = facilityData.map((facility) => ({
          ...facility,
          photos: facility.photos?.map((photo) =>
            getFullImageUrl(photo)
          ),
        }));

        setStats(infraData);
        setFacilities(normalizedFacilities);
      } catch (err) {
        console.error("Error loading infrastructure data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  /* ------------ Open Popup Handler ------------ */
  const openPopup = (photos, index = 0) => {
    setSelectedPhotos(photos);
    setCurrentIndex(index);
    setPopupOpen(true);
  };

  /* ------------ Arrow Navigation ------------ */
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === selectedPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? selectedPhotos.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* Popup Viewer */}
      {popupOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="relative w-full flex flex-col max-w-3xl p-6">
            {/* Close Button */}
            <button
              onClick={() => setPopupOpen(false)}
              className="ml-auto text-white text-3xl hover:scale-110 transition"
            >
              ✖
            </button>

            {/* Image Slider */}
            <div className="relative flex items-center justify-center">
              <button
                onClick={prevImage}
                className="absolute left-0 text-white text-4xl px-4 py-2 hover:bg-white/20 rounded-full"
              >
                ❮
              </button>

              <img
                src={selectedPhotos[currentIndex]}
                alt="Facility"
                className="rounded-xl shadow-xl max-h-[75vh] object-contain mx-auto"
              />

              <button
                onClick={nextImage}
                className="absolute right-0 text-white text-4xl px-4 py-2 hover:bg-white/20 rounded-full"
              >
                ❯
              </button>
            </div>

            {/* Counter */}
            <p className="text-center text-white mt-4">
              {currentIndex + 1} / {selectedPhotos.length}
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Component */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-lg"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Infrastructure
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            State-of-the-art facilities built for comprehensive healthcare
            delivery.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading infrastructure...</p>
        )}

        {/* No Data */}
        {!loading && stats.length === 0 && facilities.length === 0 && (
          <p className="text-center text-gray-500">
            No infrastructure details available.
          </p>
        )}

        {/* Stats Section */}
        {!loading && stats.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">🏥</div>
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.title}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Facilities Section */}
        {!loading && facilities.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Key Facilities
            </h3>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {facilities.map((facility) => (
                <motion.div
                  key={facility.id}
                  variants={fadeUp}
                  onClick={() => openPopup(facility.photos, 0)}
                  className="cursor-pointer bg-blue-50 p-4 rounded-xl shadow hover:bg-blue-100 transition-all"
                >
                  <h4 className="text-xl font-semibold text-blue-700 mb-1">
                    {facility.name}
                  </h4>

                  <p className="text-sm text-blue-500 mb-3">
                    {facility.category}
                  </p>

                  <div
                    className="text-gray-700 text-sm leading-relaxed mb-3"
                    dangerouslySetInnerHTML={{ __html: facility.description }}
                  ></div>

                  {/* Thumbnails */}
                  {facility.photos?.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {facility.photos.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt="Facility"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPopup(facility.photos, i);
                          }}
                          className="h-20 w-full object-cover rounded-lg shadow hover:scale-105 transition"
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </motion.div>
    </>
  );
}
