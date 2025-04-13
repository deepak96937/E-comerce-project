import axios from "axios";

export const uploadToCloudinary = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "deepak");
  formData.append("folder", "user-avatars");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dgy12aku9/image/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percent);
        },
        // No fixed timeout is set here, allowing the process to run as long as needed.
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const storeImage = async (file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "deepak"); // Replace with your preset
    formData.append("folder", "user-listing");

    fetch(`https://api.cloudinary.com/v1_1/dgy12aku9/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => resolve(data.secure_url))
      .catch(err => reject(err));
  });
};


