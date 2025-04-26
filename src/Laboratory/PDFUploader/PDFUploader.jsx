import axios from "axios";
import { useState } from "react";

const PDFUploader = () => {
  //Storing Title of the pdf from input file
  const [title, setTitle] = useState("");
  //   storing input file
  const [file, setFile] = useState("");
  //   Storing mongodb response of all pdf
  const [allImage, setAllImage] = useState(null);
  const submitImage = async (e) => {
    useEffect(() => {
      getPdf();
    }, []);
    const getPdf = async () => {
      const result = await axios.get("https://server-uiu-pathshala.vercel.app/get-files");
      console.log(result.data.data);
      setAllImage(result.data.data);
    };
    const showPdf = (pdf) => {
      window.open(`https://server-uiu-pathshala.vercel.app/files/${pdf}`, "_blank", "noreferrer");
      //   setPdfFile(`https://server-uiu-pathshala.vercel.app/files/${pdf}`);
    };
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "https://server-uiu-pathshala.vercel.app/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  return (
    <div>
      The pdf uploader is here
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf in React</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          class="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <div className="output-div">
        {allImage == null
          ? ""
          : allImage.map((data) => {
              return (
                <div className="inner-div">
                  <h6>Title: {data.title}</h6>
                  <button
                    className="btn btn-primary"
                    onClick={() => showPdf(data.pdf)}
                  >
                    Show Pdf
                  </button>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default PDFUploader;
