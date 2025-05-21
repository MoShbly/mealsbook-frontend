import { useContext, useEffect, useState } from 'react';
import TextInput from '../components/TextInput'
import { ReactContext } from '../context';
import axios from 'axios';
import Message from '../components/Message';
import ImageInput from '../components/ImageInput';
import MultilineInput from '../components/MultilineInput';
import { useNavigate, useParams } from 'react-router';

export default function Page() {
  const ctx = useContext(ReactContext);
  const {mealid} = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{key: 'key', value: ''}]);
  const [steps, setSteps] = useState([{key: 'key', value: ''}]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`https://mealsbook-backend.vercel.app/meals/${mealid}/${ctx.user.id}`);
        if (ctx.user.username != response.data.meal.username) {
          navigate("/")
        }
        setName(response.data.meal.name);
        setDescription(response.data.meal.description);
        setImage(response.data.meal.image);
        setIngredients(JSON.parse(response.data.meal.ingredients).map((item, idx) => ({key: idx, value: item})));
        setSteps(JSON.parse(response.data.meal.steps).map((item, idx) => ({key: idx, value: item})));
        console.log(response.data.meal);
      } catch (error) {
        
      }
    }());
  }, []);

  if (!name) return;

  async function updateMeal() {
    try {
      let ingredientsValues = JSON.stringify(ingredients.map(i => i.value.trim()).filter(i => i != ''));
      let stepsValues = JSON.stringify(steps.map(i => i.value.trim()).filter(i => i != ''));

      const response = await axios.put(`https://mealsbook-backend.vercel.app/meals/${mealid}`, {
        authtoken: ctx.token,
        image,
        name,
        description,
        ingredients: ingredientsValues,
        steps: stepsValues,
      });

      setMsg("Meal Created!");
      setError("");
      navigate("/profil");
    } catch (error) {
      setMsg("");
      console.log(error);
      
      setError(error.response.data.message);
    }

  }

  async function deleteMeal() {
    try {
      let ingredientsValues = JSON.stringify(ingredients.map(i => i.value.trim()).filter(i => i != ''));
      let stepsValues = JSON.stringify(steps.map(i => i.value.trim()).filter(i => i != ''));

      const response = await axios.delete(`https://mealsbook-backend.vercel.app/meals/${mealid}`, {
        data: {
          authtoken: ctx.token,
        }
      });

      setMsg("Meal Deleted!");
      setError("");
      navigate("/profil");
    } catch (error) {
      setMsg("");
      console.log(error);
      
      setError(error.response.data.message);
    }

  }

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col gap-5 p-5 w-fit min-w-120 mt-10">
        {msg && <Message msg={msg} type="success" />}
        {error && <Message msg={error} type="error" />}
        <h1 className="text-3xl text-center">Update Meal</h1>
        <ImageInput value={image} onChange={setImage} label="image"/>
        <TextInput value={name} onChange={setName} label="name"/>
        <TextInput value={description} onChange={setDescription} label="description"/>
        <MultilineInput value={ingredients} onChange={setIngredients} label="ingredients"/>
        <MultilineInput value={steps} onChange={setSteps} label="steps"/>
        <button type="button" className='outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer' onClick={updateMeal}>Update Meal</button>
        <button type="button" className='outline-none border p-3 rounded-md border-red-500 bg-red-500 text-white hover:bg-red-600 cursor-pointer' onClick={deleteMeal}>Delete Meal</button>
      </form>
    </div>
  );
}