import React from "react";

const images = [
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=60", // doctors group
    "https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D", // doctor 2
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60", // sofa room
    "https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D", // building
    "https://plus.unsplash.com/premium_photo-1661773163380-22e1c6fba588?w=800&auto=format&fit=crop&q=60", // surgeon
    "https://images.unsplash.com/photo-1620210903582-6e3c64be0d76?w=800&auto=format&fit=crop&q=60", // operation team
];

const ImageGallery = () => {
    return (
        <div className="bg-[#f9fafb] py-12 px-6 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1️⃣ Left Large Image */}
                <div className="rounded-2xl overflow-hidden shadow-md">
                    <img
                        src={images[0]}
                        alt="Doctors group"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 2️⃣ Middle Column with Two Vertical Images */}
                <div className="flex flex-col gap-6">
                    <div className="rounded-2xl overflow-hidden shadow-md">
                        <img
                            src={images[1]}
                            alt="Doctors"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md">
                        <img
                            src={images[2]}
                            alt="Building"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* 3️⃣ Right Large Image */}
                <div className="rounded-2xl overflow-hidden shadow-md">
                    <img
                        src={images[3]}
                        alt="Room"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 4️⃣ Bottom Two Wide Images */}
                {/* <div className="col-span-3 grid grid-cols-2 gap-6">
                    <div className="rounded-2xl overflow-hidden shadow-md">
                        <img
                            src={images[4]}
                            alt="Surgery team"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md">
                        <img
                            src={images[5]}
                            alt="Doctors in surgery"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ImageGallery;
