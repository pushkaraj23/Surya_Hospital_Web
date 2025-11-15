import React from "react";

const AboutUs = () => {
    return (
        <div className="w-full bg-[#F4F7FC] min-h-screen mt-20 py-16 flex justify-center">

            {/* MAIN CONTAINER */}
            <div className="max-w-9xl w-full px-6">

                {/* Page Title */}
                <h1 className="text-4xl font-bold text-start text-[#1A3A6B] mb-12">
                    About Us
                </h1>

                {/* TWO COLUMN LAYOUT */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* ===== COLUMN 1 ===== */}
                    <div className="flex flex-col gap-6">

                        {/* Top: Introduction */}
                        <div className="bg-[#edce8b] p-6 rounded-3xl shadow-sm h-[250px] md:h-[300px]">
                            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
                            <p className="text-gray-700 leading-relaxed overflow-auto">
                                Welcome to [Hospital Name], where compassionate care meets medical excellence.
                                Our mission is to provide high-quality healthcare for everyone.
                                Founded in [Year], [Hospital Name] has grown into a modern medical center
                                with advanced facilities and compassionate care for all patients.
                            </p>
                        </div>

                        {/* Bottom: Image */}
                        <div className="rounded-3xl overflow-hidden shadow-md h-[500px] md:h-[550px]">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1749188018713-8c3595f8be31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBydG1lbnQlMjBob3NwaXRhbHxlbnwwfHwwfHx8MA%3D%3D"
                                alt="Hospital Bed"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* ===== COLUMN 2 ===== */}
                    <div className="flex flex-col gap-6">

                        {/* Top: Image */}
                        <div className="rounded-3xl overflow-hidden shadow-md h-[500px] md:h-[550px]">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1749188018713-8c3595f8be31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBydG1lbnQlMjBob3NwaXRhbHxlbnwwfHwwfHx8MA%3D%3D"
                                alt="Hospital Building"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Bottom: Introduction */}
                        <div className="bg-[#cae1f9] p-6 rounded-3xl shadow-sm h-[250px] md:h-[300px]">
                            <h2 className="text-2xl font-semibold mb-3">Our History</h2>
                            <p className="text-gray-700 leading-relaxed overflow-auto">
                                Founded in [Year], [Hospital Name] has grown into a modern medical center
                                with advanced facilities and compassionate care for all patients.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUs;
