import "../styles/radio-color.css";

function RadioColor({ name, value, checked = false, onChange }) {
  return (
    <input
      type="radio"
      className={`radio-color`}
      style={{ backgroundColor: `var(--${value})` }}
      name={name}
      value={value}
      defaultChecked={checked}
      onChange={onChange}
    />
  );
}

export default RadioColor;
