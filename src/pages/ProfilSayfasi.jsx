import { useContext, useEffect, useState } from "react";
import { ReactContext } from "../context";
import defaultProfileImage from '../assets/images/profileImage.png';
import { Link } from "react-router";
import axios from "axios";

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

  function logout() {
    ctx.setPersistentUserData(null);
  }
  
  return (
    <>
    <div className="flex">

      <div className="flex flex-col gap-10 items-center py-10 w-96">
        <img className="rounded-full w-40" src={user.image || defaultProfileImage} alt="" />
        <div className="flex flex-col gap-2 text-center text-xl">
          <p className="text-purple-900">{user.firstname} {user.lastname}</p>
          <p>@{user.username}</p>
          <div className="flex gap-6">
            <p className="flex items-center gap-1"><span className="text-purple-900 text-2xl">{meals.length}</span> Meals</p>
            <p className="flex items-center gap-1"><span className="text-purple-900 text-2xl">{user.favs}</span> Favs</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/profil/guncelleme" className="rounded-md text-white bg-purple-700 py-3 px-6 text-center hover:bg-purple-900"> Profil Güncelleme </Link>
          <Link to="/tarif/ekle" className="rounded-md text-white bg-purple-700 py-3 px-6 text-center hover:bg-purple-900"> Yeni Tarif Ekle </Link>
          <button onClick={logout} className="cursor-pointer rounded-md text-white bg-purple-700 py-3 px-6 text-center hover:bg-purple-900"> Çıkış Yap </button>
        </div>
      </div>

      <div className="bg-blue-500">
        <h1>Profil Sayfasi</h1>
        <p>{JSON.stringify(user)}</p>
      </div>

    </div>
      
    </>
  );
}