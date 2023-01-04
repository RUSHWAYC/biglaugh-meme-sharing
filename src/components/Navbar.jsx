import React from "react";
import { Link, NavLink } from "react-router-dom";
import pageNames from "../data/pageNames";

const Navbar = () => {
  const activeStyle = "bg-stone-600 text-white px-3 py-2 text-lg font-medium";
  const inactiveStyle =
    "text-gray-300 hover:bg-stone-400 hover:text-white px-3 py-2 text-lg font-small";

  return (
    <nav className="bg-stone-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-12 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center text-white text-xl">
              <Link to="/">BigLaugh</Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <ul>
                  {pageNames.slice(0, 3).map((page) => (
                    <NavLink
                      key={page.id}
                      to={page.url}
                      className={({ isActive }) =>
                        isActive ? activeStyle : inactiveStyle
                      }
                    >
                      {page.name}
                    </NavLink>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ul>
              <button className="bg-gray-700 hover:bg-gray-500 text-white font-medium ml-5 py-1 px-2 rounded">
                <Link to="login">LOGIN</Link>
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium ml-5 py-1 px-2 rounded">
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
