import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney, BiHotel, BiStar } from "react-icons/bi";
const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: (err: Error) => {
        showToast({ message: err.message, type: "ERROR" });
      },
    }
  );
  console.log(hotelData);
  if (!hotelData) {
    return (
      <div className="flex flex-col">
        <span className="text-center p-5 text-xl">No Hotels found</span>
        <Link
          to="/add-hotel"
          className="text-center bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </div>
    );
  }
  if (hotelData.length === 0) {
    return (
      <div className="flex flex-col">
        <span className="text-center p-5 text-xl">No Hotels found</span>
        <Link
          to="/add-hotel"
          className="text-center bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl fond-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div className="flex flex-col justify-between border border-slate-300 rounded">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-per-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city},{hotel.country}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />₹{hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults,{hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating}Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl fond-bold p-2 hover:bg-blue-500"
              >
                Edit
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyHotels;
