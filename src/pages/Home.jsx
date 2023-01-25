import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { searchQuery, feedQuery } from "../utils/data";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState(null);
  let { pageName } = useParams();

  useEffect(() => {
    if (pageName) {
      //Load categery as the search term from searchQuery in utils/data.
      const query = searchQuery(pageName);
      //If pageName is true, get the category from utils and set the posts to it.
      client.fetch(query).then((data) => {
        setPosts(data);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPosts(data);
      });
    }
  }, [pageName]);

  console.log(posts);
  return (
    <div className="relative">
      {posts?.map((post) => (
        <Post key={post._id} post={post} className="w-max" />
      ))}
    </div>
  );
};

export default Home;
