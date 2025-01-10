import defaultImage from "../assets/images/user.png";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ProfileDropDown from "../components/ProfileDropdown";

const Test = () => {
  const [file, setFile] = useState({});
  const [imageBinaryFile, setImageBinaryFile] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    //binary file of image
    setImageBinaryFile(acceptedFiles[0]);
    // blob file of image
    setFile({ imagePreview: URL.createObjectURL(acceptedFiles[0]) });
    console.log("Image Binary file", imageBinaryFile);

    /*--------------------------------------------------
    Cloudinary file uploading 
    ----------------------------------------------------*/

    const formData = new FormData();
    formData.append("file", imageBinaryFile);
    formData.append("upload_preset", "yaminHossain99");
    formData.append("cloud_name", "daeufkvvp");
    console.log("Formdata from  console", formData);
    fetch("https://api.cloudinary.com/v1_1/daeufkvvp/auto/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    /* --------------------------------------------------------------
    Image upload ends here
    ------------------------------------------------------------------*/
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1024 * 1000 * 2,
  });
  //////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <img src={file.imagePreview} alt="" />
      <div {...getRootProps()}>
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

export default Test;
