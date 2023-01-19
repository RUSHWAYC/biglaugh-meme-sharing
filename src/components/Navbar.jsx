import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import pageNames from "../data/pageNames";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { RxCaretDown } from "react-icons/rx";
import { client, urlFor } from "../client";
import jwtDecode from "jwt-decode";
import { fetchUser } from "../utils/fetchUser";
import { userQuery } from "../utils/data";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  //Get and save data from Google sign in.
  const responseGoogle = (response) => {
    console.log(jwtDecode(response.credential));
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

  console.log(user?.userName);

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
              <div className="relative flex flex-col items-center">
                {/** User profile image. */}
                <button
                  id="dropdownAvatarNameButton"
                  data-dropdown-toggle="dropdownAvatarName"
                  className="flex items-center justify-between p-4 text-sm font-medium rounded-ful hover:text-blue-500 md:mr-0 text-white"
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
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
            {/** <ul>
              <button className="bg-gray-700 hover:bg-gray-500 text-white font-medium ml-5 py-1 px-2 rounded uppercase">
                <Link to="login">login</Link>
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium ml-5 py-1 px-2 rounded uppercase">
                <Link to="signup">signup</Link>
              </button>
            </ul> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
