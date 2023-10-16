import React from "react";
import "./styles.css";

function Input({ label, state, setState, placeholder,type,required }) {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        className="custom-input"
        value={state}
        onChange={(event) => setState(event.target.value)}
        placeholder={placeholder}
        type={type}
        required={true}
      ></input>
    </div>
  );
}

export default Input;
