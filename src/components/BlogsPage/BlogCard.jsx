import { useNavigate } from "react-router-dom";

export default function BlogsCard({ article }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blogs/${article.id}`)}
      className="
        group relative rounded-2xl overflow-hidden shadow-lg
        hover:shadow-2xl transition-all duration-500
        hover:-translate-y-2 cursor-pointer
      "
    >
      {/* Blog Image */}
      <img
        src={article.image}
        alt={article.title}
        className="
          w-full h-[365px] object-cover 
          transform group-hover:scale-110 
          transition-all duration-500
        "
      
      />

      {/* Overlay Gradient */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-t from-black/80 via-black/40 to-transparent
          flex flex-col justify-end p-6
        "
      >
        {/* Category */}
        <span className="text-xs text-accent font-semibold uppercase tracking-wide">
          {article.category}
        </span>

        {/* Title */}
        <h3 className="text-white text-lg font-semibold leading-tight mt-1">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: article.excerpt }}>
          
          {/* {article.excerpt} */}
        </p>

        {/* Footer: Read time + Date */}
        <div className="flex items-center gap-2 text-gray-400 text-xs mt-3">
          <span>{article.readTime}</span>
          <span>•</span>
          <span>{new Date(article.createdat).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
