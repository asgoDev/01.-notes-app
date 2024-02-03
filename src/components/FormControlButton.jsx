import React from "react";
import { IconContext } from "react-icons";

function FormControlButton({ onClickFunction, icon, disabled = false }) {
  return (
    <IconContext.Provider
      value={{
        className: "control-btn__icon",
        color: disabled ? "red" : undefined,
      }}
    >
      <button
        className="form-container__control-btn"
        onClick={onClickFunction}
        disabled={disabled}
      >
        {icon}
      </button>
    </IconContext.Provider>
  );
}

export default FormControlButton;
