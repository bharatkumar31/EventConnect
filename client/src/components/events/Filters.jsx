import React from "react";

export default function Filters({ category = "All", onChange }) {
  const categories = [
    "All",
    "Music and Theater",
    "Tech",
    "Sports",
    "Comedy",
    "Education",
    "Business",
    "Others",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 sm:mt-8">
      <div className="flex overflow-x-auto sm:flex-wrap gap-2 sm:gap-3 justify-start sm:justify-center pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange && onChange(cat)}
            className={
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border " +
              (category === cat
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50")
            }
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
