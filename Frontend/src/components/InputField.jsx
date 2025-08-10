// src/components/InputField.jsx
import React from "react";
import "../styles/InputField.css";

// Added 'required' as a prop, defaulting to false.
const InputField = ({ label, name, value, onChange, type = "text", placeholder, required = false }) => {
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
        required={required} // 'required' is now controlled by the prop
      />
    </div>
  );
};

export default InputField;