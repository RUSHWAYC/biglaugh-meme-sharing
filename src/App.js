import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Fresh from "./pages/Fresh";
import Rising from "./pages/Rising";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Upload from "./pages/Upload";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="rising" element={<Rising />} />
        <Route path="fresh" element={<Fresh />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="upload" element={<Upload />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
