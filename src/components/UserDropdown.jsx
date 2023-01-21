import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { RxCaretDown } from "react-icons/rx";

import { client } from "../client";
import { fetchUser } from "../utils/fetchUser";
import { userQuery } from "../utils/data";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);

  //Get user data and match it with Google sub.
  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      const userInfo = jwtDecode(fetchUser());
      const query = userQuery(userInfo?.sub);
      //Set the user that is logged in.
      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center justify-between p-4 text-sm font-medium rounded-ful hover:text-blue-500 md:mr-0 text-white"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={() => setIsOpen((prev) => !prev)}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="rounded-lg w-8 h-8 mr-2"
          alt="profile"
          src={user?.image}
        />
        {user?.userName}
        <RxCaretDown />
      </button>
      {isOpen && (
        <div className="absolute top-14 divide-y rounded shadow w-44 bg-stone-400 divide-gray-600">
          <div className="px-4 py-3 text-sm text-white">
            <div className="truncate">{user.email}</div>
          </div>
          <ul className="py-1 text-sm text-gray-200">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-500 hover:text-white"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-500 hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm hover:bg-gray-500 text-gray-200 hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
