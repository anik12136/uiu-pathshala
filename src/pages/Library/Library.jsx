import { useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import UnderConstruction from "../../components/UnderConstruction";

const Library = () => {
const[cloudImageData,setCloudImageData] =useState({});
  const getUploadedImageData = (imageFile,cloudImage) => {
    console.log("Hi from uploaded image data");
    console.log("ImageFile",imageFile);
    console.log("CloudImage",cloudImage);
    setCloudImageData(cloudImage)
  };
  return (
    <div>
      {/* <UnderConstruction></UnderConstruction>  */}
      <ImageUploader
        className="border-2 border-dashed border-gray-600  p-9 mx-auto max-w-96"
        getUploadedImageData={getUploadedImageData}
      ></ImageUploader>
      <img src={cloudImageData.url} alt="" />
    </div>
  );
};

export default Library;
