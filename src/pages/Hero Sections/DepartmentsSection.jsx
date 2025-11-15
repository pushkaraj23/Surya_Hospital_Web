import React from "react";

export default function Departments() {
    const departments = [
        { id: 1, name: "Department 1", color: "bg-amber-100" },
        {
            id: 2,
            name: "Department 2",
            color: "bg-[#FBE4C8]",
            image:
                "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
            desc: "Our patient-first approach ensures that every individual receives personalized attention in a safe, caring, and healing environment.",
        },
        { id: 3, name: "Department 3", color: "bg-[#C9D7F8]" },
        { id: 4, name: "Department 4", color: "bg-[#A7BFD8]" },
        { id: 5, name: "Department 5", color: "bg-[#FBEFC8]" },
        { id: 6, name: "Department 6", color: "bg-[#FAD9C8]" },
    ];

    return (
        <div className=" md:px-10 lg:px-8 py-12 bg-gray-50">
            {/* Header Section */}
            <div className="text-start mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Departments</h2>
                <p className="text-gray-500">
                    A glance through our wide variety of departments
                </p>
            </div>

            {/* Department Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {departments.map((dept) => (
                    <div
                        key={dept.id}
                        className={`
              ${dept.color}
              ${dept.id === 2 ? "col-span-5" : ""}
              rounded-2xl flex flex-col items-center justify-center text-center 
              shadow-[4px_0_20px_-10px_rgba(0,0,0,0.15)] relative h-[500px]
            `}
                    >
                        {/* Number Badge */}
                        <div className="absolute top-4 left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10">
                            <span className="text-xl font-bold text-gray-900">{dept.id}</span>
                        </div>

                        {/* Image card for Department 2 */}
                        {dept.image ? (
                            <div className="w-full h-full rounded-2xl overflow-hidden flex flex-col">
                                <img
                                    src={dept.image}
                                    alt={dept.name}
                                    className="h-3/5 w-full object-cover"
                                />

                                <div className="h-1/4 p-4 text-left flex flex-col justify-between">
                                    <h3 className="font-bold text-gray-800 text-base">
                                        {dept.name}
                                    </h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {dept.desc}
                                    </p>
                                </div>

                            </div>
                        ) : (
                            <h3
                                className="rotate-[-90deg] font-semibold text-gray-800 text-base"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                {dept.name}
                            </h3>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}