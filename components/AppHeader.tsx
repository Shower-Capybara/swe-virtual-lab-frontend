// components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      {/* Top Black Section */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <h1 className="text-xl font-bold">SWE Lab</h1>
          <button className="text-gray-300 hover:text-white">Log Out</button>
        </div>
      </div>

      {/* Bottom Gray Section */}
      <div className="bg-gray-100">
        <nav className="max-w-7xl mx-auto px-4 flex space-x-6 h-12 items-center justify-center">
          {[
            {
              title: "Requirement analysis",
            },
            {
              title: "Design",
            },
            {
              title: "Modeling",
            },
            {
              title: "Development",
            },
            {
              title: "Testing",
            },
            {
              title: "Statistics",
              link: "/",
            },
          ].map((item) => (
            <a
              key={item.title}
              href={item.link ? item.link : "#"}
              className={`${
                item.link
                  ? "text-gray-700 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              } hover:text-black text-sm font-medium`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
