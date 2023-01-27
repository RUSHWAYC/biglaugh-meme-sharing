import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { client } from "../client";

const Upload = ({ user }) => {
  const [title, setTitle] = useState("");
  const [fileAsset, setFileAsset] = useState(null);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [fields, setFields] = useState(false);

  const navigate = useNavigate();

  //Logic for uploading the file for preview.
  const uploadImage = (e) => {
    //selectedFile.type
    const { type, name } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "video/webm" ||
      type === "video/mp4" ||
      type === "video/x-msvideo"
    ) {
      setWrongFileType(false);

      client.assets
        //Have to use e.target.files[0] because selectedFile was destructured.
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setFileAsset(document);
        })
        .catch((error) => {
          console.log("File upload error", error);
        });
    } else {
      setWrongFileType(true);
    }
  };

  //Logic for uploading the file to the website.
  const upload = () => {
    if (title && fileAsset?._id) {
      const doc = {
        _type: "post",
        //no need to write title: title if the key and the value are named the same.
        title,
        file: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: fileAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);

      setTimeout(() => setFields(false), 2000);
    }
  };

  return (
    <>
      <div className="bg-stone-200 flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center bg-white lg:p-5 lg:w-3/5 w-full">
          {/**Title. */}
          <div className="flex flex-1 flex-col gap-6 w-full lg:bg-white bg-zinc-200">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add your title"
              className="outline-none text-2xl sm:text-3xl font-bold p-2 mb-2 lg:mx-0 mx-3 border-b-2 border-gray-200"
            />
          </div>
          <div className="bg-zinc-200 p-3 flex flex-0.7 w-full cursor-pointer">
            <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {wrongFileType && (
                <p className="text-red-300">Wrong image type.</p>
              )}
              {!fileAsset ? (
                <label>
                  <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-bold text-2xl">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="text-lg">Click to upload</p>
                    </div>
                    <p className="mt-32 text-gray-400">
                      Upload JPG, PNG, GIF, MP4, WEBM, AVI files less than 20
                      MB.
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-file"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative w-full">
                  <img
                    src={fileAsset?.url}
                    alt="uploaded-file"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setFileAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end items-end lg:mt-1 w-full">
            <button
              type="button"
              onClick={upload}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 p-3 rounded uppercase w-full"
            >
              Upload
            </button>
          </div>
        </div>
        {/* Show if not all fields are filled in. */}
        {fields && (
          <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
            Please fill all the fields.
          </p>
        )}
      </div>
    </>
  );
};

export default Upload;
