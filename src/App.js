import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import { fetchUser } from "./utils/fetchUser";
import { userQuery } from "./utils/data";
import { client } from "./client";
import UserProfile from "./pages/UserProfile";
import PostPage from "./pages/PostPage";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  //Get user data and match it with Google sub.
  useEffect(() => {
    const userInfo = fetchUser();
    const query = userQuery(userInfo?.sub);
    //Set the user that is logged in.
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={user}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:pageName" element={<Home />} />
        <Route path="upload" element={<Upload user={user} />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/post/:postId" element={<PostPage />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
