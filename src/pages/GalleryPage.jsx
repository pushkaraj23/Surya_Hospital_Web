// GalleryPage.jsx
import React, { useState, useEffect } from 'react';

const GalleryPage = () => {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sample media data
  useEffect(() => {
    const sampleMedia = [
      {
        id: 1,
        title: "Modern Operation Theater",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1516549655669-dfbf4e8e11c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "facilities",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 2,
        title: "Medical Team Conference",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "doctors",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 3,
        title: "Health Camp 2024",
        type: "video",
        filepath: "https://www.youtube.com/embed/6ACl8s_tB9E",
        category: "events",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 4,
        title: "Emergency Department",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "facilities",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 5,
        title: "Pediatric Ward",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "facilities",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 6,
        title: "Surgery Procedure",
        type: "video",
        filepath: "https://www.youtube.com/embed/7Ukp2g3fOtY",
        category: "procedures",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 7,
        title: "Doctor Consultation",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "doctors",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 8,
        title: "MRI Center",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1579154204601-015d927e3fd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "facilities",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 9,
        title: "Annual Health Checkup",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
        category: "events",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 10,
        title: "Cardiac Surgery",
        type: "video",
        filepath: "https://www.youtube.com/embed/5FdLgJNnMsQ",
        category: "procedures",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 11,
        title: "Neonatal ICU",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1584302179602-e4819bb92daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "facilities",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 12,
        title: "Medical Research",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "research",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 13,
        title: "Physiotherapy Session",
        type: "video",
        filepath: "https://www.youtube.com/embed/4B5aPSPzG8w",
        category: "procedures",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 14,
        title: "Hospital Reception",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80",
        category: "facilities",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      },
      {
        id: 15,
        title: "Medical Equipment",
        type: "photo",
        filepath: "https://images.unsplash.com/photo-1585435557343-3b092031d5ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "facilities",
        isactive: true,
        createdat: "2025-11-11T18:30:00.000Z"
      }
    ];

    // Simulate API loading
    setTimeout(() => {
      setMedia(sampleMedia);
      setFilteredMedia(sampleMedia);
      setLoading(false);
    }, 1500);
  }, []);

  // Filter media by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredMedia(media);
    } else {
      setFilteredMedia(media.filter(item => item.category === selectedCategory));
    }
    setCurrentPage(1); // Reset to first page when filter changes
  }, [selectedCategory, media]);

  // Categories
  const categories = [
    { id: 'all', name: 'All Media', count: media.length },
    { id: 'facilities', name: 'Facilities', count: media.filter(m => m.category === 'facilities').length },
    { id: 'doctors', name: 'Doctors', count: media.filter(m => m.category === 'doctors').length },
    { id: 'events', name: 'Events', count: media.filter(m => m.category === 'events').length },
    { id: 'procedures', name: 'Procedures', count: media.filter(m => m.category === 'procedures').length },
    { id: 'research', name: 'Research', count: media.filter(m => m.category === 'research').length }
  ];

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedia.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle lightbox
  const openLightbox = (mediaItem) => {
    setSelectedMedia(mediaItem);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  // Navigate lightbox
  const navigateLightbox = (direction) => {
    const currentIndex = filteredMedia.findIndex(item => item.id === selectedMedia.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredMedia.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredMedia.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedMedia(filteredMedia[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedMedia) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 py-5 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hospital Gallery</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our state-of-the-art facilities, meet our expert medical team, 
              and get a glimpse of life at our healthcare center.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-start gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 max-sm:px-3 max-sm:py-1 max-sm:text-sm rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow'
                }`}
              >
                {category.name} 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="mb-8">
          {currentItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No media found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          ) : (
            <>
              {/* Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentItems.map(item => (
                  <MediaCard 
                    key={item.id} 
                    item={item} 
                    onOpen={openLightbox}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Videos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {media
              .filter(item => item.type === 'video')
              .slice(0, 4)
              .map(video => (
                <div key={video.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={video.filepath}
                      title={video.title}
                      className="w-full h-64"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold">{video.title}</h3>
                    <span className="inline-block mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded-full">
                      Video
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <Lightbox 
          media={selectedMedia} 
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
          totalItems={filteredMedia.length}
          currentIndex={filteredMedia.findIndex(item => item.id === selectedMedia.id) + 1}
        />
      )}
    </div>
  );
};

/* ----------------------------------------------------------
   MEDIA CARD COMPONENT
---------------------------------------------------------- */
const MediaCard = ({ item, onOpen }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
      onClick={() => onOpen(item)}
    >
      <div className="relative overflow-hidden">
        {item.type === 'photo' ? (
          <img
            src={item.filepath}
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="relative">
            <img
              src={`https://img.youtube.com/vi/${item.filepath.split('/').pop()}/hqdefault.jpg`}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m0 0l3-3m-3 3L7 13" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
            {item.category}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.type === 'photo' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {item.type}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------
   LIGHTBOX COMPONENT
---------------------------------------------------------- */
const Lightbox = ({ media, onClose, onNavigate, totalItems, currentIndex }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={() => onNavigate('prev')}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => onNavigate('next')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Media Content */}
      <div className="max-w-6xl max-h-full w-full flex flex-col items-center">
        {media.type === 'photo' ? (
          <img
            src={media.filepath}
            alt={media.title}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        ) : (
          <div className="w-full max-w-4xl">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={media.filepath}
                title={media.title}
                className="w-full h-96 lg:h-[500px] rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        
        {/* Media Info */}
        <div className="mt-4 text-center text-white max-w-2xl">
          <h3 className="text-xl font-semibold mb-2">{media.title}</h3>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-300">
            <span className="capitalize">{media.category}</span>
            <span>•</span>
            <span>{media.type}</span>
            <span>•</span>
            <span>{currentIndex} of {totalItems}</span>
          </div>
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm text-center opacity-70">
        Use ← → arrow keys to navigate • ESC to close
      </div>
    </div>
  );
};

export default GalleryPage;