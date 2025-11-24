import { useState, useEffect } from "react";
import { fetchDepartments } from "../../api/userApi";

export default function Departments() {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch departments data
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setLoading(true);
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (err) {
        console.error("Failed to load departments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, []);

  // Detect screen size for mobile vs desktop behavior
  useEffect(() => {
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

  // Color palette for departments (maintaining your original colors)
  const colorPalette = [
    "bg-amber-100",
    "bg-[#FBE4C8]",
    "bg-[#C9D7F8]",
    "bg-[#A7BFD8]",
    "bg-[#FBEFC8]",
    "bg-[#FAD9C8]",
  ];

  if (loading) {
    return (
      <div className="px-5 py-12 bg-gray-50 relative">
        <div className="text-start mb-8">
          <h2 className="text-3xl font-bold font-quicksand text-gray-800">
            Departments
          </h2>
          <p className="text-gray-500">Loading departments...</p>
        </div>
        <div className="flex gap-4 w-full overflow-x-scroll scrollbar-hide pb-2 pr-20">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="rounded-2xl relative shadow-md bg-gray-200 animate-pulse h-[62vh] max-sm:h-[50vh] w-[22vw] md:w-[15vw] flex-shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-5 py-12 bg-gray-50 relative">
        <div className="text-start mb-8">
          <h2 className="text-3xl font-bold font-quicksand text-gray-800">
            Departments
          </h2>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!departments || departments.length === 0) {
    return (
      <div className="px-5 py-12 bg-gray-50 relative">
        <div className="text-start mb-8">
          <h2 className="text-3xl font-bold font-quicksand text-gray-800">
            Departments
          </h2>
          <p className="text-gray-500">No departments found</p>
        </div>
      </div>
    );
  }

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
        {departments.map((dept, index) => {
          const expanded = active === dept.id;
          const colorIndex = index % colorPalette.length;
          const departmentColor = colorPalette[colorIndex];

          return (
            <div
              key={dept.id}
              onMouseEnter={() => !isMobile && handleInteraction(dept.id)}
              onMouseLeave={() => !isMobile && setActive(null)}
              onClick={() => isMobile && handleInteraction(dept.id)}
              className={`
                ${departmentColor}
                rounded-2xl relative shadow-md transition-all duration-500 
                cursor-pointer h-[62vh] max-sm:h-[50vh] flex-shrink-0

                ${expanded
                  ? "w-[500px] max-sm:w-[80vw]"
                  : "w-[22vw] md:w-[15vw]"
                }
              `}
            >
              {/* Number Badge */}
              <div className="absolute top-4 left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10">
                <span className="text-xl font-quicksand font-bold text-gray-900">
                  {index + 1}
                </span>
              </div>

              {/* Expanded Content */}
              {expanded && dept.bannerimage ? (
                <div className="w-full h-full rounded-2xl overflow-hidden flex flex-col">
                  <img
                    src={dept.bannerimage}
                    alt={dept.name}
                    className="h-3/5 w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-bold font-quicksand text-gray-800 text-lg">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {dept.description}
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