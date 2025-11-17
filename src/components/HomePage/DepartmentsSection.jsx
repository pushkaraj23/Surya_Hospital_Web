import React, { useState } from "react";

export default function Departments() {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // Detect screen size for mobile vs desktop behavior
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInteraction = (id) => {
    if (isMobile) {
      // On mobile → Toggle expand/collapse on tap
      setActive((prev) => (prev === id ? null : id));
    } else {
      // On desktop → Expand on hover
      setActive(id);
    }
  };

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
    <div className="px-5 py-12 bg-gray-50 relative">
      {/* Header */}
      <div className="text-start mb-8">
        <h2 className="text-3xl font-bold font-quicksand text-gray-800">
          Departments
        </h2>
        <p className="text-gray-500">
          A glance through our wide variety of departments
        </p>
      </div>

      {/* Right side fade overlay */}
      <div className="h-full absolute right-0 bottom-0 z-10 w-28 max-sm:w-12 bg-gradient-to-r from-mute/0 via-mute to-mute" />

      {/* Horizontal Accordion */}
      <div className="flex gap-4 w-full overflow-x-scroll scrollbar-hide pb-2 pr-20">
        {departments.map((dept) => {
          const expanded = active === dept.id;

          return (
            <div
              key={dept.id}
              onMouseEnter={() => !isMobile && handleInteraction(dept.id)}
              onMouseLeave={() => !isMobile && setActive(null)}
              onClick={() => isMobile && handleInteraction(dept.id)}
              className={`
                ${dept.color}
                rounded-2xl relative shadow-md transition-all duration-500 
                cursor-pointer h-[62vh] max-sm:h-[50vh] flex-shrink-0

                ${
                  expanded
                    ? "w-[500px] max-sm:w-[80vw]"
                    : "w-[22vw] md:w-[15vw]"
                }
              `}
            >
              {/* Number Badge */}
              <div className="absolute top-4 left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10">
                <span className="text-xl font-quicksand font-bold text-gray-900">
                  {dept.id}
                </span>
              </div>

              {/* Expanded Content */}
              {expanded && dept.image ? (
                <div className="w-full h-full rounded-2xl overflow-hidden flex flex-col">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="h-3/5 w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-bold font-quicksand text-gray-800 text-lg">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {dept.desc}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <h3
                    className="font-semibold font-quicksand text-gray-800 max-sm:text-2xl text-3xl rotate-[-90deg]"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {dept.name}
                  </h3>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
