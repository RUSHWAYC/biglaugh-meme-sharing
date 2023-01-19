import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import pageNames from "../data/pageNames";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { client, urlFor } from "../client";
import jwtDecode from "jwt-decode";
import { fetchUser } from "../utils/fetchUser";
import { userQuery } from "../utils/data";

const Navbar = () => {
  const navigate = useNavigate();

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

  console.log(user?.image);

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
              <div className="flex gap-5 md:gap-10">
                {/** User profile image. */}
                <Link to={`user-profile/${user?._id}`}>
                  <img
                    src={user?.image}
                    referrerPolicy="no-referrer"
                    alt="user-pic"
                    className="w-28"
                  />
                </Link>
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
