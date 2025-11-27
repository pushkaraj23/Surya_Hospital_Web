import { useEffect, useState } from "react";
import { getBlogs } from "../api/userApi";
import BlogsCard from "../components/BlogsPage/BlogCard";

export default function BlogsPage() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        const data = await getBlogs();

        const formatted = data.map((blog) => ({
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          image: blog.image,
          category: blog.category,
          content: blog.content || "",
          excerpt:
            blog.content?.substring(0, 150) +
              (blog.content?.length > 150 ? "..." : "") || "",
          author: blog.author,
          createdat: blog.createdat,
          readTime: calculateReadTime(blog.content),
        }));

        setArticles(formatted);
        setFilteredArticles(formatted);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    const words = content.split(" ").length;
    return `${Math.ceil(words / 200)} min read`;
  };

  // Filtering Logic
  useEffect(() => {
    let result = articles;

    if (selectedCategory !== "all") {
      result = result.filter((a) => a.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(result);
  }, [searchTerm, selectedCategory, articles]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Blogs...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto pt-28 p-4">
      <h1 className="text-4xl font-bold mb-6">Health & Wellness Blog</h1>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-10">
        <input
          type="text"
          placeholder="Search articles..."
          className="flex-1 border p-3 rounded-lg"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-3 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Topics</option>
          {[...new Set(articles.map((a) => a.category))].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredArticles.map((article) => (
          <BlogsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
