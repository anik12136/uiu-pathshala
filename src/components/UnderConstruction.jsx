import UnderConstructionImage from "../assets/images/under_construction.png"

const UnderConstruction = () => {
    return (
        <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-gray-600 text-6xl mb-5">This page is under construction!</h1>
            <img className="w-2/4" src={UnderConstructionImage} alt="" />
        </div>
    );
};

export default UnderConstruction;