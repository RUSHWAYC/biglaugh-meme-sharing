import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { client } from "../client";

const LoginButton = () => {
  const navigate = useNavigate();

  //Get and save data from Google sign in.
  const responseGoogle = (response) => {
    localStorage.setItem(
      "user",
      JSON.stringify(jwtDecode(response.credential))
    );
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

  return (
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
  );
};

export default LoginButton;
