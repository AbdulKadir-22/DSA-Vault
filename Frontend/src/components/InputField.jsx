// src/components/InputField.jsx
import React from "react";
import "../styles/InputField.css";

const InputField = ({ label, name, value, onChange, type = "text", placeholder }) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;
