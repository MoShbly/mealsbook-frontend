import {createContext, useState} from 'react';

export const ReactContext = createContext();

export default function ReactContextProvider({ children }) {
  
  const [token, setToken] = useState('');
  const [flashMessage, setFlashMessage] = useState("");

  function setPersistentToken(token) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  const data = {
    token,
    setPersistentToken,
    flashMessage,
    setFlashMessage,
  };

  return (
    <ReactContext.Provider value={data}>
      { children }
    </ReactContext.Provider>
  );
}
