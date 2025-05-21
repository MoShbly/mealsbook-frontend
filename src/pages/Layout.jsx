import { Children, useContext, useState } from 'react';
import TextInput from '../components/TextInput'
import { ReactContext } from '../context';
import axios from 'axios';
import Message from '../components/Message';
import { Link, Outlet } from 'react-router';

export default function Layout({ children }) {
  const ctx = useContext(ReactContext);
  
  function logout() {
    ctx.setPersistentUserData(null);
  }
  
  return (
    <div>
      <nav className='bg-purple-900 p-5 flex items-center justify-between'>
        <Link to="/" className='text-white text-3xl'>MealsBook</Link>
        <div className='text-white flex gap-3'>
          <Link to="/profil" className='hover:border-b'>Profile</Link>
          <button className='cursor-pointer hover:border-b' onClick={logout}>logout</button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}