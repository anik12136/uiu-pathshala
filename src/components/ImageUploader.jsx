import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ className, getUploadedImageData }) => {
  const [imageBinaryFile, setImageBinaryFile] = useState([]);
  const [cloudImageData, setCloudImageData] = useState("");
  getUploadedImageData(imageBinaryFile, cloudImageData);

  const cloudinaryImageUploader = async () => {
    let formData = new FormData();
    formData.append("file", imageBinaryFile);
    formData.append("upload_preset", "yaminHossain99");
    formData.append("cloud_name", "daeufkvvp");

    await fetch("https://api.cloudinary.com/v1_1/daeufkvvp/auto/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("CLG data",data);
        setCloudImageData(data);
      })
      .catch((error) => console.error("Error:", error));
  };



  const onDrop = useCallback((acceptedFiles) => {
    setImageBinaryFile(acceptedFiles[0]);

    /*Cloudinary file uploading */
    cloudinaryImageUploader();
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1024 * 1000 * 2,
  });
  if (!imageBinaryFile) {
    return;
  }
  return (
    <div>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};
export default ImageUploader;
