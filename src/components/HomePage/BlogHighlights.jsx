// import { useState, useEffect } from "react";
// import { getBlogs } from "../../api/userApi";
// import BlogsCard from "../BlogsPage/BlogCard";
// import { motion } from "framer-motion";

// const BlogHighlights = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch blogs
//   useEffect(() => {
//     const loadBlogs = async () => {
//       try {
//         setLoading(true);
//         const data = await getBlogs();

//         const transformedBlogs = data.map((blog) => ({
//           id: blog.id,
//           title: blog.title || "Blog Title",
//           subtitle:
//             blog.content?.substring(0, 80) +
//               (blog.content?.length > 80 ? "..." : "") ||
//             "Stay updated with the latest insights",
//           image:
//             blog.image ||
//             "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
//           category: blog.category,
//           excerpt:
//             blog.content?.substring(0, 120) +
//               (blog.content?.length > 120 ? "..." : "") || "",
//           readTime: calculateReadTime(blog.content),
//           createdat: blog.createdat,
//         }));

//         setBlogs(transformedBlogs);
//         setError(null);
//       } catch (err) {
//         console.error("❌ Error loading blog highlights:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadBlogs();
//   }, []);

//   const calculateReadTime = (content) => {
//     if (!content) return "5 min read";
//     return `${Math.ceil(content.split(" ").length / 200)} min read`;
//   };

//   /* ---------------- Animation Variants ---------------- */
//   const fadeUp = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.95, y: 40 },
//     visible: (i) => ({
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.15,
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     }),
//   };

//   /* ---------------- SKELETON LOADER ---------------- */
//   if (loading) {
//     return (
//       <motion.section
//         initial="hidden"
//         animate="visible"
//         variants={fadeUp}
//         transition={{ duration: 0.8 }}
//         className="bg-[#f9fafb] py-16 px-5"
//       >
//         <div className="mb-10">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
//             Blog Highlights
//           </h2>
//           <p className="text-gray-500 text-base mt-1">
//             Stay updated with expert insights & healthcare stories
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//           {[1, 2, 3, 4].map((item) => (
//             <div
//               key={item}
//               className="group relative rounded-2xl overflow-hidden shadow-lg animate-pulse"
//             >
//               <div className="w-full h-[365px] bg-gray-300" />
//             </div>
//           ))}
//         </div>
//       </motion.section>
//     );
//   }

//   /* ---------------- MAIN SECTION ---------------- */
//   return (
//     <motion.section
//       initial="hidden"
//       whileInView="visible"
//       variants={fadeUp}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.8 }}
//       className="bg-[#f9fafb] py-16 px-5"
//     >
//       {/* Header */}
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//         className="mb-10"
//       >
//         {/* Header */}
//         <div className="text-start mb-8">
//           <h2 className="text-4xl font-bold font-quicksand text-gray-800">
//             Blogs
//           </h2>
//           <div className="h-1.5 rounded bg-secondary w-16 mt-1.5 mb-3" />
//           <p className="text-gray-500">
//             Stay Updated with Health Insights & Expert Stories
//           </p>
//         </div>
//         {error && (
//           <p className="text-yellow-600 text-sm mt-2">
//             Using cached data: {error}
//           </p>
//         )}
//       </motion.div>

//       {/* Blog Cards Grid */}
//       <div
//         className="
//         grid 
//         grid-cols-1 
//         sm:grid-cols-2 
//         lg:grid-cols-3 
//         xl:grid-cols-4 
//         gap-5
//       "
//       >
//         {blogs.map((blog, index) => (
//           <motion.div
//             key={blog.id || index}
//             custom={index}
//             initial="hidden"
//             whileInView="visible"
//             variants={cardVariants}
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             <BlogsCard article={blog} />
//           </motion.div>
//         ))}
//       </div>
//     </motion.section>
//   );
// };

// export default BlogHighlights;


import { useState, useEffect } from "react";
import { getBlogs, getFullImageUrl } from "../../api/userApi"; // ✅ Import getFullImageUrl
import BlogsCard from "../BlogsPage/BlogCard";
import { motion } from "framer-motion";

const BlogHighlights = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();

        const transformedBlogs = data.map((blog) => ({
          id: blog.id,
          title: blog.title || "Blog Title",
          subtitle:
            blog.content?.substring(0, 80) +
              (blog.content?.length > 80 ? "..." : "") ||
            "Stay updated with the latest insights",
          // ✅ Use getFullImageUrl to attach Base URL
          image: blog.image 
            ? getFullImageUrl(blog.image)
            : "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
          category: blog.category,
          excerpt:
            blog.content?.substring(0, 120) +
              (blog.content?.length > 120 ? "..." : "") || "",
          readTime: calculateReadTime(blog.content),
          createdat: blog.createdat,
        }));

        setBlogs(transformedBlogs);
        setError(null);
      } catch (err) {
        console.error("❌ Error loading blog highlights:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    return `${Math.ceil(content.split(" ").length / 200)} min read`;
  };

  /* ---------------- Animation Variants ---------------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  /* ---------------- SKELETON LOADER ---------------- */
  if (loading) {
    return (
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="bg-[#f9fafb] py-16 px-5"
      >
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Blog Highlights
          </h2>
          <p className="text-gray-500 text-base mt-1">
            Stay updated with expert insights & healthcare stories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="group relative rounded-2xl overflow-hidden shadow-lg animate-pulse"
            >
              <div className="w-full h-[365px] bg-gray-300" />
            </div>
          ))}
        </div>
      </motion.section>
    );
  }

  /* ---------------- MAIN SECTION ---------------- */
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={fadeUp}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f9fafb] py-16 px-5"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        {/* Header */}
        <div className="text-start mb-8">
          <h2 className="text-4xl font-bold font-quicksand text-gray-800">
            Blogs
          </h2>
          <div className="h-1.5 rounded bg-secondary w-16 mt-1.5 mb-3" />
          <p className="text-gray-500">
            Stay Updated with Health Insights & Expert Stories
          </p>
        </div>
        {error && (
          <p className="text-yellow-600 text-sm mt-2">
            Using cached data: {error}
          </p>
        )}
      </motion.div>

      {/* Blog Cards Grid */}
      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        gap-5
      "
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id || index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true, amount: 0.3 }}
          >
            <BlogsCard article={blog} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default BlogHighlights;