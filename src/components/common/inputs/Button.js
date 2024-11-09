import PropTypes from "prop-types";

function Button({ type, children }) {
  return (
    <button
      type={type}
      className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
