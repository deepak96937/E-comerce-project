import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { uploadToCloudinary } from "../utils/cloudnaryUploade";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileUpload = async (file) => {
    setLoading(true); 
    setErrorMsg("");
    try {
      const imageUrl = await uploadToCloudinary(file, (percent) => {
        setUploadProgress(percent);
      });
      setUploadedImageUrl(imageUrl);
      if (imageUrl) {
        setFormData({ ...formData, avatar: imageUrl });
      }
    } catch (error) {
      // Notify the user if an error occurred
      setErrorMsg("Failed to upload image. Please try again.");
    } finally {
      setLoading(false); // End loading state whether successful or not
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser?.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <p className=" text-sm self-center">
          {errorMsg ? (
            <span className=" text-red-700">Error Image upload Immage must be less the 2 mb </span>
          ) : uploadProgress > 0 && uploadProgress < 100 ? (
            <span className="text-slate-700">{`Uploading ${uploadProgress}%`}</span>
          ) : uploadProgress === 100 ? (
            <span className=" text-green-700">
              Image successfully uploaded!
            </span>
          ) : (
            " "
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          value={currentUser.username}
          readOnly
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          value={currentUser.email}
          readOnly
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
