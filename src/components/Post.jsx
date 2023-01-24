import React from "react";
import { urlFor } from "../client";

const Post = ({ post: { postedBy, file, _id } }) => {
  console.log(file.asset.url);
  return (
    <div>
      <img
        className="rounded-lg w-20 h-20"
        alt="user-post"
        src={file.asset.url}
      />
    </div>
  );
};

export default Post;
