import moment from "moment";
import React, { useState, useEffect } from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { Link, useParams } from "react-router-dom";

import { client, urlFor } from "../client";
import Post from "../components/Post";
import { postDataQuery } from "../utils/data";

const PostPage = () => {
  const [postData, setPostData] = useState(null);

  const { postId } = useParams();

  const fetchPostData = () => {
    let query = postDataQuery(postId);
    if (query) {
      client.fetch(query).then((data) => {
        setPostData(data[0]);
      });
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  return (
    <div className="relative bg-stone-200">
      {postData && <Post post={postData} />}
    </div>
  );
};

export default PostPage;
