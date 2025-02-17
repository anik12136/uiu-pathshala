import React, { useContext } from "react";
import UnderConstruction from "../../components/UnderConstruction";
import { BiSolidPencil } from "react-icons/bi";
import { FaFacebook, FaGithub, FaStar, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { AuthContext } from "../../providers/AuthProviders";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const interests = [
    "Data Science",
    "Machine Learning",
    "Web Programming",
    "Software Engineering",
    "Software Architecture",
    "DataStructure and Algorithm",
  ];
  return (
    <div className="max-w-7xl w-full mx-auto">
      {/* ====================================Profile header section===========================================*/}
      <div>
        <div className="h-48 lg:h-96  mt-18 lg:mt-20">
          {/* ---------Cover Photo-------------- */}
          <img
            className="h-48 lg:h-96 w-full object-cover rounded-t-none lg:rounded-t-md"
            src="https://images.unsplash.com/photo-1739560116869-84714fa15b3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="px-1 lg:px-6 pb-3 lg:pb-9 rounded-b-lg relative flex shadow-md">
          {/* Child-1 */}
          {/* -------------profile picture------------- */}
          <img
            className="w-28 lg:w-44 h-28 lg:h-44  rounded-full object-cover absolute -top-4 lg:-top-16"
            src="https://images.unsplash.com/photo-1598510666944-d34451607eb3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          {/* Child-2 */}
          <div className="ms-32 lg:ms-52 mt-2">
            <h1 className="font-semibold text-lg lg:text-4xl text-gray-700">
              Users Name
            </h1>
            <p className="text-gray-700 text-sm lg:text-base">
              Dept. Computer Science and Engineering
            </p>
            <p className="text-gray-700 text-sm lg:text-base">
              United International University
            </p>
          </div>
          {/* Child-3 */}
          <div className="ms-auto mt-4 lg:mt-8 ">
            {user ? (
              <button className="flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white p-2 lg:px-4 lg:py-2 rounded-lg shadow-md cursor-pointer ">
                <BiSolidPencil className="text-lg lg:text-xl" />
                <span className="hidden lg:inline">Edit profile</span>
              </button>
            ) : (
              <button className="flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white p-2 lg:px-4 lg:py-2 rounded-lg shadow-md cursor-pointer ">
                <IoPersonAddSharp className="text-lg lg:text-xl" />
                <span className="hidden lg:inline">Add friend</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* ================================About Section ======================================================== */}
      <div className="mt-4 p-4 rounded-lg shadow-md border">
        <h1 className="font-semibold text-2xl text-gray-700 mb-4">About</h1>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus vitae
          placeat fugit, amet accusamus distinctio maxime quia animi maiores
          sunt quos dignissimos aperiam sed aliquid modi consequatur ab itaque
          sequi in nulla deserunt. Recusandae, deserunt illum. Sunt nisi
          exercitationem ex iste numquam animi cumque facilis ducimus sint optio
          tempora harum, consectetur veritatis id, possimus dolorem suscipit!
          Delectus, quo ut necessitatibus, modi ex eligendi cupiditate quisquam
          vitae commodi est corporis deserunt consectetur, alias saepe adipisci
          dolore doloribus voluptate quia repellendus quasi consequatur. Eius
          ratione saepe pariatur quaerat vel nemo consequuntur. Rem repellat
          incidunt sint ipsum voluptate adipisci architecto dolores nisi
          voluptas.
        </p>
      </div>
      {/* =====================================Interest Section============================================== */}
      <div className="mt-4 p-4 rounded-lg shadow-md border">
        <h1 className="font-semibold text-2xl text-gray-700 mb-4">Interest</h1>
        <div className="flex gap-4 flex-wrap justify-start">
          {interests.map((interest) => (
            <p className="text-gray-700 text-center border rounded-lg px-4 py-2">
              {interest}
            </p>
          ))}
        </div>
      </div>
      {/* ========================================Social Media Section============================================= */}
      <div className="mt-4 p-4 rounded-lg shadow-md border">
        <h1 className="font-semibold text-2xl text-gray-700 mb-4">
          Socail Media
        </h1>
        <div className="flex gap-4 justify-start items-center">
          <FaFacebook className="text-gray-600 text-2xl" />
          <a
            href="https://www.facebook.com/"
            className="text-blue-600 font-semibold"
          >
            Yamin Hossain
          </a>
        </div>
        <div className="flex gap-4 my-4 justify-start items-center">
          <FaInstagram className="text-gray-600 text-2xl" />

          <a
            href="https://www.facebook.com/"
            className="text-blue-600 font-semibold"
          >
            Yamin Hossain
          </a>
        </div>
        <div className="flex gap-4 my-4 justify-start items-center">
          <FaYoutube className="text-gray-600 text-2xl" />
          <a
            href="https://www.facebook.com/"
            className="text-blue-600 font-semibold"
          >
            Yamin Hossain
          </a>
        </div>
        <div className="flex gap-4 justify-start items-center">
          <FaGithub className="text-2xl" />
          <a
            href="https://www.facebook.com/"
            className="text-blue-600 font-semibold"
          >
            Yamin Hossain
          </a>
        </div>
      </div>
      {/* ========================================Contribution Section=================================================== */}
      <div className="mt-4 p-4 rounded-lg shadow-md border">
        <h1 className="font-semibold text-2xl text-gray-700 mb-4">
          Recent Contribution
        </h1>
        {/* -------------item-1---------------- */}
        <div className="flex gap-3 border p-2 mb-2 rounded-lg shadow-sm ">
          <img
            className="w-52 h-28 rounded-lg object-cover"
            src="https://images.unsplash.com/photo-1553933899-131780ba04a3?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="grow text-gray-700">
            <h1 className="text-2xl font-semibold">
              Machine learnig for bigginers
            </h1>
            <p className="text-gray-500 text-sm my-1">Duration: 4h</p>
            <p className="font-medium my-1">Yamin Hossain</p>
            <p className="flex justify-start items-center gap-3">
              <FaStar className="text-yellow-500" />
              (4/5)
            </p>
          </div>
        </div>
        {/* ---------------item-2------------------- */}
        <div className="flex gap-3 border p-2 mb-2 rounded-lg shadow-sm">
          <img
            className="w-52 h-28 rounded-lg object-cover"
            src="https://images.unsplash.com/photo-1553933899-131780ba04a3?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="grow text-gray-700">
            <h1 className="text-2xl font-semibold">
              Machine learnig for bigginers
            </h1>
            <p className="text-gray-500 text-sm my-1">Duration: 4h</p>
            <p className="font-medium my-1">Yamin Hossain</p>
            <p className="flex justify-start items-center gap-3">
              <FaStar className="text-yellow-500" />
              (4/5)
            </p>
          </div>
        </div>
        {/* ----------------item-3----------------------- */}
        <div className="flex gap-3 border p-2 rounded-lg shadow-sm">
          <img
            className="w-52 h-28 rounded-lg object-cover"
            src="https://images.unsplash.com/photo-1553933899-131780ba04a3?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="grow text-gray-700">
            <h1 className="text-2xl font-semibold">
              Machine learnig for bigginers
            </h1>
            <p className="text-gray-500 text-sm my-1">Duration: 4h</p>
            <p className="font-medium my-1">Yamin Hossain</p>
            <p className="flex justify-start items-center gap-3">
              <FaStar className="text-yellow-500" />
              (4/5)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
