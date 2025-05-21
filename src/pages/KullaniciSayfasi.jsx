import { useContext, useEffect, useState } from "react";
import { ReactContext } from "../context";
import defaultProfileImage from '../assets/images/profileImage.png';
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import MealCard from "../components/MealCard";

export default function Page() {
  const ctx = useContext(ReactContext);
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (username == ctx.user.username) {
      navigate("/profil")
    }

    (async function() {
      try {
        const response = await axios.get(`https://mealsbook-backend.vercel.app/users/profile/${username}`);
        setUser(response.data.user);
        setMeals(response.data.meals);
      } catch (error) {
        
      }
    }());
  }, []);

  function logout() {
    ctx.setPersistentUserData(null);
  }
  
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