import PropTypes from "prop-types";

function Button({ type, children }) {
  return (
    <button
      type={type}
      className="w-full flex justify-center py-2 px-4 border border-transparent bg-blue-500 text-sm font-medium text-white"
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]).isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
