import { useContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router'
import KayitSayfasi from './pages/KayitSayfasi.jsx'
import GirisSayfasi from './pages/GirisSayfasi.jsx'
import AnaSayfa from './pages/AnaSayfa.jsx'
import ProfilSayfasi from './pages/ProfilSayfasi.jsx'
import { ReactContext } from './context.jsx';

function GirisYapilmisRouter() {
  const ctx = useContext(ReactContext);
  if (ctx.token) {
    return <Outlet />
  } else {
    return <Navigate to="/giris" />
  }
  
}

function GirisYapilmamisRouter() {
  const ctx = useContext(ReactContext);
  if (!ctx.token) {
    return <Outlet />
  } else {
    return <Navigate to="/profil" />
  }
}


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        

        <Route element={<GirisYapilmamisRouter />}>
          <Route path="/kayit" element={<KayitSayfasi />} />
          <Route path="/giris" element={<GirisSayfasi />} />
        </Route>

        <Route element={<GirisYapilmisRouter />}>
          <Route path="/profil" element={<ProfilSayfasi />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
