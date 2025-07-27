import { car_img } from "../utils/Link";

const Resturant_Card = (Prop) => {
  const {name,cuisines,avgRating,costForTwo,cloudinaryImageId} =Prop.resProp;
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl  w-60">
      <img
        src={car_img
           +
          cloudinaryImageId
        }
        alt="restaurant"
        className="w-full h-40 object-cover rounded-lg mb-2"
      />
      <h2 className="text-lg font-bold mb-1">{name}</h2>
      <p className="text text-gray-500">{costForTwo}</p>
      {/* bold */}
      <p className="text-gray-600 mb-1">
        {cuisines.slice(0, 2).join()}
        <span className="font-bold"> & more</span>
      </p>
      <p className="text-gray-600 mb-1">⭐{avgRating}</p>
    </div>
  );
}

export default Resturant_Card
