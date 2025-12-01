// import { useEffect, useState } from "react";
// import { getBlogs } from "../api/userApi";
// import BlogsCard from "../components/BlogsPage/BlogCard";
// import { motion } from "framer-motion";

// export default function BlogsPage() {
//   const [articles, setArticles] = useState([]);
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   useEffect(() => {
//     async function loadArticles() {
//       try {
//         setLoading(true);
//         const data = await getBlogs();

//         const formatted = data.map((blog) => ({
//           id: blog.id,
//           title: blog.title,
//           slug: blog.slug,
//           image: blog.image,
//           category: blog.category,
//           content: blog.content || "",
//           excerpt:
//             blog.content?.substring(0, 150) +
//               (blog.content?.length > 150 ? "..." : "") || "",
//           author: blog.author,
//           createdat: blog.createdat,
//           readTime: calculateReadTime(blog.content),
//         }));

//         setArticles(formatted);
//         setFilteredArticles(formatted);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadArticles();
//   }, []);

//   const calculateReadTime = (content) => {
//     if (!content) return "5 min read";
//     const words = content.split(" ").length;
//     return `${Math.ceil(words / 200)} min read`;
//   };

//   // Filtering Logic
//   useEffect(() => {
//     let result = articles;

//     if (selectedCategory !== "all") {
//       result = result.filter((a) => a.category === selectedCategory);
//     }

//     if (searchTerm) {
//       result = result.filter(
//         (a) =>
//           a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           a.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredArticles(result);
//   }, [searchTerm, selectedCategory, articles]);

//   if (loading)
//     return (
//       <motion.div
//         className="min-h-screen flex justify-center items-center text-primary text-lg"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         Loading Blogs...
//       </motion.div>
//     );

//   return (
//     <motion.div
//       className="max-w-7xl mx-auto pt-36 pb-16 p-4"
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Header */}
//       <motion.div
//         className="text-center mb-6 md:mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h1 className="text-5xl max-sm:text-4xl font-quicksand font-extrabold text-primary mb-3">
//           Health & Wellness Blog
//         </h1>
//         <div className="w-24 h-1 bg-secondary rounded-full mx-auto"></div>
//         <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
//           Trusted articles from healthcare experts — stay informed, stay
//           healthy.
//         </p>
//       </motion.div>

//       {/* Search + Filter */}
//       <motion.div
//         className="bg-white shadow-lg rounded-2xl p-6 mb-10 border"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Search Input */}
//           <input
//             type="text"
//             placeholder="Search articles..."
//             className="flex-1 border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           {/* Category Dropdown */}
//           <select
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-secondary outline-none transition"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="all">All Topics</option>
//             {[...new Set(articles.map((a) => a.category))].map((cat) => (
//               <option key={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
//       </motion.div>

//       {/* Blog Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         {filteredArticles.length === 0 && (
//           <motion.div
//             className="col-span-full text-center text-gray-500 py-20"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             No blogs found. Try another search or topic.
//           </motion.div>
//         )}

//         {filteredArticles.map((article) => (
//           <motion.div
//             key={article.id}
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-50px" }}
//             transition={{ duration: 0.4 }}
//           >
//             <BlogsCard article={article} />
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// }


import { useEffect, useState } from "react";
import { getBlogs } from "../api/userApi";
import BlogsCard from "../components/BlogsPage/BlogCard";
import { motion } from "framer-motion";

export default function BlogsPage() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Function to strip HTML tags for excerpt and search
  const stripHtmlTags = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        const data = await getBlogs();

        const formatted = data.map((blog) => {
          // Get plain text version for excerpt
          const plainTextContent = stripHtmlTags(blog.content);
          
          return {
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            image: blog.image,
            category: blog.category,
            content: blog.content || "", // Keep original HTML
            plainTextContent: plainTextContent, // Plain text for search
            excerpt: plainTextContent.substring(0, 150) + 
              (plainTextContent.length > 150 ? "..." : ""),
            author: blog.author,
            createdat: blog.createdat,
            readTime: calculateReadTime(plainTextContent),
          };
        });

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
          a.plainTextContent.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(result);
  }, [searchTerm, selectedCategory, articles]);

  if (loading)
    return (
      <motion.div
        className="min-h-screen flex justify-center items-center text-primary text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading Blogs...
      </motion.div>
    );

  return (
    <motion.div
      className="max-w-7xl mx-auto pt-36 pb-16 p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-6 md:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl max-sm:text-4xl font-quicksand font-extrabold text-primary mb-3">
          Health & Wellness Blog
        </h1>
        <div className="w-24 h-1 bg-secondary rounded-full mx-auto"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Trusted articles from healthcare experts — stay informed, stay
          healthy.
        </p>
      </motion.div>

      {/* Search + Filter */}
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 mb-10 border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search articles..."
            className="flex-1 border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category Dropdown */}
          <select
            className="p-3 border rounded-xl focus:ring-2 focus:ring-secondary outline-none transition"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Topics</option>
            {[...new Set(articles.map((a) => a.category))].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {filteredArticles.length === 0 && (
          <motion.div
            className="col-span-full text-center text-gray-500 py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No blogs found. Try another search or topic.
          </motion.div>
        )}

        {filteredArticles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <BlogsCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}