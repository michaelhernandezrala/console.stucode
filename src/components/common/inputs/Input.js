import PropTypes from "prop-types";

function Input({ name, type, required = false, value = "", onChange, autoFocus = false, placeholder = "" }) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      placeholder={placeholder}
      className="w-full text-sm px-3 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "password"]).isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Input;
