import { useContext, useEffect, useState } from 'react';
import TextInput from '../components/TextInput'
import { ReactContext } from '../context';
import axios from 'axios';
import Message from '../components/Message';
import ImageInput from '../components/ImageInput';
import { Link, useNavigate, useParams } from 'react-router';

export default function Page() {
  const ctx = useContext(ReactContext);
  const navigate = useNavigate()
  const { mealid } = useParams();

  const [meal, setMeal] = useState("");

  let authenticatedUserMeal;
  if (meal) {
    authenticatedUserMeal = ctx.user.username === meal.username;
  }

  async function handleActionButton() {
    if (authenticatedUserMeal) {
      navigate(`/tarif/guncelleme/${meal.id}`);
    } else {
      if (meal.isUserFav) {
        const response = await axios.delete(`https://mealsbook-backend.vercel.app/favs`, {
          data: {
            authtoken: ctx.token,
            mealId: meal.id,
          }
        });
        if (!response.error) {
          setMeal(meal => ({...meal, isUserFav: false, favs: meal.favs - 1}))
        }
      } else {        
        const response = await axios.post(`https://mealsbook-backend.vercel.app/favs`, {
          authtoken: ctx.token,
          mealId: meal.id,
        });
        if (!response.error) {
          setMeal(meal => ({...meal, isUserFav: true, favs: meal.favs + 1}))
        }
      }
    }
  }

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`https://mealsbook-backend.vercel.app/meals/${mealid}/${ctx.user.id}`);
        setMeal(response.data.meal);
        console.log(response.data.meal);
      } catch (error) {
        
      }
    }());
  }, []);

  return (

    <div className="flex flex-col gap-10 p-10">
      <div className="flex flex-col gap-5 p-5 min-w-120 items-center">
        <img className="max-w-200" src={meal.image}/>
        <h1 className="text-purple-900 text-5xl text-center">{meal.name}</h1>
        <p className="text-2xl text-purple-900 text-center">{meal.description}</p>
        <Link className='w-fit text-purple-900 hover:text-purple-700' to={`/kullanici/${meal.username}`}>@{meal.username}</Link>
        <button onClick={handleActionButton} className='outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer'>
          {authenticatedUserMeal
                    ? 'edit meal'
                    : meal.isUserFav
                      ? 'remove fav!'
                      : 'add to fav!'}
        </button>
      </div>
      <div className='flex flex-col gap-5 p-5 max-w-200'>
        <h2 className='text-2xl text-purple-900'>Ingredients:</h2>
        <div className='flex flex-col gap-3'>
          {meal.ingredients && JSON.parse(meal.ingredients).map((item, idx) => 
            <p key={idx} className='text-xl'>-- {item}</p>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-5 p-5 max-w-200'>
        <h2 className='text-2xl text-purple-900'>Steps:</h2>
        <div className='flex flex-col gap-3'>
          {meal.steps && JSON.parse(meal.steps).map((item, idx) => 
            <p key={idx} className='text-xl'>-- {item}</p>
          )}
        </div>
      </div>
    </div>
  );
}