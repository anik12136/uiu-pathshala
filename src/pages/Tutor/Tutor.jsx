import bannerImage from "../../assets/images/default-banner-image-for-course-card.webp"

const Tutor = () => {
    // form handler
    const courseCreationSubmitHandler =(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        const subject = event.target.subject.value;
        const courseDescription = event.target.courseDescription.value;
        let bannerImage = event.target.bannerImage.files;
        if(!bannerImage){
            bannerImage= bannerImage;
        }
        console.log(title,subject,courseDescription,bannerImage);
    }

  return (
    <div className="max-w-2xl mx-2 lg:mx-auto mb-5 mt-24 py-4 px-8 rounded-lg shadow-lg border">
      <div className="">
        <h1 className="text-3xl text-start lg:text-center mb-4">Create a new course</h1>
        {/* Form */}
        <form onSubmit={courseCreationSubmitHandler}>
        {/* Course title */}
          <label>
            Course Title <span className="text-red-600">*</span><br />
            <input
              type="text"
              name="title"
              placeholder="Enter a suitable title for the course"
              required
              className="border border-gray-400 rounded-md w-full p-2 my-2 focus:outline-none"
            />
          </label>
          {/* Course Subject */}
          <label>
            Name of the subject <span className="text-red-600">*</span> <br />
            <input
              type="text"
              name="subject"
              placeholder="Enter the subject name"
              required
              className="border border-gray-400 rounded-md w-full p-2 my-2 focus:outline-none"
            />
          </label>
          {/* Course Description */}
          <label>
            Course Description <span className="text-red-600">*</span> <br />
            <textarea
              name="courseDescription" required
              className="border border-gray-400 rounded-md w-full p-2 my-2 h-40 resize-none focus:outline-none"
            ></textarea>
          </label>
          {/* Banner Image for course */}
          <label>
            Select a banner image <br />
            <input
              type="file"
              name="bannerImage"
              accept="image/*"
              className="border border-gray-400 rounded-md w-full p-2 my-2 focus:outline-none"
            />
          </label>
          {/* Form Submit Button */}
          <button type="submit" className="block mx-auto my-6 bg-orange-500 hover:bg-orange-400 text-white shadow-md px-6 py-5 rounded-full"> Save & Start Uploading</button>
        </form>
      </div>
    </div>
  );
};

export default Tutor;
