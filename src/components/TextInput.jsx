import { useState } from "react";

export default function Comp({label, password}) {
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <label htmlFor="firstname">{label}: </label>
        {
          password &&
          <button type="button" className="cursor-pointer hover:text-purple-500" onClick={togglePassword}>
            {isPasswordVisible?"hide":"show"} password
          </button>
        }
      </div>
      <input className="outline-none border p-3 rounded-md border-purple-900" name="firstname" id="firstname" type={isPasswordVisible?"text":"password"} />
    </div>
  );
}