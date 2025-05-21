import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router'
import Layout from './pages/Layout.jsx'
import KayitSayfasi from './pages/KayitSayfasi.jsx'
import GirisSayfasi from './pages/GirisSayfasi.jsx'
import AnaSayfa from './pages/AnaSayfa.jsx'
import ProfilSayfasi from './pages/ProfilSayfasi.jsx'
import KullaniciSayfasi from './pages/KullaniciSayfasi.jsx'
import YeniTarifEklemeSayfasi from './pages/YeniTarifEklemeSayfasi.jsx'
import TarifGuncellemeSayfasi from './pages/TarifGuncellemeSayfasi.jsx'
import ProfilGuncellemeSayfasi from './pages/ProfilGuncellemeSayfasi.jsx'
import ProfilFavsSayfasi from './pages/ProfilFavsSayfasi.jsx'
import TarifSayfasi from './pages/TarifSayfasi.jsx'
import { ReactContext } from './context.jsx';

function GirisYapilmisRouter() {
  const ctx = useContext(ReactContext);
  console.log("YES"+ctx.token);
  
  if (ctx.token) {
    return <Outlet />
  } else {
    return <Navigate to="/giris" />
  }
}

function GirisYapilmamisRouter() {
  const ctx = useContext(ReactContext);
  console.log("NO-" + ctx.token);

  if (!ctx.token) {
    return <Outlet />
  } else {
    return <Navigate to="/profil" />
  }
}


function App() {

  const ctx = useContext(ReactContext);

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<GirisYapilmamisRouter />}>
          <Route path="/kayit" element={<KayitSayfasi />} />
          <Route path="/giris" element={<GirisSayfasi />} />
        </Route>

        <Route element={<GirisYapilmisRouter />}>
          <Route element={<Layout />}>
            <Route path="/profil" element={<ProfilSayfasi />} />
            <Route path="/kullanici/:username" element={<KullaniciSayfasi />} />
            <Route path="/profil/guncelleme" element={<ProfilGuncellemeSayfasi />} />
            <Route path="/profil/favs" element={<ProfilFavsSayfasi />} />
            <Route path="/tarif/ekle" element={<YeniTarifEklemeSayfasi />} />
            <Route path="/tarif/guncelleme/:mealid" element={<TarifGuncellemeSayfasi />} />
            <Route path="/tarif/:mealid" element={<TarifSayfasi />} />
            <Route path="/" element={<AnaSayfa />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
