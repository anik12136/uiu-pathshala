import axios from "axios";
import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import PDFUploader from "./PDFUploader/PDFUploader";

const Test2 = () => {
  const [file, setFile] = useState(null);
  const [cloudFile, setCloudFile] = useState({});
  console.log("Cloud", cloudFile);
 

  useEffect(() => {
    axios
      .post("http://localhost:7000/pdf-uploads", file)
      .then((data) => setCloudFile(data.data));
  }, [file]);

  const pdfUploadingHandler = (e) => {
    const inputFile = e.target.files[0];
    const formData = new FormData();
    formData.append("pdfFile", inputFile);

    setFile(formData);
  };
  return (
    <div>
      <form>
        <input type="file" name="pdfFile" onChange={pdfUploadingHandler} />
      </form>
      <div className="w-full h-96 border">
        {/* <img  src={`http://localhost:7000/uploads/${cloudFile.filename}`} alt="" /> */}
      </div>
      <PDFUploader></PDFUploader>
    </div>
  );
};

export default Test2;
