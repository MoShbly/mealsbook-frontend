import { useContext, useState } from 'react';
import TextInput from '../components/TextInput'
import { ReactContext } from '../context';
import axios from 'axios';
import Message from '../components/Message';
import { Link } from 'react-router';

export default function Page() {
  const ctx = useContext(ReactContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");

  const flashMsg = ctx.flashMessage;

  async function girisYap() {
    try {
      const response = await axios.post(`https://mealsbook-backend.vercel.app/users/login`, {
        username,
        password,
      });

      const user = response.data.user;
      ctx.setPersistentUserData(user);

    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col gap-5 p-5 w-fit min-w-120 mt-10">
      {flashMsg && <Message msg={flashMsg} type="success" />}
      {error && <Message msg={error} type="error" />}
        <h1 className="text-5xl text-center">Giriş Yap</h1>
        <TextInput label="username" onChange={setUsername} value={username}/>
        <TextInput label="password" password onChange={setPassword} value={password}/>
        <button type="button" className='outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer' onClick={girisYap}>Giriş Yap</button>
        <Link className='text-purple-900 hover:text-purple-600' to="/kayit">Kayıt Ol</Link>
      </form>
    </div>
  );
}