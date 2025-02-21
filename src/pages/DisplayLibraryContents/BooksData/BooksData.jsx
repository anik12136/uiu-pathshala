import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import Modal from "../../../components/Modal/Modal";
import {
  IoIosAddCircleOutline,
  IoIosCloseCircleOutline,
  IoMdClose,
} from "react-icons/io";
import { TbPdf } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

const BooksData = ({ subject }) => {
  //Modal Controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   console.log(subject);
  const [books, setBooks] = useState([]);
  // console.log(books);
  useEffect(() => {
    fetch("../../../../public/fakeDB/Books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // const [file, setFile] = useState("");
  // console.log(file);

  const bookFormDataHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("courseName", e.target.courseName.value);
    formData.append("courseCode", e.target.courseCode.value);
    formData.append("bookName", e.target.bookName.value);
    formData.append("authorsName", e.target.authorsName.value);
    formData.append("edition", e.target.edition.value);
    formData.append("file", e.target.bookPDF.files[0]);
    axios
      .post("http://localhost:7000/books", formData)
      .then((data) => console.log(data))
      .catch((e) => console.log(e.message));
  };

  return (
    <div>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
      >
        {/* -----------------Modal Contents--------------- */}
        <div className="w-96 lg:w-[700px] p-2 lg:p-4 bg-white rounded-md ">
          {/* Closing button */}
          <IoMdClose
            className="text-4xl text-gray-600 ms-auto hover:bg-gray-100 hover:rounded-full p-2 cursor-pointer"
            onClick={() => setIsModalOpen(!setIsModalOpen)}
          />

          <div>
            <h1 className="font-bold text-xl mb-3">Add a New Book</h1>
            <form onSubmit={bookFormDataHandler}>
              <label className="text-sm text-gray-700 ms-1">Course Name</label>{" "}
              <br></br>
              <input
                type="text"
                name="courseName"
                className="w-full border rounded-lg p-2 my-2 focus:outline-none bg-slate-50 text-slate-500 border-slate-200"
                value={subject.courseName}
                readOnly
              />
              <label className="text-sm text-gray-700 ms-1">Course Code</label>{" "}
              <br></br>
              <input
                type="text"
                name="courseCode"
                className="w-full border rounded-lg p-2 my-2 focus:outline-none bg-slate-50 text-slate-500 border-slate-200"
                value={subject.courseCode}
                readOnly
              />
              <label className="text-sm text-gray-700 ms-1">
                Book Name <span className="text-red-700">*</span>
              </label>{" "}
              <br></br>
              <input
                type="text"
                name="bookName"
                className="w-full border rounded-lg p-2 my-2 focus:outline-none"
                placeholder="Enter the name of the book"
                required
              />
              <label className="text-sm text-gray-700 ms-1">
                Authors Name <span className="text-red-700">*</span>
              </label>{" "}
              <br></br>
              <input
                type="text"
                name="authorsName"
                className="w-full border rounded-lg p-2 my-2 focus:outline-none"
                placeholder="e.g, Alan Turing, Dennis Ritchie"
                required
              />
              <label className="text-sm text-gray-700 ms-1">
                Edition <span className="text-red-700">*</span>
              </label>{" "}
              <br></br>
              <input
                type="text"
                name="edition"
                className="w-full border rounded-lg p-2 my-2 focus:outline-none"
                placeholder="e.g, 7th edition"
                required
              />
              <label className="text-sm text-gray-700 ms-1">
                Choose a pdf file <span className="text-red-700">*</span>
              </label>{" "}
              <br></br>
              <input
                type="file"
                name="bookPDF"
                accept="application/pdf"
                // onChange={(e) => {
                //   setFile(e.target.files[0]);
                // }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff6c26] file:text-white hover:file:bg-orange-600"
                required
              />
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="cancel"
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#ff6c26] text-white rounded-lg hover:bg-orange-600"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* =====================================Modal Ends Here =========================== */}
      <div>
        <button
          className="border flex justify-center items-center gap-3 rounded-lg p-2 lg:p-4 bg-slate-200"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <IoIosAddCircleOutline className="text-xl lg:text-2xl" /> New Book
        </button>
      </div>

      {books.map((book) => (
        <div
          key={book.id}
          className="flex gap-5 justify-between p-4 border cursor-pointer my-3 rounded-lg"
          onClick={() => {
            window.open(book.pdfURL, "_blank", "noreferrer");
          }}
        >
          <div className="flex gap-2">
            <TbPdf className="text-xl bg-red-400 rounded-sm" />
            <p>{book.pdfName}</p>
          </div>
          <p>{book.author}</p>
          <div className="flex-grow"></div>
        </div>
      ))}
    </div>
  );
};

export default BooksData;
