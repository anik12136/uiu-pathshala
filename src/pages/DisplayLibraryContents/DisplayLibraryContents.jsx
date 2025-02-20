import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation, useParams } from "react-router-dom";

const DisplayLibraryContents = () => {
  //Modal Controls
  const [isModalOpen, setIsModalOpen] = useState(false);

  // For displaying contents based on individual route
  const location = useLocation();
  // console.log(location.state);
  const { routeName, subject } = location.state;

  //Loading Contents
  useEffect(() => {
    fetch("../../../public/fakeDB/Books.json")
      .then((res) => res.json())
      .then((data) => console.log("Books", data));
  }, []);
  return (
    <div>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="w-96 h-96 bg-white rounded-md cursor-pointer">
          <IoIosCloseCircleOutline
            className="text-4xl text-gray-600 ms-auto"
            onClick={() => setIsModalOpen(!setIsModalOpen)}
          />
        </div>
      </Modal>

      {/* ===================================Modal Ends here======================================= */}
      <h1 className="text-center font-bold text-xl lg:text-2xl">
        {subject.courseName}
      </h1>
      <button className="border" onClick={() => setIsModalOpen(!isModalOpen)}>
        Show Modal
      </button>
    </div>
  );
};

export default DisplayLibraryContents;
