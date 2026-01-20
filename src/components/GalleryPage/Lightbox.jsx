// export default function Lightbox({ media, onClose, onNavigate }) {
//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center 
//       bg-black/80 backdrop-blur-sm animate-fadeIn"
//     >
//       {/* Close Button */}
//       <button
//         onClick={onClose}
//         className="absolute top-6 right-6 text-white hover:text-secondary 
//         transition-all duration-300 text-3xl md:text-4xl"
//       >
//         ✕
//       </button>

//       {/* Previous */}
//       <button
//         onClick={() => onNavigate("prev")}
//         className="absolute left-4 md:left-10 text-white/80 hover:text-secondary 
//         transition-all duration-300 text-4xl md:text-5xl select-none"
//       >
//         ‹
//       </button>

//       {/* Next */}
//       <button
//         onClick={() => onNavigate("next")}
//         className="absolute right-4 md:right-10 text-white/80 hover:text-secondary 
//         transition-all duration-300 text-4xl md:text-5xl select-none"
//       >
//         ›
//       </button>

//       {/* Main Content */}
//       <div className="max-w-6xl w-full px-4 flex justify-center">
//         {media.type === "photo" ? (
//           <img
//             src={media.filepath}
//             alt={media.title}
//             className="max-h-[80vh] w-auto object-contain rounded-xl 
//             shadow-2xl border border-white/10"
//           />
//         ) : (
//           <div className="w-full max-w-4xl">
//             <iframe
//               src={media.filepath}
//               title={media.title}
//               className="w-full h-[50vh] md:h-[70vh] rounded-xl shadow-2xl border border-white/10"
//               allowFullScreen
//             ></iframe>
//           </div>
//         )}
//       </div>

//       {/* Footer Info */}
//       <div className="absolute bottom-6 text-center text-white/80 text-sm">
//         <p className="font-medium">{media.title}</p>
//       </div>
//     </div>
//   );
// }


export default function Lightbox({ media, onClose, onNavigate }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-secondary 
        transition-all duration-300 text-3xl md:text-4xl z-50"
      >
        ✕
      </button>

      {/* Previous */}
      <button
        onClick={() => onNavigate("prev")}
        className="absolute left-4 md:left-10 text-white/80 hover:text-secondary 
        transition-all duration-300 text-4xl md:text-5xl select-none z-50"
      >
        ‹
      </button>

      {/* Next */}
      <button
        onClick={() => onNavigate("next")}
        className="absolute right-4 md:right-10 text-white/80 hover:text-secondary 
        transition-all duration-300 text-4xl md:text-5xl select-none z-50"
      >
        ›
      </button>

      {/* Main Content */}
      <div className="max-w-6xl w-full px-4 flex justify-center">
        {media.type === "photo" ? (
          <img
            src={media.filepath}  // ✅ Uses filepath (already has full URL)
            alt={media.title}
            className="max-h-[80vh] w-auto object-contain rounded-xl 
            shadow-2xl border border-white/10"
            onError={(e) => {
              console.error("Image failed to load:", media.filepath);
            }}
          />
        ) : (
          <div className="w-full max-w-4xl">
            <video
              src={media.filepath}  // ✅ Uses filepath for video
              className="w-full h-[50vh] md:h-[70vh] rounded-xl shadow-2xl border border-white/10"
              controls
              autoPlay
            />
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 text-center text-white/80 text-sm">
        <p className="font-medium">{media.title}</p>
        {media.category && (
          <p className="text-xs text-white/60 mt-1">{media.category}</p>
        )}
      </div>
    </div>
  );
}