import React from "react";

const blogs = [
  {
    title: "Hello World",
    subtitle: "This is a subtitle",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Hello World",
    subtitle: "This is a subtitle",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Hello World",
    subtitle: "This is a subtitle",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Hello World",
    subtitle: "This is a subtitle",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60",
  },
];

const BlogHighlights = () => {
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
            key={index}
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
              <button
                className="
                mt-3 text-sm text-white font-medium opacity-90 
                group-hover:opacity-100 underline underline-offset-4
                transition-opacity w-fit
              "
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogHighlights;
