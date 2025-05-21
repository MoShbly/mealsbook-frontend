import { useContext, useState } from 'react';
import TextInput from '../components/TextInput'
import { ReactContext } from '../context';
import axios from 'axios';
import Message from '../components/Message';
import ImageInput from '../components/ImageInput';
import MultilineInput from '../components/MultilineInput';
import { useNavigate } from 'react-router';

export default function Page() {
  const ctx = useContext(ReactContext);
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{key: 'key', value: ''}]);
  const [steps, setSteps] = useState([{key: 'key', value: ''}]);

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");


  async function addMeal() {
    try {
      let ingredientsValues = JSON.stringify(ingredients.map(i => i.value.trim()).filter(i => i != ''));
      let stepsValues = JSON.stringify(steps.map(i => i.value.trim()).filter(i => i != ''));

      const response = await axios.post(`https://mealsbook-backend.vercel.app/meals`, {
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

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col gap-5 p-5 w-fit min-w-120 mt-10">
        {msg && <Message msg={msg} type="success" />}
        {error && <Message msg={error} type="error" />}
        <h1 className="text-3xl text-center">Add New Meal</h1>
        <ImageInput value={image} onChange={setImage} label="image"/>
        <TextInput value={name} onChange={setName} label="name"/>
        <TextInput value={description} onChange={setDescription} label="description"/>
        <MultilineInput value={ingredients} onChange={setIngredients} label="ingredients"/>
        <MultilineInput value={steps} onChange={setSteps} label="steps"/>
        <button type="button" className='outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer' onClick={addMeal}>Add Meal</button>
      </form>
    </div>
  );
}