import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

import pageNames from "../data/pageNames";
import UserDropdown from "./UserDropdown";
import LoginButton from "./LoginButton";
import { fetchUser } from "../utils/fetchUser";
import { userQuery } from "../utils/data";
import { client } from "../client";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const activeStyle =
    "bg-stone-600 text-white px-3 py-2 text-lg font-medium capitalize";
  const inactiveStyle =
    "text-gray-300 hover:bg-stone-400 hover:text-white px-3 py-2 text-lg font-small capitalize";

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //Get user data and match it with Google sub.
  useEffect(() => {
    const userInfo = fetchUser();
    const query = userQuery(userInfo?.sub);
    //Set the user that is logged in.
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <nav className="bg-stone-800 sticky top-0 z-50">
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
          <div className="flex justify-start items-center w-full px-2 ml-5 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
            {/* Search icon from react-icons. */}
            <IoMdSearch fontSize={21} className="ml-1" />
            {/* Input field that navigates to the /search page and sets the searchTerm (prop from Pins.jsx). */}
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              value={searchTerm}
              onFocus={() => navigate("/search")}
              className="p-2 w-full bg-white outline-none"
            />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {localStorage.getItem("user") ? (
              <>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium ml-5 py-1 px-2 rounded uppercase">
                  <NavLink to="upload">upload</NavLink>
                </button>
                {/**User image and settings dropdown. */}
                <UserDropdown user={user} />
              </>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
