import LibraryContents from "../shared/LibraryContents/LibraryContents";
import useLibraryContentsData from "../../Hooks/useLibraryContentsData";
import { IoSearch } from "react-icons/io5";
const Notes = () => {
  const subjects = useLibraryContentsData();
  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Notes</h1>
      <div className="relative">
        <IoSearch className="text-2xl absolute top-2 left-2 text-gray-500" />
        <input
          type="text"
          name="bookSearchField"
          placeholder="Search by course name or course code"
          className="border ps-10 pr-4 py-2 w-full lg:w-1/4 rounded-full focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {subjects.map((subject) => (
          <LibraryContents
            key={subject._id}
            subject={subject}
            routeName={"notes"}
          ></LibraryContents>
        ))}
      </div>
    </div>
  );
};

export default Notes;
