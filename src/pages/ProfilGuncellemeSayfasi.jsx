import { useContext, useState } from 'react';
import TextInput from '../components/TextInput'
import { ReactContext } from '../context';
import axios from 'axios';
import Message from '../components/Message';
import ImageInput from '../components/ImageInput';

export default function Page() {
  const ctx = useContext(ReactContext);

  const [image, setImage] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("");

  const [imageError, setImageError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deleteAccountError, setDeleteAccountError] = useState("");

  const [imageMsg, setImageMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [deleteAccountMsg, setDeleteAccountMsg] = useState("");

  async function updateImage() {
    try {
      const response = await axios.post(`https://mealsbook-backend.vercel.app/users/changeImage`, {
        authtoken: ctx.token,
        newImage: image,
      });

      setImageMsg("Image Updated!");
      setImageError("");
      
    } catch (error) {
      setImageMsg("");
      setImageError(error.response.data.message);
    }
  }

  async function updateName() {
    try {
      const response = await axios.post(`https://mealsbook-backend.vercel.app/users/changeName`, {
        authtoken: ctx.token,
        newFirstname: firstname,
        newLastname: lastname,
      });

      setNameMsg("Name Updated!");
      setNameError("");
      
    } catch (error) {
      setNameMsg("");
      setNameError(error.response.data.message);
    }
  }

  async function updateEmail() {
    try {
      const response = await axios.post(`https://mealsbook-backend.vercel.app/users/changeEmail`, {
        authtoken: ctx.token,
        newEmail: email,
      });

      setEmailMsg("Email Updated!");
      setEmailError("");
    } catch (error) {
      setEmailMsg("");
      setEmailError(error.response.data.message);
    }
  }

  async function updatePassword() {
    try {
      const response = await axios.post(`https://mealsbook-backend.vercel.app/users/changePassword`, {
        authtoken: ctx.token,
        newPassword: password,
      });

      setPasswordMsg("Password Updated!");
      setPasswordError("");
    } catch (error) {
      setPasswordMsg("");
      setPasswordError(error.response.data.message);
    }
  }

  async function deleteAccount() {
    try {
      const response = await axios.delete(`https://mealsbook-backend.vercel.app/users/delete`, {
        data: {
          authtoken: ctx.token,
          password: deleteAccountPassword,
        }
      });
      
      ctx.setPersistentUserData(null);
    } catch (error) {
      console.log(error.response);
      
      setDeleteAccountError(error.response.data.message);
      setDeleteAccountMsg("");
    }
  }

  return (

    <div className="flex flex-col items-center">
      <form className="flex flex-col gap-5 p-5 w-fit min-w-120 mt-10">
        {imageMsg && <Message msg={imageMsg} type="success" />}
        {imageError && <Message msg={imageError} type="error" />}
        <h1 className="text-3xl text-center">Profile Image</h1>
        <ImageInput value={image} onChange={setImage} label="image"/>
        <button type="button" className='outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer' onClick={updateImage}>Update Image</button>
      </form>
      
      <form className="flex flex-col gap-5 p-5 w-fit min-w-120 mt-10">
        <h1 className="text-3xl text-center">Edit Name</h1>
        {nameMsg && <Message msg={nameMsg} type="success" />}
        {nameError && <Message msg={nameError} type="error" />}
        <TextInput value={firstname} onChange={setFirstname} label="firstname"/>
        <TextInput value={lastname} onChange={setLastname} label="lastname"/>
        <button type="button" className='outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer' onClick={updateName}>Update Name</button>
      </form>

      <form className="flex flex-col gap-5 p-5 w-fit min-w-120 mt-10">
        <h1 className="text-3xl text-center">Edit Email</h1>
        {emailMsg && <Message msg={emailMsg} type="success" />}
        {emailError && <Message msg={emailError} type="error" />}
        <TextInput label="email" onChange={setEmail} value={email}/>
        <button type="button" className='outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer' onClick={updateEmail}>Update Email</button>
      </form>

      <form className="flex flex-col gap-5 p-5 w-fit min-w-120 mt-10">
        <h1 className="text-3xl text-center">Reset Password</h1>
        {passwordMsg && <Message msg={passwordMsg} type="success" />}
        {passwordError && <Message msg={passwordError} type="error" />}
        <TextInput label="password" password onChange={setPassword} value={password}/>
        <button type="button" className='outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer' onClick={updatePassword}>Reset Password</button>
      </form>

      <form className="flex flex-col gap-5 p-5 w-fit min-w-120 mt-10">
        <h1 className="text-3xl text-center">Delete Account</h1>
        {deleteAccountMsg && <Message msg={deleteAccountMsg} type="success" />}
        {deleteAccountError && <Message msg={deleteAccountError} type="error" />}
        <TextInput label="password" password onChange={setDeleteAccountPassword} value={deleteAccountPassword}/>
        <button type="button" className='outline-none border p-3 rounded-md border-red-600 bg-red-600 text-white hover:bg-red-800 cursor-pointer' onClick={deleteAccount}>Delete Account</button>
      </form>
    </div>
  );
}