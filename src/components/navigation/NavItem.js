import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavItem({ to, children }) {
  return (
    <Link
      to={to}
      className="text-gray-700 text-md font-semibold hover:text-blue-500 hover:border-blue-500 hover:scale-110 transition-all duration-300 flex items-center"
    >
      {children}
    </Link>
  );
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavItem;
