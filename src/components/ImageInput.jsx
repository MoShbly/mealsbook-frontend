import { useState } from "react";
import defaultProfileImage from '../assets/images/profileImage.png';

export default function({label, value, onChange}) {
  
  function change(e) {
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.onload = function() { onChange(fr.result); }
    fr.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center">
        <label htmlFor="profile-image" className="outline-none border p-3 rounded-full border-purple-900">
          <img className="rounded-full w-40 h-40 object-center" src={value || defaultProfileImage} alt="" />
        </label>
      </div>
      <input className="hidden" id="profile-image" onChange={change} type="file" />
    </div>
  );
}