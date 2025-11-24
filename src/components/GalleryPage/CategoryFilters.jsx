export default function CategoryFilters({
  categories,
  selected,
  onSelect,
  media,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {categories.map((cat) => {
        const count =
          cat === "all"
            ? media.length
            : media.filter((m) => m.category === cat).length;

        const isActive = selected === cat;

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
              transition-all duration-300 shadow-sm hover:shadow-md 
              ${
                isActive
                  ? "bg-primary text-white shadow-md scale-[1.03]"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-primary/10 hover:text-primary"
              }
            `}
          >
            {/* Category Name */}
            <span>{cat.toUpperCase()}</span>

            {/* Count Badge */}
            <span
              className={`
                px-2 py-0.5 rounded-full text-xs font-semibold 
                transition-all duration-300
                ${
                  isActive
                    ? "bg-secondary text-white"
                    : "bg-gray-200 text-gray-600 group-hover:bg-primary/20 group-hover:text-primary"
                }
              `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
