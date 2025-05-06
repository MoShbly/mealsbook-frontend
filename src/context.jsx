import {createContext, useState} from 'react';

export const ReactContext = createContext();

export default function ReactContextProvider({ children }) {
  
  const [token, setToken] = useState('');

  const data = {
    token,
  };

  return (
    <ReactContext.Provider value={data}>
      { children }
    </ReactContext.Provider>
  );
}
