"use client";
import { refreshUser } from "@/api/clientActions/login";
import { useConfigsStore } from "@/app/providers";
import { deleteCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useConfigsStore((state) => state.user);
  const setUser = useConfigsStore((state) => state.setUser);

  useEffect(() => {
    refreshUser().then((res) => {
      setUser(res);
    });
  }, [pathname]);

  function logOut() {
    deleteCookie("swl_token");
    router.push("/login");
  }
  return (
    <header>
      {/* Top Black Section */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            SWE Lab
          </h1>
          {user !== null ? (
            <button className="text-gray-300 hover:text-white" onClick={logOut}>
              Log Out
            </button>
          ) : (
            <button className="text-gray-300 hover:text-white">Sign Up</button>
          )}
        </div>
      </div>

      {/* Bottom Gray Section */}
      <div className="bg-gray-100">
        <nav className="max-w-7xl mx-auto px-4 flex space-x-6 h-12 items-center justify-center flex-wrap">
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
