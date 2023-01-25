import React from "react";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

const Post = ({ post: { postedBy, file, _id, title } }) => {
  console.log(postedBy);
  return (
    //content-container
    <div className="w-full py-2 bg-stone-200">
      {/**content */}
      <div className="mx-auto" style={{ minWidth: "860px", maxWidth: "1180" }}>
        {/**Content center. */}
        <div className="block" style={{ width: "540" }}>
          {/**Post container. */}
          <div className="">
            {/**Post. */}
            <div
              className="w-max p-2 bg-white border-solid border-black rounded-lg"
              style={{ width: "500" }}
            >
              {/**Title. */}
              <div className="font-bold text-xl">{title}</div>
              {/**Source */}
              <div className="mb-1">
                <img
                  className="rounded-lg"
                  style={{ width: "500px" }}
                  alt="user-post"
                  src={file.asset.url}
                />
              </div>
              {/**Post info. */}
              <div className="w-full flex flex-row text-gray-400 mb-1 font-semibold text-sm">
                <ImArrowUp className="border-solid border-2 rounded	border-gray-200 text-4xl p-0.5 w-14" />
                <ImArrowDown className="border-solid border-2 rounded	border-gray-200 text-4xl p-0.5 mx-2 w-14" />
                <p className="self-center p-1.5">X points</p>
                <p className="ml-2 self-center p-1.5">X comments</p>
                <p className="ml-auto self-center p-1.5 flex flex-row">
                  X ago by
                </p>
                <img src={postedBy.image} className="w-5 self-center" />
                <div className="self-center p-1.5">{postedBy.userName}</div>
              </div>
              {/**Post action. */}
              <div>
                {/**<ImArrowDown style={{ color: "red", fontSize: "1.5em" }} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
