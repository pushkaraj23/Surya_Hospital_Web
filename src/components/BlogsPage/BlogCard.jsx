// import { useNavigate } from "react-router-dom";

// export default function BlogsCard({ article }) {
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => navigate(`/blogs/${article.id}`)}
//       className="
//         group relative rounded-2xl overflow-hidden shadow-lg
//         hover:shadow-2xl transition-all duration-500
//         hover:-translate-y-2 cursor-pointer
//       "
//     >
//       {/* Blog Image */}
//       <img
//         src={article.image}
//         alt={article.title}
//         className="
//           w-full h-[365px] object-cover 
//           transform group-hover:scale-110 
//           transition-all duration-500
//         "
      
//       />

//       {/* Overlay Gradient */}
//       <div
//         className="
//           absolute inset-0 
//           bg-gradient-to-t from-black/80 via-black/40 to-transparent
//           flex flex-col justify-end p-6
//         "
//       >
//         {/* Category */}
//         <span className="text-xs text-accent font-semibold uppercase tracking-wide">
//           {article.category}
//         </span>

//         {/* Title */}
//         <h3 className="text-white text-lg font-semibold leading-tight mt-1">
//           {article.title}
//         </h3>

//         {/* Excerpt */}
//         <p className="text-gray-300 text-sm mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: article.excerpt }}>
          
//           {/* {article.excerpt} */}
//         </p>

//         {/* Footer: Read time + Date */}
//         <div className="flex items-center gap-2 text-gray-400 text-xs mt-3">
//           <span>{article.readTime}</span>
//           <span>•</span>
//           <span>{new Date(article.createdat).toLocaleDateString()}</span>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";

export default function BlogsCard({ article }) {
  const navigate = useNavigate();

  // ✅ Safety check
  if (!article) return null;

  return (
    <div
      onClick={() => navigate(`/blogs/${article.id}`)}
      className="
        group relative rounded-2xl overflow-hidden shadow-lg
        hover:shadow-2xl transition-all duration-500
        hover:-translate-y-2 cursor-pointer h-[365px]
      "
    >
      {/* Blog Image - ✅ Already has full URL from BlogsPage */}
      {article.image ? (
        <img
          src={article.image}
          alt={article.title || "Blog"}
          className="
            w-full h-full object-cover 
            transform group-hover:scale-110 
            transition-all duration-500
          "
          onError={(e) => {
            console.error("Image failed to load:", article.image);
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}

      {/* Fallback for no image */}
      <div 
        className={`w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 items-center justify-center ${
          article.image ? "hidden" : "flex"
        }`}
      >
        <span className="text-6xl">📝</span>
      </div>

      {/* Overlay Gradient */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-t from-black/80 via-black/40 to-transparent
          flex flex-col justify-end p-6
        "
      >
        {/* Category */}
        {article.category && (
          <span className="text-xs text-accent font-semibold uppercase tracking-wide">
            {article.category}
          </span>
        )}

        {/* Title */}
        <h3 className="text-white text-lg font-semibold leading-tight mt-1 line-clamp-2">
          {article.title || "Untitled"}
        </h3>

        {/* Excerpt - Use plain text version */}
        {article.excerpt && (
          <p className="text-gray-300 text-sm mt-2 line-clamp-2">
            {article.excerpt}
          </p>
        )}

        {/* Footer: Read time + Date */}
        <div className="flex items-center gap-2 text-gray-400 text-xs mt-3">
          <span>{article.readTime || "5 min read"}</span>
          <span>•</span>
          <span>
            {article.createdat 
              ? new Date(article.createdat).toLocaleDateString() 
              : "Unknown date"}
          </span>
        </div>
      </div>
    </div>
  );
}