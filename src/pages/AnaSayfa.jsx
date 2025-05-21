import { useContext, useEffect, useState } from "react";
import { ReactContext } from "../context";
import defaultProfileImage from '../assets/images/profileImage.png';
import { Link } from "react-router";
import axios from "axios";
import MealCard from "../components/MealCard";
import TextInput from "../components/TextInput";
import Message from "../components/Message";

export default function Page() {
  const ctx = useContext(ReactContext);

  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");

  async function getMealsBySearch() {
    try {
      const response = await axios.get(`https://mealsbook-backend.vercel.app/meals/search/${search}`);
      setMeals(response.data.meals);
    } catch (error) {
      console.log(error);
      
      setError(error.response.data.message);
    }
  }

  return (
    <>
    <div className="flex flex-col p-10 gap-10">
      <div className="flex flex-col gap-5">
        {error && <Message msg={error} type="error" />}
        <h1 className="text-4xl text-purple-700">MealsBook</h1>
        <TextInput value={search} onChange={setSearch} label="search"/>
        <button type="button" className='w-fit outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer' onClick={getMealsBySearch}>Search</button>
        <div className="flex gap-3 flex-wrap">
          {meals.map(meal => <MealCard key={meal.id} meal={meal}/>)}
        </div>
      </div>

    </div>
      
    </>
  );
}