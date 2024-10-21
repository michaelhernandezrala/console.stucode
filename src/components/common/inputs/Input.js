import PropTypes from "prop-types";

function Input({ name, type, required, autoFocus, placeholder }) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      className="w-full text-sm px-3 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required={required}
      autoFocus={autoFocus}
      placeholder={placeholder}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "password", "number", "url", "tel"]).isRequired,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  required: false,
  autoFocus: false,
  placeholder: "",
};

export default Input;
