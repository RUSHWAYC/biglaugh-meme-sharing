import React, { useState } from "react";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

import { client } from "../client";

const Login = () => {
  const [accountData, setAccountData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = accountData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  const handleSubmit = () => {
    const user = {
      _type: "user",
      username: username,
      email: email,
      password: password,
    };

    client.create(user);
  };

  return (
    <div className="auth-form-container bg-zinc-300">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-zinc-200 p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <h1 class="flex justify-center text-2xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2x">
            Login to your accaunt
          </h1>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="relative mb-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <HiOutlineAtSymbol className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                required
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChangeInput}
              />
            </div>
            <div className="relative mb-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <RiLockPasswordLine className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                required
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChangeInput}
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 w-full rounded uppercase"
              onClick={handleSubmit}
            >
              login
            </button>
          </form>
        </div>
        <p class="text-sm">
          Don't have an account?{" "}
          <a
            href="./"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Signup here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
