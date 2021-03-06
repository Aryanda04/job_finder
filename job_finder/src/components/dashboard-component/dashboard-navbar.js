import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="relative top-0 left-0 w-full z-10 bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <a
            className="text-black text-sm uppercase hidden lg:inline-block font-semibold"
            href="/dashboard/list-job-vacancy"
          >
            Dashboard
          </a>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex"></ul>
        </div>
      </nav>
    </>
  );
}
