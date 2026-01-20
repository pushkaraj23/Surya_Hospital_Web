// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getBlogById } from "../../api/userApi";
// import BlogsCard from "./BlogCard";
// import { FiArrowLeft } from "react-icons/fi";

// export default function DetailedBlog() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [blog, setBlog] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadBlog() {
//       try {
//         setLoading(true);
//         const data = await getBlogById(id);
//         setBlog(data);

//         // Fetch related by category
//         if (data.category) {
//           const allBlogs = await getBlogById(""); // or reuse from cache
//           const relatedBlogs = allBlogs
//             .filter((x) => x.id !== data.id && x.category === data.category)
//             .slice(0, 3);

//           setRelated(relatedBlogs);
//         }
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadBlog();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         Loading blog...
//       </div>
//     );

//   if (!blog)
//     return <div className="p-10 text-center text-red-600">Blog not found</div>;

//   return (
//     <div className="max-w-4xl mx-auto pt-36 max-sm:pt-28 p-4">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate("/blogs")}
//         className="flex items-center text-blue-600 mb-5"
//       >
//         <FiArrowLeft size={22} />
//         <span className="ml-2">Back to Blogs</span>
//       </button>

//       {/* Cover Image */}
//       <img
//         src={blog.image}
//         alt={blog.title}
//         className="w-full h-80 object-cover rounded-xl shadow"
//       />

//       {/* Title */}
//       <h1 className="text-4xl font-bold mt-6">{blog.title}</h1>

//       {/* Meta */}
//       <p className="text-gray-500 mt-2">
//         {new Date(blog.createdat).toLocaleDateString()} •{" "}
//         {blog.readTime || "5 min read"}
//       </p>

//       {/* Content */}
//       <div
//         className="prose max-w-full mt-6"
//         dangerouslySetInnerHTML={{ __html: blog.content }}
//       ></div>

//       {/* Related Articles */}
//       {related.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {related.map((r) => (
//               <BlogsCard key={r.id} article={r} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, getBlogs,getFullImageUrl } from "../../api/userApi";
import BlogsCard from "./BlogCard";
import { FiArrowLeft } from "react-icons/fi";


export default function DetailedBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to strip HTML tags for excerpt
  const stripHtmlTags = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Calculate read time
  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    const plainText = stripHtmlTags(content);
    const words = plainText.split(" ").length;
    return `${Math.ceil(words / 200)} min read`;
  };

  useEffect(() => {
    async function loadBlog() {
      try {
        setLoading(true);
        setError(null);

        const data = await getBlogById(id);

        if (!data) {
          setError("Blog not found");
          return;
        }

        // ✅ Transform blog data with full image URL
        const transformedBlog = {
          ...data,
          image: getFullImageUrl(data.image), // ✅ Apply full URL
          readTime: calculateReadTime(data.content),
        };

        setBlog(transformedBlog);

        // Fetch related blogs by category
        if (data.category) {
          try {
            const allBlogs = await getBlogs();
            const blogs = Array.isArray(allBlogs) ? allBlogs : [];

            const relatedBlogs = blogs
              .filter((x) => x.id !== data.id && x.category === data.category && x.isactive !== false)
              .slice(0, 3)
              .map((blog) => {
                const plainTextContent = stripHtmlTags(blog.content);
                return {
                  id: blog.id,
                  title: blog.title || "Untitled",
                  slug: blog.slug,
                  image: getFullImageUrl(blog.image), // ✅ Apply full URL
                  category: blog.category || "General",
                  content: blog.content || "",
                  excerpt: plainTextContent.substring(0, 150) + 
                    (plainTextContent.length > 150 ? "..." : ""),
                  author: blog.author || "Unknown",
                  createdat: blog.createdat,
                  readTime: calculateReadTime(blog.content),
                };
              });

            setRelated(relatedBlogs);
          } catch (err) {
            console.error("Error loading related blogs:", err);
            setRelated([]);
          }
        }
      } catch (err) {
        console.error("Error loading blog:", err);
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadBlog();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary">Loading blog...</p>
      </div>
    );
  }

  // Error State
  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-10">
        <div className="text-5xl">😕</div>
        <p className="text-red-600 text-xl font-semibold">{error || "Blog not found"}</p>
        <button
          onClick={() => navigate("/blogs")}
          className="mt-4 flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          <FiArrowLeft size={18} />
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-36 max-sm:pt-28 p-4 pb-16">
      {/* Back Button */}
      <button
        onClick={() => navigate("/blogs")}
        className="flex items-center text-primary hover:text-primary/80 mb-5 transition"
      >
        <FiArrowLeft size={22} />
        <span className="ml-2 font-medium">Back to Blogs</span>
      </button>

      {/* Cover Image - ✅ Already has full URL */}
      <div className="relative rounded-xl overflow-hidden shadow-lg h-80 bg-gradient-to-br from-primary/10 to-secondary/10">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title || "Blog"}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Image failed to load:", blog.image);
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">📝</span>
          </div>
        )}
      </div>

      {/* Category Badge */}
      {blog.category && (
        <div className="mt-6">
          <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
            {blog.category}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mt-4 text-gray-900">
        {blog.title || "Untitled"}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-gray-500 mt-3">
        {blog.author && (
          <span className="flex items-center gap-1">
            <span>✍️</span>
            {blog.author}
          </span>
        )}
        <span>•</span>
        <span>
          {blog.createdat 
            ? new Date(blog.createdat).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }) 
            : "Unknown date"}
        </span>
        <span>•</span>
        <span>{blog.readTime || "5 min read"}</span>
      </div>

      {/* Content */}
      {blog.content ? (
        <div
          className="prose prose-lg max-w-full mt-8 
            prose-headings:text-gray-900 
            prose-p:text-gray-700 
            prose-a:text-primary 
            prose-strong:text-gray-900
            prose-blockquote:border-l-primary
            prose-blockquote:bg-primary/5
            prose-blockquote:py-2
            prose-blockquote:px-4
            prose-blockquote:rounded-r-lg
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      ) : (
        <p className="text-gray-500 mt-8">No content available.</p>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <BlogsCard key={r.id} article={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}