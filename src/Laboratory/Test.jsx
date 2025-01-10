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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileHandler = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <h1 className="text-3xl text-gray-600 text-center">
        This is the laboratory{" "}
      </h1>
      <h1 className="text-3xl text-gray-600 text-center mb-9">
        Where you can create any kind of components and test them
      </h1>

      <div
        {...getRootProps()}
        className="border border-black border-dashed mx-auto max-w-96 p-7 mb-2"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <img src={file.imagePreview} alt="" />

     
      <ProfileDropDown></ProfileDropDown>
    </>
  );
};

export default Test;
