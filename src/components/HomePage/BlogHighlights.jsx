import React from "react";

const blogs = [
    {
        title: "Hello World",
        subtitle: "This is a subtitle",
        image:
            "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        title: "Hello World",
        subtitle: "This is a subtitle",
        image:
            "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        title: "Hello World",
        subtitle: "This is a subtitle",
        image:
            "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        title: "Hello World",
        subtitle: "This is a subtitle",
        image:
            "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D",
    },
];

const BlogHighlights = () => {
    return (
        <div className="bg-[#f9fafb] py-12 px-6 md:px-6">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                    Blog Highlights
                </h2>
                <p className="text-gray-500 text-base mt-1">
                    Professionals at Work lorem ipsum
                </p>
            </div>

            {/* Blog Cards */}
            <div className="flex flex-wrap justify-center gap-6">
                {blogs.map((blog, index) => (
                    <div
                        key={index}
                        className="relative w-[350px] h-[320px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
                            <h3 className="text-white text-lg font-semibold">
                                {blog.title}
                            </h3>
                            <p className="text-gray-200 text-sm">{blog.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogHighlights;
