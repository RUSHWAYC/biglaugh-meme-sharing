import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

import { client } from "../client";

const Register = (props) => {
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
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="relative mb-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HiOutlineAtSymbol className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChangeInput}
          />
        </div>
        <div className="relative mb-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <AiOutlineMail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div className="relative mb-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <RiLockPasswordLine className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium ml-5 py-1 px-2 rounded uppercase"
          onClick={handleSubmit}
        >
          sign up
        </button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};

export default Register;
