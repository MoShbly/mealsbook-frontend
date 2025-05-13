import { useContext, useState } from 'react';
import TextInput from '../components/TextInput'
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { ReactContext } from '../context';
import Message from '../components/Message';

export default function Page() {
  const navigate = useNavigate();
  const ctx = useContext(ReactContext);
  
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function kayitOl() {
    try {
      const response = await axios.post(`https://mealsbook-backend.vercel.app/users/signup`, {
        firstname,
        lastname,
        username,
        password,
        email,
      });

      ctx.setFlashMessage("Account created. You can login.");
      navigate("/giris");

      console.log(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-5 p-5 w-fit min-w-120 mt-10">
        {error && <Message msg={error} type="error" />}
        <h1 className="text-5xl text-center">Kayıt Ol</h1>
        <TextInput value={username} onChange={setUsername} label="username"/>
        <TextInput value={firstname} onChange={setFirstname} label="firstname"/>
        <TextInput value={lastname} onChange={setLastname} label="lastname"/>
        <TextInput value={email} onChange={setEmail} label="email"/>
        <TextInput value={password} onChange={setPassword} label="password" password />
        <button type="button" onClick={kayitOl} className='outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer'>Kayıt Ol</button>
        <Link className='text-purple-900 hover:text-purple-600' to="/giris">Giriş Yap</Link>
      </form>
    </div>
  );
}