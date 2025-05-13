import { useContext } from "react";
import { ReactContext } from "../context";

export default function Page() {
  const ctx = useContext(ReactContext);


  function cikis() {
    ctx.setPersistentToken("");
  }
  
  return (
    <>
      <h1>Profil Sayfasi</h1>
      <button onClick={cikis}>Cikis Yap</button>
    </>
  );
}