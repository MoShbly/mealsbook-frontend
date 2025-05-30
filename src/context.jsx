import {createContext, useEffect, useState} from 'react';

export const ReactContext = createContext();

export default function ReactContextProvider({ children }) {
  const userdata = JSON.parse(localStorage.getItem("userData") || null);
  
  const [token, setToken] = useState(userdata?.token || "");
  const [user, setUser] = useState(userdata || null);
  const [flashMessage, setFlashMessage] = useState("");

  function getPersistentUserData() {
    const userdata = JSON.parse(localStorage.getItem("userData"));
    setToken(userdata?.token || "");
    setUser(userdata || null)
  }

  function setPersistentUserData(user) {
    const userData = user ? JSON.stringify(user) : "";
    setToken(user ? user.token : "");
    localStorage.setItem("userData", userData);
  }

  const data = {
    token,
    user,
    getPersistentUserData,
    setPersistentUserData,
    flashMessage,
    setFlashMessage,
  };

  return (
    <ReactContext.Provider value={data}>
      { children }
    </ReactContext.Provider>
  );
}
