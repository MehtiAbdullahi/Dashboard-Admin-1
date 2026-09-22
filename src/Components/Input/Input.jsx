import React from "react";

function Input({ type, label, id, ...props }) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} type={type} {...props} />
    </>
  );
}

export default Input;
