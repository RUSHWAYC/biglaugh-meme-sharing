import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navClasses =
    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-lg font-small";

  const activeStyle =
    "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
  const inactiveStyle =
    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-lg font-small";

  return (
    <nav className="bg-slate-900">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-12 items-center justify-between">
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center text-white text-xl">
              <Link to="/">BigLaugh</Link>
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <ul>
                  <Link to="/" className={navClasses}>
                    Front
                  </Link>
                  <Link to="rising" className={navClasses}>
                    Rising
                  </Link>
                  <Link to="register" className={navClasses}>
                    Fresh
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ul>
              <button class="bg-gray-700 hover:bg-gray-500 text-white font-medium ml-5 py-1 px-2 rounded">
                <Link to="login">LOGIN</Link>
              </button>
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium ml-5 py-1 px-2 rounded">
                <Link to="register">REGISTER</Link>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
