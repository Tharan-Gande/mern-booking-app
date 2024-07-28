import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../Backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};
const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-[2fr_3fr] border border-slate-400 rounded-lg gap-8">
      <div className="w-full h-full">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-[200px] object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>
        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        <div className="grid grid-cols-2 items-center whitespace-nowrap">
          <div className="flex space-x-1 items-center">
            {hotel.facilities.slice(0, 2).map((facility) => (
              <span className="bg-slate-300 p-1 rounded-lg font-semibold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="align-left text-xs">
              {hotel.facilities.length > 2 &&
                `+${hotel.facilities.length - 2} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">₹{hotel.pricePerNight} per night</span>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-blue-600 text-white rounded-lg  h-full p-1 font-bold max-w-fit hover:bg-blue-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResultsCard;
