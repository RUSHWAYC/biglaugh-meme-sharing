import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import pageNames from "../data/pageNames";
import { client } from "../client";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const navigate = useNavigate();

  //Get and save data from Google sign in.
  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.credential));
    const { name, sub, picture, email } = jwtDecode(response.credential);
    //Export the data to Sanity. Connecting backend with front end.
    const doc = {
      //get the googleId for matching users in Sanity for useEffect on Home.jsx
      _id: sub,
      _type: "user",
      userName: name,
      email: email,
      image: picture,
    };

    //Once logged create the user if they don't exist already.
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  const activeStyle =
    "bg-stone-600 text-white px-3 py-2 text-lg font-medium capitalize";
  const inactiveStyle =
    "text-gray-300 hover:bg-stone-400 hover:text-white px-3 py-2 text-lg font-small capitalize";

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
            {localStorage.getItem("user") ? (
              //User image and settings dropdown.
              <>
                <UserDropdown />
              </>
            ) : (
              <div className="shadow-2xl">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <FcGoogle className="mr-4" /> Sign in with google
                    </button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy="single_host_origin"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
