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

  return (
    <div className="relative bg-stone-200">
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/4 p-4 pr-0 md:pr-4">
          {posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="w-1/4 p-4 relative bg-white my-6 rounded">
          <p>Sidebar</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
