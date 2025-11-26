export default function MediaCard({ item, onOpen }) {
  const videoId = item.type === "video" ? item.filepath.split("/").pop() : null;

  return (
    <div
      onClick={() => onOpen(item)}
      className="
        relative rounded-2xl overflow-hidden shadow-md cursor-pointer
        transition-all duration-300 hover:shadow-xl
      "
    >
      {/* IMAGE / VIDEO THUMBNAIL */}
      <div className="relative w-full h-60 max-sm:h-32">
        {item.type === "photo" ? (
          <img
            src={"http://localhost:8654/" + item.filepath}
            alt={item.title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              hover:scale-105
            "
          />
        ) : (
          <div className="relative w-full h-full">
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={item.title}
              className="
                w-full h-full object-cover 
                transition-transform duration-500
                hover:scale-110
              "
            />
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="
                  w-14 h-14 rounded-full bg-secondary 
                  flex items-center justify-center text-white
                  text-2xl shadow-xl transition-transform duration-300
                "
              >
                ▶
              </div>
            </div>
          </div>
        )}

        {/* GRADIENT OVERLAY (BOTTOM) */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* CONTENT OVERLAY */}
      <div className="absolute bottom-0 left-0 right-0 p-4 max-sm:p-2 text-white z-20">
        <h3 className="font-semibold max-sm:text-xs text-sm truncate">
          {item.title}
        </h3>

        <div className="flex flex-wrap items-center gap-1 mt-1">
          {/* Category */}
          <span
            className="
              px-2 py-0.5 text-xs rounded-full
              bg-primary/70 backdrop-blur-sm
            "
          >
            {item.category}
          </span>

          {/* Type Badge */}
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
