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
      {postData && (
        <div className="h-screen">
          <div className="bg-white w-2/4">
            <Post post={postData} />
            <h2 className="text-2xl">Comments</h2>
            {postData?.comments?.map((comment, i) => (
              <div
                key={i}
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
              >
                <img
                  src={comment.postedBy.image}
                  alt="user-profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
