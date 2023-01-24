import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Upload from "./pages/Upload";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:pageName" element={<Home />} />
        <Route path="/:pageName" element={<Home />} />
        <Route path="upload" element={<Upload />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
