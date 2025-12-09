import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById } from "../../api/userApi";
import BlogsCard from "./BlogCard";
import { FiArrowLeft } from "react-icons/fi";

export default function DetailedBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        setLoading(true);
        const data = await getBlogById(id);
        setBlog(data);

        // Fetch related by category
        if (data.category) {
          const allBlogs = await getBlogById(""); // or reuse from cache
          const relatedBlogs = allBlogs
            .filter((x) => x.id !== data.id && x.category === data.category)
            .slice(0, 3);

          setRelated(relatedBlogs);
        }
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading blog...
      </div>
    );

  if (!blog)
    return <div className="p-10 text-center text-red-600">Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto pt-36 max-sm:pt-28 p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/blogs")}
        className="flex items-center text-blue-600 mb-5"
      >
        <FiArrowLeft size={22} />
        <span className="ml-2">Back to Blogs</span>
      </button>

      {/* Cover Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-xl shadow"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mt-6">{blog.title}</h1>

      {/* Meta */}
      <p className="text-gray-500 mt-2">
        {new Date(blog.createdat).toLocaleDateString()} •{" "}
        {blog.readTime || "5 min read"}
      </p>

      {/* Content */}
      <div
        className="prose max-w-full mt-6"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
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
