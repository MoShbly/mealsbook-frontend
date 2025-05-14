import { useState } from "react";

export default function Comp({label, password, value, onChange}) {
  
  function change(e) {
    onChange(e.target.value);
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(!password);

  function togglePassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <label>{label}: </label>
        {
          password &&
          <button type="button" className="cursor-pointer hover:text-purple-500" onClick={togglePassword}>
            {isPasswordVisible?"hide":"show"} password
          </button>
        }
      </div>
      <input value={value} onChange={change} className="outline-none border p-3 rounded-md border-purple-900" type={isPasswordVisible?"text":"password"} />
    </div>
  );
}