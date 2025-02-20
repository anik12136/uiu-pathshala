import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProviders";
// import { AuthContext } from "../../providers/AuthProviders";


const CreateCourse = () => {
    const { user } = useContext(AuthContext); // Auth context for user details
  // const [, refetch] = useCart(); // To refetch cart details
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    courseDescription: "",
    bannerUrl: "",
  });

  // Handle input changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form submission handler
  const courseCreationSubmitHandler = async (event) => {
    event.preventDefault();

    const { title, subject, courseDescription, bannerUrl } = formData;

    if (!title || !subject || !courseDescription || !bannerUrl) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields!",
      });
      return;
    }

    const courseData = {
      title,
      subject,
      courseDescription,
      bannerUrl,
      teacherName: user?.displayName || "anonymous",
      email: user?.email || "anonymous",
    };
console.log(courseData);
    try {
      const response = await fetch("http://localhost:7000/courseCollection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Course created successfully!",
        });
        setFormData({
          title: "",
          subject: "",
          courseDescription: "",
          bannerUrl: "",
        });
        // refetch(); // Update related data
      } else {
        throw new Error(data.error || "Failed to create course");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-2 lg:mx-auto mb-5 mt-24 py-4 px-8 rounded-lg shadow-lg border">
      <h1 className="text-3xl text-start lg:text-center mb-4">Create a new course</h1>
      <form onSubmit={courseCreationSubmitHandler}>
        {/* Course Title */}
        <label>
          Course Title <span className="text-red-600">*</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter a suitable title"
            required
            className="border rounded-md w-full p-2 my-2"
          />
        </label>

        {/* Course Subject */}
        <label>
          Name of the subject <span className="text-red-600">*</span>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Enter subject name"
            required
            className="border rounded-md w-full p-2 my-2"
          />
        </label>

        {/* Course Description */}
        <label>
          Course Description <span className="text-red-600">*</span>
          <textarea
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleInputChange}
            placeholder="Enter course description"
            required
            className="border rounded-md w-full p-2 my-2 h-40 resize-none"
          ></textarea>
        </label>

        {/* Banner URL */}
        <label>
          Banner URL <span className="text-red-600">*</span>
          <input
            type="text"
            name="bannerUrl"
            value={formData.bannerUrl}
            onChange={handleInputChange}
            placeholder="Enter a banner URL"
            required
            className="border rounded-md w-full p-2 my-2"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="block mx-auto my-6 bg-orange-500 hover:bg-orange-400 text-white shadow-md px-6 py-2 rounded-full"
        >
          Save & Start Uploading
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;