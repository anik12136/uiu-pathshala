import React, { useState } from "react";

const Modal = ({ isModalOpen, children, setIsModalOpen }) => {
  //   console.log(isModalOpen);
  return (
    <div
      onClick={setIsModalOpen}
      className={`${
        isModalOpen
          ? "h-dvh w-full fixed inset-0 z-50 bg-black bg-opacity-50 flex flex-col justify-center items-center"
          : "hidden"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
/* 
Documentation
=======================================================================================
Follow these procedure where you want to use the modal. 

Step01: Manage a state for updating Modal's visibility.
const [isModalOpen, setIsModalOpen] = useState(false)

Step02: Use the <Modal/> component and wrap the content you want to display with the <Modal/> component. Pass the state as a props to the modal component.
<Modal isModalOpen={isModalOpen}>
        <div>
        Contents of modal
        </div>
</Modal>

Step03: Update the state value based on users interaction such as onClick. And also pass the state setter function as an event handler.
   <div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={( ) =>setIsModalOpen(!isModalOpen)}>
        <div className="bg-white w-96 h-96"></div>
      </Modal>
      <button className="border" onClick={() =>setIsModalOpen(!isModalOpen)}>Show Modal</button>
    </div>

Step04(Optional): If you want to control the modal visibility, just update the state from an event handler

Example:

const Example = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={( ) =>setIsModalOpen(!isModalOpen)}>
        <div className="bg-white w-96 h-96"></div>
      </Modal>
      <button className="border" onClick={() =>setIsModalOpen(!isModalOpen)}>Show Modal</button>
    </div>
  );
};

*/
