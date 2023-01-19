import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Fresh from "./pages/Fresh";
import Rising from "./pages/Rising";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="rising" element={<Rising />} />
        <Route path="fresh" element={<Fresh />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
