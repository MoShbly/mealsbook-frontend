import { useContext, useEffect, useState } from "react";
import { ReactContext } from "../context";
import defaultProfileImage from '../assets/images/profileImage.png';
import { Link } from "react-router";
import axios from "axios";
import MealCard from "../components/MealCard";

export default function Page() {
  const ctx = useContext(ReactContext);

  const [user, setUser] = useState({});
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`https://mealsbook-backend.vercel.app/users/profile/${ctx.user.username}`);
        setUser(response.data.user);
        setMeals(response.data.meals);
      } catch (error) {
        
      }
    }());
  }, []);

  return (
    <>
    <div className="flex flex-col p-10 gap-10 items-center">
      <div className="flex gap-10 py-10 items-center border-b border-b-2 border-b-purple-900">
        <img className="rounded-full w-40 h-40" src={user.image || defaultProfileImage} alt="" />
        <div className="flex flex-col gap-2 text-xl">
          <p className="text-purple-900">{user.firstname} {user.lastname}</p>
          <p>@{user.username}</p>
          <div className="flex gap-6">
            <p className="flex items-center gap-1"><span className="text-purple-900 text-2xl">{meals.length}</span> Meals</p>
            <p className="flex items-center gap-1"><span className="text-purple-900 text-2xl">{user.favs}</span> Favs</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/profil/guncelleme" className="rounded-md text-white bg-purple-700 py-3 px-6 text-center hover:bg-purple-900"> Profile Page </Link>
          <Link to="/profil/favs" className="rounded-md text-white bg-purple-700 py-3 px-6 text-center hover:bg-purple-900"> Favorites </Link>
          <Link to="/tarif/ekle" className="rounded-md text-white bg-purple-700 py-3 px-6 text-center hover:bg-purple-900"> Add New Meal </Link>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-4xl">Meals</h1>
        <div className="flex gap-3 flex-wrap">
          {meals.map(meal => <MealCard key={meal.id} meal={meal}/>)}
        </div>
      </div>

    </div>
      
    </>
  );
}