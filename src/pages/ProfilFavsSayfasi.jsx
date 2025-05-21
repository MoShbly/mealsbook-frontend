import { useContext, useEffect, useState } from "react";
import { ReactContext } from "../context";
import defaultProfileImage from '../assets/images/profileImage.png';
import { Link } from "react-router";
import axios from "axios";
import MealCard from "../components/MealCard";

export default function Page() {
  const ctx = useContext(ReactContext);

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.post(`https://mealsbook-backend.vercel.app/favs/getFavs`, {
          authtoken: ctx.token,
        });
        setMeals(response.data.favMeals);
        console.log(response.data);
        
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
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl">Favorites</h1>
        <div className="flex gap-3 flex-wrap">
          {meals.map(meal => <MealCard key={meal.id} meal={meal}/>)}
        </div>
      </div>

    </div>
      
    </>
  );
}