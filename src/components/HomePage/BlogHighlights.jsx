// import React from "react";

// const blogs = [
//   {
//     title: "Hello World",
//     subtitle: "This is a subtitle",
//     image:
//       "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
//   },
//   {
//     title: "Hello World",
//     subtitle: "This is a subtitle",
//     image:
//       "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
//   },
//   {
//     title: "Hello World",
//     subtitle: "This is a subtitle",
//     image:
//       "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
//   },
//   {
//     title: "Hello World",
//     subtitle: "This is a subtitle",
//     image:
//       "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
//   },
// ];

// const BlogHighlights = () => {
//   return (
//     <section className="bg-[#f9fafb] py-16 px-5">
//       {/* Header */}
//       <div className="mb-10">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-quicksand">
//           Blog Highlights
//         </h2>
//         <p className="text-gray-500 text-base mt-1">
//           Stay updated with expert insights & healthcare stories
//         </p>
//       </div>

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
//           <div
//             key={index}
//             className="
//               group relative rounded-2xl overflow-hidden shadow-lg
//               hover:shadow-2xl transition-all duration-500
//               hover:-translate-y-2 cursor-pointer
//             "
//           >
//             {/* Blog Image */}
//             <img
//               src={blog.image}
//               alt={blog.title}
//               className="w-full h-[365px] object-cover transform group-hover:scale-110 transition-all duration-500"
//             />

//             {/* Overlay Gradient */}
//             <div
//               className="
//               absolute inset-0 
//               bg-gradient-to-t from-black/70 via-black/40 to-transparent
//               flex flex-col justify-end p-6
//             "
//             >
//               <h3 className="text-white text-xl font-semibold leading-tight">
//                 {blog.title}
//               </h3>

//               <p className="text-gray-300 text-sm mt-1">{blog.subtitle}</p>

//               {/* Read More CTA */}
//               <button
//                 className="
//                 mt-3 text-sm text-white font-medium opacity-90 
//                 group-hover:opacity-100 underline underline-offset-4
//                 transition-opacity w-fit
//               "
//               >
//                 Read More →
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BlogHighlights;



import React, { useState, useEffect } from "react";
import { getBlogs } from "../../api/userApi"; // Adjust import path

const BlogHighlights = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs data from API
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();
        console.log("📋 Blog highlights data loaded:", data);
        
        // Transform API data to match component structure
        const transformedBlogs = data.map(blog => ({
          title: blog.title || "Blog Title",
          subtitle: blog.content ? 
            blog.content.substring(0, 80) + (blog.content.length > 80 ? '...' : '') : 
            "Stay updated with the latest insights",
          image: blog.image || "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
          id: blog.id,
          category: blog.category,
          author: blog.author
        }));

        setBlogs(transformedBlogs);
        setError(null);
      } catch (err) {
        console.error("❌ Error loading blog highlights:", err);
        setError(err.message);
        // Fallback to sample data if API fails
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="bg-[#f9fafb] py-16 px-5">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-quicksand">
            Blog Highlights
          </h2>
          <p className="text-gray-500 text-base mt-1">
            Stay updated with expert insights & healthcare stories
          </p>
        </div>

        {/* Loading Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="group relative rounded-2xl overflow-hidden shadow-lg animate-pulse"
            >
              {/* Loading Image */}
              <div className="w-full h-[365px] bg-gray-300" />
              
              {/* Loading Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="h-6 bg-gray-400 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                <div className="h-4 bg-gray-400 rounded w-1/3 mt-3"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f9fafb] py-16 px-5">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-quicksand">
          Blog Highlights
        </h2>
        <p className="text-gray-500 text-base mt-1">
          Stay updated with expert insights & healthcare stories
        </p>
        {error && (
          <p className="text-yellow-600 text-sm mt-2">
            Using cached data: {error}
          </p>
        )}
      </div>

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
          <div
            key={blog.id || index}
            className="
              group relative rounded-2xl overflow-hidden shadow-lg
              hover:shadow-2xl transition-all duration-500
              hover:-translate-y-2 cursor-pointer
            "
          >
            {/* Blog Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[365px] object-cover transform group-hover:scale-110 transition-all duration-500"
            
            />

            {/* Overlay Gradient */}
            <div
              className="
              absolute inset-0 
              bg-gradient-to-t from-black/70 via-black/40 to-transparent
              flex flex-col justify-end p-6
            "
            >
              <h3 className="text-white text-xl font-semibold leading-tight">
                {blog.title}
              </h3>

              <p className="text-gray-300 text-sm mt-1">{blog.subtitle}</p>

              {/* Read More CTA */}
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogHighlights;