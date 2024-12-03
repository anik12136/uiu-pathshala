import { IoIosSearch } from "react-icons/io";

const Banner = () => {
  return (
    <section className={`py-10`}>
      <h1 className="text-center text-5xl font-medium">BEST HELPING HAND </h1>
      <h1 className="text-center text-5xl font-medium  mt-2">
        FOR UIU STUDENTS
      </h1>
      <p className="text-center max-w-[700px] mx-auto mt-4">
        We are a team of researchers and engineers at GitHub, exploring things
        beyond the adjacent possible. We prototype tools and technologies that
        will change our craft. We identify new approaches to building healthy,
        productive software engineering teams.{" "}
      </p>
      <div className="mx-4 lg:mx-auto mt-4 max-w-lg flex">
        <label htmlFor="search" className="grow">
          <input
            className="border border-slate-500 w-full h-12 rounded-l-lg px-5  block  focus:outline-none"
            type="text"
            placeholder="Search for courses,tutor,lectures..."
          />
        </label>
        <button className="h-12 bg-[#FF6701] text-white px-3 rounded-r-lg">
          Search <IoIosSearch className="text-2xl inline"/>
        </button>
      </div>
    </section>
  );
};

export default Banner;
