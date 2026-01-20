// export default function MediaCard({ item, onOpen }) {
//   return (
//     <div
//       onClick={() => onOpen(item)}
//       className="
//         relative rounded-2xl overflow-hidden shadow-md cursor-pointer
//         transition-all duration-300 hover:shadow-xl
//       "
//     >
//       {/* IMAGE / VIDEO THUMBNAIL */}
//       <div className="relative w-full h-60 max-sm:h-40">
//         {item.type === "photo" ? (
//           <img
//             src={item.filepath}
//             alt={item.title}
//             className="
//               w-full h-full object-cover
//               transition-transform duration-500
//               hover:scale-105
//             "
//           />
//         ) : (
//           <video
//             src={item.filepath}
//             className="
//               w-full h-full object-cover
//               transition-transform duration-500
//               hover:scale-105
//             "
//             muted
//           />
//         )}

//         {/* GRADIENT OVERLAY (BOTTOM) */}
//         <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
//       </div>

//       {/* CONTENT OVERLAY */}
//       <div className="absolute bottom-0 left-0 right-0 p-4 max-sm:p-2 text-white z-20">
//         <div className="flex flex-wrap items-center gap-1 mt-1">
//           <span
//             className={`
//               px-2 py-0.5 text-xs rounded-full
//               ${
//                 item.type === "photo"
//                   ? "bg-green-600/70 backdrop-blur-sm"
//                   : "bg-red-600/70 backdrop-blur-sm"
//               }
//             `}
//           >
//             {item.type}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function MediaCard({ item, onOpen }) {
  return (
    <div
      onClick={() => onOpen(item)}
      className="
        relative rounded-2xl overflow-hidden shadow-md cursor-pointer
        transition-all duration-300 hover:shadow-xl
        w-72 max-sm:w-full
      "
    >
      {/* IMAGE / VIDEO THUMBNAIL */}
      <div className="relative w-full h-60 max-sm:h-40">
        {item.type === "photo" ? (
          <img
            src={item.filepath}  // ✅ Uses filepath (already has full URL from GalleryPage)
            alt={item.title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              hover:scale-105
            "
            onError={(e) => {
              console.error("Image failed to load:", item.filepath);
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%239ca3af'%3E?%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          <video
            src={item.filepath}  // ✅ Uses filepath
            className="
              w-full h-full object-cover
              transition-transform duration-500
              hover:scale-105
            "
            muted
          />
        )}

        {/* GRADIENT OVERLAY (BOTTOM) */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* CONTENT OVERLAY */}
      <div className="absolute bottom-0 left-0 right-0 p-4 max-sm:p-2 text-white z-20">
        <div className="flex flex-wrap items-center gap-1 mt-1">
          <span
            className={`
              px-2 py-0.5 text-xs rounded-full
              ${
                item.type === "photo"
                  ? "bg-green-600/70 backdrop-blur-sm"
                  : "bg-red-600/70 backdrop-blur-sm"
              }
            `}
          >
            {item.type}
          </span>
        </div>
      </div>
    </div>
  );
}