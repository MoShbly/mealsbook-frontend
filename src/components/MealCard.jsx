import defaultProfileImage from '../assets/images/profileImage.png';
import { Link, useNavigate } from "react-router";

export default function({ meal }) {
  const navigate = useNavigate();
  return (
    <Link
      className="flex flex-col rounded-md bg-stone-100 hover:bg-purple-100 overflow-hidden"
      to={`/tarif/${meal.id}`}
    >
      <div className="w-64 flex-1">
        <img src={meal.image} className='w-full h-36' />
      </div>
      <div className="flex-1 p-4">
        <p className="text-purple-900 text-xl">{meal.name}</p>
        <div className="flex justify-between">
          <p className="text-purple-700 text-md">{`@${meal.username}`}</p>
          <div className="flex items-center gap-3">
            <p className="text-purple-900 text-xl">{meal.favs}</p>
            <p className="text-purple-700 text-md">favs</p>
          </div>
        </div>
      </div>
    </Link>
  );
}